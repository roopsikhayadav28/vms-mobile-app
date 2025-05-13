import {ScrollView, StyleSheet} from 'react-native'
import Colors from '../../../constants/Colors'
import PickerSelectButton, {Item} from '../../basic/PickerSelectButton'
import {enumToItems} from '../../../utils/helpers'
import {BankName} from '../../../generated/hooks_and_more'
import useUpdateLeadInput, {
  useUpdateRemarksInput,
} from '../../../hooks/useUpdateLeadInput'
import {DatePicker} from '../../basic/DatePicker'
import {DateTimePickerEvent} from '@react-native-community/datetimepicker'
import RNFileUploader from '../../basic/RNFileUploader'
import React from 'react'
import {Input} from '../../basic/Input'
import {H3} from '../../basic/StyledText'

type ConfirmLoginProps = {
  leadId: string | undefined
  regNo: string
  requestId?: string
}

export default function ConfirmLogin({leadId, regNo}: ConfirmLoginProps) {
  const {leadInput, setLeadInput} = useUpdateLeadInput(leadId)
  const {setRemarks} = useUpdateRemarksInput(regNo)

  const bankName = leadInput?.activeBooking?.activeLoan?.bankName
  const loginDate = leadInput?.activeBooking?.activeLoan?.loginDate
  const loginApplicationFormUrl =
    leadInput?.activeBooking?.activeLoan?.loginApplicationFormUrl

  function onBankNameChange(value: string) {
    setLeadInput({
      ...leadInput,
      activeBooking: {
        ...leadInput?.activeBooking,
        activeLoan: {
          ...leadInput?.activeBooking?.activeLoan,
          bankName: value as BankName,
        },
      },
    })
  }

  function handleDateChange(event: DateTimePickerEvent, date?: Date) {
    setLeadInput({
      ...leadInput,
      activeBooking: {
        ...leadInput?.activeBooking,
        activeLoan: {
          ...leadInput?.activeBooking?.activeLoan,
          loginDate: date,
        },
      },
    })
  }

  function handleUploadApplicationForm(value: string) {
    setLeadInput({
      ...leadInput,
      activeBooking: {
        ...leadInput?.activeBooking,
        activeLoan: {
          ...leadInput?.activeBooking?.activeLoan,
          loginApplicationFormUrl: value,
        },
      },
    })
  }

  function handleRemarks(value: string) {
    setRemarks(value)
  }

  // log('leadInput', {leadInput, remarks})

  return (
    <ScrollView style={styles.container}>
      <PickerSelectButton
        isRequired
        placeholder="Bank Name *"
        value={bankName}
        onValueChange={onBankNameChange}
        items={enumToItems(BankName) as Item[]}
      />
      <DatePicker
        isRequired
        value={loginDate}
        placeholder="Enter the login date *"
        onChange={handleDateChange}
      />

      <H3 style={{padding: 12}}>Application Form</H3>

      <RNFileUploader
        isRequired
        variant="docs"
        title="Upload Document"
        value={loginApplicationFormUrl}
        saveDoc={handleUploadApplicationForm}
      />

      <Input label="Enter the Remarks" onChangeText={handleRemarks} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
    backgroundColor: Colors.light.background,
  },
})
