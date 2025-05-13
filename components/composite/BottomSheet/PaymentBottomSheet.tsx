import React from 'react'
import {StyleSheet, View} from 'react-native'
import {ScrollView} from 'react-native-gesture-handler'
import Colors from '../../../constants/Colors'
import Layout from '../../../constants/Layout'
import {
  LeadExpense,
  LoanToBeClosedBy,
  PaymentFor,
  PaymentMethod,
  PaymentStatus,
  PaymentType,
} from '../../../generated/hooks_and_more'
import {log, titleCaseToReadable} from '../../../utils/helpers'
import DataRowItem from '../../basic/DataRowItem'
import Icon from '../../basic/Icon'
import {H2} from '../../basic/StyledText'
import {Column} from '../../basic/StyledView'
import {DeliveryExpense} from '../DeliveryExpense'
import PurchaseOrder from '../PurchaseOrder'
import {format} from 'date-fns'
import {Divider} from 'react-native-paper'
enum PaymentBottomSheetVariant {
  PURCHASE_ORDER = 'PURCHASE_ORDER',
  HOLDBACK_REPAYMENT = 'HOLDBACK_REPAYMENT',
  DELIVERY_PAYMENT = 'DELIVERY_PAYMENT',
  LOAN_REPAYMENT = 'LOAN_REPAYMENT',
  DEAL_TOKEN_PAYMENT = 'DEAL_TOKEN_PAYMENT',
  DELIVERY_EXPENSES = 'DELIVERY_EXPENSES',
}
// type DeliverPaymentBottomSheetProps = Partial<Payment> & Partial<LeadExpense>
// type PaymentBottomSheetProps =
//   | Partial<Payment>
//   | DeliverPaymentBottomSheetProps
//   | PurchaseOrderProps

type PaymentBottomSheetProps = {
  variant: 'Payment' | 'DeliveryExpense' | 'PurchaseOrder'
  closeBottomSheet: () => void
  requestedDate: Date
  paymentProcessedAt: Date
  paymentMode: PaymentMethod
  typeSpecificPaymentAmount: number
  typeOfPayment: PaymentFor
  bankName: string
  accountHolderName: string
  accountNo: string
  ifscCode: string
  accountProof: string
  receiptProof: string
  // expense related additional Prop
  expenses: Array<Partial<LeadExpense>>
  // Purchase Order related all Prop
  dealAmountforPO?: number
  paymentAmountforPO?: number
  loanAmountforPO?: number
  payToDealerforPO?: number
  payToBankforPO?: number
  tokenAmountforPO?: number
  documentChargesforPO?: number
  deliveryAmountforPO?: number
  holdbackAmountforPO?: number
  loanToBeClosedByforPO?: LoanToBeClosedBy
  paymentTypeforPO?: PaymentType
  remarksforPO?: string
}

// enum PaymentBottomSheetVariant {
//     PURCHASE_ORDER,
//     HOLDBACK_REPAYMENT_REQUEST,
//     HOLDBACK_REPAYMENT_RECEIPT,

//     DELIVERY_PAYMENT_REQUEST,
//     DELIVERY_PAYMENT_RECEIPT,

//     LOAN_REPAYMENT_REQUEST,
//     LOAN_REPAYMENT_RECEIPT,

//     DEAL_TOKEN_PAYMENT_REQUEST,
//     DEAL_TOKEN_PAYMENT_RECEIPT,

//     DELIVERY_EXPENSES,
//   }

