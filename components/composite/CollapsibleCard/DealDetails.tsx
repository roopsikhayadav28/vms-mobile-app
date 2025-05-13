import {format} from 'date-fns'
import React, {useEffect, useState} from 'react'
import {StyleSheet} from 'react-native'
import CollapsibleCard from '.'
import {
  LeadExpense,
  LeadStatus,
  LeadStatusEventRef,
  Payment,
  PaymentFor,
  PaymentStatus,
} from '../../../generated/hooks_and_more'
import {log, titleCaseToReadable} from '../../../utils/helpers'

type DealDetailsProps = {
  regNo: string
  currentStatus: LeadStatus
  openBottomSheet: () => void
  initialBidAmount: number
  statusEvents: Partial<LeadStatusEventRef>[]
  finalBidAmount: number
  payments: Partial<Payment>[]
  perDayParkingCharge: number
  finalParkingCharges: number
  calculatedParkingCharges: number
  repossessionDate: Date

  expenses: Partial<LeadExpense>[] //TODO: flat the expenses and payments, Ketan is aligned
  setBottomSheetVariant?: React.Dispatch<
    React.SetStateAction<'Payment' | 'DeliveryExpense' | 'PurchaseOrder'>
  >
  setPaymentSheetFor?: React.Dispatch<React.SetStateAction<PaymentFor>>
}

