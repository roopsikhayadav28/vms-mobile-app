import {StyleSheet, View} from 'react-native'
import React, {useEffect, useRef} from 'react'
import {ScrollView} from 'react-native-gesture-handler'
import {commonStyle} from '../../../constants/style'
import {DatePicker} from '../../basic/DatePicker'
import useUpdateLeadInput, {
  useUpdateRemarksInput,
} from '../../../hooks/useUpdateLeadInput'
import {DateTimePickerEvent} from '@react-native-community/datetimepicker'
import {Input} from '../../basic/Input'
import RNFileUploader from '../../basic/RNFileUploader'
import Separator from '../../basic/Separator'
import Layout from '../../../constants/Layout'
import {INVALID_DO_DATE} from '../../../constants/constants'
import {compareDate, getValidNumber} from '../../../utils/helpers'

type FormComponentProps = {
  leadId: string | undefined
  registrationNo?: string
  fiDate: Date
}

const ApproveDeliveryOrder = ({
  leadId,
  registrationNo,
  fiDate,
}: FormComponentProps) => {
  const doDateValidationRef = useRef<boolean>(false)
  const {leadInput, setLeadInput} = useUpdateLeadInput(leadId)
  const {setRemarks} = useUpdateRemarksInput(registrationNo)

  const doDate = leadInput?.activeBooking?.activeLoan?.deliveryOrderDate
  const validityDays =
    leadInput?.activeBooking?.activeLoan?.deliveryOrderValidity
  const approvedLoanAmount =
    leadInput?.activeBooking?.activeLoan?.sanctionedLoanAmount
  const deliveryOrderProof =
    leadInput?.activeBooking?.activeLoan?.deliveryOrderDocUrl

  useEffect(() => {
    if (!!doDate && !!fiDate && compareDate(doDate, fiDate)) {
      doDateValidationRef.current = true
    } else {
      doDateValidationRef.current = false
    }
  }, [doDate, fiDate])

  function onchangeDeliveryOrderDate(
    event: DateTimePickerEvent,
    selectedDate?: Date,
  ) {
    setLeadInput({
      ...leadInput,
      activeBooking: {
        ...leadInput?.activeBooking,
        activeLoan: {
          ...leadInput?.activeBooking?.activeLoan,
          deliveryOrderDate: selectedDate,
        },
      },
    })
  }

  function onChangeDoValidityDays(value: string) {
    const doValidityDays = getValidNumber(value)
    setLeadInput({
      ...leadInput,
      activeBooking: {
        ...leadInput?.activeBooking,
        activeLoan: {
          ...leadInput?.activeBooking?.activeLoan,
          deliveryOrderValidity: doValidityDays,
        },
      },
    })
  }
  function onChangeApprovedLoanAmount(value: string) {
    const approvedLoanAmount = getValidNumber(value)
    setLeadInput({
      ...leadInput,
      activeBooking: {
        ...leadInput?.activeBooking,
        activeLoan: {
          ...leadInput?.activeBooking?.activeLoan,
          sanctionedLoanAmount: approvedLoanAmount,
        },
      },
    })
  }
  function onAddingDeliveryOrderProof(value: string) {
    setLeadInput({
      ...leadInput,
      activeBooking: {
        ...leadInput?.activeBooking,
        activeLoan: {
          ...leadInput?.activeBooking?.activeLoan,
          deliveryOrderDocUrl: value,
        },
      },
    })
  }
  function onChangeRemarks(value: string) {
    setRemarks(value)
  }
  return (
    <View style={commonStyle.mainAppContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <DatePicker
          value={doDate}
          placeholder="Enter the DO date *"
          onChange={onchangeDeliveryOrderDate}
          errorMsg={!doDateValidationRef.current ? INVALID_DO_DATE : undefined}
        />
        <Input
          value={validityDays?.toString()}
          onChangeText={onChangeDoValidityDays}
          label={'DO validity days *'}
          keyboardType="number-pad"
        />
        <Input
          value={approvedLoanAmount?.toString()}
          onChangeText={onChangeApprovedLoanAmount}
          label={'Enter Approved Loan Amount *'}
          keyboardType="number-pad"
        />
        <Separator />
        <RNFileUploader
          header="Delivery Order"
          isRequired
          variant="docs"
          saveDoc={onAddingDeliveryOrderProof}
          value={deliveryOrderProof}
        />
        <Input label="Remarks" onChangeText={onChangeRemarks} />
      </ScrollView>
    </View>
  )
}

export default ApproveDeliveryOrder

const styles = StyleSheet.create({
  titleTextStyle: {
    marginVertical: Layout.baseSize * 0.5,
    marginLeft: Layout.baseSize * 0.5,
  },
})
