import {Item} from '../components/basic/PickerSelectButton'

export const DEFAULT_TRACTOR_IMAGE =
  'https://assets.tractorjunction.com/tractor-junction/assets/images/images/default-image.jpg'

export const POPUP_BID_AMOUNT_LIMIT = '_Lead.bidAmountLimit_'
export const POPUP_FINAL_BID_AMOUNT = '_Lead.finalBidAmount_'
export const POPUP_DEAL_DEMANDED_AMOUNT = '_Lead.demandedAmount_'
export const POPUP_DEAL_PROPOSED_AMOUNT = '_Lead.proposedDealAmount_'
export const POPUP_REG_NO = '_Lead.regNo_'
export const POPUP_DRIVER_NAME = '_Lead.driver_'
export const POPUP_DELIVERY_EXPENSE = '_Lead.DeliveryExpense_'
export const POPUP_UPDATE_LEAD_HEADER = 'Update Lead'
export const POPUP_UPDATE_LEAD_DESCRIPTION = 'Do you want to Update lead?'
export const POPUP_CREATE_LEAD_HEADER = 'Fresh Lead'
export const POPUP_CREATE_LEAD_DESCRIPTION = 'Do you want to create new lead?'
export const POPUP_DUPLICATE_CREATE_LEAD_HEADER = 'Create Lead Access Denied'
export const POPUP_DUPLICATE_CREATE_LEAD_DESCRIPTION =
  'already exists in the system'
export const POPUP_HOLD_BACK_AMOUNT = '_Lead.holdBackAmount_'
export const POPUP_LEAD_SELLING_PRICE = '_Lead.sellingPrice_'
export const POPUP_LEAD_LISTING_PRICE = '_Lead.listingPrice_'
//Validation related constant
export const ENTER_VALID_STRING = 'ENTER VALID STRING'
export const YARD_NAME_ALREADY_EXIST = 'YARD NAME ALREADY EXISTS'
export const INVALID_DEAL_AMOUNT = `INVALID DEAL AMOUNT`
export const INVALID_PARKING_AMOUNT = `INVALID PARKING AMOUNT`
export const INVALID_DELIVERY_EXPENSE_AMOUNT = `INVALID DELIVERY EXPENSE AMOUNT`
export const THIS_IS_REQUIRED_FIELD = 'THIS IS REQUIRED FIELD'
export const SPACE_NOT_ALLOWED = 'PLEASE REMOVE EMPTY SPACE FROM THE VALUE'
export const ONLY_NUMBER_AND_CAPITAL_LETTER_ALLOWED =
  'ONLY NUMBER AND CAPITAL LETTER ALLOWED'
export const IFSC_CODE_MUST_HAVE_11_DIGIT = 'IFSC code must have 11 digits'
export const PLEASE_ENTER_VALID_PHONE_NUMBER = 'PLEASE ENTER VALID PHONE NUMBER'
export const PLEASE_ENTER_VALID_NUMBER = 'PLEASE ENTER VALID NUMBER'
export const ENTER_VALID_UPI_ID = 'ENTER VALID UPI ID'
export const ENTER_VALID_LOCATION_URL = 'ENTER VALID LOCATION URL'
export const ENTER_VALID_REPOSESSION_DATE =
  'REPOSSESSION DATE MUST BE GREATOR THAN REGISTRATION DATE'
export const ENTER_VALID_FITNESS_VALID_UPTO_DATE =
  'FITNESS VALID UPTO DATE MUST BE GREATOR THAN REGISTRATION DATE'

export const INVALID_BILL_AMOUNT =
  'Bill amount cannot be greater than approved amount'

export const INVALID_LOAN_REPAYMENT_AMOUNT =
  'The amount should be equal to Loan repayment amount'

export const INVALID_FI_DATE = 'Please enter a valid FI date'
export const INVALID_DO_DATE = 'Please enter a valid DO date'

//Refurbishment related
export const APPROVED_REFURBISHMENT_ITEMS_COUNT =
  '_refurbishment.NumberOfApprovedItems_'
export const APPROVED_REFURBISHMENT_ITEM_COST =
  '_refurbishment.TotalCostOfApprovedItems_'
export const REFURBISHMENT_PAYMENT_AMOUNT = '_Lead.refurbishmentPaymentAmount_'

