import {format} from 'date-fns'
import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {Divider, List, Surface} from 'react-native-paper'
import Colors from '../../../constants/Colors'
import Layout from '../../../constants/Layout'
import {
  LeadExpenseRef,
  LeadStatus,
  LeadStatusEventRef,
  PaymentFor,
  PaymentRef,
  PaymentType,
} from '../../../generated/hooks_and_more'
import {
  getExpenses,
  log,
  titleCaseToReadable,
  validDateFormate,
} from '../../../utils/helpers'
import DataRowItem from '../../basic/DataRowItem'
import {P2} from '../../basic/StyledText'

type DealershipDealDetailsProps = {
  demandAmount: number
  approvedDeal: number
  proposedDealAmount: number
  statusEvents: Partial<LeadStatusEventRef>[]
  paymentType: PaymentType
  documentCharges: number
  payments: Partial<PaymentRef>[]
  expenses: Partial<LeadExpenseRef[]>
  openBottomSheet: () => void
  setBottomSheetVariant?: React.Dispatch<
    React.SetStateAction<'Payment' | 'DeliveryExpense' | 'PurchaseOrder'>
  >
  setPaymentSheetFor?: React.Dispatch<React.SetStateAction<PaymentFor>>
}
type BottomSheetVariableProps = {
  variant?: 'Payment' | 'DeliveryExpense' | 'PurchaseOrder'
  payFor?: PaymentFor
}
const DealershipDealDetails = ({
  openBottomSheet,
  approvedDeal,
  proposedDealAmount,
  demandAmount,
  paymentType,
  payments,
  expenses,
  statusEvents,
  documentCharges,
  setBottomSheetVariant,
  setPaymentSheetFor,
}: DealershipDealDetailsProps) => {
  let totalExpenses = 0

  const deliveryExpenses = getExpenses(expenses)
  const deliveryExpensesStatus =
    !!expenses && expenses?.[expenses?.length - 1]?.paymentStatus
  const deliveryExpensesStatusDate =
    !!expenses && expenses?.[expenses?.length - 1]?.createdAt
  function showActionSheet({variant, payFor}: BottomSheetVariableProps) {
    log('variant and payFor', {payFor, variant})
    setBottomSheetVariant(variant)
    setPaymentSheetFor(payFor)
    openBottomSheet()
  }
  // const status = statusEvents?.[0]?.status
  function setStatusEvent(
    currentStatus: LeadStatus,
    statusEvents?: Partial<LeadStatusEventRef>[],
  ) {
    if (statusEvents?.some(s => s?.status === LeadStatus.DealAmountConfirmed)) {
      return 'Approved'
    } else if (currentStatus === LeadStatus.DealAmountUpdated) {
      return 'Accepted'
    } else if (currentStatus === LeadStatus.NewDealProposed) {
      return 'Proposed'
    } else if (
      currentStatus === LeadStatus.LeadGenerated ||
      currentStatus === LeadStatus.NewDealRequested ||
      currentStatus === LeadStatus.LeadVehicleImagesUploaded
    ) {
      return 'Requested'
    }
  }
  function setStatusDate(
    currentStatus: Partial<LeadStatusEventRef>,
    statusEvents?: Partial<LeadStatusEventRef>[],
  ) {
    if (statusEvents?.some(s => s?.status === LeadStatus.DealAmountConfirmed)) {
      return format(new Date(currentStatus?.createdAt), 'dd MMM yyyy')
    } else if (currentStatus?.status === LeadStatus.DealAmountUpdated) {
      return format(new Date(currentStatus?.createdAt), 'dd MMM yyyy')
    } else if (currentStatus?.status === LeadStatus.NewDealProposed) {
      return format(new Date(currentStatus?.createdAt), 'dd MMM yyyy')
    } else if (
      currentStatus?.status === LeadStatus.LeadGenerated ||
      currentStatus?.status === LeadStatus.NewDealRequested ||
      currentStatus?.status === LeadStatus.LeadVehicleImagesUploaded
    ) {
      return format(new Date(currentStatus?.createdAt), 'dd MMM yyyy')
    }
  }

  // useEffect(() => {
  //   setStatusEvent(statusEvent, status)
  // }, [status])

  return (
    <Surface style={styles.container}>
      <List.Accordion
        style={styles.accordianStyle}
        title={'Deal Details'}
        // onPress={onExpand}
        titleStyle={{color: Colors.dark.background}}>
        <DataRowItem label="Demand Amount" value={demandAmount} />
        <DataRowItem
          label="Approved Deal"
          value={approvedDeal ?? proposedDealAmount ?? '-'}
        />
        <DataRowItem
          label="Deal Status"
          value={setStatusEvent(statusEvents?.[0]?.status, statusEvents) ?? '-'}
        />
        <DataRowItem
          label="Status Date"
          value={setStatusDate(statusEvents?.[0], statusEvents) ?? '-'}
        />
        <DataRowItem
          label="Payment Type"
          value={!!paymentType ? titleCaseToReadable(paymentType) : '-'}
        />
        {payments?.map(p => (
          <View key={p?.id}>
            <Divider />

            <DataRowItem
              label={
                p?.for === PaymentFor.DealDelivery &&
                paymentType == PaymentType.PayInFull
                  ? 'Deal Amount'
                  : titleCaseToReadable(p?.for)
              }
              value={p?.amount}
            />
            {p?.for === PaymentFor.DealDelivery && !!documentCharges && (
              <DataRowItem
                label="Document Charges"
                value={`- ${documentCharges}`}
              />
            )}
            <DataRowItem
              label="Payment Status"
              value={titleCaseToReadable(p?.status)}
            />
            <DataRowItem
              label="Status Date"
              value={format(Date?.parse(p?.createdAt), 'dd MMM yyyy')}
            />
            <View style={styles.innerContainer}>
              <Text style={{color: 'grey'}}>View Request</Text>
              <TouchableOpacity
                onPress={() => {
                  showActionSheet({
                    payFor: p?.for,
                    variant: 'Payment',
                  })
                }}>
                <P2 style={styles.boldText} numberOfLines={1}>
                  View
                </P2>
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <>
          <DataRowItem
            label="Expense Amount"
            value={deliveryExpenses === 0 ? '-' : deliveryExpenses}
          />
          <DataRowItem
            label="Payment Status"
            value={
              !!deliveryExpensesStatus
                ? titleCaseToReadable(deliveryExpensesStatus)
                : '-'
            }
          />
          <DataRowItem
            label="Status Date"
            value={validDateFormate(deliveryExpensesStatusDate) ?? '-'}
          />
          <View style={styles.innerContainer}>
            <Text style={{color: 'grey'}}>View Request</Text>
            <TouchableOpacity
              onPress={() => {
                showActionSheet({
                  payFor: PaymentFor.DeliveryExpense,
                  variant: 'DeliveryExpense',
                })
              }}>
              <P2 style={styles.boldText} numberOfLines={1}>
                View
              </P2>
            </TouchableOpacity>
          </View>
        </>
      </List.Accordion>
    </Surface>
  )
}

export default DealershipDealDetails

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
