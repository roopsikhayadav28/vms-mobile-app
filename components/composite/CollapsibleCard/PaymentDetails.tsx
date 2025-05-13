import React from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'

import {List, Surface} from 'react-native-paper'
import Colors from '../../../constants/Colors'
import Layout from '../../../constants/Layout'
import {INSURANCE_CHARGES, RTO_CHARGES} from '../../../constants/constants'
import {
  BookingType,
  Payment,
  PaymentFor,
  PaymentStatus,
} from '../../../generated/hooks_and_more'
import {
  getBalanceAmountForBooking,
  titleCaseToReadable,
} from '../../../utils/helpers'
import DataRowItem from '../../basic/DataRowItem'
import {H3} from '../../basic/StyledText'
import TouchableLineItem from '../../basic/TouchableLineItem'

type PaymentDetailsProps = {
  bookingType: BookingType
  saleAmount: number
  isRcTransferRequired: boolean
  isInsuranceRequired: boolean
  isLoanRequired?: boolean
  appliedLoanAmount?: number
  sanctionedLoanAmount?: number
  bookingPayments: Partial<Payment>[]
  addAnotherPartPayment?: () => void
  setBookingPaymentId?: React.Dispatch<React.SetStateAction<string>>
  openBookingBottomSheet?: () => void
  isActionSheetDisable: boolean
}

const PaymentDetails = ({
  bookingType,
  saleAmount,
  isRcTransferRequired,
  isInsuranceRequired,
  bookingPayments,
  isLoanRequired,
  appliedLoanAmount,
  sanctionedLoanAmount,
  addAnotherPartPayment,
  setBookingPaymentId,
  openBookingBottomSheet,
  isActionSheetDisable,
}: PaymentDetailsProps) => {
  function showPaymentDetail(paymentId: string) {
    setBookingPaymentId(paymentId)
    openBookingBottomSheet()
  }
  return (
    <Surface style={styles.container}>
      <List.Accordion
        style={styles.accordianStyle}
        title={'Payment Details'}
        // onPress={onExpand}
        expanded={isActionSheetDisable}
        titleStyle={{color: Colors.dark.background}}>
        <DataRowItem label="Payment Mode" value={bookingType ?? '-'} />
        <H3 style={{paddingHorizontal: Layout.baseSize}}>Sale Structure</H3>
        <DataRowItem label="Sale Amount" value={saleAmount ?? '-'} />
        <DataRowItem
          label="RC Transfer"
          value={isRcTransferRequired ? RTO_CHARGES : '-'}
        />
        <DataRowItem
          label="Insurance"
          value={isInsuranceRequired ? INSURANCE_CHARGES : '-'}
        />
        <DataRowItem
          label="Total Sale Amount"
          value={
            (!!saleAmount ? saleAmount : 0) +
              (isRcTransferRequired ? RTO_CHARGES : 0) +
              (isInsuranceRequired ? INSURANCE_CHARGES : 0) ?? '-'
          }
        />
        <DataRowItem
          label="Balance Amount"
          value={getBalanceAmountForBooking(
            bookingPayments,
            saleAmount,
            isRcTransferRequired,
            isInsuranceRequired,
            isLoanRequired,
            appliedLoanAmount,
            sanctionedLoanAmount,
          )}
        />

        {bookingPayments?.some(
          p => p?.for === PaymentFor.BookingToken && !isActionSheetDisable,
        ) && (
          <TouchableOpacity
            style={{paddingHorizontal: Layout.baseSize * 5.7}}
            onPress={addAnotherPartPayment}>
            <H3 style={{color: Colors.light.primary}}>ADD PART PAYMENT</H3>
          </TouchableOpacity>
        )}
        <H3 style={{paddingHorizontal: Layout.baseSize}}>Payment Received</H3>

        {bookingPayments?.map(p => (
          <TouchableLineItem
            key={p?.id}
            onPress={
              isActionSheetDisable ? () => {} : () => showPaymentDetail(p?.id)
            }
            label={!!p?.for ? titleCaseToReadable(p?.for) : '-'}
            value={`₹${p?.amount}`}
            variant="3withIcon"
            secondValue={p?.status}
          />
        ))}
      </List.Accordion>
    </Surface>
  )
}

export default PaymentDetails

const styles = StyleSheet.create({
  container: {
    margin: Layout.baseSize * 0.5,
    backgroundColor: Colors.light.background,
    // width: Layout.window.width,
    borderRadius: Layout.baseSize / 5,
    overflow: 'hidden',
  },
  accordianStyle: {
    backgroundColor: Colors.light.inputBg,
    height: Layout.baseSize * 3,
    padding: Layout.baseSize / 5,
  },
  innerContainer: {
    borderBottomRightRadius: Layout.baseSize,
    borderBottomLeftRadius: Layout.baseSize,
    borderTopRightRadius: Layout.baseSize,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Layout.baseSize / 2,
    marginHorizontal: Layout.baseSize,
  },
  boldText: {
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
})
