export function isRequiredField(value: string, isRequired: boolean) {
  // Show error if value is empty and is required
  if (isRequired && value?.length <= 0) {
    return false
  }
  return true
}

export function isValueValidation(value: string, checkValidation: boolean) {
  if (checkValidation !== undefined && !!value && !checkValidation) {
    return false
  }
  return true
}
export function checkMaxLengthField(value: string, maxCharLength: number) {
  if (maxCharLength && !!value && value?.length > maxCharLength) {
    return false
  }
  return true
}
export function checkMinLengthField(minCharLength: number, value: string) {
  if (minCharLength && !!value && value?.length < minCharLength) {
    return false
  }
  return true
}
