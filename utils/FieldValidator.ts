import {isInteger} from 'lodash'
import {formDataValidityProps} from '../components/forms/formTypes'
import {log, titleCaseToReadable} from './helpers'
import {fi} from 'date-fns/locale'

/**
 * Field Validator: It will validate, for specific  fields , not anything else generalised
 *
 */

enum DOCUMENT_TYPE {
  DEAL_PAYMENT_PROOF = 'DEAL_PAYMENT_PROOF',
  PARKING_PAYMENT_PROOF = 'PARKING_PAYMENT_PROOF',
  PARKING_PAYMENT_RECEIPTS = 'PARKING_PAYMENT_RECEIPTS',

  DELIVERY_EXPENSES_PAYMENT_PROOF = 'DELIVERY_EXPENSES_PAYMENT_PROOF',
  DELIVERY_EXPENSES_PAYMENT_RECEIPTS = 'DELIVERY_EXPENSES_PAYMENT_RECEIPTS',

  RTO_VERIFICATION_PROOF = 'RTO_VERIFICATION_PROOF',
  HYPOTHECATION_PROOF = 'HPOTHECATION_PROOF',
  CHALLAN_PROOF = 'CHALLAN_PROOF',
  HSRP_PROOF = 'HSRP_PROOF',
  APPROVAL_MAIL = 'APPROVAL_MAIL',
}
export enum FieldId {
  REGISTRATION_NUMBER = 'REGISTRATION_NUMBER',
  PURCHASE_TYPE = 'PURCHASE_TYPE',
  REPO_BANK_NAME = 'REPO_BANK_NAME',
  VEHICLE_MAKE = 'VEHICLE_MAKE',
  VEHICLE_MODEL = ' VEHICLE_MODEL',
  MANUFACTURING_YEAR = 'MANUFACTURING_YEAR',
  UPI_ID = 'UPI_ID',
  IFSC_CODE = 'IFSC_CODE',
  MOBILE_NUMBER = 'MOBILE_NUMBER',
  ENGINE_NUMBER = 'ENGINE_NUMBER',
  CHASSIS_NUMBER = 'CHASSIS_NUMBER',
  OWNERSHIP_TYPE = 'OWNERSHIP_TYPE',
  HOURS_METER = 'HOURS_METER',
  DEMANDED_AMOUNT = 'DEMANDED_AMOUNT',

  DEALER_NAME = 'DEALER_NAME',
  DEALER_MOBILE = 'DEALER_MOBILE',

  LOAN_AMOUNT = 'LOAN_AMOUNT',
  FINAL_BID_AMOUNT = 'FINAL_BID_AMOUNT',
  DEAL_PAYMENT_AMOUNT = 'DEAL_PAYMENT_AMOUNT',
  DEAL_PAYMENT_PROOF = 'DEAL_PAYMENT_PROOF',
  DEAL_PAYMENT_RECEIPTS = 'DEAL_PAYMENT_RECEIPTS',
  LOCATION_URL = 'LOCATION_URL',
  PAYMENT_MODE_PICKER = 'PAYMENT_MODE_PICKER',

  DEAL_TOKEN_AMOUNT = 'DEAL_TOKEN_AMOUNT',
  HOLD_BACK_AMOUNT = 'HOLD_BACK_AMOUNT',
  DEAL_DELIVERY_AMOUNT = 'DEAL_DELIVERY_AMOUNT',

  FINANCER_NAME = 'FINANCER_NAME',
  INSURER_NAME = 'INSURER_NAME',
  INSURANCE_TYPE = 'INSURANCE_TYPE',
  AUCTION_AGENCY_NAME = 'AUCTION_AGENCY_NAME',
  AUCTION_SPOC_NUMBER = 'AUCTION_SPOC_NUMBER',
  BENEFICIARY_NAME = 'BENEFICIARY_NAME',
  POLICY_NUMBER = 'POLICY_NUMBER',
  POLICY_EXPIRY_DATE = 'POLICY_EXPIRY_DATE',

  VEHICLE_FINANCED_RADIO = 'VEHICLE_FINANCED_RADIO',

  FITNESS_VALID_UPTO_DATE = 'FITNESS_VALID_UPTO_DATE',
  REPOSSESSION_DATE = 'REPOSSESSION_DATE',
  REGISTRATION_DATE = 'REGISTRATION_DATE',

  DRIVER = 'DRIVER',
  REMARKS = 'REMARKS',
  YARD_PICKER = ' YARD_PICKER',
  YARD_NAME = 'YARD_NAME',
  PARKING_PAYMENT_AMOUNT = 'PARKING_PAYMENT_AMOUNT',
  PARKING_PAYMENT_PROOF = 'PARKING_PAYMENT_PROOF',
  PARKING_PAYMENT_RECEIPTS = 'PARKING_PAYMENT_RECEIPTS',
  BANK_NAME = 'BANK_NAME',
  CENTRE_NAME = 'CENTRE_NAME',

