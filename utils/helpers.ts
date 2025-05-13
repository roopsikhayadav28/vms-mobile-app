import {format, formatDistanceToNow} from 'date-fns'
import {cloneDeep} from 'lodash'
import omitDeep from 'omit-deep-lodash'
import {IconName} from '../components/basic/Icon'
import {INSURANCE_CHARGES, RTO_CHARGES} from '../constants/constants'
import {
  BankName,
  BookingType,
  CustomerId,
  ExpenseCategory,
  ImageStage,
  InsuranceType,
  InsurerName,
  LeadSource,
  LeadStatus,
  LoanRejectionReason,
  LoanStatus,
  LoanToBeClosedBy,
  Ownership,
  PaymentMethod,
  PaymentStatus,
  PaymentType,
  PointRef,
  RefurbishmentStatus,
  SparePart,
  UserRole,
  VehicleMake,
  VehicleModel,
} from '../generated/hooks_and_more'

export function log(message: string, obj?: Object) {
  const jsonString = JSON.stringify(obj, null, 2)

  if (__DEV__) {
    console.log(`\n${message}: ${obj ? jsonString : obj}`)
  } else {
    //captureMessage(message, { jsonString });
  }
}

export function getFileName(url: string) {
  if (!url) {
    return {
      onlyFileName: undefined,
      fileNameWithExtension: undefined,
    }
  }
  const fileNameWithExtension = url
    .split('/')
    .pop()!
    .split('#')[0]
    .split('?')[0]
  const onlyFileName = fileNameWithExtension.replace(/\.[^/.]+$/, '')
  return {
    onlyFileName,
    fileNameWithExtension,
  }
}
const upperCaseFirstLetter = (s: string) =>
  `${s.slice(0, 1).toUpperCase()}${s.slice(1)}`

export const toCamelCase = (s: string) => {
  let str = `${s.slice(0, 1).toLowerCase()}${s.slice(1)}`
  return str.replace(/\s/g, '')
}

export function titleCaseToReadable(str: string) {
  if (!str) return ''
  return str
    .split('_')
    .map(w => upperCaseFirstLetter(w.toLowerCase()))
    .join(' ')
    .trim()
}

export function enumToItems(
  e:
    | typeof LeadSource
    | typeof VehicleMake
    | typeof VehicleModel
    | typeof ExpenseCategory
    | typeof InsuranceType
    | typeof PaymentMethod
    | typeof BankName
    | typeof InsurerName
    | typeof ImageStage
    | typeof UserRole
    | typeof Ownership
    | typeof PaymentType
    | typeof LoanToBeClosedBy
    | typeof SparePart
    | typeof BookingType
    | typeof CustomerId
    | typeof LoanRejectionReason,
) {
  return Object.values(e).map(i => ({
    label: titleCaseToReadable(i),
    value: i,
  }))
}

export function fromNow(time: Date) {
  return formatDistanceToNow(time)
}

const last1 = [
  'approve',
  'initiate',
  'propose',
  'complete',
  'generate',
  'update',
]

function replaceCharByD(str: string, just1?: boolean) {
  if (str === 'sent') return 'send'
  if (str === 'lost' || str === 'won' || str === 'archive') return str

  const val = str.slice(0, just1 ? str.length - 1 : str.length - 2)

  return val
}

export function getButtonText(status: LeadStatus) {
  const just1 = last1.some(w => status.toLowerCase().includes(w))
  log('just1?', just1)
  return upperCaseFirstLetter(
    replaceCharByD(status.split('_').reverse()[0].toLowerCase(), just1),
  )
}

export function removeDuplicates(arr) {
  var unique = arr.reduce(function (acc, curr) {
    if (!acc.includes(curr)) acc.push(curr)
    return acc
  }, [])
  return unique
}

export function getRegionForCoordinates(points: PointRef[] = []) {
  // points should be an array of { latitude: X, longitude: Y }
  if (points.length <= 0) {
    return {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 180,
      longitudeDelta: 360,
    }
  }

  let minX = 0,
    maxX = 0,
    minY = 0,
    maxY = 0

  // init first point
  ;(point => {
    minX = point.latitude
    maxX = point.latitude
    minY = point.longitude
    maxY = point.longitude
  })(points[0])

  // calculate rect
  points.map(point => {
    minX = Math.min(minX, point.latitude)
    maxX = Math.max(maxX, point.latitude)
    minY = Math.min(minY, point.longitude)
    maxY = Math.max(maxY, point.longitude)
  })

  const midX = (minX + maxX) / 2
  const midY = (minY + maxY) / 2
  const deltaX = maxX - minX
  const deltaY = maxY - minY

  return {
    latitude: midX,
    longitude: midY,
    latitudeDelta: deltaX,
    longitudeDelta: deltaY,
  }
}

