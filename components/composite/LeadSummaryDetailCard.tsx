import React from 'react'
import Card from '../basic/Card'
import Button from '../basic/Button'
import Image from '../basic/Image'
import {H3, P2} from '../basic/StyledText'
import {commonStyle} from '../../constants/style'
import {View, StyleSheet, TouchableOpacity, Linking} from 'react-native'
import Layout from '../../constants/Layout'
import Colors from '../../constants/Colors'
import {titleCaseToReadable} from '../../utils/helpers'
import {CompositeScreenProps, useNavigation} from '@react-navigation/native'
import {
  LeadStackScreenProps,
  RootStackScreenProps,
} from '../../navigation/navigationTypes'
import useLoggedInUser from '../../hooks/useLoggedInUser'
import useUserToken from '../../hooks/useUserToken'
import {Text} from 'react-native'
import {LeadSource} from '../../generated/hooks_and_more'

type LeadSummaryDetailCardProps = {
  imageUri?: string
  vehicleModel?: string
  leadTitle?: string
  leadOwnerName?: string
  leadStatus?: string
  leadSource?: string
  regNo: string
  ammount?: string
  auctioningAgency?: string
  onActionSheetHandler: () => void

  spocNo?: string
  leadCreationDate?: string //need to verfiy which date to display
  onPressTextImages?: () => void
  dealerNo?: string
  source?: string
}

type LeadScreenNavProps = CompositeScreenProps<
  RootStackScreenProps<'LeadProcessScreen'>,
  LeadStackScreenProps<'LeadDetailsScreen'>
>
const LeadSummaryDetailCard = ({
  imageUri = '',
  leadTitle = '',
  vehicleModel = '',
  leadOwnerName = '',
  leadStatus = '',
  leadSource = '',
  leadCreationDate = '',
  regNo,
  onActionSheetHandler,
  ammount = '',
  spocNo = '',
  auctioningAgency = '',
  dealerNo = '',
  source = '',
  onPressTextImages = () => {},
}: LeadSummaryDetailCardProps) => {
  const navigation = useNavigation<LeadScreenNavProps['navigation']>()
  const {userToken} = useUserToken()
  const {loggedInUser} = useLoggedInUser(userToken)

  function onImagePress() {
    navigation.navigate('ViewImagesAtStageScreen', {regNo})
    // log('image Press ran', {})
  }

  function onPressCallButton() {
    const dialNumber = source === LeadSource.DealershipSale ? dealerNo : spocNo

    Linking.openURL(`tel:${dialNumber}`)
  }

  const showCallButton = () => {
    const numberToCall = source === LeadSource.BankAuction ? spocNo : dealerNo

    /* NOTE: If the user is not OPERATIONS or PROCUREMENT, then they if the lead
       have a spocNo or dealerNo to be able to call. 
      */
    if (
      (loggedInUser?.role?.includes('OPERATIONS') ||
        loggedInUser?.role?.includes('PROCUREMENT')) &&
      !!numberToCall
    ) {
      return true
    } else {
      return false
    }
  }

  return (
    <Card style={styles.cardContainter}>
      <View style={styles.cardHeadContainer}>
        <H3>
          {/* {leadTitle}| {leadSource} */}
          {leadTitle}
        </H3>
        {showCallButton() && (
          <View style={{...styles.callContainer}}>
            <Button
              style={{height: 40, width: 40}}
              iconName="phone"
              variant="call_button"
              onPress={onPressCallButton}
            />
          </View>
        )}
      </View>

      <View
        style={{
          ...commonStyle.flexRow,
          justifyContent: 'space-between',
        }}>
        <View style={{flex: 1, justifyContent: 'space-between'}}>
          <P2>{regNo}</P2>
          <P2>{titleCaseToReadable(auctioningAgency)}</P2>
          <P2>{leadOwnerName}</P2>
        </View>

        <View style={{flex: 0.9}}>
          {/* <TouchableOpacity activeOpacity={0.5} onPress={onImagePress}> */}
          <Image sourceUri={imageUri} variant="parent" />
          {/* </TouchableOpacity> */}
        </View>
      </View>
      <View style={styles.detailActionContainer}>
        <TouchableOpacity onPress={onActionSheetHandler}>
          <Text style={styles.timeLineButton}>Timeline status</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.timeLineButton} onPress={onImagePress}>
            Image
          </Text>
        </TouchableOpacity>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  cardContainter: {
    marginTop: Layout.baseSize,
    padding: Layout.baseSize * 0.5,
    backgroundColor: Colors.light.inputBg,
  },
  callContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginLeft: Layout.baseSize / 2,
    // backgroundColor: 'red',
    flex: 1,
  },
  timeLineButton: {
    color: '#0072CA',
    fontSize: 16,
  },
  detailActionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: Layout.baseSize,
    paddingBottom: Layout.baseSize / 4,
  },
  cardHeadContainer: {
    paddingBottom: Layout.baseSize * 0.5,
    flexDirection: 'row',
    alignItems: 'center',
  },
})

export default LeadSummaryDetailCard
