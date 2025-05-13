import {DateTimePickerEvent} from '@react-native-community/datetimepicker'
import React from 'react'
import {ScrollView, StyleSheet, View} from 'react-native'
import Layout from '../../../constants/Layout'
import {
  IS_MANDATORY_FIELD,
  IS_NOT_MANDATORY_FIELD,
} from '../../../constants/constants'
import {commonStyle} from '../../../constants/style'
import {
  PaymentFor,
  PaymentMethod,
  PaymentStatus,
  useGetLeadRefurbishmentDetailsQuery,
} from '../../../generated/hooks_and_more'
import useUpdateLeadInput, {
  useUpdateRemarksInput,
} from '../../../hooks/useUpdateLeadInput'
import {enumToItems} from '../../../utils/helpers'
import {DatePicker} from '../../basic/DatePicker'
import {Input} from '../../basic/Input'
import PickerSelectButton from '../../basic/PickerSelectButton'
import RNFileUploader from '../../basic/RNFileUploader'
import {P1} from '../../basic/StyledText'

type UploadPaymentProps = {
  leadId: string
  regNo: string
  requestId: string
}

const UploadPayment = ({leadId, regNo, requestId}: UploadPaymentProps) => {
  const {leadInput, setLeadInput} = useUpdateLeadInput(leadId)
  const {setRemarks} = useUpdateRemarksInput(regNo)
  const {data: refurbishmentData} = useGetLeadRefurbishmentDetailsQuery({
    variables: {regNo},
    fetchPolicy: 'network-only',
  })

  const transportationCost =
    refurbishmentData?.queryLead?.[0]?.refurbishmentDetails?.requests?.find(
      req => req?.id === requestId,
    )?.transportationCharge ?? 0

  const paymentAmount = leadInput?.payments?.[0]?.amount?.toString()
  const paymentModeFM = leadInput?.payments?.[0]?.modeFM
  const paymentDate = leadInput?.payments?.[0]?.paymentProcessedAt
  const receiptUrl = leadInput?.payments?.[0]?.receiptUrl

  const totalRefurbishmentAmount =
    refurbishmentData?.queryLead?.[0]?.refurbishmentDetails?.requests
      ?.find(req => req?.id === requestId)
      ?.purchase?.items?.reduce((acc, item) => acc + item.price, 0) ?? 0

  const totalPaymentAmount: number =
    totalRefurbishmentAmount + transportationCost

  const paymentCostBreakUp = [
    {
      id: 1,
      title: 'Refurbishment Charges',
      value: totalRefurbishmentAmount, // total cost of all items,
    },
    {
      id: 2,
      title: 'Transportation Charges',
      value: transportationCost, // 'Transportation Charges'
    },
    {
      id: 3,
      title: 'Total Payment',
      value: totalPaymentAmount, // 'Total Payment'
    },
  ]

  function onPaymentModeChange(value: string, index: number) {
    setLeadInput({
      ...leadInput,
      payments: [
        {
          ...leadInput?.payments?.[0],
          modeFM: value as PaymentMethod,
          for: PaymentFor.Refurbishment,
        },
      ],
      refurbishmentDetails: {
        ...leadInput?.refurbishmentDetails,
        requests: [
          {
            ...leadInput?.refurbishmentDetails?.requests?.[0],
            id: requestId,
          },
        ],
      },
    })
  }

  function onChangePaymentAmount(Amount: string) {
    setLeadInput({
      ...leadInput,
      payments: [
        {
          ...leadInput?.payments?.[0],
          amount: Number(Amount),
          status: PaymentStatus.Done,
          for: PaymentFor.Refurbishment,
        },
      ],
      refurbishmentDetails: {
        ...leadInput?.refurbishmentDetails,
        requests: [
          {
            ...leadInput?.refurbishmentDetails?.requests?.[0],
            id: requestId,
          },
        ],
      },
    })
  }

  function onChangePaymentDate(
    event: DateTimePickerEvent,
    selectedDate?: Date,
  ) {
    setLeadInput({
      ...leadInput,
      payments: [
        {
          ...leadInput?.payments?.[0],
          paymentProcessedAt: selectedDate,
          status: PaymentStatus.Done,
          for: PaymentFor.Refurbishment,
        },
      ],
      refurbishmentDetails: {
        ...leadInput?.refurbishmentDetails,
        requests: [
          {
            ...leadInput?.refurbishmentDetails?.requests?.[0],
            id: requestId,
          },
        ],
      },
    })
  }

  function onChangeRemarks(value: string) {
    setRemarks(value)
  }

  function onAddingPaymentProof(value: string) {
    setLeadInput({
      ...leadInput,
      payments: [
        {
          ...leadInput?.payments?.[0],
          receiptUrl: value,
        },
      ],
      refurbishmentDetails: {
        ...leadInput?.refurbishmentDetails,
        requests: [
          {
            ...leadInput?.refurbishmentDetails?.requests?.[0],
            id: requestId,
          },
        ],
      },
    })
  }

  return (
    <ScrollView style={commonStyle.mainAppContainer}>
      <View style={{paddingHorizontal: Layout.baseSize}}>
        {paymentCostBreakUp?.map((item, index) => (
          <View key={item.id + index?.toString()} style={styles.sectionStyle}>
            <P1>{item.title}</P1>
            <P1>{item?.value}</P1>
          </View>
        ))}
      </View>
      <View style={commonStyle.marginVertical5}>
        <PickerSelectButton
          placeholder={'Select Payment Mode *'}
          items={enumToItems(PaymentMethod)}
          onValueChange={onPaymentModeChange}
          value={paymentModeFM}
          isRequired={IS_MANDATORY_FIELD}
        />
      </View>
      <View style={commonStyle.marginBottom5}>
        <Input
          label="Enter the payment Amount in INR *"
          keyboardType="numeric"
          value={paymentAmount}
          onChangeText={onChangePaymentAmount}
          isRequired={IS_MANDATORY_FIELD}
          uniqueKey="payment-amount"
          checkValidation={totalPaymentAmount === Number(paymentAmount)}
        />
      </View>
      <View style={commonStyle.marginBottom5}>
        <DatePicker
          isRequired={IS_MANDATORY_FIELD}
          placeholder="Enter the Payment Date *"
          value={paymentDate as Date}
          onChange={onChangePaymentDate}
        />
      </View>
      <RNFileUploader
        variant="docs"
        header="Payment Receipt"
        title="Upload Document"
        saveDoc={onAddingPaymentProof}
        value={receiptUrl}
        isRequired
      />
      <View style={commonStyle.marginTop10}>
        <Input
          label="Enter the Remarks"
          onChangeText={onChangeRemarks}
          uniqueKey="Remarks"
          isRequired={IS_NOT_MANDATORY_FIELD}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  sectionStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
})

export default UploadPayment
