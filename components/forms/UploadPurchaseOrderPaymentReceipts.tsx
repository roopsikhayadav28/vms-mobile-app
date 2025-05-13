import {DateTimePickerEvent} from '@react-native-community/datetimepicker'
import React, {useRef} from 'react'
import {ScrollView, StyleSheet, View} from 'react-native'
import {
  IS_MANDATORY_FIELD,
  IS_NOT_MANDATORY_FIELD,
} from '../../constants/constants'
import {commonStyle} from '../../constants/style'
import {
  PaymentFor,
  PaymentMethod,
  PaymentStatus,
  useGetLeadDealDetailsQuery,
} from '../../generated/hooks_and_more'
import useUpdateLeadInput, {
  useUpdateRemarksInput,
} from '../../hooks/useUpdateLeadInput'
import {enumToItems, titleCaseToReadable} from '../../utils/helpers'
import {DatePicker} from '../basic/DatePicker'
import {Input} from '../basic/Input'
import PickerSelectButton from '../basic/PickerSelectButton'
import RNFilerUploader from '../basic/RNFileUploader'
import Separator from '../basic/Separator'
import {P1} from '../basic/StyledText'
import {Row} from '../basic/StyledView'
import {FieldId} from '../../utils/FieldValidator'

type FormComponentProps = {
  leadId: string | undefined
  paymentFor?: PaymentFor
}

const UploadPurchaseOrderPaymentReceipts = ({
  leadId = 'new',
  paymentFor,
}: FormComponentProps): JSX.Element => {
  const {leadInput, setLeadInput} = useUpdateLeadInput(leadId)
  const registrationNumber = !!leadInput && leadInput.regNo
  let checkAmountRef = useRef<boolean>(false)

  const {remarks, setRemarks} = useUpdateRemarksInput(registrationNumber)
  const dealAmount = leadInput?.payments?.[0]?.amount
  const paymentMode = leadInput?.payments?.[0]?.mode
  const paymentDate = leadInput?.payments?.[0]?.createdAt
  const {data: dealData} = useGetLeadDealDetailsQuery({
    variables: {id: leadId},
  })
  const getAmount = dealData?.getLead?.payments?.find(
    i => i?.for === paymentFor && i?.status === PaymentStatus.Requested,
  )?.amount

  function onRemarksChange(remarks: string) {
    setRemarks(remarks)
  }

  function onPaymentModeChange(value: string) {
    setLeadInput({
      ...leadInput,
      payments: [
        {
          ...leadInput?.payments?.[0],
          mode: value as PaymentMethod,
          status: PaymentStatus.Done,
          for: paymentFor,
        },
      ],
    })
  }

  function onPaymentAmountChange(value: string) {
    setLeadInput({
      ...leadInput,
      payments: [
        {
          ...leadInput?.payments?.[0],
          amount: Number(value),
          status: PaymentStatus.Done,
          for: paymentFor,
        },
      ],
    })
    // console.log('final bid amount', leadInput?.finalBidAmount)
  }

  function onAddingPaymentReceipt(value: string) {
    setLeadInput({
      ...leadInput,
      // FIXME: type error
      payments: [
        {
          ...leadInput?.payments?.[0],
          receiptUrl: value,
          status: PaymentStatus.Done,
          for: paymentFor,
        },
      ],
      documents: {
        ...leadInput?.documents,
        dealPaymentProofUrl: value,
      },
    })
  }

  function onPaymentDateChange(event: DateTimePickerEvent, date: Date) {
    // setPickupDate(date ?? new Date());
    // log('payment date', date)
    setLeadInput({
      ...leadInput,
      payments: [
        {
          ...leadInput?.payments?.[0],
          createdAt: date,
          status: PaymentStatus.Done,
          for: paymentFor,
        },
      ],
    })
  }

  return (
    <View style={commonStyle.mainAppContainer}>
      <ScrollView>
        <Separator size={1} />
        <Row style={styles.sectionStyle}>
          <P1>{titleCaseToReadable(paymentFor)}</P1>
          <P1>{`₹ ${getAmount}`}</P1>
        </Row>
        <Separator size={1} />
        <PickerSelectButton
          placeholder={'Select Payment Mode *'}
          items={enumToItems(PaymentMethod)}
          onValueChange={onPaymentModeChange}
          value={paymentMode}
          isRequired={IS_MANDATORY_FIELD}
        />
        <Input
          key="loan-repayment-amount"
          uniqueKey="loan-repayment-amount"
          label="Enter the payment Amount in INR *"
          keyboardType={'numeric'}
          value={dealAmount?.toString()}
          onChangeText={onPaymentAmountChange}
          isRequired={IS_MANDATORY_FIELD}
          checkValidation={dealAmount === getAmount}
        />
        <DatePicker
          placeholder="Enter the Payment Date *"
          value={paymentDate}
          onChange={onPaymentDateChange}
          isRequired={IS_MANDATORY_FIELD}
        />
        {/*  <PickerSelectButton placeholder={{label:'Select Your Option', value:null}} onValueChange={()=>{}} items={['a','b']}
          variant="date"
          placeholder="Enter the Payment Date"
        /> */}
        <Separator size={1} />
        <RNFilerUploader
          isRequired={IS_MANDATORY_FIELD}
          variant="docs"
          header="Payment Receipt"
          title="Upload Document"
          saveDoc={onAddingPaymentReceipt}
          value={leadInput?.documents?.dealPaymentProofUrl}
        />
        <Separator size={1} />
        <Input
          label="Enter the Remarks"
          // value={remarks?.remarks}
          onChangeText={onRemarksChange}
          uniqueKey="Remarks"
          isRequired={IS_NOT_MANDATORY_FIELD}
        />
      </ScrollView>
      {/* <Row style={commonStyle.buttonView}>
        <Button variant="primary" title={"Upload Payment"} type="enable" />
      </Row> */}
    </View>
  )
}

export default UploadPurchaseOrderPaymentReceipts

const styles = StyleSheet.create({
  sectionStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'stretch',
  },
})
