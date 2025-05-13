import {DateTimePickerEvent} from '@react-native-community/datetimepicker'
import React, {useEffect, useRef} from 'react'
import {StyleSheet, View} from 'react-native'
import Colors from '../../../constants/Colors'
import useUpdateLeadInput, {
  useUpdateRemarksInput,
} from '../../../hooks/useUpdateLeadInput'
import {DatePicker} from '../../basic/DatePicker'
import {Input} from '../../basic/Input'
import {INVALID_FI_DATE} from '../../../constants/constants'
import {compareDate} from '../../../utils/helpers'

type ConfirmFIProps = {
  leadId: string | undefined
  regNo: string
  loginDate: string
}

export default function ConfirmFI({leadId, regNo, loginDate}: ConfirmFIProps) {
  const fiConfirmedDateValidationRef = useRef<boolean>()
  const {leadInput, setLeadInput} = useUpdateLeadInput(leadId)
  const {setRemarks} = useUpdateRemarksInput(regNo)

  const fiConfirmedDate =
    leadInput?.activeBooking?.activeLoan?.fieldInspectionConfirmedDate

  useEffect(() => {
    if (
      !!fiConfirmedDate &&
      !!loginDate &&
      compareDate(fiConfirmedDate, loginDate)
    ) {
      fiConfirmedDateValidationRef.current = true
    } else {
      fiConfirmedDateValidationRef.current = false
    }
  }, [fiConfirmedDate, loginDate])

  function handleFIDateChange(event: DateTimePickerEvent, date?: Date) {
    setLeadInput({
      ...leadInput,
      activeBooking: {
        ...leadInput?.activeBooking,
        activeLoan: {
          ...leadInput?.activeBooking?.activeLoan,
          fieldInspectionConfirmedDate: date,
        },
      },
    })
  }

  function handleRemarks(value: string) {
    setRemarks(value)
  }

  return (
    <View style={styles.container}>
      <DatePicker
        isRequired
        value={fiConfirmedDate}
        placeholder="Enter the FI date *"
        onChange={handleFIDateChange}
        errorMsg={
          !fiConfirmedDateValidationRef.current ? INVALID_FI_DATE : undefined
        }
      />
      <Input label="Enter the Remarks" onChangeText={handleRemarks} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
    backgroundColor: Colors.light.background,
  },
})
