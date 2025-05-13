import {ScrollView, StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {Input} from '../../basic/Input'
import useUpdateLeadInput from '../../../hooks/useUpdateLeadInput'
import Separator from '../../basic/Separator'
import ProcurementCostBreakupCard from '../../composite/Refurbishment/ProcurementCostBreakupCard'
import {
  LeadSource,
  PaymentFor,
  PaymentStatus,
  RefurbishmentStatus,
  useProcurementCostQuery,
} from '../../../generated/hooks_and_more'
import {commonStyle} from '../../../constants/style'
import {FieldId} from '../../../utils/FieldValidator'
import {log} from '../../../utils/helpers'

type FormComponentProps = {
  leadId?: string
  regNo?: string
  requestId: string
}
const MakeReadyForSale = ({leadId, regNo, requestId}: FormComponentProps) => {
  const {leadInput, setLeadInput} = useUpdateLeadInput(leadId)
  // Write a Query
  const {data: costData, loading} = useProcurementCostQuery({
    variables: {
      regNo: regNo,
      requestId,
    },
  })
  function onAddingSellingPrice(val: string) {
    setLeadInput({
      ...leadInput,
      sellingPrice: Number(val),
    })
  }
  const sellingPrice = leadInput?.sellingPrice
  const dealAmount = costData?.getLead?.payments?.find(
    p => p?.for === PaymentFor.DealPayment && p?.status === PaymentStatus.Done,
  )?.amount

  const expenses = costData?.getLead?.payments?.find(
    p =>
      p?.for === PaymentFor.DeliveryExpense && p?.status === PaymentStatus.Done,
  )?.amount

  const parking = costData?.getLead?.payments?.find(
    p =>
      p?.for === PaymentFor.ParkingExpense && p?.status === PaymentStatus.Done,
  )?.amount

  const dealDelivery = costData?.getLead?.payments?.find(
    p => p?.for === PaymentFor.DealDelivery && p?.status === PaymentStatus.Done,
  )?.amount

  const holdbackAmount = costData?.getLead?.payments?.find(
    p =>
      p?.for === PaymentFor.HoldbackRepayment &&
      p?.status === PaymentStatus.Done,
  )?.amount

  const loanAmount = costData?.getLead?.payments?.find(
    p =>
      p?.for === PaymentFor.LoanRepayment && p?.status === PaymentStatus.Done,
  )?.amount

  const tokenAmount = costData?.getLead?.payments?.find(
    p => p?.for === PaymentFor.DealToken && p?.status === PaymentStatus.Done,
  )?.amount
  const refCost =
    costData?.getLead?.refurbishmentDetails?.requests?.[0]?.issue?.items
      ?.filter(item => item?.isApproved)
      ?.reduce((initialPrice, i) => i?.price + initialPrice, 0)
  const totalBankAuction = Number(
    (!!dealAmount ? dealAmount : 0) +
      (!!expenses ? expenses : 0) +
      (!!parking ? parking : 0) +
      (!!refCost ? refCost : 0),
  )
  const totalDealership =
    (!!dealDelivery ? dealDelivery : 0) +
    (!!tokenAmount ? tokenAmount : 0) +
    (!!expenses ? expenses : 0) +
    (!!holdbackAmount ? holdbackAmount : 0) +
    (!!loanAmount ? loanAmount : 0) +
    (!!refCost ? refCost : 0)

  const isSellingPriceValid =
    costData?.getLead?.source === LeadSource.BankAuction
      ? sellingPrice > totalBankAuction
      : costData?.getLead?.source === LeadSource.DealershipSale
      ? sellingPrice > totalDealership
      : false
  const transportationCharges =
    costData?.getLead?.refurbishmentDetails?.requests?.filter(
      i => i?.id === requestId,
    )?.[0]?.transportationCharge

  return (
    <View style={commonStyle?.mainAppContainer}>
      <ScrollView>
        <Input
          label="Enter Selling Price *"
          keyboardType="numeric"
          value={sellingPrice?.toString()}
          onChangeText={onAddingSellingPrice}
          temporary
          id={FieldId.SELLING_PRICE}
          isDataValid={isSellingPriceValid}
        />
        <Separator />
        {/* Pass query response as prop */}
        <ProcurementCostBreakupCard
          dealAmount={dealAmount}
          expenses={expenses}
          parking={parking}
          dealDelivery={dealDelivery}
          holdbackAmount={holdbackAmount}
          loanAmount={loanAmount}
          tokenAmount={tokenAmount}
          source={costData?.getLead?.source}
          refCost={
            !!transportationCharges ? transportationCharges + refCost : refCost
          }
          isPrApproved
        />
      </ScrollView>
    </View>
  )
}

export default MakeReadyForSale

const styles = StyleSheet.create({})
