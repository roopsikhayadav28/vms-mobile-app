import {useNavigation} from '@react-navigation/native'
import * as React from 'react'
import {
  Alert,
  Linking,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native'
import {List, Surface} from 'react-native-paper'
import Colors from '../../../constants/Colors'
import Layout from '../../../constants/Layout'
import {PaymentFor, UserRef, UserRole} from '../../../generated/hooks_and_more'
import useLoggedInUser from '../../../hooks/useLoggedInUser'
import useUserToken from '../../../hooks/useUserToken'
import {RootStackScreenProps} from '../../../navigation/navigationTypes'
import {log} from '../../../utils/helpers'
import {H3, LinkText, P2} from '../../basic/StyledText'

interface CollapsibleCardProps {
  title: string
  data?: {
    key: string
    value: string
    isLink?: boolean
    isDoc?: boolean
    textColor?: string
    isHidden?: boolean
  }[]
  isDocument?: boolean
  isVehicleDocument?: boolean
  isDealDetailsData?: DealDetailsPropsType
  purchaseOrder?: PurchaseOrderDetailProps
  onExpand?: () => void
  openBottomSheet?: (variant?, paymentfor?) => void
  setBottomSheetVariant?: React.Dispatch<
    React.SetStateAction<'Payment' | 'DeliveryExpense' | 'PurchaseOrder'>
  >
  setPaymentSheetFor?: React.Dispatch<React.SetStateAction<PaymentFor>>
}

type DealDetailsPropsType = {
  key: string
  value: string | number
  isHiddenForSomeRole?: boolean
  isDoc?: boolean
  isActionSheet?: boolean
  paytype?: PaymentFor
  actionSheetVariant?: 'Payment' | 'DeliveryExpense' | 'PurchaseOrder'
}[]

type PurchaseOrderDetailProps = {
  key: string
  value: string
  isActionSheet?: boolean
  isForm?: boolean
  paytype?: PaymentFor
  actionSheetVariant?: 'Payment' | 'DeliveryExpense' | 'PurchaseOrder'
}[]
type BottomSheetVariableProps = {
  variant?: 'Payment' | 'DeliveryExpense' | 'PurchaseOrder'
  payFor?: PaymentFor
}

const CollapsibleCard = ({
  title,
  data,
  isDocument = false,
  isVehicleDocument = false,
  isDealDetailsData,
  onExpand,
  purchaseOrder,
  openBottomSheet,
  setBottomSheetVariant,
  setPaymentSheetFor,
}: CollapsibleCardProps) => {
  const navigation =
    useNavigation<RootStackScreenProps<'ViewPdfScreen'>['navigation']>()
  const {userToken} = useUserToken()
  const {loggedInUser} = useLoggedInUser(userToken)
  function showActionSheet({variant, payFor}: BottomSheetVariableProps) {
    log('variant and payFor', {payFor, variant})
    setBottomSheetVariant(variant)
    setPaymentSheetFor(payFor)
    openBottomSheet()
  }
  function navigateToDedicatedScreen(item) {
    log('document opened', item?.value)
    const itemValue = item?.value
      ?.toString()
      ?.split('?')?.[0]
      ?.split('/')
      ?.reverse()?.[0]
      ?.split('.')
      ?.reverse()?.[0]
    if (itemValue === 'jpg' || itemValue === 'jpeg' || itemValue === 'png') {
      navigation.navigate('ViewImageScreen', {
        imageUrl: item?.value?.toString(),
        title: item?.isDoc && item?.key,
      })
    } else if (itemValue === 'pdf') {
      navigation.navigate('ViewPdfScreen', {
        pdfUrl: item?.value,
        title: item?.isDoc && item?.key,
      })
    } else {
      ToastAndroid.showWithGravity('Added Document is not right!', 30, 30)
    }
    log('clicked to View Document', item?.value)
  }

  if (!!isDealDetailsData)
    return (
      <Surface style={styles.container}>
        <List.Accordion
          style={styles.accordianStyle}
          title={title}
          onPress={onExpand}
          titleStyle={{color: Colors.dark.background}}>
          {loggedInUser?.role === UserRole.Driver ||
          loggedInUser?.role === UserRole.LogisticsManager
            ? isDealDetailsData
                ?.filter(item => !item?.isHiddenForSomeRole)
                .map((item, index) => {
                  return (
                    <View key={index} style={styles.mainItemView}>
                      <View style={styles.labelStyle}>
                        <P2 numberOfLines={1}>{item?.key}</P2>
                      </View>
                      <View style={[styles.textStyle]}>
                        {item?.isDoc ? (
                          <TouchableOpacity
                            onPress={() => {
                              navigateToDedicatedScreen(item)
                            }}>
                            <P2 style={styles.boldText} numberOfLines={1}>
                              {item?.value ? 'View Document' : '-'}
                            </P2>
                          </TouchableOpacity>
                        ) : (
                          <P2 numberOfLines={1}>{item?.value}</P2>
                        )}
                      </View>
                    </View>
                  )
                })
            : isDealDetailsData?.map((item, index) => {
                return (
                  <View key={index} style={styles.mainItemView}>
                    <View style={styles.labelStyle}>
                      <P2 numberOfLines={1} style={{color: 'grey'}}>
                        {item.key}
                      </P2>
                    </View>
                    <View style={[styles.textStyle]}>
                      {item?.isDoc ? (
                        <TouchableOpacity
                          // style={{backgroundColor: 'yellow'}}
                          onPress={() => navigateToDedicatedScreen(item)}>
                          <P2 style={styles.boldText} numberOfLines={1}>
                            {item?.value ? ' View Document' : '-'}
                          </P2>
                        </TouchableOpacity>
                      ) : item?.isActionSheet ? (
                        <TouchableOpacity
                          // style={{backgroundColor: 'pink'}}
                          onPress={() => {
                            showActionSheet({
                              payFor: item?.paytype,
                              variant: item?.actionSheetVariant,
                            })
                          }}>
                          <P2 style={{color: 'black'}}>View Details</P2>
                        </TouchableOpacity>
                      ) : (
                        <P2 numberOfLines={1} style={{color: 'black'}}>
                          {item?.value}
                        </P2>
                      )}
                    </View>
                  </View>
                )
              })}
        </List.Accordion>
      </Surface>
    )

  return (
    // ts-ignore
    <Surface style={styles.container} elevation={1}>
      <List.Accordion
        style={styles.accordianStyle}
        title={title}
        onPress={onExpand}
        titleStyle={{color: Colors.dark.background}}>
        {data
          .filter(item => !item?.isHidden)
          .map((item, index) => {
            return (
              <View key={index} style={styles.mainItemView}>
                <View style={styles.labelStyle}>
                  <P2 numberOfLines={1} style={{color: 'grey'}}>
                    {item.key}
                  </P2>
                </View>
                <View style={styles.textStyle}>
                  {isVehicleDocument ? (
                    item?.isDoc ? (
                      <TouchableOpacity
                        onPress={() => navigateToDedicatedScreen(item)}>
                        <P2 style={styles.boldText} numberOfLines={1}>
                          {item?.value ? 'View Document' : '-'}
                        </P2>
                      </TouchableOpacity>
                    ) : (
                      <P2 style={{color: item?.textColor}}>{item?.value}</P2>
                    )
                  ) : item?.isLink ? (
                    <View style={styles.linkText} />
                  ) : (
                    <P2 numberOfLines={1}>{item?.value}</P2>
                  )}
                  {item?.isLink &&
                  item?.value &&
                  Linking.canOpenURL(item?.value) ? (
                    <View style={styles.linkContainer}>
                      <LinkText
                        onPress={() => {
                          Linking?.openURL(item?.value)
                        }}>
                        {item?.isLink && item?.value?.startsWith('http')
                          ? 'View in Map'
                          : '-'}
                      </LinkText>
                    </View>
                  ) : (
                    <P2>{item?.isLink ?? ''}</P2>
                  )}
                </View>
              </View>
            )
          })}
      </List.Accordion>
    </Surface>
  )
}

export default CollapsibleCard

const styles = StyleSheet.create({
  container: {
    margin: Layout.baseSize * 0.5,
    backgroundColor: Colors.light.background,
    // width: Layout.window.width,
    borderRadius: Layout.baseSize / 5,
    overflow: 'hidden',
  },
  linkContainer: {
    marginBottom: Layout.baseSize,
  },
  accordianStyle: {
    backgroundColor: Colors.light.inputBg,
    height: Layout.baseSize * 3,
    padding: Layout.baseSize / 5,
  },
  mainItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Layout.baseSize / 2,
    paddingHorizontal: Layout.baseSize,
  },
  textStyle: {
    width: '50%',
    alignItems: 'flex-end',
  },
  labelStyle: {
    width: '50%',
  },
  boldText: {
    fontWeight: '700',
  },
  linkText: {},
})