const PaymentBottomSheet = ({
  variant,
  requestedDate,
  closeBottomSheet,
  accountHolderName,
  accountNo,
  accountProof,
  receiptProof,
  bankName,
  expenses,
  ifscCode,
  paymentAmountforPO,
  paymentTypeforPO,
  dealAmountforPO,
  deliveryAmountforPO,
  holdbackAmountforPO,
  loanAmountforPO,
  loanToBeClosedByforPO,
  payToBankforPO,
  payToDealerforPO,
  typeOfPayment,
  typeSpecificPaymentAmount,
  documentChargesforPO,
  remarksforPO,
  tokenAmountforPO,
  paymentMode,
  paymentProcessedAt,
}: PaymentBottomSheetProps) => {
  log('following data for actionsheet', {
    variant,
    typeOfPayment,
    requestedDate,
    accountHolderName,
    accountNo,
  })
  if (variant === 'PurchaseOrder') {
    return (
      <View style={{height: Layout.baseSize * 24}}>
        <PurchaseOrder
          type="Confirmed"
          loanToBeClosedBy={loanToBeClosedByforPO}
          paymentType={paymentTypeforPO}
          dealAmount={dealAmountforPO}
          loanAmount={loanAmountforPO}
          deliveryAmount={deliveryAmountforPO}
          holdbackAmount={holdbackAmountforPO}
          paymentAmount={paymentAmountforPO}
          payToBank={payToBankforPO}
          tokenAmount={tokenAmountforPO}
          documentCharges={documentChargesforPO}
          payToDealer={payToDealerforPO}
          remarks={remarksforPO}
        />
      </View>
    )
  }
  return (
    <View style={{height: Layout.baseSize * 24}}>
      <View style={styles.header}>
        <Column>
          <H2>{titleCaseToReadable(typeOfPayment)}</H2>
          <View
            style={{
              height: Layout.baseSize / 9,
              width: Layout.baseSize * 3,
              marginTop: Layout.baseSize / 5,
              backgroundColor: Colors.light.tabIconSelected,
            }}
          />
        </Column>

        <Icon iconName="keyboard-arrow-down" onPress={closeBottomSheet} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <DataRowItem
            label="Request Date"
            value={
              !!requestedDate
                ? format(new Date(requestedDate), 'dd MMM yyyy')
                : '-'
            }
          />
          <DataRowItem
            label="Payment Amount"
            value={typeSpecificPaymentAmount}
          />
          {typeOfPayment === PaymentFor.DealDelivery && (
            <DataRowItem
              label="Document Charges"
              value={`- ${documentChargesforPO}`}
            />
          )}
          <DataRowItem
            label="Payment Type"
            value={!!typeOfPayment ? titleCaseToReadable(typeOfPayment) : '-'}
          />
          {variant !== 'DeliveryExpense' && (
            <>
              <DataRowItem
                label="Bank Name"
                value={!!bankName ? titleCaseToReadable(bankName) : '-'}
              />
              <DataRowItem
                label="Account Holder Name"
                value={accountHolderName ?? '-'}
              />
              <DataRowItem label="Account Number" value={accountNo ?? '-'} />
              <DataRowItem label="IFSC Code" value={ifscCode ?? '-'} />
              <DataRowItem label="Account Proof" value={accountProof} isDoc />
              <Divider />
              <DataRowItem
                label="Payment Date"
                value={
                  !!paymentProcessedAt
                    ? format(new Date(paymentProcessedAt), 'dd MMM yyyy')
                    : '-'
                }
              />
              <DataRowItem
                label="Payment Mode"
                value={!!paymentMode ? titleCaseToReadable(paymentMode) : '-'}
              />
              <DataRowItem
                label="Payment Confirmation"
                value={receiptProof}
                isDoc
              />
            </>
          )}
        </View>
        {variant === 'DeliveryExpense' &&
          expenses
            ?.filter(e => e?.paymentStatus !== PaymentStatus.Rejected)
            ?.map((item, index) => (
              <DeliveryExpense
                key={index}
                amount={item.spentAmount}
                date={item?.createdAt?.substring(0, 10)}
                documentURL={item?.receiptUrl}
                expenseName={item.category}
              />
            ))}
      </ScrollView>
    </View>
  )
}

export default PaymentBottomSheet

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: Layout.baseSize / 2,
    paddingVertical: Layout.baseSize,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
})
