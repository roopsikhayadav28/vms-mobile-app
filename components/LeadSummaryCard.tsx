import {CompositeScreenProps, useNavigation} from '@react-navigation/native'
import {memo} from 'react'
import {Linking, StyleSheet, TouchableOpacity, View} from 'react-native'
import Colors from '../constants/Colors'
import {DEFAULT_TRACTOR_IMAGE} from '../constants/constants'
import Layout from '../constants/Layout'
import {commonStyle} from '../constants/style'
import {LeadSource, LeadStatus, UserRole} from '../generated/hooks_and_more'
import {
  LeadStackScreenProps,
  RootStackScreenProps,
} from '../navigation/navigationTypes'
import {log, titleCaseToReadable} from '../utils/helpers'
import Button from './basic/Button'
import Card from './basic/Card'
import Image from './basic/Image'
import {H3, P2} from './basic/StyledText'
import {Text} from 'react-native'
import useLoggedInUser from '../hooks/useLoggedInUser'
import useUserToken from '../hooks/useUserToken'

type LeadSummaryCardProps = {
  leadId: string
  imageUri: string
  // labelTitle: string;

  leadTitle: string
  leadSubtitle?: string
  leadOwnerName: string
  location: string
  actionButtonTitle?: string
  regNo: string
  source?: LeadSource
  currentStatus?: LeadStatus
  hideButton?: boolean
  showCallButton?: boolean
  spocNo: string
  dealerNo: string
  hideChips?: boolean
  isImageNavigate?: boolean
  onPressCardFn?: ({
    leadId,
    regNo,
    currentStatus,
  }: {
    leadId: string
    regNo: string
    currentStatus: LeadStatus
  }) => void
  postTimeline?: string
}

type LeadScreenNavProps = CompositeScreenProps<
  RootStackScreenProps<'LeadProcessScreen'>,
  LeadStackScreenProps<'LeadDetailsScreen'>
>

function LeadSummaryCard({
  isImageNavigate = false,
  leadId,
  imageUri,
  source,
  // labelTitle,
  leadOwnerName,
  leadSubtitle,
  leadTitle,
  location,
  spocNo,
  actionButtonTitle,
  currentStatus,
  showCallButton = false,
  regNo,
  hideButton,
  hideChips,
  onPressCardFn,
  postTimeline,
  dealerNo,
}: LeadSummaryCardProps) {
  const navigation =
    useNavigation<
      RootStackScreenProps<'ViewNotificationsDetails'>['navigation']
    >()

  const {userToken} = useUserToken()
  const {loggedInUser} = useLoggedInUser(userToken)
  function onPressCard() {
    if (!!onPressCardFn && leadId && regNo && currentStatus)
      onPressCardFn({leadId, regNo, currentStatus})
    else
      try {
        navigation.navigate('ViewNotificationsDetails', {
          screen: 'LeadDetailsScreen',
          params: {
            leadId,
            regNo,
            currentStatus,
            lseId: null,
          },
        })
        // navigation.navigate('LeadDetailsScreen', {
        //   leadId,
        //   regNo,
        //   currentStatus,
        //   lseId: null,
        // })
      } catch (error) {
        console.log('error navigating to lead details screen', error)
      }
  }
  function onPressActionButton() {
    if ((!!leadId && !!regNo && !!currentStatus) || !!source) {
      navigation.navigate('ViewNotificationsDetails', {
        screen: 'LeadDetailsScreen',
        params: {
          leadId,
          regNo,
          currentStatus,
        },
      })
      // navigation.navigate('LeadProcessScreen', {
      //   leadId,
      //   regNo,
      //   currentStatus,
      //   source,
      // })
    }
  }

  //we are not using this card at lead detail screen
  // function onImagePress() {
  //   navigation.navigate('ViewImagesAtStageScreen', {regNo})
  //   log('image Press ran', {})
  // }

  function onPressCallButton() {
    const dialNumber = source === LeadSource.DealershipSale ? dealerNo : spocNo
    // console.log({dialNumber})

    Linking.openURL(`tel:${dialNumber}`)
  }
  return (
    <Card style={styles.titleContainer}>
      <TouchableOpacity onPress={onPressCard}>
        <Image
          variant="preview"
          sourceUri={imageUri ? imageUri : DEFAULT_TRACTOR_IMAGE}
          // onPress={onImagePress}
          isDetailView={isImageNavigate}
        />
        {!hideChips && (
          <>
            <View style={styles.chipContainer}>
              <P2 style={{color: '#fff'}}>
                {!!postTimeline
                  ? postTimeline
                  : titleCaseToReadable(currentStatus)}
              </P2>
            </View>
            {/* <Chip
              style={styles.regNoChipContainer}
              mode="outlined"
              textStyle={{fontWeight: 'bold'}}>
              {regNo.toUpperCase()}
            </Chip> */}
          </>
        )}
        <View>
          <H3>{titleCaseToReadable(leadTitle)}</H3>
          <View style={{flexDirection: 'row'}}>
            {!hideChips && <H3>{regNo.toUpperCase()} </H3>}
            {leadSubtitle && loggedInUser?.role !== UserRole.CentreManager && (
              <H3>{' | ' + leadSubtitle} </H3>
            )}
          </View>

          {/* show final bid ammount here */}
          <P2>{'created by ' + leadOwnerName}</P2>
          {location && <P2>{location}</P2>}
        </View>
        {!!source && (
          <Text style={{paddingVertical: 4}}>
            {titleCaseToReadable(source)}
          </Text>
        )}
      </TouchableOpacity>

      <View style={{...commonStyle.flexRow, ...commonStyle.marginTop10}}>
        {!hideButton && (
          <View style={commonStyle.flex1}>
            <Button
              title={actionButtonTitle}
              variant="primary"
              onPress={onPressActionButton}
            />
          </View>
        )}
        {showCallButton && (
          <View style={{...styles.callContainer, flex: hideButton ? 1 : 0}}>
            <Button
              iconName="phone"
              variant="call_button"
              onPress={onPressCallButton}
            />
          </View>
        )}
      </View>
    </Card>
  )
}

export default memo(LeadSummaryCard)

const styles = StyleSheet.create({
  chipContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: Colors.light.green,
    padding: Layout.baseSize * 0.25,
    borderBottomLeftRadius: Layout.baseSize * 0.25,
    borderTopRightRadius: Layout.baseSize * 0.25,
  },
  regNoChipContainer: {
    position: 'absolute',
    top: Layout.baseSize * 6,
    left: Layout.baseSize * 0.5,
  },
  titleContainer: {padding: Layout.baseSize * 0.5},
  callContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginLeft: Layout.baseSize / 2,
  },
})