  EXPENSES_CATEGORY = 'EXPENSES_CATEGORY',
  DELIVERY_EXPENSES_PAYMENT_AMOUNT = 'DELIVERY_EXPENSES_PAYMENT_AMOUNT',
  DELIVERY_EXPENSES_PAYMENT_PROOF = 'DELIVERY_EXPENSES_PAYMENT_PROOF',
  DELIVERY_EXPENSES_PAYMENT_RECEIPTS = 'DELIVERY_EXPENSES_PAYMENT_RECEIPTS',

  RTO_VERIFICATION_PROOF = 'RTO_VERIFICATION_PROOF',

  IS_HYPO = 'IS_HYPO',
  HYPOTHECATION_PROOF = 'HYPOTHECATION_PROOF',
  IS_CHALLAN_FOUND = 'IS_CHALLAN_FOUND',
  CHALLAN_AMOUNT = 'CHALLAN_AMOUNT',
  CHALLAN_PROOF = 'CHALLAN_PROOF',

  IS_BLACKLISTED = 'IS_BLACKLISTED',
  BLACKLISTING_PROOF = 'BLACKLISTING_PROOF',

  HSRP_PROOF = 'HSRP_PROOF',
  APPROVAL_MAIL = 'APPROVAL_MAIL',

  IS_RC_AVAILABLE = 'IS_RC_AVAILABLE',
  IS_VEHICLE_FINANCED = 'IS_VEHICLE_FINANCED',
  IS_LOAN_CLOSED = 'IS_LOAN_CLOSED',
  LOAN_TO_BE_CLOSED_DATE = 'LOAN_TO_BE_CLOSED_DATE',

  DOCUMENT = 'DOCUMENTS', // generalised Document error message
  IMAGE = 'IMAGE', // generalised Image element

  INSPECTION_VIDEO = 'INSPECTION_VIDEO',
  FRONT_BODY = 'FRONT_BODY',
  LEFT_BODY = 'LEFT_BODY',
  BACK_BODY = 'BACK_BODY',
  RIGHT_BODY = 'RIGHT_BODY',
  BACK_LEFT_TYRE = 'BACK_LEFT_TYRE',
  BACK_RIGHT_TYRE = 'BACK_RIGHT_TYRE',
  FRONT_LEFT_TYRE = 'FRONT_LEFT_TYRE',
  FRONT_RIGHT_TYRE = 'FRONT_RIGHT_TYRE',
  ENGINE_IMAGE = 'ENGINE_IMAGE',
  ODOMETER = 'OODMEETR',
  FIP = 'FIP',
  CHASSIS_IMAGE = 'CHASSIS_IMAGE',

  SELLING_PRICE = 'SELLING_PRICE',
  LISTING_PRICE = 'LISTING_PRICE',
  PROCUREMENT_COST = 'PROCUREMENT_COST',

  SALE_AMOUNT = 'SALE_AMOUNT',
  BOOKING_DELIVERY_AMOUNT = 'BOOKING_DELIVERY_AMOUNT',
}

interface RadioButton {
  status: boolean
  value: string
}
function isPayment() {}

function isLocationUrl() {}
function isMobileNumber(id, val, setError) {
  if (
    !!val &&
    (val.charAt(0) === '1' ||
      val.charAt(0) === '2' ||
      val.charAt(0) === '3' ||
      val.charAt(0) === '4' ||
      val.charAt(0) === '5')
  ) {
    setError(`${titleCaseToReadable(id)}  cannot start with 1/2/3/4/5`)
    return false
  } else if (!!val && val.length !== 10) {
    setError(`${titleCaseToReadable(id)} must be of 10 digit`)
    return false
  } else {
    setError('')
    return true
  }
}
function isValueEqual(id, condition, setError) {
  if (!condition) {
    setError(`Invalid ${titleCaseToReadable(id)}`)
    return false
  } else if (condition) {
    setError('')
    return true
  }
}

function isRequired(field) {
  // leadInput.field
  //   setError Message(`${ID} is mandatory!`)
}
function isSpaceless(val, setError) {
  const spaceRegEx = /^(\d|\w)+$/
  if (!!val && spaceRegEx.test(val)) {
    setError('')
    return true
  } else {
    setError('Space not allowed!')
    return false
  }
}
export function isFieldLengthMin(id, length: number, value, setError) {
  if (length && value?.length < length) {
    setError(
      `${titleCaseToReadable(id)} length should be greater than  ${length - 1}`,
    )
    return false
  }
  setError('')
  return true
}

