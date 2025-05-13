import {
  StyleProp,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import React from 'react'
import Layout from '../../constants/Layout'
import {
  LoanStatus,
  LoanToBeClosedBy,
  PaymentType,
  RefurbishmentStatus,
} from '../../generated/hooks_and_more'
import {P2} from './StyledText'
import {useNavigation} from '@react-navigation/native'
import {RootStackScreenProps} from '../../navigation/navigationTypes'
import {
  getIconColorForStatus,
  getIconNameForStatus,
  log,
} from '../../utils/helpers'
import Icon from './Icon'
import {commonStyle} from '../../constants/style'

type DataProps = {
  label: string | number | boolean | PaymentType | LoanToBeClosedBy
  value: string | number | boolean | PaymentType | LoanToBeClosedBy
  isDoc?: boolean
  status?: LoanStatus | RefurbishmentStatus
  document?: string
  style?: StyleProp<ViewStyle>
  variant?: '1' | '2' | '3' | 'variant4WithStatusIcon'
}

const DataRowItem = ({
  label,
  value,
  isDoc = false,
  style,
  variant,
  document,
  status,
}: DataProps) => {
  const navigation =
    useNavigation<RootStackScreenProps<'ViewPdfScreen'>['navigation']>()

  function navigateToDedicatedScreen(itemVal, label) {
    log('document opened', itemVal)
    const itemValue = itemVal
      ?.toString()
      ?.split('?')?.[0]
      ?.split('/')
      ?.reverse()?.[0]
      ?.split('.')
      ?.reverse()?.[0]
    if (itemValue === 'jpg' || itemValue === 'jpeg' || itemValue === 'png') {
      navigation.navigate('ViewImageScreen', {
        imageUrl: itemVal?.toString(),
        title: label?.toString(),
      })
    } else if (itemValue === 'pdf') {
      navigation.navigate('ViewPdfScreen', {
        pdfUrl: itemVal,
        title: label?.toString(),
      })
    } else {
      ToastAndroid.showWithGravity('Added Document is not right!', 30, 30)
    }
    log('clicked to View Document', itemVal)
  }

  if (variant === '3') {
    return (
      <View style={[style, styles.outerContainer]}>
        <Text style={{color: 'grey', flex: 1.2}}>{label}</Text>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
          }}>
          <P2>{value ?? '-'}</P2>
        </View>
        <View
          style={[
            commonStyle.flex1,
            {
              alignItems: 'flex-end',
            },
          ]}>
          {isDoc && (
            <TouchableOpacity
              onPress={() => navigateToDedicatedScreen(document, label)}>
              <P2 style={styles.boldText} numberOfLines={1}>
                {document ? 'View' : '-'}
              </P2>
            </TouchableOpacity>
          )}
        </View>
      </View>
    )
  }

  if (variant === 'variant4WithStatusIcon') {
    log('variant4 status', status)
    return (
      <View style={[style, styles.variant4]}>
        <View style={styles.secondContainer}>
          <Text style={{color: 'grey'}}>{label}</Text>
          <P2 style={{textAlign: 'center'}}>{value ?? '-'}</P2>
        </View>

        <View style={styles.variant4SecondContainer}>
          {isDoc && (
            <TouchableOpacity
              onPress={() => navigateToDedicatedScreen(document, label)}
              style={{
                paddingRight: Layout.baseSize,
                justifyContent: 'center',
              }}>
              <P2 style={styles.boldText} numberOfLines={1}>
                {document ? 'View' : '-'}
              </P2>
            </TouchableOpacity>
          )}
          {!!status ? (
            <Icon
              iconName={getIconNameForStatus(status)}
              color={getIconColorForStatus(status)}
            />
          ) : (
            <P2>-</P2>
          )}
        </View>
      </View>
    )
  }

  return (
    <View style={[style, styles.innerContainer]}>
      <Text style={{color: 'grey'}}>{label}</Text>

      {!isDoc && <P2>{value}</P2>}
      {isDoc && (
        <TouchableOpacity
          onPress={() => navigateToDedicatedScreen(value, label)}>
          <P2 style={styles.boldText} numberOfLines={1}>
            {value ? 'View Document' : '-'}
          </P2>
        </TouchableOpacity>
      )}
    </View>
  )
}

export default DataRowItem

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: Layout.baseSize * 0.5,
    marginHorizontal: Layout.baseSize,
  },
  innerContainer: {
    borderBottomRightRadius: Layout.baseSize,
    borderBottomLeftRadius: Layout.baseSize,
    borderTopRightRadius: Layout.baseSize,
    alignContent: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Layout.baseSize / 2,
    marginHorizontal: Layout.baseSize,
  },
  variant4: {
    borderBottomRightRadius: Layout.baseSize,
    borderBottomLeftRadius: Layout.baseSize,
    borderTopRightRadius: Layout.baseSize,
    alignContent: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Layout.baseSize / 2,
    marginHorizontal: Layout.baseSize,

    // paddingHorizontal: Layout.baseSize * 4,
  },
  variant4SecondContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    // paddingHorizontal: Layout.baseSize * 4,
    flexDirection: 'row',
  },
  secondContainer: {
    alignContent: 'flex-end',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    marginRight: Layout.baseSize,
    // width: '50%',
    // paddingHorizontal: Layout.baseSize * 4,
    flexDirection: 'row',
  },
  boldText: {
    fontWeight: '700',
    // marginLeft: Layout.baseSize * 7,
  },
})
