import DateTimePicker, {
  AndroidNativeProps,
  DateTimePickerEvent,
  IOSNativeProps,
} from '@react-native-community/datetimepicker'
import {format} from 'date-fns'
import {useEffect, useState} from 'react'
import {StyleSheet, View} from 'react-native'
import {HelperText, TextInput} from 'react-native-paper'
import Colors from '../../constants/Colors'
import {
  ENTER_VALID_FITNESS_VALID_UPTO_DATE,
  ENTER_VALID_REPOSESSION_DATE,
} from '../../constants/constants'
import Layout from '../../constants/Layout'

type DatePickerProps = AndroidNativeProps &
  IOSNativeProps & {
    placeholder: string
    disabled?: boolean
    isRequired?: boolean
    isRepoDateGreatorThanRegDate?: boolean
    isFitnessDateGreatorThanRegDate?: boolean
    formatString?: string
    errorMsg?: string
  }

export function DatePicker({
  isRepoDateGreatorThanRegDate,
  isFitnessDateGreatorThanRegDate,
  onChange,
  value,
  placeholder,
  disabled,
  isRequired,
  formatString,
  errorMsg,
}: DatePickerProps) {
  const [pickerVisible, setPickerVisible] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | undefined>()

  useEffect(() => {
    if (isRepoDateGreatorThanRegDate && value !== undefined) {
      setErrorMessage(ENTER_VALID_REPOSESSION_DATE)
      // console.log('also remove this')
    }
    if (isFitnessDateGreatorThanRegDate && value !== undefined) {
      setErrorMessage(ENTER_VALID_FITNESS_VALID_UPTO_DATE)
      // console.log('also remove this')
    }
    if (isRequired && !value && value !== undefined) {
      // console.log('remove this')
      setErrorMessage('This is a required field')
    } else if (errorMessage) {
      setErrorMessage(undefined)
    }
  }, [
    isRequired,
    value,
    isRepoDateGreatorThanRegDate,
    isFitnessDateGreatorThanRegDate,
  ])
  function onChangeDate(event: DateTimePickerEvent, date?: Date | undefined) {
    setPickerVisible(false)
    if (onChange) onChange(event, date)
  }
  function openPicker() {
    setPickerVisible(true)
  }
  // function closePicker() {
  //   setPickerVisible(false)
  // }
  return (
    <View>
      <TextInput
        activeOutlineColor={Colors.dark.background}
        underlineColor={'white'}
        mode={'outlined'}
        style={{
          margin: Layout.baseSize * 0.5,
          backgroundColor: Colors.light.inputBg,
        }}
        outlineColor={Colors.light.inputBg}
        editable={false}
        // pointerEvents={"box-only"}
        onPressIn={!disabled ? openPicker : undefined}
        label={placeholder}
        value={
          !value
            ? undefined
            : typeof value === typeof Date
            ? format(value, formatString ?? 'dd MMM yyyy')
            : format(new Date(value), formatString ?? 'dd MMM yyyy')
        }
        right={
          <TextInput.Icon
            icon={'calendar-month'}
            onPress={!disabled ? openPicker : undefined}
            hitSlop={Layout.hitSlop.icon}
          />
        }
        // disabled={disabled}
      />
      {(!!errorMessage || (!!errorMsg && !!value)) && (
        <HelperText
          type="error"
          visible={!!errorMessage || (!!errorMsg && !!value)}>
          {errorMessage ?? errorMsg}
        </HelperText>
      )}
      {pickerVisible && (
        <DateTimePicker
          dateFormat="shortdate"
          testID="dateTimePicker"
          value={
            !value
              ? new Date()
              : typeof value == 'string'
              ? new Date(value)
              : value
          }
          mode="date"
          is24Hour={true}
          onChange={onChangeDate}
          style={styles.datePickerStyle}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // flexDirection: "row",
    // justifyContent: "space-between",
    // alignItems: "center",
  },
  mainContainer: {
    borderRadius: Layout.baseSize * 0.3,
    borderWidth: Layout.baseSize * 0.05,
    height: Layout.baseSize * 3,
    backgroundColor: Colors.light.background,
    marginTop: Layout.baseSize * 0.5,
    paddingHorizontal: Layout.baseSize * 0.8,
    marginHorizontal: Layout.baseSize * 0.5,
    justifyContent: 'center',
  },
  datePickerStyle: {
    position: 'absolute',
    top: Layout.baseSize * 1,
    right: Layout.baseSize * 3,
  },
})
