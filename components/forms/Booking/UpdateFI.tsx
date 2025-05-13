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

type UpdateFIProps = {
  leadId: string | undefined
  regNo: string
  loginDate: string
}
export default function UpdateFI({leadId, regNo, loginDate}: UpdateFIProps) {
  const fieldInspectionDateValidationRef = useRef<boolean>()
  const {leadInput, setLeadInput} = useUpdateLeadInput(leadId)
  const {setRemarks} = useUpdateRemarksInput(regNo)

  const fieldInspectionDate =
    leadInput?.activeBooking?.activeLoan?.fieldInspectionDate

  useEffect(() => {
    if (
      !!fieldInspectionDate &&
      !!loginDate &&
      compareDate(fieldInspectionDate, loginDate)
    ) {
      fieldInspectionDateValidationRef.current = true
    } else {
      fieldInspectionDateValidationRef.current = false
    }
  }, [fieldInspectionDate, loginDate])

  function handleFIDateChange(event: DateTimePickerEvent, date?: Date) {
    setLeadInput({
      ...leadInput,
      activeBooking: {
        ...leadInput?.activeBooking,
        activeLoan: {
          ...leadInput?.bookings?.[0]?.activeLoan,
          fieldInspectionDate: date,
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
        value={fieldInspectionDate}
        placeholder="Enter the FI date *"
        onChange={handleFIDateChange}
        errorMsg={!fieldInspectionDateValidationRef.current && INVALID_FI_DATE}
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
