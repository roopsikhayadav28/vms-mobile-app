import React, {useState} from 'react'
import {StyleSheet} from 'react-native'
import {ActivityIndicator, Modal, Portal} from 'react-native-paper'
import Colors from '../../constants/Colors'
import Layout from '../../constants/Layout'
import {
  APPROVED_REFURBISHMENT_ITEMS_COUNT,
  APPROVED_REFURBISHMENT_ITEM_COST,
  BOOKING_DELIVERY_PAYMENT,
  BOOKING_LOAN_AMOUNT,
  BOOKING_PART_PAYMENT,
  BOOKING_PRICE,
  BOOKING_TOKEN,
  INSURANCE_CHARGES,
  POPUP_BID_AMOUNT_LIMIT,
  POPUP_DEAL_DEMANDED_AMOUNT,
  POPUP_DEAL_PROPOSED_AMOUNT,
  POPUP_DELIVERY_EXPENSE,
  POPUP_DRIVER_NAME,
  POPUP_DUPLICATE_CREATE_LEAD_DESCRIPTION,
  POPUP_DUPLICATE_CREATE_LEAD_HEADER,
  POPUP_FINAL_BID_AMOUNT,
  POPUP_HOLD_BACK_AMOUNT,
  POPUP_LEAD_LISTING_PRICE,
  POPUP_LEAD_SELLING_PRICE,
  POPUP_REG_NO,
  REFURBISHMENT_PAYMENT_AMOUNT,
  RTO_CHARGES,
  TOTAL_SALE_AMOUNT,
} from '../../constants/constants'
import {
  LeadStatus,
  LoanRejectionReason,
  Payment,
  PaymentFor,
  PaymentStatus,
  usePopupDynamicValuesQuery,
} from '../../generated/hooks_and_more'
import useUpdateLeadInput, {
  useUpdateRemarksInput,
} from '../../hooks/useUpdateLeadInput'
import {FieldId} from '../../utils/FieldValidator'
import {enumToItems, log} from '../../utils/helpers'
import Button from '../basic/Button'
import {Input} from '../basic/Input'
import PickerSelectButton from '../basic/PickerSelectButton'
import {H2, P1} from '../basic/StyledText'
import {Row} from '../basic/StyledView'
import BookingDetails from './CollapsibleCard/BookingDetails'