const DealDetails = ({
  regNo,
  currentStatus,
  openBottomSheet,
  finalBidAmount,
  initialBidAmount,
  calculatedParkingCharges,
  statusEvents,
  payments,
  expenses,
  finalParkingCharges,
  perDayParkingCharge,
  repossessionDate,
  setBottomSheetVariant,
  setPaymentSheetFor,
}: DealDetailsProps) => {
  // const [fetchDealDetails, {data: dealDetailsData, loading}] =
  //   useDealDetailsLazyQuery({
  //     fetchPolicy: 'cache-and-network',
  //     variables: {regNo},
  //     // onCompleted(data) {
  //     //   console.log(JSON.stringify(data, null, 2))
  //     // },
  //   })
  const [parkingPaymentToShow, setParkingPaymentToShow] =
    useState<Partial<Payment>>()
  useEffect(() => {
    const parkingPayment = showParkingPaymentDetails(payments)
    setParkingPaymentToShow(parkingPayment)
  }, [payments])
  // const initialBidAmount = dealDetailsData?.getLead?.proposedBidLimitAmount

  // const completedStatusEvents = dealDetailsData?.getLead?.statusEvents

  //  Parking Payment Details to show

  function showParkingPaymentDetails(paymentArr: Partial<Payment>[]) {
    const filteredParkingPayments = paymentArr?.filter(
      payment => payment?.for === PaymentFor.ParkingExpense,
    )
    const approvedParkingDetails = filteredParkingPayments?.find(
      payment => payment?.status === PaymentStatus.Approved,
    )
    const estimatedParkingDetails = filteredParkingPayments
      ?.sort(
        (a, b) =>
          new Date(b?.createdAt).getTime() - new Date(a?.createdAt).getTime(),
      )
      ?.find(payment => payment?.status === PaymentStatus.Estimated)

    log('parking approved', approvedParkingDetails)
    if (!!approvedParkingDetails) {
      return approvedParkingDetails
    } else if (!!estimatedParkingDetails) {
      return estimatedParkingDetails
    } else {
      return null
    }
  }
  //use Current Status

  const latestStatuesEvents = statusEvents?.sort(
    (a, b) =>
      new Date(b?.createdAt).getTime() - new Date(a?.createdAt).getTime(),
  )
  const initialBidDate = statusEvents?.find(
    event => event?.status === LeadStatus.BidAmountLimitProposed,
  )?.createdAt
  // console.log(
  //   'initialBidAmount',
  //   JSON.stringify(dealDetailsData?.getLead, null, 2),
  // )
  // const finalBidAmount = dealDetailsData?.getLead?.finalBidAmount
  //use Current Status
  const dealDate = statusEvents?.find(
    event => event?.status === LeadStatus.BidWon,
  )?.createdAt
  const isDealLost = statusEvents?.find(
    event => event?.status === LeadStatus.BidLost,
  )
  const dealStatus = dealDate ? 'Won' : isDealLost ? 'Loss' : '-'

  const eventStatus: Partial<LeadStatusEventRef> = latestStatuesEvents?.find(
    event =>
      event?.status === LeadStatus?.DealRejected ||
      event?.status === LeadStatus?.DealApproved,
  )

  const bankConfirmationStatus =
    eventStatus?.status === LeadStatus?.DealApproved
      ? 'Approved'
      : eventStatus?.status === LeadStatus?.DealRejected
      ? 'Not Approved'
      : '-'
  //this function takes two arguments: payment and paymentFor of type 'PaymentFor' and returns a sorted array of payment objects. ( last payment first )
  function getSortedPayments(payments, paymentFor: PaymentFor) {
    //filtering the payments based on the paymentFor
    const filteredPayments = payments?.filter(
      payment => payment?.for === paymentFor,
    )
    const sortedDealPayments = filteredPayments?.sort(
      (a, b) =>
        new Date(b?.createdAt).getTime() - new Date(a?.createdAt).getTime(),
    )
    return sortedDealPayments
  }
  //use Current Status
  // const bankConfirmationDate = latestStatuesEvents?.find(
  //   event => event?.status === LeadStatus.DealApproved,
  // )?.createdAt

  //use Current Status
  // const isBankRejected = statusEvents?.find(
  //   event => event?.status === LeadStatus.DealRejected,
  // )
  //   const bankConfirmation: string = isBankRejected
  //   ? 'Not Approved'
  //   : bankConfirmationDate
  //   ? 'Approved'
  //   : '-'
  // Deal Payment //TODO fix the mutation for the forms adding payment on it
  // const dealPayments = payments?.filter(
  //   payment => payment?.for === PaymentFor.DealPayment,
  // )

  //DEAL PAYMENTS

  //getting all Deal Payments in sorted order - last to first
  const sortedDealPayments = getSortedPayments(payments, PaymentFor.DealPayment)
  const dealPaymentStatus = sortedDealPayments?.[0]?.status

  // Getting the last payment with status = 'DONE'
  const paymentDoneData = sortedDealPayments?.find(
    payment => payment?.status === PaymentStatus.Done,
  )

  const dealPaymentDate = paymentDoneData?.createdAt
  const dealPaymentMode = paymentDoneData?.mode
  const dealPaymentProof = paymentDoneData?.receiptUrl

  // Getting the last payment with status = 'REQUESTED'
  const paymentRequestedData = sortedDealPayments?.find(
    payment => payment?.status === PaymentStatus.Requested,
  )

  const dealBankName = paymentRequestedData?.bankName
  const dealAccountHolderName = paymentRequestedData?.accountHolderName
  const dealAccountNumber = paymentRequestedData?.accountNo
  const dealAccountIfsc = paymentRequestedData?.ifsc
  const dealAccountProof = paymentRequestedData?.proofUrl

  //PARKING PAYMENTS

  // const parkingPayments = payments?.filter(
  //   payment => payment?.for === PaymentFor.ParkingExpense,
  // )
  // const sortedParkingPayments = parkingPayments?.sort(
  //   (a, b) =>
  //     new Date(b?.createdAt).getTime() - new Date(a?.createdAt).getTime(),
  // )

  // Getting all parking payments in sorted order - last to first
  const sortedParkingPayments = getSortedPayments(
    payments,
    PaymentFor.ParkingExpense,
  )

  const parkingPaymentStatus = sortedParkingPayments?.[0]?.status
  const approvedPerDayParkingCharges = perDayParkingCharge

  const parkingPaymentRequestedData = sortedParkingPayments?.find(
    payment => payment?.status === PaymentStatus.Requested,
  )
  // const parkingPaymentAccountHolderName =
  //   dealDetailsData?.getLead?.parkingBeneficiary?.accountHolderName
  // const parkingPaymentAccountNumber =
  //   dealDetailsData?.getLead?.parkingBeneficiary?.accountNumber
  // const parkingPaymentIfsc =
  //   dealDetailsData?.getLead?.parkingBeneficiary?.ifscCode
  // const parkingPaymentBankName =
  //   dealDetailsData?.getLead?.parkingBeneficiary?.bankName
  // const parkingPaymentAccountProof = parkingPaymentToShow?.proofUrl
  //Calculate Parking charges
  // const expectedPickupDate = dealDetailsData?.getLead?.expectedPickupDate
  // const perDayParkingCharge =
  //   dealDetailsData?.getLead?.yard?.perDayParkingCharge
  // const repossessionDate = dealDetailsData?.getLead?.vehicle?.repossessionDate

  // const calculatedParkingCharges =
  //   expectedPickupDate &&
  //   perDayParkingCharge &&
  //   repossessionDate &&
  //   calculateParkingCharge({
  //     expectedPickupDate,
  //     perDayParkingCharge,
  //     repossessionDate,
  //   })
  // log('calculated Parking charge', calculatedParkingCharges)

  function isStatusEstimated(payments) {
    return payments?.some(
      i =>
        i?.status === PaymentStatus.Estimated &&
        i?.for === PaymentFor.ParkingExpense,
    )
  }

  const approvedParkingCharges = finalParkingCharges
  //FIXME have to check this value
  // const parkingUpiID = parkingPaymentToShow?.upiId
  function getPaymentDetails() {
    const paymentDetails =
      payments?.find(
        payment =>
          payment?.status === PaymentStatus.Approved &&
          payment?.for === PaymentFor.ParkingExpense,
      ) ??
      payments?.find(
        payment =>
          payment?.status === PaymentStatus.Estimated &&
          payment?.for === PaymentFor.ParkingExpense,
      )
    return {
      upiId: paymentDetails?.upiId,
      accountHolderName: paymentDetails?.parkingBeneficiary?.accountHolderName,
      accountNumber: paymentDetails?.parkingBeneficiary?.accountNumber,
      ifscCode: paymentDetails?.parkingBeneficiary?.ifscCode,
      proofUrl: !!paymentDetails?.upiId
        ? paymentDetails?.proofUrl
        : paymentDetails?.parkingBeneficiary?.proofUrl,
      bankName: paymentDetails?.parkingBeneficiary?.bankName,
    }
  }
  const {
    upiId,
    accountHolderName,
    accountNumber,
    ifscCode,
    proofUrl,
    bankName,
  } = getPaymentDetails()
  /* const parkingUpiID =
    payments?.find(
      i =>
        i?.status === PaymentStatus.Approved &&
        i?.for === PaymentFor.ParkingExpense,
    )?.parkingBeneficiary?.upiId ??
    (isStatusEstimated(payments) &&
      payments[payments?.length - 1]?.parkingBeneficiary?.upiId)

  const parkingAccountProof =
    payments?.find(
      i =>
        i?.status === PaymentStatus.Approved &&
        i?.for === PaymentFor.ParkingExpense,
    )?.parkingBeneficiary?.proofUrl ??
    (isStatusEstimated(payments) &&
      payments[payments?.length - 1]?.parkingBeneficiary?.proofUrl)
  const parkingPaymentAccountHolderName =
    payments?.find(
      i =>
        i?.status === PaymentStatus.Approved &&
        i?.for === PaymentFor.ParkingExpense,
    )?.parkingBeneficiary?.accountHolderName ??
    (isStatusEstimated(payments) &&
      payments[payments?.length - 1]?.parkingBeneficiary?.accountHolderName)

  const parkingPaymentAccountNumber =
    payments?.find(
      i =>
        i?.status === PaymentStatus.Approved &&
        i?.for === PaymentFor.ParkingExpense,
    )?.parkingBeneficiary?.accountNumber ??
    (isStatusEstimated(payments) &&
      payments[payments?.length - 1]?.parkingBeneficiary?.accountNumber)

  const parkingPaymentBankName =
    payments?.find(
      i =>
        i?.status === PaymentStatus.Approved &&
        i?.for === PaymentFor.ParkingExpense,
    )?.parkingBeneficiary?.bankName ??
    (isStatusEstimated(payments) &&
      payments[payments?.length - 1]?.parkingBeneficiary?.bankName)

  //this isome level down
  const parkingPaymentIfsc =
    payments?.find(
      i =>
        i?.status === PaymentStatus.Approved &&
        i?.for === PaymentFor.ParkingExpense,
    )?.parkingBeneficiary?.ifscCode ??
    (isStatusEstimated(payments) &&
      payments[payments?.length - 1]?.parkingBeneficiary?.ifscCode) */

  // Actual parking payment details of doing Payment by Finance
  const parkingPaymentDoneData = sortedParkingPayments?.find(
    payment =>
      payment?.status === PaymentStatus.Done &&
      payment?.for === PaymentFor.ParkingExpense,
  )
  const parkingPaymentDate = parkingPaymentDoneData?.createdAt
  const parkingPaymentMode = parkingPaymentDoneData?.mode
  const parkingPaymentProof = parkingPaymentDoneData?.receiptUrl

  //EXPENSES PAYMENT
  const sortedDeliveryExpensePayments = getSortedPayments(
    payments,
    PaymentFor.DeliveryExpense,
  )
  const deliveryPaymentStatus = sortedDeliveryExpensePayments?.[0]?.status
  const deliveryExpenseStatus =
    !!expenses &&
    expenses?.filter(s => s?.paymentStatus !== PaymentStatus.Rejected)?.[0]
      ?.paymentStatus
  //TODO: Modularize this function
  const expensesAmount =
    !!expenses &&
    expenses
      ?.filter(e => e.paymentStatus !== PaymentStatus?.Rejected)
      ?.reduce((acc, {spentAmount}) => {
        return acc + spentAmount
      }, 0)
  const expensesRequestDate = expenses?.[0]?.createdAt
  const expensePaymentProof = sortedDeliveryExpensePayments?.find(
    payment =>
      payment.for === PaymentFor.DeliveryExpense &&
      payment.status === PaymentStatus.Done,
  )?.receiptUrl

  const dealDetails: {
    key: string
    value: string | number
    isHiddenForSomeRole?: boolean
    isDoc?: boolean
    isActionSheet?: boolean
    paytype?: PaymentFor
    actionSheetVariant?: 'Payment' | 'DeliveryExpense' | 'PurchaseOrder'
  }[] = [
    {
      key: 'Deal Status',
      value: !!dealStatus ? dealStatus : '-',
      isHiddenForSomeRole: true,
    },
    {
      key: 'Initial Bid Amount',
      value: initialBidAmount ?? '-',
      isHiddenForSomeRole: true,
    },
    {
      key: 'Initial Bid Date',
      value: !!initialBidDate
        ? format(Date.parse(initialBidDate), 'dd MMM yyyy')
        : '-',
      isHiddenForSomeRole: true,
    },
    {
      key: 'Final Bid Amount',
      value: finalBidAmount ?? '-',
      isHiddenForSomeRole: true,
    },
    {
      key: 'Deal Date',
      value: !!dealDate ? format(Date.parse(dealDate), 'dd MMM yyyy') : '-',
      isHiddenForSomeRole: true,
    },
    {
      key: 'Bank Confirmation',
      value: bankConfirmationStatus ?? '-', //!!bankConfirmation ? bankConfirmation : '-',
      isHiddenForSomeRole: true,
    },
    {
      key: 'Deal Payment Status',
      value: !!dealPaymentStatus ? titleCaseToReadable(dealPaymentStatus) : '-',
      isHiddenForSomeRole: true,
    },
    {
      key: 'Payment Date',
      value: !!dealPaymentDate
        ? format(Date.parse(dealPaymentDate), 'dd MMM yyyy')
        : '-',
      isHiddenForSomeRole: true,
    },
    {
      key: 'Payment Mode',
      value: !!dealPaymentMode ? titleCaseToReadable(dealPaymentMode) : '-',
      isHiddenForSomeRole: true,
    },
    {
      key: 'Deal Payment Confirmation',
      value: dealPaymentProof ?? '',
      isHiddenForSomeRole: true,
      isDoc: true,
    },
    {
      key: 'Bank Name',
      value: !!dealBankName ? titleCaseToReadable(dealBankName) : '-',
      isHiddenForSomeRole: true,
    },
    {
      key: 'Account Holder Name',
      value: dealAccountHolderName ?? '-',
      isHiddenForSomeRole: true,
    },
    {
      key: 'Account Number',
      value: dealAccountNumber ?? '-',
      isHiddenForSomeRole: true,
    },
    {
      key: 'Account IFSC code',
      value: dealAccountIfsc ?? '-',
      isHiddenForSomeRole: true,
    },
    {
      key: 'Account Proof',
      value: dealAccountProof ?? '',
      isDoc: true,
      isHiddenForSomeRole: true,
    },
    {
      key: 'Parking Payment Status',
      value: !!parkingPaymentStatus
        ? titleCaseToReadable(parkingPaymentStatus)
        : '-',
    },
    {
      key: 'Parking Charges/ day',
      value: approvedPerDayParkingCharges ?? '-',
    },
    {
      key: 'Calculated Parking Charges',
      value: calculatedParkingCharges ?? '-',
    },
    {
      key: 'Approved parking Charges',
      value: approvedParkingCharges ?? '-',
    },
    {
      key: 'Parking Payment UPI ID',
      value: upiId ?? '-',
    },
    {
      key: 'Parking Payment Bank Name',
      value: !!bankName ? titleCaseToReadable(bankName) : '-',
    },
    {
      key: 'Parking Payment Account Holder Name',
      value: accountHolderName ?? '-',
    },
    {
      key: 'Parking Payment Account Number',
      value: accountNumber ?? '-',
    },
    {
      key: 'Parking Payment IFSC Code',
      value: ifscCode ?? '-',
    },

    {
      key: 'Account Proof',
      value: proofUrl ?? '',
      isDoc: true,
    },
    {
      key: 'Parking Payment Date',
      value: !!parkingPaymentDate
        ? format(Date.parse(parkingPaymentDate), 'dd MMM yyyy')
        : '-',
    },
    {
      key: 'Parking Payment mode',
      value: !!parkingPaymentMode
        ? titleCaseToReadable(parkingPaymentMode)
        : '-',
    },
    {
      key: 'Parking Payment Confirmation',
      value: parkingPaymentProof ?? '',
      isDoc: true,
    },
    {
      key: 'Delivery Expense Status',
      value: deliveryExpenseStatus
        ? titleCaseToReadable(deliveryExpenseStatus)
        : '-',
    },
    {
      key: 'Expense Payment Status',
      value: !!deliveryPaymentStatus
        ? titleCaseToReadable(deliveryPaymentStatus)
        : '-',
    },
    {
      key: 'Expenses Amount',
      value: !expensesAmount || expensesAmount === 0 ? '-' : expensesAmount,
    },
    {
      key: 'Expense Request Date',
      value: !!expensesRequestDate
        ? format(Date.parse(expensesRequestDate), 'dd MMM yyyy')
        : '-',
    },
    {
      key: 'Expense Payment Confirmation',
      value: expensePaymentProof ?? '',
      isDoc: true,
    },
    // {
    //   key: 'Deal Token Payment',
    //   value: '',
    //   isActionSheet: true,
    //   paytype: PaymentFor.DealToken,
    //   actionSheetVariant: 'Payment',
    // },
    // {
    //   key: ' Delivery Payment',
    //   value: '',
    //   isActionSheet: true,
    //   paytype: PaymentFor.DealDelivery,
    //   actionSheetVariant: 'Payment',
    // },
    // {
    //   key: 'Holdback  RePayment',
    //   value: '',
    //   isActionSheet: true,
    //   paytype: PaymentFor.HoldbackRepayment,
    //   actionSheetVariant: 'Payment',
    // },
    // {
    //   key: 'Loan Payment',
    //   value: '',
    //   isActionSheet: true,
    //   paytype: PaymentFor.LoanRepayment,
    //   actionSheetVariant: 'Payment',
    // },
    // {
    //   key: 'Delivery Expense',
    //   value: '',
    //   isActionSheet: true,
    //   paytype: PaymentFor.DeliveryExpense,
    //   actionSheetVariant: 'DeliveryExpense',
    // },
  ]

  return (
    <CollapsibleCard
      title="Deal Details"
      isDealDetailsData={dealDetails}
      openBottomSheet={openBottomSheet}
      setPaymentSheetFor={setPaymentSheetFor}
      setBottomSheetVariant={setBottomSheetVariant}
    />
  )
}

export default DealDetails

const styles = StyleSheet.create({})