export function getRandomColor() {
  const randomColor = Math.floor(Math.random() * 16777215)?.toString(16)
  log('Random color', randomColor)
  return `#${randomColor}`
}

export function getUserInitials(username: string): string {
  return (
    username
      ?.match(/(\b\S)?/g)
      ?.join('')
      ?.match(/(^\S|\S$)?/g)
      ?.join('')
      ?.toUpperCase() ?? 'TJ'
  )
}

export function camelCaseToReadable(str) {
  if (!str) return ''
  var output = ''
  var len = str.length
  var char

  for (var i = 0; i < len; i++) {
    char = str.charAt(i)

    if (i == 0) {
      output += char.toUpperCase()
    } else if (char !== char.toLowerCase() && char === char.toUpperCase()) {
      output += ' ' + char
    } else if (char == '-' || char == '_') {
      output += ' '
    } else {
      output += char
    }
  }

  return output
}

export function stripFields(inputObject: object, fields: string[]) {
  log('strip field function called', fields)
  const clonedObject = cloneDeep(inputObject)
  const strippedObject = omitDeep(clonedObject, fields)
  // log('stripped object', strippedObject)
  // log('clonedObject object', clonedObject)
  return strippedObject
}
export function calculateParkingCharge({
  expectedPickupDate,
  repossessionDate,
  perDayParkingCharge,
}: {
  expectedPickupDate: Date
  repossessionDate: Date
  perDayParkingCharge: number
}) {
  // log('inputs to calculate parking charge', {
  //   expectedPickupDate,
  //   repossessionDate,
  //   perDayParkingCharge,
  // })
  const expectedPickup = new Date(expectedPickupDate)
  const expectedRepossession = new Date(repossessionDate)
  // console.log('here is dates', expectedPickup, expectedRepossession)
  let estimatedTotalinTime =
    expectedPickup.getTime() - expectedRepossession.getTime()
  let estimatedTotalDays = estimatedTotalinTime / (1000 * 3600 * 24)
  // log('days', Math.floor(estimatedTotalDays))
  console.log('Number of Days', estimatedTotalDays)
  let estimatedTotal = perDayParkingCharge * Math.floor(estimatedTotalDays)

  // NOTE: if the estimated total is NaN, return 0 otherwise return the estimated total
  // This will make sure that the estimated total is not showing NaN in the UI
  return isNaN(estimatedTotal + perDayParkingCharge)
    ? 0
    : estimatedTotal + perDayParkingCharge
}

export function getCoordinatesFromUrl(url: string) {
  const regExp = new RegExp('@(-?[d.]*)')
  if (!regExp.test(url) || !url?.startsWith('http')) {
    return {
      latitude: null,
      longitude: null,
    }
  }
  const coordIndex = url?.match(regExp)?.index
  const coordinates = url?.slice(coordIndex)?.split(',')?.slice(0, 2)
  const latitude = Number(coordinates?.[0]?.slice(1))
  const longitude = Number(coordinates?.[1])
  log('coords from url', {latitude, longitude})
  return {latitude, longitude}
}

export const validDateFormate = (date: string) => {
  if (date) {
    return format(Date.parse(date), 'dd MMM yyyy')
  }

  return ''
}

export const getDayMonth = (date: string) => {
  if (date) {
    return format(Date.parse(date), 'dd MMM')
  }

  return ''
}

export function compareDate(d1: string, d2: string) {
  const date1 = new Date(d1).setHours(0, 0, 0, 0)
  const date2 = new Date(d2).setHours(0, 0, 0, 0)
  return date1 >= date2
}

export function getExpenses(expenses) {
  return (
    !!expenses &&
    expenses
      ?.filter(e => e.paymentStatus !== PaymentStatus?.Rejected)
      ?.reduce((acc, {spentAmount}) => {
        return acc + spentAmount
      }, 0)
  )
}

