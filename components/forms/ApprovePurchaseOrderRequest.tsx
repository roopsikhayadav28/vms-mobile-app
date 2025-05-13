import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {commonStyle} from '../../constants/style'
import {ScrollView} from 'react-native-gesture-handler'
import PurchaseOrder from '../composite/PurchaseOrder'
import {
  LeadStatus,
  LoanToBeClosedBy,
  PaymentFor,
  useGetLeadDealDetailsQuery,
} from '../../generated/hooks_and_more'
import {log} from '../../utils/helpers'

type FormComponentProps = {leadId: string | undefined; registrationNo?: string}

const ApprovePurchaseOrderRequest = ({
  leadId,
  registrationNo,
}: FormComponentProps) => {
  const {data: dealData, loading} = useGetLeadDealDetailsQuery({
    skip: leadId === 'new',
    fetchPolicy: 'cache-and-network',
    variables: {
      id: leadId,
    },
    onCompleted: ({getLead}) => {
      log('Dealership Raise Purchase request', getLead)
    },
  })

  const loanCloser =
    dealData?.getLead?.vehicle?.financingDetails?.loanToBeClosedBy
  const paymentType = dealData?.getLead?.payments?.[0]?.type //FIXME: This is to find the holdback inside the payments array, which means it is Pay_In_Parts
  const holdbackAmount = dealData?.getLead?.payments?.find(
    p => p?.for === PaymentFor.HoldbackRepayment,
  )?.amount
  const dealAmount = dealData?.getLead?.approvedDealAmount
  const loanAmount =
    dealData?.getLead?.vehicle?.financingDetails?.pendingLoanAmount
  const documentCharges = dealData?.getLead?.documentCharges
  const tokenAmount = dealData?.getLead?.payments?.find(
    i => i?.for === PaymentFor.DealToken,
  )?.amount
  const deliveryAmount = dealData?.getLead?.payments?.find(
    p => p?.for === PaymentFor.DealDelivery,
  )?.amount

  const paymentAmount = !!documentCharges
    ? dealAmount - documentCharges
    : dealAmount
  const payToDealer =
    loanCloser === LoanToBeClosedBy.TractorJunction
      ? dealAmount - loanAmount - documentCharges
      : dealAmount - documentCharges
  const payToBank = dealData?.getLead?.payments?.find(
    p => p?.for === PaymentFor.LoanRepayment,
  )?.amount

  // NOTE: This will always return the last PURCHASE_REQUEST_RAISED status event remarks
  const remarks =
    dealData?.getLead?.statusEvents &&
    dealData?.getLead?.statusEvents
      ?.slice()
      ?.reverse()
      ?.find(s => s?.status === LeadStatus?.PurchaseRequestRaised)?.remarks

  return (
    <View style={commonStyle.mainAppContainer}>
      <ScrollView>
        <PurchaseOrder
          type="Confirmed"
          loanToBeClosedBy={loanCloser}
          paymentType={paymentType}
          dealAmount={dealAmount}
          loanAmount={loanAmount}
          deliveryAmount={deliveryAmount}
          holdbackAmount={holdbackAmount}
          paymentAmount={paymentAmount}
          payToBank={payToBank}
          documentCharges={documentCharges}
          payToDealer={payToDealer}
          remarks={remarks}
          loading={loading}
          tokenAmount={tokenAmount}
        />
      </ScrollView>
    </View>
  )
}

export default ApprovePurchaseOrderRequest

const styles = StyleSheet.create({})