//Dealership Payments
export const DEALERSHIP_TOKEN = '_Lead.tokenAmount_'
export const DEALERSHIP_DELIVERY = '_Lead.dealDeliveryPayment_'
export const DEALERSHIP_HOLDBACK = '_Lead.holdbackAmount_'
export const DEALERSHIP_LOAN = '_Lead.loanAmount_'

//Booking
export const BOOKING_TOKEN = '_Lead.bookingTokenAmount_'
export const BOOKING_PART_PAYMENT = '_Lead.bookingPartPaymentAmount_'
export const BOOKING_DELIVERY_PAYMENT = '_Lead.bookingDeliveryPayment_'
export const BOOKING_PRICE = '_Lead.bookingPrice_'
export const TOTAL_SALE_AMOUNT = '_Lead.totalSaleAmount'
export const BOOKING_LOAN_AMOUNT = '_Lead.bookingLoanAmount_'

export const IS_MANDATORY_FIELD = true
export const IS_NOT_MANDATORY_FIELD = false
export const manufacturingYearList: Item[] = [
  {label: '2023', value: '2023'},
  {label: '2022', value: '2022'},
  {label: '2021', value: '2021'},
  {label: '2020', value: '2020'},
  {label: '2019', value: '2019'},
  {label: '2018', value: '2018'},
  {label: '2017', value: '2017'},
  {label: '2016', value: '2016'},
  {label: '2015', value: '2015'},
  {label: '2014', value: '2014'},
  {label: '2013', value: '2013'},
  {label: '2012', value: '2012'},
  {label: '2011', value: '2011'},
  {label: '2010', value: '2010'},
  {label: '2009', value: '2009'},
  {label: '2008', value: '2008'},
  {label: '2007', value: '2007'},
  {label: '2006', value: '2006'},
  {label: '2005', value: '2005'},
  {label: '2004', value: '2004'},
  {label: '2003', value: '2003'},
]

export const stateListIndia = [
  {label: 'Andaman and Nicobar Islands', value: 'Andaman and Nicobar Islands'},
  {label: 'Andhra Pradesh', value: 'Andhra Pradesh'},
  {label: 'Arunachal Pradesh', value: 'Arunachal Pradesh'},
  {label: 'Assam', value: 'Assam'},
  {label: 'Bihar', value: 'Bihar'},
  {label: 'Chandigarh', value: 'Chandigarh'},
  {label: 'Chhattisgarh', value: 'Chhattisgarh'},
  {label: 'Dadra and Nagar Haveli', value: 'Dadra and Nagar Haveli'},
  {label: 'Daman and Diu', value: 'Daman and Diu'},
  {label: 'Delhi', value: 'Delhi'},
  {label: 'Goa', value: 'Goa'},
  {label: 'Gujarat', value: 'Gujarat'},
  {label: 'Haryana', value: 'Haryana'},
  {label: 'Himachal Pradesh', value: 'Himachal Pradesh'},
  {label: 'Jammu and Kashmir', value: 'Jammu and Kashmir'},
  {label: 'Jharkhand', value: 'Jharkhand'},
  {label: 'Karnataka', value: 'Karnataka'},
  {label: 'Kerala', value: 'Kerala'},
  {label: 'Lakshadweep', value: 'Lakshadweep'},
  {label: 'Madhya Pradesh', value: 'Madhya Pradesh'},
  {label: 'Maharashtra', value: 'Maharashtra'},
  {label: 'Manipur', value: 'Manipur'},
  {label: 'Meghalaya', value: 'Meghalaya'},
  {label: 'Mizoram', value: 'Mizoram'},
  {label: 'Nagaland', value: 'Nagaland'},
  {label: 'Odisha', value: 'Odisha'},
  {label: 'Puducherry', value: 'Puducherry'},
  {label: 'Punjab', value: 'Punjab'},
  {label: 'Rajasthan', value: 'Rajasthan'},
  {label: 'Sikkim', value: 'Sikkim'},
  {label: 'Tamil Nadu', value: 'Tamil Nadu'},
  {label: 'Telangana', value: 'Telangana'},
  {label: 'Tripura', value: 'Tripura'},
  {label: 'Uttar Pradesh', value: 'Uttar Pradesh'},
  {label: 'Uttarakhand', value: 'Uttarakhand'},
  {label: 'West Bengal', value: 'West Bengal'},
]

export const UPDATE_LEAD = 'Update Lead'
export const LEAD_UPDATED = 'Lead Updated'

export const MOBILE_NUMBER_LENGTH = 10

export const RTO_CHARGES = 7500
export const INSURANCE_CHARGES = 11000
