import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {H2} from '../../basic/StyledText'
import DataRowItem from '../../basic/DataRowItem'
import Separator from '../../basic/Separator'
import {LeadSource} from '../../../generated/hooks_and_more'
import Layout from '../../../constants/Layout'
import {log} from '../../../utils/helpers'

type ProcurementCostBreakupProps = {
  dealAmount: number
  parking: number
  expenses: number
  tokenAmount: number
  dealDelivery: number
  holdbackAmount: number
  loanAmount: number
  refCost: number
  source: LeadSource
  isPrApproved?: boolean
  documentCharges?: number
}

const ProcurementCostBreakupCard = ({
  dealAmount,
  expenses,
  parking,
  refCost,
  dealDelivery,
  holdbackAmount,
  loanAmount,
  tokenAmount,
  isPrApproved,
  source,
  documentCharges,
}: ProcurementCostBreakupProps) => {
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
  log('procurement cost breakup inside', {
    dealDelivery,
    expenses,
    parking,

    refCost,
    totalDealership,
    totalBankAuction,
    holdbackAmount,
    loanAmount,
    tokenAmount,
  })
  const DealershipSection = () => {
    const dealerPayment = dealAmount - loanAmount - documentCharges
    return (
      <>
        {!holdbackAmount && (
          <DataRowItem
            label="Dealer Payment"
            value={!!dealerPayment ? dealerPayment : '-'}
          />
        )}
        <Separator />
        <DataRowItem label="Delivery Payment" value={dealDelivery ?? '-'} />
        <Separator />

        <DataRowItem label="Token Payment" value={tokenAmount ?? '-'} />
        <Separator />

        <DataRowItem label="Holdback Payment" value={holdbackAmount ?? '-'} />
        <Separator />
        <DataRowItem label="Loan Payment" value={loanAmount ?? '-'} />
      </>
    )
  }
  return (
    <View style={styles.container}>
      <H2 style={styles.heading}>Procurement Cost Breakup</H2>
      <Separator />

      {source === LeadSource.BankAuction ? (
        <>
          <DataRowItem label="Deal Payment" value={dealAmount ?? '-'} />
          <Separator />
          <DataRowItem label="Parking Payment" value={parking ?? '-'} />
        </>
      ) : (
        isPrApproved && <DealershipSection />
      )}
      <Separator />
      <DataRowItem label="Driver Expenses Payment" value={expenses ?? '-'} />
      <Separator />
      <DataRowItem label="Refurbishment Payments" value={refCost ?? '-'} />
      <Separator />

      <DataRowItem
        label="Total"
        value={
          source === LeadSource.BankAuction ? totalBankAuction : totalDealership
        }
      />
    </View>
  )
}

export default ProcurementCostBreakupCard

const styles = StyleSheet.create({
  container: {
    padding: Layout.baseSize / 4,
  },
  heading: {
    marginLeft: Layout.baseSize,
  },
})
