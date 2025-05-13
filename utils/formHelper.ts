import {isEmpty, isFinite, isInteger} from 'lodash'
import {log} from './helpers'

/**
 * Checks if the email is valid
 */
export function isEmailValid(email: string): boolean {
  const emailRegEx =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return emailRegEx.test(email.toLowerCase())
}

export function isCheckSpace(str: string) {
  const spaceRegEx = /^(\d|\w)+$/
  return spaceRegEx.test(str)
}

/**
 * Checks if the phone number is valid
 */
export function isPhoneValid(phone: string): boolean {
  //  const phoneRegEx = /^(\+|\d)[0-9]{7,16}$/;
  const phoneRegEx = /^[0-9]{10}$/
  // log('Is phone valid?', phoneRegEx.test(phone))
  return phoneRegEx.test(phone)
}

/**
 * Checks if the string is valid
 */
export function isStringValid(value: string): boolean {
  const stringRegEx = /^[A-Z\s]+$/i
  return stringRegEx.test(value)
}

/**
 * Checks if the date of birth is valid
 * correct format dd/mm/yyyy
 */
export function isDobValid(value: string): boolean {
  const dobRegEx =
    /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
  return dobRegEx.test(value)
}

/**
 * Checks if the string is alphanumeric
 */
export function isAlphaNumericValid(value: string): boolean {
  const alphaNumericRegEx = /^[a-zA-Z0-9'" ,.]+$/
  log(
    'isAlphaNumericValid(value: string): boolean',
    alphaNumericRegEx.test(value),
  )
  return alphaNumericRegEx.test(value)
}

/**
 * Checks if the string is only contains alpha characters with Capital letters
 * e.g for Regestration number and other purposes
 */
export function isAlphaNumericCaptailStringValid(value: string): boolean {
  // log('Reg number', value)
  const alphaOnlyCaptailRegEx = /((^[0-9]+[A-Z]+)|(^[A-Z]+[0-9]+))+[0-9A-Z]/
  const result = alphaOnlyCaptailRegEx.test(value)
  // log('Is string valid?', result)
  return result
}

// export function isAlphaNumericCaptailStringValid(value: string): boolean {
//   log('Reg number', value)
//   const alphaOnlyCaptailRegEx =
//     /^[A-Z]{2}[\\ -]{0, 1}[0-9]{2}[\\ -]{0, 1}[A-Z]{1, 2}[\\ -]{0, 1}[0-9]{4}$/
//   const result = alphaOnlyCaptailRegEx.test(value)
//   log('Is string valid?', result)
//   return result
// }

/**
 * Checks if the pin code is valid
 */
export function isPinValid(value: string): boolean {
  const pinRegEx = /^[0-9]{6}$/
  return pinRegEx.test(value)
}

/**
 * Check if the password is valid the usecases of the password will be
 * uppercase and lowercase letters, numbers and
 * Special characters listed in the next section.
 * = + - ^ $ * . [ ] { } ( ) ? " ! @ # % & / \ , > < ' : ; | _ ~ `
 */
export function isPasswordValid(password: string): boolean {
  var passwordRegEx = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
  return passwordRegEx.test(password)
}
/**
 * check if the string length is valid
 */
export function isLengthValid(value: string, length: number = 1): boolean {
  return value.length >= length
}

/**
 * this function will return any extra spaces
 */
export function removeExtraSpaces(value: string): string {
  return value.replace(/ {1,}/g, ' ')
}

/**
 * Checks if the otp code is valid
 * Format: 6 digit number
 */
export function isOtpValid(value: string): boolean {
  return isFinite(Number(value)) && value.length === 6
}

/**
 * checks if it's integer or not
 */
export function isNumberValid(value: string | number) {
  // if (isEmpty(value)){
  //   return false;
  // }

  return isInteger(Number(value))
}
export function isUpiValid(value: string) {
  var upiRagEx = /^[\w.-]+@[\w.-]+$/
  // console.log('+++++++++++++++++', upiRagEx.test(value))
  return upiRagEx.test(value)
}

export function isValidLocationUrl(value: string) {
  var locationRegEx =
    /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/
  log('check location url*************', locationRegEx.test(value))
  return locationRegEx.test(value)
}
