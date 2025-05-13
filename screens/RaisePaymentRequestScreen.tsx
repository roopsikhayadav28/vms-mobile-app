import React, {useEffect, useRef, useState} from 'react'
import {
  BackHandler,
  Platform,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import Button from '../components/basic/Button'
import Icon from '../components/basic/Icon'
import {Input} from '../components/basic/Input'
import PickerSelectButton, {Item} from '../components/basic/PickerSelectButton'
import RNFileUploader from '../components/basic/RNFileUploader'
import {H2} from '../components/basic/StyledText'
import Colors from '../constants/Colors'
import {IS_MANDATORY_FIELD} from '../constants/constants'
import Layout from '../constants/Layout'
import {commonStyle} from '../constants/style'
import {
  BankName,
  LeadStatus,
  LeadStatusEventDetailsFragmentDoc,
  PaymentStatus,
  useCreateLeadStatusEventMutation,
} from '../generated/hooks_and_more'
import useLoggedInUser from '../hooks/useLoggedInUser'
import useUpdateLeadInput, {
  useUpdateRemarksInput,
} from '../hooks/useUpdateLeadInput'
import useUserToken from '../hooks/useUserToken'
import {RootStackScreenProps} from '../navigation/navigationTypes'
import {captureSentryException} from '../sentry_telemetry/SentryLogger'
import {FieldId} from '../utils/FieldValidator'
import {isAlphaNumericCaptailStringValid} from '../utils/formHelper'
import {enumToItems, log, titleCaseToReadable} from '../utils/helpers'

type RaisePaymentRequestScreenProps =
  RootStackScreenProps<'RaisePaymentRequestScreen'>

const RaisePaymentRequestScreen = ({
  navigation,
  route: {params},
}: RaisePaymentRequestScreenProps) => {
  const leadId = params?.leadId
  const regNo = params?.regNo
  const desiredStatus = params?.currentStatus
  const payFor = params?.payFor
  const title = params?.title

  log('status in new screen ', desiredStatus)
  const [buttonEnable, setButtonEnable] = useState(true)
  const {leadInput, setLeadInput} = useUpdateLeadInput(leadId)
  const {userToken: myId} = useUserToken()
  const {loggedInUser} = useLoggedInUser(myId)
  const {remarks, setRemarks} = useUpdateRemarksInput(regNo)
  const newLeadId = useRef<string>()
  const [createLeadStatusEvent, {loading: addingEvent}] =
    useCreateLeadStatusEventMutation()

  const bankName = leadInput?.payments?.[0]?.bankName
  const accountholderName = leadInput?.payments?.[0]?.accountHolderName
  const accountNumber = leadInput?.payments?.[0]?.accountNo
  const ifscCode = leadInput?.payments?.[0]?.ifsc
  const bankAccountProofUrl = leadInput?.payments?.[0]?.proofUrl
  const isInputValid =
    !!leadInput?.payments?.[0]?.bankName &&
    !!leadInput?.payments?.[0]?.accountHolderName &&
    !!leadInput?.payments?.[0]?.accountNo &&
    !!leadInput?.payments?.[0]?.ifsc &&
    leadInput?.payments?.[0]?.ifsc?.length === 11 &&
    !!leadInput?.payments?.[0]?.proofUrl
  // const lastPayment = leadInput?.payments && leadInput.payments[0]

  // console.log(
  //   `Bank name ${bankName}, accountholderName ${accountholderName},accountNumber ${accountNumber} `,
  // )

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackHandlerPressed,
    )

    return () => backHandler.remove()
  }, [])

  const onBackHandlerPressed = () => {
    // console.log('back pressed')
    onGoBack()
    return true
  }

  useEffect(() => {
    return () => {
      // Cleanup code to run when the component unmounts or before it re-renders
      setLeadInput({})
    }
  }, [])

  // const [selectStateName, setSelectStateName] = useState<string>();
  // const [accountholderName, setAccountholderName] = useState<string>();
  // const [accountNumber, setAccountNumber] = useState<string>();
  // const [ifscCode, setIfscCode] = useState<string>();

  function onBankNameChange(value: string) {
    // log('Value on bank name change', value)
    setLeadInput({
      ...leadInput,
      payments: [
        {
          ...leadInput?.payments?.[0],
          bankName: value as BankName,
          status: PaymentStatus.Requested,
          for: payFor,
        },
      ],
    })
  }

  function onAccountholderNameChange(value?: string) {
    // setAccountholderName(value);
    setLeadInput({
      ...leadInput,
      payments: [
        {
          ...leadInput?.payments?.[0],
          accountHolderName: value,
          status: PaymentStatus.Requested,
          for: payFor,
        },
      ],
    })
  }

  function onAccountNumberChange(value?: string) {
    // setAccountNumber(value);
    setLeadInput({
      ...leadInput,
      payments: [
        {
          ...leadInput?.payments?.[0],
          accountNo: value,
          status: PaymentStatus.Requested,
          for: payFor,
        },
      ],
    })
  }

  function onSetIfscCodeChange(value?: string) {
    // setIfscCode(value);
    setLeadInput({
      ...leadInput,
      payments: [
        {
          ...leadInput?.payments?.[0],
          ifsc: value,
          status: PaymentStatus.Requested,
          for: payFor,
        },
      ],
    })
  }

  function onAddingProof(value?: string) {
    setLeadInput({
      ...leadInput,
      payments: [
        {
          ...leadInput?.payments?.[0],
          proofUrl: value,
          status: PaymentStatus.Requested,
          for: payFor,
        },
      ],
      documents: {
        ...leadInput?.documents,
        bankAccountProofUrl: value,
      },
    })
  }

  function onPressDesiredButton() {
    // setButtonEnable(true)

    log('logging on tap', leadInput?.payments)
    log('pressed desired button should take to status:', desiredStatus)
    if (buttonEnable) {
      createLeadStatusEvent({
        variables: {
          createdAt: new Date(),
          myId: myId as string,
          //TODO: Typecasting patch
          status: desiredStatus,
          //TODO: add remarks from reactive var
          remarks: remarks?.remarks,
          lead: {
            ...leadInput,
            // Always pass lead Id except when generating a new lead
            id: leadId,
            regNo: regNo,
            // createdBy: {id: myId},
            updatedAt: new Date(),
          },
        },
        onError: error => {
          captureSentryException('error creating lead status event', error)
          ToastAndroid.showWithGravity(error.message, ToastAndroid.BOTTOM, 300)
        },
        update: (cache, {data}) => {
          // add this lead status event at the beginning
          if (data?.addLeadStatusEvent?.leadStatusEvent) {
            const newLSERef = cache.writeFragment({
              id: `LeadStatusEvent:${data?.addLeadStatusEvent?.leadStatusEvent[0].id}`,
              data: data?.addLeadStatusEvent?.leadStatusEvent[0],
              fragment: LeadStatusEventDetailsFragmentDoc,
              fragmentName: 'LeadStatusEventDetails',
            })
            cache.modify({
              id: `Lead:${data?.addLeadStatusEvent?.leadStatusEvent[0]?.lead?.id}`,
              fields: {
                statusEvents(existingRefs = []) {
                  return [...existingRefs, newLSERef]
                },
              },
            })
          }
        },
        onCompleted: ({addLeadStatusEvent}) => {
          // log('event fired', addLeadStatusEvent)
          if (
            addLeadStatusEvent?.leadStatusEvent?.[0].status ===
              LeadStatus.Archive ||
            addLeadStatusEvent?.leadStatusEvent?.[0]?.assignTaskTo ===
              loggedInUser?.role
          ) {
            if (
              Platform.OS === 'android' &&
              addLeadStatusEvent?.leadStatusEvent?.[0].status
            ) {
              const message =
                titleCaseToReadable(
                  addLeadStatusEvent.leadStatusEvent[0].status,
                ) + ' successfully'
              ToastAndroid.show(message, 3000)
            }
            // if (navigation.canGoBack()) navigation.goBack()
          } else if (!!addLeadStatusEvent?.leadStatusEvent) {
            newLeadId.current = addLeadStatusEvent.leadStatusEvent[0].lead.id
            // log('new lead id', newLeadId.current)
            if (Platform.OS === 'android') {
              const message =
                titleCaseToReadable(
                  addLeadStatusEvent.leadStatusEvent[0].status,
                ) + ' successfully'
              ToastAndroid.show(message, 3000)
            }
            // navigation.setParams({
            //   leadId: addLeadStatusEvent.leadStatusEvent[0].lead.id,
            //   regNo: addLeadStatusEvent.leadStatusEvent[0].lead.regNo,
            //   currentStatus: addLeadStatusEvent.leadStatusEvent[0].status,
            // })
            // TODO : It's throwing bugs in some cases saying navigation can't handle it
            // navigation.navigate('LeadDetailsScreen', {
            //   leadId: addLeadStatusEvent.leadStatusEvent[0].lead.id,
            //   regNo: addLeadStatusEvent.leadStatusEvent[0].lead.regNo,
            //   currentStatus: addLeadStatusEvent.leadStatusEvent[0].status,
            // })
            // setLeadInput({id: addLeadStatusEvent.leadStatusEvent[0].lead.id})
            // setVisible(true);
            console.log(
              `currentStatus => ${JSON.stringify(
                addLeadStatusEvent.leadStatusEvent[0],
              )}`,
            )
          }
          setLeadInput({})
          setRemarks(null)
          navigation?.goBack()
        },
      })
    } else {
      log('validation not passed should take to respective validation field')
    }
  }

  const onGoBack = () => {
    console.log('go back click')
    // navigation.navigate('ViewNotificationsDetails', {
    //   screen: 'LeadDetailsScreen',
    //   params: {
    //     leadId: leadId,
    //     regNo: regNo,
    //     currentStatus: desiredStatus as LeadStatus,
    //     lseId: null,
    //   },
    // })
    navigation.goBack()
  }

  // return <RequestDealPayment leadId="0x17192" />
  return (
    <SafeAreaView style={commonStyle.mainAppContainer}>
      <View style={styles.headercontainer}>
        <TouchableOpacity
          style={styles.backContainer}
          onPress={() => {
            onGoBack()
            // navigation.goBack()
          }}>
          <Icon iconName="arrow-back" size={Layout.baseSize * 1.5} />
        </TouchableOpacity>
        <H2>{title}</H2>
      </View>
      <View style={commonStyle.mainAppContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <PickerSelectButton
            isRequired={IS_MANDATORY_FIELD}
            placeholder={'Select a Bank Name'}
            value={bankName}
            onValueChange={onBankNameChange}
            items={enumToItems(BankName) as Item[]}
          />
          <Input
            key={'account-holder-name'}
            value={accountholderName}
            onChangeText={onAccountholderNameChange}
            label="Enter the Account holder Name"
            isRequired={IS_MANDATORY_FIELD}
            uniqueKey="account-holder-name"
          />
          <Input
            key={'account-number'}
            label="Enter the Account Number"
            // keyboardType="number-pad"
            value={accountNumber}
            onChangeText={onAccountNumberChange}
            isRequired={IS_MANDATORY_FIELD}
            uniqueKey="account-number"
            // checkValidation={isAlphaNumericCaptailStringValid(accountNumber)}
          />
          <Input
            key={'ifsc-code'}
            label="Enter IFSC code"
            value={ifscCode}
            onChangeText={onSetIfscCodeChange}
            isRequired={IS_MANDATORY_FIELD}
            uniqueKey="ifsc-code"
            id={FieldId.IFSC_CODE}
            // temporary
            isDataValid={isAlphaNumericCaptailStringValid(ifscCode)}
            minCharLength={1}
            maxCharLength={11}
          />
          <RNFileUploader
            isRequired={IS_MANDATORY_FIELD}
            variant="docs"
            header="Account Proof"
            title="Upload Document"
            saveDoc={onAddingProof}
            value={bankAccountProofUrl}
          />
        </ScrollView>
        {/* <Row style={commonStyle.buttonView}>
        <Button variant="primary" title={"Request payment"} type="enable" />
      </Row> */}
      </View>
      <Button
        variant="primary"
        title="Raise Payment Request"
        disabled={!isInputValid}
        type={isInputValid ? 'enable' : 'disable'}
        onPress={onPressDesiredButton}
      />
    </SafeAreaView>
  )
}

export default RaisePaymentRequestScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headercontainer: {
    paddingTop: Layout.baseSize / 0.8,
    paddingBottom: Layout.baseSize * 0.5,
    marginBottom: Layout.baseSize,
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
