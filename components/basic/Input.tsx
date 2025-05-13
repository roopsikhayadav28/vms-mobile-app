import React, {useEffect, useState} from 'react'
import {View} from 'react-native'
import {HelperText, TextInput, TextInputProps} from 'react-native-paper'
import Colors from '../../constants/Colors'
import {
  ENTER_VALID_LOCATION_URL,
  ENTER_VALID_STRING,
  ENTER_VALID_UPI_ID,
  IFSC_CODE_MUST_HAVE_11_DIGIT,
  INVALID_BILL_AMOUNT,
  INVALID_DEAL_AMOUNT,
  INVALID_DELIVERY_EXPENSE_AMOUNT,
  INVALID_LOAN_REPAYMENT_AMOUNT,
  INVALID_PARKING_AMOUNT,
  PLEASE_ENTER_VALID_NUMBER,
  PLEASE_ENTER_VALID_PHONE_NUMBER,
  SPACE_NOT_ALLOWED,
  THIS_IS_REQUIRED_FIELD,
  YARD_NAME_ALREADY_EXIST,
} from '../../constants/constants'
import {FieldId, isFieldValueValid} from '../../utils/FieldValidator'
import {isCheckSpace, isStringValid, isUpiValid} from '../../utils/formHelper'
import {log} from '../../utils/helpers'
import {
  isRequiredField,
  isValueValidation,
} from '../../utils/inputValidationHelper'

type InputProps = {
  //TODO: Remove this if not necessary in the future
  // variant: "phoneNo" | "otp" | "search" | "form" | "chat" | "remarks";
  checkValidation?: boolean //I'll rename it to isDataValid, as it will give validation for data condtion specific to other usecases
  isFormValid?
  setIsFormValid?
  checkAmount?: boolean
  isRequired?: boolean
  minCharLength?: number
  maxCharLength?: number
  uniqueKey?: string
  checkExistingYardName?: boolean
  //new validator props
  temporary?: boolean
  id?: FieldId
  isDataValid?: boolean
} & Pick<
  TextInputProps,
  | 'label'
  | 'value'
  | 'onChangeText'
  | 'disabled'
  | 'multiline'
  | 'keyboardType'
  | 'onSubmitEditing'
  | 'right'
  | 'key'
  | 'defaultValue'
  | 'onBlur'
  | 'onFocus'
  | 'autoFocus'
>

