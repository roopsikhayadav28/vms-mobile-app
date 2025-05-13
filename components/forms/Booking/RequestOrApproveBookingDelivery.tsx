import {ScrollView, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import PaymentDetails from '../../composite/CollapsibleCard/PaymentDetails'
import {
  BookingType,
  useBookingPaymentDetailsQuery,
} from '../../../generated/hooks_and_more'
import {ActivityIndicator} from 'react-native-paper'
import {log} from '../../../utils/helpers'
import {Input} from '../../basic/Input'
import {useUpdateRemarksInput} from '../../../hooks/useUpdateLeadInput'
import {commonStyle} from '../../../constants/style'

type RequestOrApproveBookingDeliveryProps = {
  leadId: string
  regNo: string
}

const RequestOrApproveBookingDelivery = ({
  leadId,
  regNo,
}: RequestOrApproveBookingDeliveryProps) => {
  const {data: bookingPaymentData, loading} = useBookingPaymentDetailsQuery({
    variables: {regNo},
    onCompleted(data) {
      log('payment Details', data)
    },
  })
  const {setRemarks} = useUpdateRemarksInput(regNo)
  const onChangeRemarks = (value: string) => {
    setRemarks(value)
  }

  const currentBooking = bookingPaymentData?.getLead?.activeBooking

  return (
    <ScrollView style={commonStyle.mainAppContainer}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <PaymentDetails
          isActionSheetDisable
          bookingPayments={currentBooking?.payments}
          bookingType={currentBooking?.bookingPayment?.bookingType}
          isInsuranceRequired={currentBooking?.isInsuranceReq}
          isRcTransferRequired={currentBooking?.isRCTransferReq}
          saleAmount={currentBooking?.bookingPayment?.saleAmount}
          isLoanRequired={
            currentBooking?.bookingPayment?.bookingType === BookingType.Finance
          }
          appliedLoanAmount={currentBooking?.activeLoan?.appliedLoanAmount}
          sanctionedLoanAmount={
            currentBooking?.activeLoan?.sanctionedLoanAmount
          }
        />
      )}

      <Input label="Enter the Remarks" onChangeText={onChangeRemarks} />
    </ScrollView>
  )
}

export default RequestOrApproveBookingDelivery

const styles = StyleSheet.create({})
