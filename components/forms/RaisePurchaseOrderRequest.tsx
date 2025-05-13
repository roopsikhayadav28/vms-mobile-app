import React, {useEffect, useState} from 'react'
import {StyleSheet, View} from 'react-native'
import {ScrollView} from 'react-native-gesture-handler'
import {commonStyle} from '../../constants/style'
import {
  LoanToBeClosedBy,
  PaymentFor,
  PaymentStatus,
  PaymentType,
  useGetLeadDealDetailsQuery,
} from '../../generated/hooks_and_more'
import useUpdateLeadInput, {
  useUpdateRemarksInput,
} from '../../hooks/useUpdateLeadInput'
import {FieldId} from '../../utils/FieldValidator'
import {enumToItems, log} from '../../utils/helpers'
import {Input} from '../basic/Input'
import PickerSelectButton from '../basic/PickerSelectButton'
import PurchaseOrder from '../composite/PurchaseOrder'

type FormComponentProps = {leadId: string | undefined; registrationNo?: string}

const RaisePurchaseOrderRequest = ({
  leadId,
  registrationNo,
}: FormComponentProps) => {
  const {leadInput, setLeadInput} = useUpdateLeadInput(leadId)
  const {remarks, setRemarks} = useUpdateRemarksInput(leadId)
  const [amountToDealer, setAmountToDealer] = useState<number>(0)
  const [deliveryAmount, setDeliveryAmount] = useState<number>()
  const [paymentTypeForPR, setPaymentTypeForPR] = useState<PaymentType>(
    PaymentType.PayInFull,
  )
  const {data: dealData, loading} = useGetLeadDealDetailsQuery({
    skip: leadId === 'new',
    fetchPolicy: 'cache-and-network',
    variables: {
      id: leadId,
    },
    onCompleted: ({getLead}) => {
      log('Dealership Raise Purchase request', getLead?.loanAmount)

      // const {amntToDealer, deliveryAm} = derivePurchaseOrder({
      //   dealAmount: dealAmount,
      //   documentCh: documentCharges,
      //   holdbackAm: holdbackAmount,
      //   loanAmount: loanAmount,
      //   loanCloser: loanToClosedBy,
      //   paymentTypeForPR: paymentTypeForPR,
      //   tokenAmount: tokenAmount,
      // })
      // !!amntToDealer && setAmountToDealer(amntToDealer)
      // !!deliveryAm && !tokenAmount && setDeliveryAmount(deliveryAm)
      // setIsCalculating(false)
    },
  })
  const isVehicleFinanced = dealData?.getLead?.vehicle?.isVehicleFinanced
  const isLoanClosed =
    dealData?.getLead?.vehicle?.financingDetails?.isLoanClosed
  const dealAmount = dealData?.getLead?.approvedDealAmount
  const documentCharges = dealData?.getLead?.documentCharges
  const holdbackAmount = dealData?.getLead?.holdbackAmount
  const paymentAmount = !!documentCharges
    ? dealData?.getLead?.approvedDealAmount - documentCharges
    : dealData?.getLead?.approvedDealAmount

  const loanAmount =
    dealData?.getLead?.vehicle?.financingDetails?.pendingLoanAmount
  const tokenAmount = leadInput?.tokenAmount
  // const paymentType = dealData?.getLead?.

  const loanToClosedBy = leadInput?.vehicle?.financingDetails?.loanToBeClosedBy
  const deliveryAmount1 = !!tokenAmount
    ? dealAmount -
      (loanToClosedBy === LoanToBeClosedBy.TractorJunction ? loanAmount : 0) -
      holdbackAmount -
      documentCharges -
      tokenAmount
    : dealAmount -
      (loanToClosedBy === LoanToBeClosedBy.TractorJunction ? loanAmount : 0) -
      holdbackAmount -
      documentCharges
  const amountToDealer1 =
    loanToClosedBy === LoanToBeClosedBy.TractorJunction
      ? dealAmount - loanAmount - documentCharges
      : dealAmount - documentCharges

  // TODO: useEffect dependency array will be refactored later
  useEffect(() => {
    if (holdbackAmount > 0 && paymentTypeForPR === PaymentType.PayInFull) {
      setPaymentTypeForPR(PaymentType.PayInParts)
    }

    setPayments()
  }, [holdbackAmount, loanToClosedBy, tokenAmount, paymentTypeForPR])

  function onChangingPaymentType(value: string, index: number) {
    setPaymentTypeForPR(value as PaymentType)
    if (value === PaymentType.PayInFull && !holdbackAmount) {
      setLeadInput({
        ...leadInput,
        tokenAmount: 0,
        payments: leadInput?.payments?.map(payment => ({
          ...payment,
          type: value as PaymentType,
        })),
      })
    } else {
      setLeadInput({
        ...leadInput,
        payments: leadInput?.payments?.map(payment => ({
          ...payment,
          type: value as PaymentType,
        })),
      })
    }
  }
  function onChangingLoanCloser(value: string, index: number) {
    setLeadInput({
      ...leadInput,
      vehicle: {
        ...leadInput?.vehicle,
        financingDetails: {
          ...leadInput?.vehicle?.financingDetails,
          loanToBeClosedBy: value as LoanToBeClosedBy,
        },
      },
      payments: leadInput?.payments?.map(payment => ({
        ...payment,
        loanClosedBy: value as LoanToBeClosedBy,
        status: PaymentStatus.Estimated,
        for: PaymentFor.LoanRepayment,
      })),
    })
  }

  function setPayments() {
    //TODO: Refactor this code
    if (
      paymentTypeForPR === PaymentType.PayInFull &&
      !!loanAmount &&
      loanToClosedBy === LoanToBeClosedBy.TractorJunction
    ) {
      setLeadInput({
        ...leadInput,
        vehicle: {
          ...leadInput?.vehicle,
          financingDetails: {
            ...leadInput?.vehicle?.financingDetails,
            loanToBeClosedBy: loanToClosedBy,
          },
        },
        paymentType: paymentTypeForPR,
        payments: [
          {
            for: PaymentFor.LoanRepayment,
            status: PaymentStatus.Estimated,
            amount: loanAmount,
            type: paymentTypeForPR,
            loanClosedBy: loanToClosedBy,
          },
          {
            for: PaymentFor.DealPayment,
            status: PaymentStatus.Estimated,
            amount: dealAmount,
            type: paymentTypeForPR,
            loanClosedBy: loanToClosedBy,
          },
        ],
      })
    } else if (
      paymentTypeForPR === PaymentType.PayInFull &&
      !!loanAmount &&
      loanToClosedBy !== LoanToBeClosedBy.TractorJunction
    ) {
      setLeadInput({
        ...leadInput,
        vehicle: {
          ...leadInput?.vehicle,
          financingDetails: {
            ...leadInput?.vehicle?.financingDetails,
            loanToBeClosedBy: loanToClosedBy,
          },
        },
        paymentType: paymentTypeForPR,
        payments: [
          {
            for: PaymentFor.DealPayment,
            status: PaymentStatus.Estimated,
            amount: dealAmount,
            type: paymentTypeForPR,
            loanClosedBy: loanToClosedBy,
          },
        ],
      })
    } else if (paymentTypeForPR === PaymentType.PayInFull && !loanAmount) {
      setLeadInput({
        ...leadInput,
        vehicle: {
          ...leadInput?.vehicle,
          financingDetails: {
            ...leadInput?.vehicle?.financingDetails,
            loanToBeClosedBy: loanToClosedBy,
          },
        },
        paymentType: paymentTypeForPR,
        payments: [
          {
            for: PaymentFor.DealPayment,
            status: PaymentStatus.Estimated,
            amount: dealAmount,
            type: paymentTypeForPR,
          },
        ],
      })
    } else if (
      paymentTypeForPR === PaymentType.PayInParts &&
      !!loanAmount &&
      !!holdbackAmount &&
      loanToClosedBy === LoanToBeClosedBy.TractorJunction &&
      !!tokenAmount
    ) {
      // Case 1: Loan paid by Tractor Junction, holdback amount present, token amount required
      setLeadInput({
        ...leadInput,
        vehicle: {
          ...leadInput?.vehicle,
          financingDetails: {
            ...leadInput?.vehicle?.financingDetails,
            loanToBeClosedBy: loanToClosedBy,
          },
        },
        paymentType: paymentTypeForPR,
        payments: [
          {
            for: PaymentFor.DealToken,
            status: PaymentStatus.Estimated,
            amount: tokenAmount,
            type: paymentTypeForPR,
          },
          {
            for: PaymentFor.DealDelivery,
            status: PaymentStatus.Estimated,
            amount: deliveryAmount1,
            type: paymentTypeForPR,
          },
          {
            for: PaymentFor.HoldbackRepayment,
            status: PaymentStatus.Estimated,
            amount: holdbackAmount,
            type: paymentTypeForPR,
          },
          {
            for: PaymentFor.LoanRepayment,
            status: PaymentStatus.Estimated,
            amount: loanAmount,
            type: paymentTypeForPR,
          },
        ],
      })
    } else if (
      paymentTypeForPR === PaymentType.PayInParts &&
      !!loanAmount &&
      !!holdbackAmount &&
      loanToClosedBy === LoanToBeClosedBy.TractorJunction &&
      !tokenAmount
    ) {
      // Case 2: Loan paid by Tractor Junction, holdback amount present, no token amount required
      setLeadInput({
        ...leadInput,
        vehicle: {
          ...leadInput?.vehicle,
          financingDetails: {
            ...leadInput?.vehicle?.financingDetails,
            loanToBeClosedBy: loanToClosedBy,
          },
        },
        paymentType: paymentTypeForPR,
        payments: [
          {
            for: PaymentFor.DealDelivery,
            status: PaymentStatus.Estimated,
            amount: deliveryAmount1,
            type: paymentTypeForPR,
          },
          {
            for: PaymentFor.HoldbackRepayment,
            status: PaymentStatus.Estimated,
            amount: holdbackAmount,
            type: paymentTypeForPR,
          },
          {
            for: PaymentFor.LoanRepayment,
            status: PaymentStatus.Estimated,
            amount: loanAmount,
            type: paymentTypeForPR,
          },
        ],
      })
    } else if (
      paymentTypeForPR === PaymentType.PayInParts &&
      !!loanAmount &&
      !holdbackAmount &&
      loanToClosedBy === LoanToBeClosedBy.TractorJunction &&
      !!tokenAmount
    ) {
      // Case 3: Loan paid by Tractor Junction, no holdback amount, token amount required
      setLeadInput({
        ...leadInput,
        vehicle: {
          ...leadInput?.vehicle,
          financingDetails: {
            ...leadInput?.vehicle?.financingDetails,
            loanToBeClosedBy: loanToClosedBy,
          },
        },
        paymentType: paymentTypeForPR,
        payments: [
          {
            for: PaymentFor.DealToken,
            status: PaymentStatus.Estimated,
            amount: tokenAmount,
            type: paymentTypeForPR,
          },
          {
            for: PaymentFor.DealDelivery,
            status: PaymentStatus.Estimated,
            amount: deliveryAmount1,
            type: paymentTypeForPR,
          },
          {
            for: PaymentFor.LoanRepayment,
            status: PaymentStatus.Estimated,
            amount: loanAmount,
            type: paymentTypeForPR,
          },
        ],
      })
    } else if (
      paymentTypeForPR === PaymentType.PayInParts &&
      !!loanAmount &&
      !holdbackAmount &&
      loanToClosedBy === LoanToBeClosedBy.TractorJunction &&
      !tokenAmount
    ) {
      // Case 4: Loan paid by Tractor Junction, no holdback amount, no token amount
      setLeadInput({
        ...leadInput,
        vehicle: {
          ...leadInput?.vehicle,
          financingDetails: {
            ...leadInput?.vehicle?.financingDetails,
            loanToBeClosedBy: loanToClosedBy,
          },
        },
        paymentType: paymentTypeForPR,
        payments: [
          {
            for: PaymentFor.DealDelivery,
            status: PaymentStatus.Estimated,
            amount: deliveryAmount1,
            type: paymentTypeForPR,
          },
          {
            for: PaymentFor.LoanRepayment,
            status: PaymentStatus.Estimated,
            amount: loanAmount,
            type: paymentTypeForPR,
          },
        ],
      })
    } else if (
      paymentTypeForPR === PaymentType.PayInParts &&
      !!loanAmount &&
      !!holdbackAmount &&
      loanToClosedBy !== LoanToBeClosedBy.TractorJunction &&
      !!tokenAmount
    ) {
      // Case 1: Loan not paid by Tractor Junction, holdback amount present, token amount required
      setLeadInput({
        ...leadInput,
        vehicle: {
          ...leadInput?.vehicle,
          financingDetails: {
            ...leadInput?.vehicle?.financingDetails,
            loanToBeClosedBy: loanToClosedBy,
          },
        },
        paymentType: paymentTypeForPR,
        payments: [
          {
            for: PaymentFor.DealToken,
            status: PaymentStatus.Estimated,
            amount: tokenAmount,
            type: paymentTypeForPR,
          },
          {
            for: PaymentFor.DealDelivery,
            status: PaymentStatus.Estimated,
            amount: deliveryAmount1,
            type: paymentTypeForPR,
          },
          {
            for: PaymentFor.HoldbackRepayment,
            status: PaymentStatus.Estimated,
            amount: holdbackAmount,
            type: paymentTypeForPR,
          },
        ],
      })
    } else if (
      paymentTypeForPR === PaymentType.PayInParts &&
      !!loanAmount &&
      !!holdbackAmount &&
      loanToClosedBy !== LoanToBeClosedBy.TractorJunction &&
      !tokenAmount
    ) {
      // Case 2: Loan not paid by Tractor Junction, holdback amount present, no token amount required
      setLeadInput({
        ...leadInput,
        vehicle: {
          ...leadInput?.vehicle,
          financingDetails: {
            ...leadInput?.vehicle?.financingDetails,
            loanToBeClosedBy: loanToClosedBy,
          },
        },
        paymentType: paymentTypeForPR,
        payments: [
          {
            for: PaymentFor.DealDelivery,
            status: PaymentStatus.Estimated,
            amount: deliveryAmount1,
            type: paymentTypeForPR,
          },
          {
            for: PaymentFor.HoldbackRepayment,
            status: PaymentStatus.Estimated,
            amount: holdbackAmount,
            type: paymentTypeForPR,
          },
        ],
      })
    } else if (
      paymentTypeForPR === PaymentType.PayInParts &&
      !!loanAmount &&
      !holdbackAmount &&
      loanToClosedBy !== LoanToBeClosedBy.TractorJunction &&
      !!tokenAmount
    ) {
      // Case 3: Loan not paid by Tractor Junction, no holdback amount, token amount required
      setLeadInput({
        ...leadInput,
        vehicle: {
          ...leadInput?.vehicle,
          financingDetails: {
            ...leadInput?.vehicle?.financingDetails,
            loanToBeClosedBy: loanToClosedBy,
          },
        },
        paymentType: paymentTypeForPR,
        payments: [
          {
            for: PaymentFor.DealToken,
            status: PaymentStatus.Estimated,
            amount: tokenAmount,
            type: paymentTypeForPR,
          },
          {
            for: PaymentFor.DealDelivery,
            status: PaymentStatus.Estimated,
            amount: deliveryAmount1,
            type: paymentTypeForPR,
          },
        ],
      })
    } else if (
      paymentTypeForPR === PaymentType.PayInParts &&
      !!loanAmount &&
      !holdbackAmount &&
      loanToClosedBy !== LoanToBeClosedBy.TractorJunction &&
      !tokenAmount
    ) {
      // Case 4: Loan not paid by Tractor Junction, no holdback amount, no token amount
      setLeadInput({
        ...leadInput,
        vehicle: {
          ...leadInput?.vehicle,
          financingDetails: {
            ...leadInput?.vehicle?.financingDetails,
            loanToBeClosedBy: loanToClosedBy,
          },
        },
        paymentType: paymentTypeForPR,
        payments: [
          {
            for: PaymentFor.DealDelivery,
            status: PaymentStatus.Estimated,
            amount: deliveryAmount1,
            type: paymentTypeForPR,
          },
        ],
      })
    } else if (
      paymentTypeForPR === PaymentType.PayInParts &&
      !loanAmount &&
      !!holdbackAmount &&
      !!tokenAmount
    ) {
      // Case 1: Loan not paid by Tractor Junction, holdback amount present, token amount required
      setLeadInput({
        ...leadInput,
        vehicle: {
          ...leadInput?.vehicle,
          financingDetails: {
            ...leadInput?.vehicle?.financingDetails,
          },
        },
        paymentType: paymentTypeForPR,
        payments: [
          {
            for: PaymentFor.DealToken,
            status: PaymentStatus.Estimated,
            amount: tokenAmount,
            type: paymentTypeForPR,
          },
          {
            for: PaymentFor.DealDelivery,
            status: PaymentStatus.Estimated,
            amount: deliveryAmount1,
            type: paymentTypeForPR,
          },
          {
            for: PaymentFor.HoldbackRepayment,
            status: PaymentStatus.Estimated,
            amount: holdbackAmount,
            type: paymentTypeForPR,
          },
        ],
      })
    } else if (
      paymentTypeForPR === PaymentType.PayInParts &&
      !loanAmount &&
      !!holdbackAmount &&
      !tokenAmount
    ) {
      // Case 2: Loan not paid by Tractor Junction, holdback amount present, no token amount required
      setLeadInput({
        ...leadInput,
        vehicle: {
          ...leadInput?.vehicle,
          financingDetails: {
            ...leadInput?.vehicle?.financingDetails,
          },
        },
        paymentType: paymentTypeForPR,
        payments: [
          {
            for: PaymentFor.DealDelivery,
            status: PaymentStatus.Estimated,
            amount: deliveryAmount1,
            type: paymentTypeForPR,
          },
          {
            for: PaymentFor.HoldbackRepayment,
            status: PaymentStatus.Estimated,
            amount: holdbackAmount,
            type: paymentTypeForPR,
          },
        ],
      })
    } else if (
      paymentTypeForPR === PaymentType.PayInParts &&
      !loanAmount &&
      !holdbackAmount &&
      !!tokenAmount
    ) {
      // Case 3: Loan not paid by Tractor Junction, no holdback amount, token amount required
      setLeadInput({
        ...leadInput,
        vehicle: {
          ...leadInput?.vehicle,
          financingDetails: {
            ...leadInput?.vehicle?.financingDetails,
          },
        },
        paymentType: paymentTypeForPR,
        payments: [
          {
            for: PaymentFor.DealToken,
            status: PaymentStatus.Estimated,
            amount: tokenAmount,
            type: paymentTypeForPR,
          },
          {
            for: PaymentFor.DealDelivery,
            status: PaymentStatus.Estimated,
            amount: deliveryAmount1,
            type: paymentTypeForPR,
          },
        ],
      })
    } else if (
      paymentTypeForPR === PaymentType.PayInParts &&
      !loanAmount &&
      !holdbackAmount &&
      !tokenAmount
    ) {
      // Case 4: Loan not paid by Tractor Junction, no holdback amount, no token amount
      setLeadInput({
        ...leadInput,
        vehicle: {
          ...leadInput?.vehicle,
          financingDetails: {
            ...leadInput?.vehicle?.financingDetails,
          },
        },
        paymentType: paymentTypeForPR,
        payments: [
          {
            for: PaymentFor.DealDelivery,
            status: PaymentStatus.Estimated,
            amount: deliveryAmount1,
            type: paymentTypeForPR,
          },
        ],
      })
    }
  }

  function onAddingTokenAmount(value: string) {
    setPayments()
    setLeadInput({
      ...leadInput,
      tokenAmount: Number(value),
    })

    // const {amntToDealer, deliveryAm} = derivePurchaseOrder({
    //   dealAmount: dealAmount,
    //   documentCh: documentCharges,
    //   holdbackAm: holdbackAmount,
    //   loanAmount: loanAmount,
    //   loanCloser: loanToClosedBy,
    //   paymentTypeForPR: paymentTypeForPR,
    //   tokenAmount: Number(tokenAmount),
    // })
    // !!amntToDealer && setAmountToDealer(amntToDealer)
    // !!deliveryAm && setDeliveryAmount(deliveryAm)
    // setIsCalculating(false)
  }

  function onAddingRemarks(value: string) {
    setRemarks(value)
  }

  // type DerivePurchaseOrderProps = {
  //   dealAmount: number
  //   loanCloser: LoanToBeClosedBy
  //   documentCh: number
  //   tokenAmount: number
  //   loanAmount: number
  //   holdbackAm: number
  //   paymentTypeForPR: PaymentType
  // }

  // const derivePurchaseOrder = ({
  //   dealAmount,
  //   loanCloser,
  //   documentCh,
  //   tokenAmount,
  //   loanAmount,
  //   holdbackAm,
  //   paymentTypeForPR,
  // }: DerivePurchaseOrderProps) => {
  //   if (paymentTypeForPR === PaymentType.PayInFull && !loanAmount) {
  //     const amntToDealer = dealAmount

  //     return {amntToDealer}
  //   } else if (
  //     paymentTypeForPR === PaymentType.PayInParts &&
  //     loanCloser === LoanToBeClosedBy.TractorJunction &&
  //     !tokenAmount
  //   ) {
  //     const amntToDealer = dealAmount - loanAmount
  //     const deliveryAm = dealAmount - loanAmount - documentCh - holdbackAm
  //     return {amntToDealer, deliveryAm}
  //   } else if (
  //     paymentTypeForPR === PaymentType.PayInParts &&
  //     loanCloser === LoanToBeClosedBy.TractorJunction &&
  //     tokenAmount
  //   ) {
  //     const amntToDealer = dealAmount - loanAmount
  //     const deliveryAm =
  //       dealAmount - loanAmount - documentCh - holdbackAm - tokenAmount
  //     return {amntToDealer, deliveryAm}
  //   }
  // }
  return (
    <View style={commonStyle.mainAppContainer}>
      <ScrollView>
        {/* <H2 >RaisePurchaseOrderRequest</H2> */}
        {isVehicleFinanced && !isLoanClosed && (
          <PickerSelectButton
            placeholder="Loan To Be Closed By *"
            value={loanToClosedBy}
            items={enumToItems(LoanToBeClosedBy)}
            onValueChange={onChangingLoanCloser}
            isRequired
          />
        )}

        <PickerSelectButton
          placeholder="Payment Type *"
          value={paymentTypeForPR}
          disabled={holdbackAmount > 0}
          items={enumToItems(PaymentType)}
          onValueChange={onChangingPaymentType}
          isRequired
        />
        {paymentTypeForPR === PaymentType.PayInParts && (
          <Input
            label={'Token Amount in INR *'}
            value={tokenAmount?.toString()}
            onChangeText={onAddingTokenAmount}
          />
        )}
        <PurchaseOrder
          type="Requested"
          loading={loading}
          paymentType={paymentTypeForPR}
          dealAmount={dealAmount}
          deliveryAmount={deliveryAmount1}
          documentCharges={documentCharges}
          holdbackAmount={holdbackAmount}
          loanAmount={loanAmount}
          payToBank={
            loanToClosedBy === LoanToBeClosedBy.TractorJunction ? loanAmount : 0
          }
          loanToBeClosedBy={loanToClosedBy}
          payToDealer={amountToDealer1}
          paymentAmount={paymentAmount}
          tokenAmount={tokenAmount}
        />
        <Input
          id={FieldId.REMARKS}
          label={'Enter the remarks'}
          value={remarks?.remarks}
          onChangeText={onAddingRemarks}
        />
      </ScrollView>
    </View>
  )
}

export default RaisePurchaseOrderRequest

const styles = StyleSheet.create({})