export function getParameterizedImageUrl(
  url: string,
  {width, height}: {width: number; height: number},
) {
  // console.log('inside url:' + url)
  if (url && url.includes('https://vms-assets.tractorjunction.in/')) {
    return url + `?width=${width}&height=${height}&format=jpeg`
  }
  return url
}

export function isEmptyObject(obj: object): boolean {
  return Object.keys(obj).length === 0
}

export function getRolesArray(arr: UserRole[]) {
  return arr
}

export function getBalanceAmountForBooking(
  payments,
  saleAmount: number,
  isRCRequired: boolean,
  isInsuranceRequired: boolean,
  isLoanRequired: boolean,
  appliedLoanAmount: number,
  sanctionedLoanAmount: number,
) {
  const sumOfApprovedPayments: number = payments
    ?.filter(item => item?.status === PaymentStatus.Approved)
    ?.reduce((acc: number, item) => acc + item?.amount, 0)
  // console.log('this is thesum of approved payments', sumOfApprovedPayments)

  const totalSaleAmount: number =
    saleAmount +
    (isRCRequired ? RTO_CHARGES : 0) +
    (isInsuranceRequired ? INSURANCE_CHARGES : 0)

  // amount should be approved loan amount
  // const totalLoanAmount = !!sanctionedLoanAmount
  //   ? sanctionedLoanAmount
  //   : appliedLoanAmount ?? 0
  // console.log('This is the totalLoanAmount', totalLoanAmount)
  return totalSaleAmount - sumOfApprovedPayments
}

// Get Icon for Statuses in LeadDetail Screen Collapsible Cards

export const getIconNameForStatus = (
  status: RefurbishmentStatus | LoanStatus | PaymentStatus,
): IconName => {
  let iconName: IconName

  switch (status) {
    case RefurbishmentStatus.Requested:
    case LoanStatus.Requested:
    case PaymentStatus.Requested:
    case PaymentStatus.Estimated:
      iconName = 'error'
      break
    case RefurbishmentStatus.Approved:
    case LoanStatus.Approved:
    case PaymentStatus.Done:
    case PaymentStatus.Approved:
      iconName = 'check-circle'
      break
    case RefurbishmentStatus.Rejected:
    case LoanStatus.Rejected:
    case PaymentStatus.Failed:
    case PaymentStatus.Rejected:
      iconName = 'cancel'
      break
  }

  return iconName
}

export const getIconColorForStatus = (
  status: RefurbishmentStatus | LoanStatus | PaymentStatus,
): string => {
  let iconColor: string = ''

  switch (status) {
    case RefurbishmentStatus.Requested:
    case LoanStatus.Requested:
    case PaymentStatus.Requested:
    case PaymentStatus.Estimated:
      iconColor = '#FFA500'
      break
    case RefurbishmentStatus.Approved:
    case LoanStatus.Approved:
    case PaymentStatus.Done:
    case PaymentStatus.Approved:
      iconColor = '#00AA00'
      break
    case RefurbishmentStatus.Rejected:
    case LoanStatus.Rejected:
    case PaymentStatus.Failed:
    case PaymentStatus.Rejected:
      iconColor = '#FF0000'
      break
  }

  return iconColor
}

export function containsSameProductNames(arr) {
  if (!arr && arr?.length <= 0) return false // If the array is empty, return false

  const nameSet = new Set() // Create a Set to store unique product names

  for (let i = 0; i < arr?.length; i++) {
    const item = arr[i]
    const productName = item?.product?.name

    if (nameSet.has(productName)) {
      return true // Found a duplicate product name, return true
    }

    nameSet.add(productName) // Add the product name to the set
  }

  return false // No duplicate product names found, return false
}

// Check if the value is a valid number or not based upon that return value or 0
export function getValidNumber(value: string): number {
  if (value && !isNaN(Number(value))) {
    return Number(value)
  }

  return 0
}

export const compareDates = (d1, d2) => {
  let date1 = new Date(d1).getTime()
  let date2 = new Date(d2).getTime()

  if (date1 < date2) {
    console.log(`${d1} is less than ${d2}`)
    return false
  } else if (date1 > date2) {
    console.log(`${d1} is greater than ${d2}`)
    return true
  } else {
    console.log(`Both dates are equal`)
    return true
  }
}
