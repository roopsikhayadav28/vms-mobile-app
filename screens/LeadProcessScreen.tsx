import {BackHandler, StyleSheet, TouchableOpacity, View} from 'react-native'
import {H2, P1} from '../components/basic/StyledText'
import Form from '../components/forms/Form'
import {
  LeadStatus,
  LeadStatusEvent,
  useCreateLeadStatusEventMutation,
  useDoneBySomeoneQuery,
  useGetPreAndPostTimelineOfALeadQuery,
  useLeadStatusFlowQuery,
  UserRole,
} from '../generated/hooks_and_more'
import useUpdateLeadInput from '../hooks/useUpdateLeadInput'
import {RootStackScreenProps} from '../navigation/navigationTypes'
import {log} from '../utils/helpers'
import {SafeAreaView} from 'react-native-safe-area-context'
import Icon from '../components/basic/Icon'
import Layout from '../constants/Layout'
import {useEffect, useState} from 'react'
import Colors from '../constants/Colors'

type LeadProcessScreenProps = RootStackScreenProps<'LeadProcessScreen'>
export default function LeadProcessScreen({
  navigation,
  route: {params},
}: LeadProcessScreenProps) {
  // const currentStatus = route?.params?.currentStatus
  // log('currentStatus', currentStatus)
  // const leadId = route?.params?.leadId
  // const registrationNo = route?.params?.regNo

  const [addLeadStatusEvent, setAddLeadStatusEvent] =
    useState<LeadStatusEvent[]>()

  const currentStatus = params?.currentStatus
  const leadId = params?.leadId
  const regNo = params?.regNo
  const onGoBack = params?.onGoBack
  const lseId = params?.lseId

  const {data: timelineStatus} = useGetPreAndPostTimelineOfALeadQuery({
    skip: !regNo,
    variables: {regNo},
    fetchPolicy: 'cache-and-network',
  })

  const postTimeline =
    timelineStatus?.queryLead[0]?.statusEvents[0]?.postTimeline
  const preTimeline = timelineStatus?.queryLead[0]?.statusEvents[0]?.preTimeline

  // console.log('timelineStatus', timelineStatus)

  // log('lead id and regno', {leadId, registrationNo})
  //NOTE:please do not add onComplete
  const [createLeadStatusEvent, {loading: addingEvent}] =
    useCreateLeadStatusEventMutation()
  //TODO: Pass the next status in switch case
  const {leadInput, setLeadInput} = useUpdateLeadInput(leadId)
  useEffect(() => {
    // Cleanup code to run when the component unmounts or before it re-renders
    return () => {
      console.log('lead input empty')
      setLeadInput({})
    }
  }, [])
  const source = leadInput?.source ?? params?.source

  const {data, loading} = useLeadStatusFlowQuery({
    fetchPolicy: 'network-only',
    variables: {
      source,
    },
    onCompleted: ({queryLeadStatusFlow}) => {
      // console.log('This is the lead status flow data', queryLeadStatusFlow) // logging Lead status flow
    },
  })

  // const notifyTo = data?.queryLeadStatusFlow?.[0]?.notifyTo
  const assignTaskTo = !currentStatus
    ? UserRole.ProcurementExecutive
    : data?.queryLeadStatusFlow?.find(f => f.current === currentStatus)
        ?.assignTaskTo
  //log('assign task to at lpscreen', assignTaskTo)
  // const taskTitle = data?.queryLeadStatusFlow?.[0]?.taskTitle
  // const taskButtonTitle = data?.queryLeadStatusFlow?.[0]?.taskButtonTitle

  const desiredStatus = !currentStatus
    ? LeadStatus.LeadGenerated
    : data?.queryLeadStatusFlow?.find(f => f.current === currentStatus)?.desired
  log('parallel desired flow', desiredStatus)
  const canGoBack1Step = data?.queryLeadStatusFlow?.find(
    s => s.current === desiredStatus,
  )?.canGoBack

  const backStatus = canGoBack1Step
    ? data?.queryLeadStatusFlow?.find(s => s.current === currentStatus)
        ?.previous
    : undefined
  console.log('backstatus', {backStatus})
  const {data: doneBySomeoneData} = useDoneBySomeoneQuery({
    skip: true,
    // skip: !leadId || !desiredStatus,
    fetchPolicy: 'network-only',
    variables: {
      leadId,
      desiredStatus,
    },
  })

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackHandlerPressed,
    )
    return () => backHandler.remove()
  }, [])

  const onBackHandlerPressed = () => {
    console.log('back pressed')
    if (!regNo) {
      navigation.goBack()
    } else {
      onGoBackToPre()
    }
    return true
  }

  const onGoBackToPre = () => {
    if (!!onGoBack) {
      onGoBack(lseId, currentStatus)
    }
    navigation.goBack()
    // navigation.navigate('ViewNotificationsDetails', {
    //   screen: 'LeadDetailsScreen',
    //   params: {
    //     leadId: leadId,
    //     regNo: regNo,
    //     currentStatus: currentStatus as LeadStatus,
    //     lseId: null,
    //   },
    // })
  }

  const undesiredStatus = !currentStatus
    ? null
    : data?.queryLeadStatusFlow?.find(f => f.current === currentStatus)
        ?.undesired
  // log('current and desired and undesired', {
  //   currentStatus,
  //   desiredStatus,
  //   undesiredStatus,
  // })
  /* function takePositiveAction(leadId: LeadRef['id'], desiredStatus?: LeadStatus) {
    if (!!desiredStatus) {
      createLeadStatusEvent({
        variables: {
          createdAt: new Date(),
          myId: userToken as string,
          status: desiredStatus,
          lead,
        },
        onCompleted: () => {
          // take action here on completion of a task / emitting a new status event
        },
      });
    }
  } */

  const undesiredButtonText = data?.queryLeadStatusFlow?.find(
    f => f.current === undesiredStatus,
  )?.cta

  // console.log('unDesiredButtonText', undesiredButtonText)

  // TODO: Scope out desired button spec object itself
  const desiredButtonText = !desiredStatus
    ? null
    : data?.queryLeadStatusFlow?.find(f => f.current === desiredStatus)?.cta // getButtonText(desiredStatus ?? LeadStatus.Archive)

  console.log({desiredButtonText})
  const hasPopup = !!data?.queryLeadStatusFlow?.find(
    f => f.current === desiredStatus || f.current === undesiredStatus,
  )?.showPopup

  const positivePopupTitle = data?.queryLeadStatusFlow?.find(
    f => f.current === desiredStatus,
  )?.popupTitle

  const negativePopupTitle = data?.queryLeadStatusFlow?.find(
    f => f.current === undesiredStatus,
  )?.popupTitle

  const positivePopupDescription = data?.queryLeadStatusFlow?.find(
    f => f.current === desiredStatus,
  )?.popupDescription
  const negativePopupDescription = data?.queryLeadStatusFlow?.find(
    f => f.current === undesiredStatus,
  )?.popupDescription
  const negativePopupWithForm = data?.queryLeadStatusFlow?.find(
    f => f?.current === undesiredStatus,
  )?.showPopupWithInputField

  const isPopupWithRemark = !!data?.queryLeadStatusFlow?.find(
    f => f.current === undesiredStatus,
  )?.showPopupRemark

  const canGoForward1Step = data?.queryLeadStatusFlow?.find(
    f => f.current === desiredStatus,
  )?.canGoForward

  const hideUndesiredButton = data?.queryLeadStatusFlow?.find(
    f => f?.current === desiredStatus,
  )?.hideUndesiredButton

  log('parameters at form:', {
    assignTaskTo,
    undesiredStatus,
    currentStatus,
    desiredStatus,
    leadId,
    backStatus,
    desiredButtonText,
  })

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headercontainer}>
        <TouchableOpacity
          style={styles.backContainer}
          onPress={() => {
            if (!regNo) {
              navigation.goBack()
            } else {
              onGoBackToPre()
            }
          }}>
          <Icon iconName="arrow-back" size={Layout.baseSize * 1.5} />
        </TouchableOpacity>
        <H2>{regNo ?? 'Add new lead'}</H2>
      </View>

      {false ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <P1>
            {'Task already performed by ' +
              doneBySomeoneData?.doneBySomeone?.name}
          </P1>
        </View>
      ) : (
        <Form
          leadId={leadId}
          regNo={regNo}
          source={source}
          currentStatus={currentStatus}
          createLeadStatusEvent={createLeadStatusEvent}
          desiredStatus={desiredStatus}
          hasPopup={hasPopup}
          positivePopupTitle={positivePopupTitle}
          negativePopupTitle={negativePopupTitle}
          positivePopupDescription={positivePopupDescription}
          negativePopupDescription={negativePopupDescription}
          isPopupWithRemark={isPopupWithRemark}
          isPopupWithFields={negativePopupWithForm}
          undesiredStatus={undesiredStatus}
          loading={loading}
          desiredButtonText={desiredButtonText}
          undesiredButtonText={undesiredButtonText}
          backStatus={backStatus}
          navigation={navigation}
          assignTo={assignTaskTo}
          addingEvent={addingEvent}
          canGoForward={canGoForward1Step}
          hideUndesiredButton={hideUndesiredButton}
          // postTimeline={postTimeline}
          // preTimeline={preTimeline}
          onGoBack={onGoBack}
          lseId={lseId}
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headercontainer: {
    paddingTop: Layout.baseSize * 0.8,
    paddingBottom: Layout.baseSize * 0.5,
    marginBottom: Layout.baseSize * 0.5,
    paddingHorizontal: Layout.baseSize,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.colorRbg,
  },

  backContainer: {
    marginRight: Layout.baseSize / 0.75,
  },
})