function isMandatory(id: FieldId, value, setError) {
  if (!!value && value.length >= 0) {
    setError('')
    return true
  } else {
    if (value !== undefined) setError(`${titleCaseToReadable(id)} is mandatory`)
    return false
  }
}

// function isDocumentRequired(id: FieldId, value, setError) {
//   if (!!value && value.length >= 0) {
//     setError('')
//     return true
//   } else {
//     setError(`${titleCaseToReadable(id)} document is mandatory`)
//     return false
//   }
// }

function isNumber(val) {
  return true
}
function isString() {}
function isAlphaNumeric(id, val, setError) {
  const alphaNumericRegEx = /^[a-zA-Z0-9'" ,.]+$/
  if (!alphaNumericRegEx.test(val)) {
    setError(`${titleCaseToReadable(id)} can only have alphabets and numbers.`)
    return false
  } else {
    setError('')
    return true
  }
}

function isUpiId() {}

// As for product requirement, method definitions are changed

function isOnlyNumber(val, setError) {
  if (!isInteger(Number(val)) || val === '0') {
    setError('Please enter a valid Input')
    return false
  } else {
    setError('')
    return true
  }
}

function isValidMobileNumber(val, setError) {
  const phoneRegEx = /^[0-9]{10}$/
  if (val?.length !== 10 || !phoneRegEx.test(val)) {
    setError('Please enter a valid mobile number')
    return false
  } else {
    setError('')
    return true
  }
}

function isOnlyAlphaNumeric(val, setError) {
  const alphaNumericRegEx = /^[a-zA-Z0-9'" ,.]+$/
  if (!alphaNumericRegEx.test(val)) {
    setError('Please enter a valid input')
    return false
  } else {
    setError('')
    return true
  }
}
function isGreaterThan(id, secondId, condition, setError) {
  if (!condition) {
    setError(
      `${titleCaseToReadable(id)} should be greater than ${titleCaseToReadable(
        secondId,
      )}`,
    )
    return false
  } else {
    setError('')
    return true
  }
}

type FieldValueValidatorProps = {
  id: FieldId
  value: string | number | boolean
  isDataValid?: boolean
  setError?: (string) => void
} & Partial<formDataValidityProps>

export function isFieldValueValid({
  id,
  value,
  isDataValid,
  setError,
  isFormValid,
  setIsFormValid,
}: FieldValueValidatorProps) {
  // const PICKER= FieldId.PURCHASE_TYPE || FieldId.REPO_BANK_NAME

  log(`validation logger`, {id, value, isDataValid, isFormValid})
  switch (id) {
    case FieldId.REGISTRATION_NUMBER:
      const isField0Valid =
        isMandatory(id, value, setError) && isSpaceless(value, setError)
      setIsFormValid([...isFormValid, isField0Valid])
      return isField0Valid //FIXME: remove !!value condition from return statements, if the requirement occurs for the error warning on empty input box for isMandatory check
    case FieldId.PURCHASE_TYPE:
      const isField1Valid = isMandatory(id, value, setError)
      setIsFormValid([...isFormValid, isField1Valid])
      return isField1Valid
    case FieldId.REPO_BANK_NAME:
      const isField2Valid = isMandatory(id, value, setError)
      setIsFormValid([...isFormValid, isField2Valid])
      return isField2Valid
    case FieldId.VEHICLE_MAKE:
      const isField3Valid = isMandatory(id, value, setError)
      setIsFormValid([...isFormValid, isField3Valid])
      return isField3Valid
    case FieldId.VEHICLE_MODEL:
      const isField4Valid = isMandatory(id, value, setError)
      setIsFormValid([...isFormValid, isField4Valid])
      return isField4Valid
    case FieldId.MANUFACTURING_YEAR:
      const isField5Valid = isMandatory(id, value, setError)
      setIsFormValid([...isFormValid, isField5Valid])
      return isField5Valid
    case FieldId.CHASSIS_NUMBER:
      const isField6Valid =
        !!value &&
        isSpaceless(value, setError) &&
        isFieldLengthMin(id, 3, value, setError)
      setIsFormValid([...isFormValid, isField6Valid])
      return isField6Valid
    case FieldId.ENGINE_NUMBER:
      const isField7Valid =
        !!value &&
        isSpaceless(value, setError) &&
        isFieldLengthMin(id, 5, value, setError)
      setIsFormValid([...isFormValid, isField7Valid])
      return isField7Valid
    case FieldId.OWNERSHIP_TYPE:
      const isField8Valid = isMandatory(id, value, setError)
      setIsFormValid([...isFormValid, isField8Valid])
      return isField8Valid
    case FieldId.RTO_VERIFICATION_PROOF:
      const isField9Valid = isMandatory(id, value, setError)
      setIsFormValid([...isFormValid, isField9Valid])
      return isField9Valid
    case FieldId.HYPOTHECATION_PROOF:
      const isField10Valid = isMandatory(id, value, setError)
      setIsFormValid([...isFormValid, isField10Valid])
      return isField10Valid
    case FieldId.HSRP_PROOF:
      const isField11Valid = isMandatory(id, value, setError)
      setIsFormValid([...isFormValid, isField11Valid])
      return isField11Valid
    case FieldId.CHALLAN_PROOF:
      const isField12Valid = isMandatory(id, value, setError)
      setIsFormValid([...isFormValid, isField12Valid])
      return isField12Valid
    case FieldId.APPROVAL_MAIL:
      const isField13Valid = isMandatory(id, value, setError)
      setIsFormValid([...isFormValid, isField13Valid])
      return isField13Valid
    case FieldId.REMARKS:
      const isField14Valid = !!value && isFieldLengthMin(id, 3, value, setError)
      setIsFormValid([...isFormValid, isField14Valid])
      return isField14Valid
    case FieldId.AUCTION_AGENCY_NAME:
      const isField15Valid = !!value && isFieldLengthMin(id, 3, value, setError)
      setIsFormValid([...isFormValid, isField15Valid])
      return isField15Valid
    case FieldId.AUCTION_SPOC_NUMBER:
      const isField16Valid = isMobileNumber(id, value, setError)
      setIsFormValid([...isFormValid, isField16Valid])
      return isField16Valid
    case FieldId.INSURER_NAME:
      const isField17Valid = isMandatory(id, value, setError)
      setIsFormValid([...isFormValid, isField17Valid])
      return isField17Valid
    case FieldId.INSURANCE_TYPE:
      const isField18Valid = isMandatory(id, value, setError)
      setIsFormValid([...isFormValid, isField18Valid])
      return isField18Valid
    // case FieldId.DEMANDED_AMOUNT:
    //   const isField19Valid =
    //     isMandatory(id, value, setError) && isSpaceless(value, setError)
    //   setIsFormValid([...isFormValid, isField19Valid])
    //   return isField19Valid
    // case FieldId.DEALER_MOBILE:
    //   const isField20Valid = isMobileNumber(id, value, setError)
    //   return isField20Valid
    // As per product requirement:
    case FieldId.HOURS_METER:
      return value && isOnlyNumber(value, setError)
    case FieldId.DEMANDED_AMOUNT:
      return value && isOnlyNumber(value, setError)
    case FieldId.DELIVERY_EXPENSES_PAYMENT_PROOF:
      const isField21Valid = isMandatory(id, value, setError)
      return isField21Valid
    case FieldId.DEALER_MOBILE:
      return value && isValidMobileNumber(value, setError)
    case FieldId.DEALER_NAME:
      return value && isOnlyAlphaNumeric(value, setError)
    case FieldId.SELLING_PRICE:
      return (
        value &&
        isGreaterThan(id, FieldId.PROCUREMENT_COST, isDataValid, setError)
      )
    case FieldId.LISTING_PRICE:
      return (
        value && isGreaterThan(id, FieldId.SELLING_PRICE, isDataValid, setError)
      )
    case FieldId.DEAL_TOKEN_AMOUNT:
      return value && isValueEqual(id, isDataValid, setError)
    case FieldId.HOLD_BACK_AMOUNT:
      return value && isValueEqual(id, isDataValid, setError)
    case FieldId.LOAN_AMOUNT:
      return value && isValueEqual(id, isDataValid, setError)
    case FieldId.DEAL_PAYMENT_AMOUNT:
      return value && isValueEqual(id, isDataValid, setError)
    case FieldId.DEAL_DELIVERY_AMOUNT:
      return value && isValueEqual(id, isDataValid, setError)
    case FieldId.IFSC_CODE:
      return value && isValueEqual(id, isDataValid, setError)
    case FieldId.DELIVERY_EXPENSES_PAYMENT_RECEIPTS:
      return value && isValueEqual(id, isDataValid, setError)
    case FieldId.SALE_AMOUNT:
      return (
        value && isGreaterThan(id, FieldId.LISTING_PRICE, isDataValid, setError)
      )
    case FieldId.BOOKING_DELIVERY_AMOUNT:
      return value && isValueEqual(id, isDataValid, setError)
    case FieldId.MOBILE_NUMBER:
      return value && isValidMobileNumber(value, setError)
    default:
      break
  }
}
