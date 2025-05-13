import React from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import {ActivityIndicator} from 'react-native-paper'
import Layout from '../../constants/Layout'
import {LoanToBeClosedBy, PaymentType} from '../../generated/hooks_and_more'
import {titleCaseToReadable} from '../../utils/helpers'
import DataRowItem from '../basic/DataRowItem'
import Separator from '../basic/Separator'
import {H1, H3, P2} from '../basic/StyledText'

// Confirmed should be Approved
export type PurchaseOrderProps = {
  type: 'Requested' | 'Confirmed'
  loading?: boolean
  dealAmount: number
  paymentAmount: number
  loanAmount: number
  payToDealer: number
  payToBank: number
  tokenAmount?: number
  documentCharges?: number
  deliveryAmount: number
  holdbackAmount: number
  loanToBeClosedBy: LoanToBeClosedBy
  paymentType: PaymentType
  remarks?: string
}

const PurchaseOrder = ({
  loading,
  type,
  dealAmount,
  deliveryAmount,
  paymentAmount,
  holdbackAmount,
  loanAmount,
  documentCharges,
  payToBank,
  payToDealer,
  tokenAmount,
  loanToBeClosedBy,
  paymentType,
  remarks,
}: PurchaseOrderProps) => {
  // log('purchase order details', {
  //   loading,
  //   type,
  //   dealAmount,
  //   deliveryAmount,
  //   paymentAmount,
  //   holdbackAmount,
  //   loanAmount,
  //   documentCharges,
  //   payToBank,
  //   payToDealer,
  //   tokenAmount,
  //   loanToBeClosedBy,
  //   paymentType,
  //   remarks,
  // })
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <H1>Purchase Order</H1>
          <Separator size={1} />
          {type === 'Confirmed' && (
            <>
              {!!loanToBeClosedBy && (
                <DataRowItem
                  label={'Loan To Be Closed By'}
                  value={titleCaseToReadable(loanToBeClosedBy)}
                />
              )}
              <DataRowItem
                label={'Payment Type'}
                value={titleCaseToReadable(paymentType)}
              />
            </>
          )}
          <H3>Deal Structure</H3>
          <Separator size={0.7} />
          <DataRowItem label={'Deal Amount'} value={dealAmount} />
          {!!dealAmount && !!loanAmount && (
            <DataRowItem label={'Loan Amount'} value={loanAmount} />
          )}
          <Separator size={0.7} />

          <H3>Payment Structure</H3>
          <Separator size={0.7} />

          {!!documentCharges && (
            <>
              <DataRowItem label={'Document Charges'} value={documentCharges} />
              <Separator size={0.7} />
            </>
          )}

          {paymentType === PaymentType.PayInFull && !!paymentAmount && (
            <>
              <DataRowItem label={'Payment Amount'} value={paymentAmount} />
              <Separator size={0.7} />
            </>
          )}

          {!!tokenAmount && (
            <>
              <DataRowItem label={'Token Amount'} value={tokenAmount} />
              <Separator size={0.7} />
            </>
          )}

          {!!deliveryAmount && (
            <>
              <DataRowItem label={'Delivery Amount'} value={deliveryAmount} />
              <Separator size={0.7} />
            </>
          )}

          {!!holdbackAmount && (
            <>
              <DataRowItem label={'Holdback Amount'} value={holdbackAmount} />
              <Separator size={0.7} />
            </>
          )}

          <H3>Payment Breakup</H3>
          <Separator size={0.7} />

          {
            <>
              <DataRowItem label={'Pay To Dealer'} value={payToDealer} />
              <Separator size={0.7} />
            </>
          }

          {loanToBeClosedBy === LoanToBeClosedBy.TractorJunction && (
            <DataRowItem label={'Pay To Bank'} value={payToBank} />
          )}
          {!!remarks && (
            <>
              <H3>Remarks</H3>
              <P2>{remarks}</P2>
            </>
          )}
        </>
      )}
    </ScrollView>
  )
}

export default PurchaseOrder

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Layout.baseSize,
  },
  contentContainer: {
    paddingBottom: Layout.baseSize * 4,
  },
})