export const Input = (props: InputProps) => {
  const {
    uniqueKey,
    isRequired,
    value,
    minCharLength,
    maxCharLength,
    checkValidation,
    checkExistingYardName,
    temporary = false,
    id,
    isFormValid,
    setIsFormValid,
    isDataValid,
    onChangeText,
    defaultValue,
    ...rest
  } = props
  const [errorMessage, setErrorMessage] = useState<string | undefined>('')
  const [isFocused, setIsFocused] = useState<boolean>()

  function formFieldValidation(uniqueKey: string) {
    setErrorMessage(undefined)
    if (!isRequiredField(value, isRequired)) {
      setErrorMessage(THIS_IS_REQUIRED_FIELD)
      return
    }
    let caseArrOne = [
      'registration-number',
      'engine-number',
      'chessis-number',
      'ifsc-code',
      'policy-number',
      'account-number',
    ]
    let caseArrTwo = [
      'loan-amount',
      'per-day-parking-charges',
      'payment-amount',
    ]
    let caseArrThree = [
      'auction-agency-name',
      'account-holder-name',
      'yard-spoc-name',
      'yard-name',
    ]
    let caseArrFour = ['yard-spoc-mobile', 'agency-spoc-mobile']

    const case1 = caseArrOne.includes(uniqueKey) ? uniqueKey : ''
    const case2 = caseArrTwo.includes(uniqueKey) ? uniqueKey : ''
    const case3 = caseArrThree.includes(uniqueKey) ? uniqueKey : ''
    const case4 = caseArrFour.includes(uniqueKey) ? uniqueKey : ''

    switch (uniqueKey) {
      case case1:
        const result = isValueValidation(value, checkValidation)
        if (value && !isCheckSpace(value)) {
          setErrorMessage(SPACE_NOT_ALLOWED)
          return
        }
        if (uniqueKey === 'ifsc-code' && value) {
          if (!value && value?.length <= 0) {
            setErrorMessage(IFSC_CODE_MUST_HAVE_11_DIGIT)
            return
          } else {
            if (value?.length !== maxCharLength) {
              setErrorMessage(IFSC_CODE_MUST_HAVE_11_DIGIT)
              return
            }
          }
          // if (checkMinLengthField(minCharLength, value)) {
          //   setErrorMessage(IFSC_CODE_MUST_HAVE_11_DIGIT)
          //   return
          // }
          // if (
          //   value?.length > minCharLength &&
          //   checkMaxLengthField(value, maxCharLength)
          // ) {
          //   setErrorMessage(IFSC_CODE_MUST_HAVE_11_DIGIT)
          //   return
          // }
          // }
        }
        break
      case case4:
        if (!isValueValidation(value, checkValidation)) {
          setErrorMessage(PLEASE_ENTER_VALID_PHONE_NUMBER)
        }
        break
      case case2:
        if (
          uniqueKey === 'payment-amount' &&
          value &&
          !isValueValidation(value, checkValidation)
        ) {
          setErrorMessage(INVALID_PARKING_AMOUNT)
        }
        if (
          value &&
          !isValueValidation(value, checkValidation) &&
          value !== '0'
        ) {
          setErrorMessage(PLEASE_ENTER_VALID_NUMBER)
        }
        // }
        break
      case 'bid-amount-payment':
        if (!isValueValidation(value, checkValidation) && value !== '0') {
          setErrorMessage(INVALID_DEAL_AMOUNT)
          return
        }
        break
      case case3:
        if (!isStringValid(value)) {
          setErrorMessage(ENTER_VALID_STRING)
          return
        }
        if (case3 === 'yard-name' && value && checkExistingYardName) {
          setErrorMessage(YARD_NAME_ALREADY_EXIST)
        }
        break
      case 'upi-id':
        if (value && !isUpiValid(value)) {
          setErrorMessage(ENTER_VALID_UPI_ID)
        }
        break
      case 'yard-location':
        if (!isValueValidation(value, checkValidation)) {
          setErrorMessage(ENTER_VALID_LOCATION_URL)
        }
        break
      case 'delivery-payment-amount':
        if (!isValueValidation(value, checkValidation)) {
          setErrorMessage(INVALID_DELIVERY_EXPENSE_AMOUNT)
        }
        break
      case 'bill-amount':
        if (!isValueValidation(value, checkValidation)) {
          setErrorMessage(INVALID_BILL_AMOUNT)
        }
        break
      case 'loan-repayment-amount':
        if (!isValueValidation(value, checkValidation)) {
          setErrorMessage(INVALID_LOAN_REPAYMENT_AMOUNT)
        }
        break
      default:
        return {}
    }
  }
  useEffect(() => {
    //TODO: Check for in between states of min and max characters
    // by @AGRIT420 !temporary --> temprorary
    !temporary && formFieldValidation(uniqueKey)
    // log('error message', {value, errorMessage})
  }, [
    value,
    temporary,
    isRequired,
    minCharLength,
    maxCharLength,
    checkValidation,
    uniqueKey,
  ])

  // new validator function call in useEfect

  useEffect(() => {
    // isFocused &&
    temporary &&
      isFieldValueValid({
        id,
        value,
        isDataValid,
        setError: setErrorMessage,
        isFormValid,
        setIsFormValid,
      })
    // log('error message', {isFocused, isDataValid, value, errorMessage})
  }, [isFocused, value, id, isDataValid, temporary, isFormValid])

  if (temporary) {
    return (
      <>
        <TextInput
          underlineColor={'white'}
          mode={'outlined'}
          style={{margin: 8, backgroundColor: Colors.light.inputBg}}
          activeOutlineColor={Colors.dark.background}
          outlineColor={Colors.light.inputBg}
          onFocus={e => {
            setIsFocused(true)
            log('on focusing on input', isFocused)
          }}
          onBlur={() => {
            // isFieldValueValid({
            //   id: id,
            //   value,
            //   isDataValid,
            //   setError: setErrorMessage,
            // })
            setIsFocused(false)
          }}
          // onPressOut={() =>
          //   isFieldValueValid({
          //     id: id,
          //     value,
          //     isDataValid,
          //     setError: setErrorMessage,
          //   })
          // }
          {...props}
        />
        {!!errorMessage && (
          <HelperText type="error" visible={!!errorMessage}>
            {errorMessage}
          </HelperText>
        )}
      </>
    )
  }

  return (
    <View>
      <TextInput
        underlineColor={'white'}
        mode={'outlined'}
        style={{margin: 8, backgroundColor: Colors.light.inputBg}}
        activeOutlineColor={Colors.dark.background}
        outlineColor={Colors.light.inputBg}
        defaultValue={defaultValue}
        {...props}
      />
      {!!errorMessage && (
        <HelperText type="error" visible={!!errorMessage}>
          {errorMessage}
        </HelperText>
      )}
    </View>
  )
}
