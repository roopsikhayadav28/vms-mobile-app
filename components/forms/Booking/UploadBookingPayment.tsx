import {ScrollView, View} from 'react-native'
import React from 'react'
import {commonStyle} from '../../../constants/style'
import PickerSelectButton from '../../basic/PickerSelectButton'
import {enumToItems, getBalanceAmountForBooking} from '../../../utils/helpers'
import {
  BookingType,
  PaymentFor,
  PaymentMethod,
  PaymentStatus,
  useGetDeliveryPaymentQuery,
} from '../../../generated/hooks_and_more'
import {Input} from '../../basic/Input'
import {DatePicker} from '../../basic/DatePicker'
import RNFileUploader from '../../basic/RNFileUploader'
import useUpdateLeadInput, {
  useUpdateRemarksInput,
} from '../../../hooks/useUpdateLeadInput'
import {DateTimePickerEvent} from '@react-native-community/datetimepicker'
import DataRowItem from '../../basic/DataRowItem'
import {FieldId} from '../../../utils/FieldValidator'

type FormComponentProps = {
  leadId: string | undefined
  registrationNo?: string
  paymentFor?: PaymentFor
}
const UploadBookingPayment = ({
  leadId,
  registrationNo,
  paymentFor,
}: FormComponentProps) => {
  const {leadInput, setLeadInput} = useUpdateLeadInput(leadId)
  const {setRemarks} = useUpdateRemarksInput(registrationNo)
  const {data: deliveryPaymentData} = useGetDeliveryPaymentQuery({
    variables: {
      regNo: registrationNo,
    },
  })

  const paymentMode = leadInput?.activeBooking?.payments?.[0]?.mode
  const amount = leadInput?.activeBooking?.payments?.[0]?.amount
  const proofUrl = leadInput?.activeBooking?.payments?.[0]?.proofUrl
  const date = leadInput?.activeBooking?.payments?.[0]?.createdAt

  const saleAmount =
    deliveryPaymentData?.getLead?.activeBooking?.bookingPayment?.saleAmount
  const bookingPayment = deliveryPaymentData?.getLead?.activeBooking?.payments
  const isRcTransferRequired =
    deliveryPaymentData?.getLead?.activeBooking?.isRCTransferReq
  const isInsuranceRequired =
    deliveryPaymentData?.getLead?.activeBooking?.isInsuranceReq
  const isLoanRequired =
    deliveryPaymentData?.getLead?.activeBooking?.bookingPayment?.bookingType ===
    BookingType.Finance
  const appliedLoanAmount =
    deliveryPaymentData?.getLead?.activeBooking?.activeLoan?.appliedLoanAmount
  const sanctionedLoanAmount =
    deliveryPaymentData?.getLead?.activeBooking?.activeLoan
      ?.sanctionedLoanAmount

  const isDeliveryPaymentEqualsToBalanceAmount =
    amount ===
    getBalanceAmountForBooking(
      bookingPayment,
      saleAmount,
      isRcTransferRequired,
      isInsuranceRequired,
      isLoanRequired,
      appliedLoanAmount,
      sanctionedLoanAmount,
    )

  function onChangeAmount(value: string) {
    if (!isNaN(parseFloat(value)) && isFinite(Number(value))) {
      setLeadInput({
        ...leadInput,
        activeBooking: {
          ...leadInput?.activeBooking,
          payments: [
            {
              ...leadInput?.activeBooking?.payments?.[0],
              amount: Number(value),
              status: PaymentStatus.Requested,
              for: paymentFor,
            },
          ],
        },
      })
    } else {
      setLeadInput({
        ...leadInput,
        activeBooking: {
          ...leadInput?.activeBooking,
          payments: [
            {
              ...leadInput?.activeBooking?.payments?.[0],
              amount: 0,
              status: PaymentStatus.Requested,
              for: paymentFor,
            },
          ],
        },
      })
    }
  }
  function onChangePaymentDate(
    event: DateTimePickerEvent,
    selectedDate?: Date,
  ) {
    setLeadInput({
      ...leadInput,
      activeBooking: {
        ...leadInput?.activeBooking,
        payments: [
          {
            ...leadInput?.activeBooking?.payments?.[0],
            createdAt: selectedDate,
            status: PaymentStatus.Requested,
            for: paymentFor,
          },
        ],
      },
    })
  }
  function onAddingDoc(value: string) {
    setLeadInput({
      ...leadInput,
      activeBooking: {
        ...leadInput?.activeBooking,
        payments: [
          {
            ...leadInput?.activeBooking?.payments?.[0],
            proofUrl: value,
            status: PaymentStatus.Requested,
            for: paymentFor,
          },
        ],
      },
    })
  }
  function onChangePaymentMode(value: string) {
    setLeadInput({
      ...leadInput,
      activeBooking: {
        ...leadInput?.activeBooking,
        payments: [
          {
            ...leadInput?.activeBooking?.payments?.[0],
            mode: value as PaymentMethod,
            status: PaymentStatus.Requested,
            for: paymentFor,
          },
        ],
      },
    })
  }

  function onChangeRemarks(value: string) {
    setRemarks(value)
  }

  return (
    <View style={commonStyle.mainAppContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {paymentFor === PaymentFor.BookingDelivery && (
          <DataRowItem
            label="Delivery Payment Amount"
            //Todo: Refactor code
            value={getBalanceAmountForBooking(
              bookingPayment,
              saleAmount,
              isRcTransferRequired,
              isInsuranceRequired,
              isLoanRequired,
              appliedLoanAmount,
              sanctionedLoanAmount,
            )}
          />
        )}

        <PickerSelectButton
          items={enumToItems(PaymentMethod)}
          onValueChange={onChangePaymentMode}
          placeholder="Payment Mode *"
          value={paymentMode}
          isRequired
        />
        {paymentFor !== PaymentFor.BookingDelivery && (
          <Input
            label="Enter the payment amount in INR *"
            onChangeText={onChangeAmount}
            value={amount?.toString()}
            keyboardType="number-pad"
            isRequired
          />
        )}
        {paymentFor === PaymentFor.BookingDelivery && (
          <Input
            label="Enter the payment amount in INR *"
            onChangeText={onChangeAmount}
            value={amount?.toString()}
            id={FieldId.BOOKING_DELIVERY_AMOUNT}
            isDataValid={isDeliveryPaymentEqualsToBalanceAmount}
            keyboardType="number-pad"
            temporary
          />
        )}
        <DatePicker
          value={date as Date}
          placeholder="Enter the Payment Date *"
          onChange={onChangePaymentDate}
          isRequired
        />
        {paymentMode !== PaymentMethod.Cash && (
          <RNFileUploader
            variant="docs"
            saveDoc={onAddingDoc}
            value={proofUrl}
            title="Upload Document"
            isRequired
          />
        )}
        <Input label="Remarks" onChangeText={onChangeRemarks} />
      </ScrollView>
    </View>
  )
}

export default UploadBookingPayment