type ConfirmationModalProps = {
  type: 'positive' | 'negative'
  title?: string
  description?: string
  isActionloading: boolean
  isVisble: boolean
  hidePopup: () => void
  desiredStatus: LeadStatus
  undesiredStatus?: LeadStatus
  onPositiveConfirmation?: () => void
  onNegativeConfirmation?: () => void
  isRejectionWithRemarks?: boolean //might not be needed
  isPopupWithFields?: boolean
  regNo: string
  leadId: string
  refurbishmentRequestId?: string
  paymentId?: string
}
//  TODO: a function to replace dynamic values on popup depending on Lead field values and add loader on confirming  YES
const ConfirmationModal = ({
  type,
  title,
  description,
  isActionloading,
  isVisble,
  hidePopup,
  desiredStatus,
  undesiredStatus,
  onPositiveConfirmation,
  onNegativeConfirmation,
  isRejectionWithRemarks,
  isPopupWithFields,
  regNo,
  leadId,
  refurbishmentRequestId,
  paymentId, //FIXME: same data as refurbishmentRequestId
}: ConfirmationModalProps) => {
  // FIXME: export this Type to another file

  type ValidatorFunction = (a: string) => boolean
  // log('input field popup', isPopupWithFields)
  console.log('Payment Id', paymentId)
  const {remarks, setRemarks} = useUpdateRemarksInput(regNo)
  const [dynamicDescriptionValue, setDynamicDescriptionValue] =
    useState<string>(description)
  const [dynamicTitleValue, setDynamicTitleValue] = useState<string>(title)
  const [isRegNoSame, setIsRegNoSame] = useState<boolean>()
  const {leadInput, setLeadInput} = useUpdateLeadInput(leadId)
  const [isRequired, setIsRequired] = useState(false)
  const [enable, setEnable] = useState<boolean>(false)

  const {data: getDynamicValue, loading} = usePopupDynamicValuesQuery({
    variables: {
      regNo:
        desiredStatus === LeadStatus.LeadGenerated
          ? leadInput?.regNo?.toUpperCase()
          : regNo,
      requestId: refurbishmentRequestId,
    },
    fetchPolicy: 'cache-and-network',
    onCompleted(data) {
      if (
        data?.getLead?.regNo?.toUpperCase() ===
          leadInput?.regNo?.toUpperCase() &&
        desiredStatus === LeadStatus.LeadGenerated
      ) {
        log('same reg no case')
        setIsRegNoSame(true)
        setDynamicTitleValue(POPUP_DUPLICATE_CREATE_LEAD_HEADER)
        setDynamicDescriptionValue(
          `Lead ${leadInput?.regNo} ${POPUP_DUPLICATE_CREATE_LEAD_DESCRIPTION}`,
        )
      } else if (data?.getLead?.regNo ?? true) {
        setIsRegNoSame(false)
        const descVal = !loading && setDynamicValueFn(description)
        setDynamicDescriptionValue(descVal)
        const titleVal = !loading && setDynamicValueFn(title)
        setDynamicTitleValue(titleVal)
      } else {
        const descVal = !loading && setDynamicValueFn(description)
        setDynamicDescriptionValue(descVal)
        const titleVal = !loading && setDynamicValueFn(title)
        setDynamicTitleValue(titleVal)
      }

      const leadRegNo = leadInput?.regNo?.toUpperCase()
      log('popup data', {
        data,
        leadRegNo,
        desiredStatus,
        undesiredStatus,
        dynamicDescriptionValue,
        title,
        dynamicTitleValue,
      })
    },
  })

  const newDealProposedAmount = leadInput?.proposedDealAmount
  const newDemandAmount = leadInput?.demandAmount
  const refurbishmentApprovedAmount =
    getDynamicValue?.getLead?.refurbishmentDetails?.requests?.[0]?.purchase?.items
      ?.filter(i => i?.isApproved)
      ?.reduce((initialPrice, p) => p?.price + initialPrice, 0) ??
    leadInput?.refurbishmentDetails?.requests?.[0]?.purchase?.items
      ?.filter(i => i?.isApproved)
      ?.reduce((initialPrice, p) => p?.approvedPriceLimit + initialPrice, 0)

  const refurbishmentItemCount =
    leadInput?.refurbishmentDetails?.requests?.[0]?.issue?.items?.length

  const approvedLoanAmount =
    getDynamicValue?.getLead?.activeBooking?.activeLoan?.sanctionedLoanAmount

  const refurbishmentTransportationCharges =
    getDynamicValue?.getLead?.refurbishmentDetails?.requests?.[0]
      ?.transportationCharge ?? 0
  // log(' request id', refurbishmentApprovedAmount)
  // useEffect(() => {
  //   isUndesiredActionFormValid(undesiredStatus)
  // }, [newDemandAmount, newDealProposedAmount, remarks?.remarks])

  // booking
  const bookingPrice = leadInput?.activeBooking?.bookingPayment?.saleAmount
  function getBookingPayment(
    payments: Partial<Payment>[],
    paymentStatus: PaymentStatus,
    paymentFor: PaymentFor,
  ) {
    const bookingPayment = payments?.find(
      payment =>
        payment?.for === paymentFor && payment?.status === paymentStatus,
    )

    return !!bookingPayment?.amount
      ? bookingPayment?.amount
      : leadInput?.activeBooking?.payments?.[0]?.amount
  }

  const bookingPayments = getDynamicValue?.getLead?.activeBooking?.payments

  const bookingTokenAmount = getBookingPayment(
    bookingPayments,
    PaymentStatus.Requested,
    PaymentFor.BookingToken,
  )
  const bookingDeliveryAmount = getBookingPayment(
    bookingPayments,
    PaymentStatus.Requested,
    PaymentFor.BookingDelivery,
  )
  const bookingPartPaymentAmount =
    bookingPayments?.find(
      payment =>
        payment?.id === paymentId &&
        payment?.status !== PaymentStatus?.Rejected,
    )?.amount ?? leadInput?.activeBooking?.payments?.[0]?.amount

  function onAddingLoanRejectionReason(value: string) {
    setLeadInput({
      ...leadInput,
      activeBooking: {
        ...leadInput?.activeBooking,
        activeLoan: {
          ...leadInput?.activeBooking?.activeLoan,
          rejectionReason: value as LoanRejectionReason,
        },
      },
    })
  }
  function onProposingNewDealAmount(value: string) {
    setLeadInput({
      ...leadInput,
      proposedDealAmount: Number(value),
    })
  }
  function onUpdatingDemandAmount(value: string) {
    setLeadInput({
      ...leadInput,
      demandAmount: Number(value),
    })
  }
  function onRemarksChange(value: string) {
    !isRequired && setIsRequired(true)
    setRemarks(value)
  }

  function setDynamicValueFn(desc: string) {
    //  let titleString = type ==='negative' ? negativeDesc : positiveDesc
    let titleString = desc
    if (titleString.includes(POPUP_BID_AMOUNT_LIMIT)) {
      //console.log("bid amount limit called", getDynamicValue);?.getLead?.

      const proposedBidAmount = leadInput?.proposedBidLimitAmount?.toString()
      titleString = titleString.replace(
        POPUP_BID_AMOUNT_LIMIT,
        proposedBidAmount,
      )
    } else if (titleString.includes(POPUP_FINAL_BID_AMOUNT)) {
      // If final bid amount is not present in getDynamicValue then use leadInput
      const finalBidAmount =
        desiredStatus === LeadStatus.PaymentRequestSent
          ? getDynamicValue?.getLead?.finalBidAmount?.toString()
          : leadInput?.finalBidAmount?.toString()
      titleString = titleString.replace(POPUP_FINAL_BID_AMOUNT, finalBidAmount)
    } else if (titleString.includes(POPUP_DEAL_DEMANDED_AMOUNT)) {
      const leadDemandedAmount =
        getDynamicValue?.getLead?.demandAmount?.toString()
      titleString = titleString.replace(
        POPUP_DEAL_DEMANDED_AMOUNT,
        leadDemandedAmount,
      )
    } else if (titleString.includes(POPUP_DEAL_PROPOSED_AMOUNT)) {
      const leadProposedAmount =
        getDynamicValue?.getLead?.proposedDealAmount?.toString()
      titleString = titleString.replace(
        POPUP_DEAL_PROPOSED_AMOUNT,
        leadProposedAmount,
      )
    } else if (titleString.includes(POPUP_REG_NO)) {
      const regNumber = getDynamicValue?.getLead?.regNo ?? regNo
      titleString = titleString.replace(POPUP_REG_NO, regNumber)
    } else if (titleString.includes(POPUP_DRIVER_NAME)) {
      const driverName = getDynamicValue?.getLead?.pickup?.by?.name
      titleString = titleString.replace(POPUP_DRIVER_NAME, driverName)
    } else if (titleString.includes(POPUP_LEAD_SELLING_PRICE)) {
      const sellingPrice = leadInput?.sellingPrice?.toString()
      titleString = titleString.replace(POPUP_LEAD_SELLING_PRICE, sellingPrice)
    } else if (titleString.includes(POPUP_LEAD_LISTING_PRICE)) {
      const listingPrice = leadInput?.listingPrice?.toString()
      titleString = titleString.replace(POPUP_LEAD_LISTING_PRICE, listingPrice)
    } else if (titleString.includes(POPUP_DELIVERY_EXPENSE)) {
      let totalExpenses = 0
      const deliveryExpense = getDynamicValue?.getLead?.expenses.map(item => {
        if (item?.paymentStatus !== PaymentStatus.Rejected) {
          totalExpenses = totalExpenses + item?.spentAmount
        }
        return totalExpenses?.toString()
      })
      titleString = titleString.replace(
        POPUP_DELIVERY_EXPENSE,
        totalExpenses?.toString(),
      )
    } else if (titleString.includes(POPUP_HOLD_BACK_AMOUNT)) {
      let holdBackAmount = 0
      if (leadInput?.holdbackAmount && leadInput?.documentCharges) {
        holdBackAmount = leadInput?.holdbackAmount + leadInput?.documentCharges
      } else if (leadInput?.holdbackAmount) {
        holdBackAmount = leadInput?.holdbackAmount
      } else if (leadInput?.documentCharges) {
        holdBackAmount = leadInput?.documentCharges
      }
      titleString = titleString.replace(
        POPUP_HOLD_BACK_AMOUNT,
        holdBackAmount?.toString(),
      )
    } else if (titleString?.includes(REFURBISHMENT_PAYMENT_AMOUNT)) {
      const refurbishmentTotalPaymentAmount =
        refurbishmentApprovedAmount + refurbishmentTransportationCharges

      // getDynamicValue?.getLead?.refurbishmentDetails?.requests?.[0]?.purchase?.items?.reduce(
      //   (sum, i) => i?.price + sum,
      //   0,
      // )

      // this is the sum of refurbishment cost + transporatation cost
      console.log(
        'This is the refurbishmentTotalPaymentAmount',
        refurbishmentApprovedAmount,
      )
      titleString = titleString.replace(
        REFURBISHMENT_PAYMENT_AMOUNT,
        refurbishmentTotalPaymentAmount?.toString(),
      )
    } else if (titleString?.includes(APPROVED_REFURBISHMENT_ITEMS_COUNT)) {
      titleString = titleString?.replace(
        APPROVED_REFURBISHMENT_ITEMS_COUNT,
        refurbishmentItemCount?.toString(),
      )
    } else if (titleString?.includes(BOOKING_TOKEN)) {
      titleString = titleString?.replace(
        BOOKING_TOKEN,
        bookingTokenAmount?.toString(),
      )
    } else if (titleString?.includes(BOOKING_PART_PAYMENT)) {
      titleString = titleString?.replace(
        BOOKING_PART_PAYMENT,
        bookingPartPaymentAmount?.toString(),
      )
    } else if (titleString?.includes(BOOKING_DELIVERY_PAYMENT)) {
      titleString = titleString?.replace(
        BOOKING_DELIVERY_PAYMENT,
        bookingDeliveryAmount?.toString(),
      )
    }

    if (titleString?.includes(APPROVED_REFURBISHMENT_ITEM_COST)) {
      titleString = titleString?.replace(
        APPROVED_REFURBISHMENT_ITEM_COST,
        refurbishmentApprovedAmount?.toString(),
      )
    }

    if (titleString?.includes(BOOKING_PRICE)) {
      titleString = titleString?.replace(
        BOOKING_PRICE,
        bookingPrice?.toString(),
      )
    }

    if (titleString?.includes(TOTAL_SALE_AMOUNT)) {
      titleString = titleString?.replace(
        TOTAL_SALE_AMOUNT,
        (
          bookingPrice +
          (getDynamicValue?.getLead?.activeBooking?.isRCTransferReq
            ? RTO_CHARGES
            : 0) +
          (getDynamicValue?.getLead?.activeBooking?.isInsuranceReq
            ? INSURANCE_CHARGES
            : 0)
        )?.toString(),
      )
    } else if (titleString?.includes(BOOKING_LOAN_AMOUNT)) {
      titleString = titleString?.replace(
        BOOKING_LOAN_AMOUNT,
        approvedLoanAmount?.toString(),
      )
    }

    return titleString
  }

  //  As per Product Requirement
  function isUndesiredActionFormValid(status) {
    switch (status) {
      case LeadStatus?.NewDealRequested:
        if (
          isPopupWithFields &&
          !newDemandAmount &&
          isRejectionWithRemarks &&
          !remarks?.remarks &&
          type === 'negative'
        ) {
          setEnable(false)
        } else {
          setEnable(false)
        }
        break
      case LeadStatus.NewDealProposed:
        if (
          isPopupWithFields &&
          !newDealProposedAmount &&
          isPopupWithFields &&
          isRejectionWithRemarks &&
          !remarks?.remarks &&
          type === 'negative'
        ) {
          setEnable(false)
        } else {
          setEnable(false)
        }
        break
      default:
        setEnable(false)
        break
    }
    // if (
    //   !!undesiredStatus &&
    //   isRejectionWithRemarks &&
    //   !remarks?.remarks &&
    //   !isPopupWithFields
    // ) {
    //   return true
    // } else if (
    //   undesiredStatus === LeadStatus?.NewDealRequested &&
    //   isPopupWithFields &&
    //   !newDemandAmount &&
    //   isRejectionWithRemarks &&
    //   !remarks?.remarks &&
    //   type === 'negative'
    // ) {
    //   log('hi2')
    //   return true
    // } else if (
    //   undesiredStatus === LeadStatus?.NewDealProposed &&
    //   !newDealProposedAmount &&
    //   isPopupWithFields &&
    //   isRejectionWithRemarks &&
    //   !remarks?.remarks &&
    //   type === 'negative'
    // ) {
    //   log('hi1')
    //   return true
    // } else {
    //   return false
    // }
  }
  return (
    <Portal>
      <Modal
        visible={isVisble}
        onDismiss={hidePopup}
        dismissable={true}
        contentContainerStyle={styles.modalContainer}>
        {loading ? (
          <>
            <ActivityIndicator />
          </>
        ) : (
          <>
            <H2 style={styles.title}>{dynamicTitleValue as string}</H2>

            <P1 style={styles.description}>
              {dynamicDescriptionValue as string}
            </P1>
            {/* BUG#  got fixed*/}
            {undesiredStatus === LeadStatus?.NewDealProposed &&
              type === 'negative' &&
              isPopupWithFields && (
                <Input
                  label="Enter New Deal Amount *"
                  keyboardType="numeric"
                  isRequired
                  id={FieldId.DEMANDED_AMOUNT}
                  temporary
                  value={newDealProposedAmount?.toString()}
                  onChangeText={onProposingNewDealAmount}
                />
              )}
            {undesiredStatus === LeadStatus?.NewDealRequested &&
              type === 'negative' &&
              isPopupWithFields && (
                <Input
                  label="Request New Deal"
                  isRequired
                  id={FieldId.DEMANDED_AMOUNT}
                  temporary
                  value={newDemandAmount?.toString()}
                  keyboardType="numeric"
                  onChangeText={onUpdatingDemandAmount}
                />
              )}

            {(undesiredStatus === LeadStatus.BookingLoanDORejected ||
              undesiredStatus === LeadStatus.BookingLoanFIFailed ||
              undesiredStatus === LeadStatus.BookingFinanceCaseDropped) &&
              type === 'negative' &&
              isPopupWithFields && (
                <PickerSelectButton
                  items={enumToItems(LoanRejectionReason)}
                  onValueChange={onAddingLoanRejectionReason}
                  placeholder="Rejection Reason *"
                  value={leadInput?.activeBooking?.activeLoan?.rejectionReason}
                />
              )}

            {isRejectionWithRemarks && (
              <Input
                label="Enter Remarks"
                isRequired={isRequired}
                multiline
                // value={remarks?.remarks ?? ''}
                onChangeText={onRemarksChange}
              />
            )}
            <Row>
              <Button
                variant={'danger'}
                title={!isRegNoSame ? 'No' : 'Back'}
                type={'enable'}
                onPress={() => {
                  hidePopup()
                }}
              />
              {!isRegNoSame ? (
                <Button
                  variant={'action'}
                  disabled={
                    (isRejectionWithRemarks && !remarks?.remarks) ||
                    (type === 'negative' &&
                      undesiredStatus === LeadStatus.NewDealProposed &&
                      !newDealProposedAmount) ||
                    (type === 'negative' &&
                      undesiredStatus === LeadStatus.NewDealRequested &&
                      !newDemandAmount)
                  }
                  title={'Yes'}
                  loading={isActionloading}
                  //TODO: Add loading to this button
                  type={'enable'}
                  onPress={
                    type === 'negative'
                      ? () => onNegativeConfirmation()
                      : () => onPositiveConfirmation()
                  }
                />
              ) : (
                <></>
              )}
            </Row>
          </>
        )}
      </Modal>
    </Portal>
  )
}

export default ConfirmationModal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollViewStyle: {maxHeight: Layout.baseSize * 3},
  title: {
    alignSelf: 'center',
    marginVertical: Layout.baseSize,
  },
  description: {
    alignSelf: 'center',
    marginBottom: Layout.baseSize,
  },
  modalContainer: {
    backgroundColor: Colors.light.background,
    // height: Layout.window.height * 0.6,
    marginHorizontal: Layout.baseSize * 0.5,
    padding: Layout.baseSize,
    borderRadius: Layout.baseSize,
  },
})
