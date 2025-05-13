import {DateTimePickerEvent} from '@react-native-community/datetimepicker'
import React from 'react'
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
  UserRole,
} from '../../generated/hooks_and_more'
import useUpdateLeadInput, {
  useUpdateRemarksInput,
} from '../../hooks/useUpdateLeadInput'
import {checkCurrentRole} from '../../utils/checkCurrentRole'
import {isNumberValid} from '../../utils/formHelper'
import {enumToItems} from '../../utils/helpers'
import {DatePicker} from '../basic/DatePicker'
import {Input} from '../basic/Input'
import PickerSelectButton from '../basic/PickerSelectButton'
import RNFilerUploader from '../basic/RNFileUploader'
import Separator from '../basic/Separator'
import {P1} from '../basic/StyledText'
import {Row} from '../basic/StyledView'
import {useFinalParkingExpenses} from './useFinalParkingExpenses'

type FormComponentProps = {leadId: string | undefined}
const UploadPickupParkingPaymentReceipts = ({
  leadId = 'new',
}: FormComponentProps): JSX.Element => {
  // const [paymentAmount, setPaymentAmount] = useState<string>();
  // const [remarks, setRemarks] = useState<string>();
  // const [paymentDate, setPaymentDate] = useState<Date | undefined>(new Date());
  const {leadInput, setLeadInput} = useUpdateLeadInput(leadId)
  const registrationNumber = leadInput && leadInput.regNo
  // TODO : Update the payments object status and don't find the last created payment object, find via paymentFor Enum and update mutation for the same
  const {data: finalParking} = useFinalParkingExpenses(leadId)

  const {remarks, setRemarks} = useUpdateRemarksInput(
    registrationNumber as string,
  ) //TODO check

  const paymentAmount = leadInput?.payments?.[0]?.amount
  const paymentMode = leadInput?.payments?.[0]?.mode
  const paymentDate = leadInput?.payments?.[0]?.paymentProcessedAt

  function onAddingPickupParkingPaymentReceipt(value?: string) {
    setLeadInput({
      ...leadInput,
      payments: [
        {
          ...leadInput?.payments?.[0],
          receiptUrl: value,
          status: PaymentStatus.Done,
          for: PaymentFor.ParkingExpense,
        },
      ],
    })
  }

  function onChangePaymentAmount(Amount: string) {
    // setPaymentAmount(Amount);
    setLeadInput({
      ...leadInput,
      payments: [
        {
          ...leadInput?.payments?.[0],
          amount: Number(Amount),
          status: PaymentStatus.Done,
          for: PaymentFor.ParkingExpense,
        },
      ],
    })
  }
  function onChangeRemarks(value: string) {
    // setRemarks(text);
    setRemarks(value)
  }

  function onChangePaymentDate(
    event: DateTimePickerEvent,
    selectedDate?: Date,
  ) {
    // setPaymentDate(selectedDate);
    setLeadInput({
      ...leadInput,
      payments: [
        {
          ...leadInput?.payments?.[0],
          paymentProcessedAt: selectedDate,
          status: PaymentStatus.Done,
          for: PaymentFor.ParkingExpense,
        },
      ],
    })
  }

  function onPaymentModeChange(value: string) {
    setLeadInput({
      ...leadInput,
      payments: [
        {
          ...leadInput?.payments?.[0],
          mode: value as PaymentMethod,
          status: PaymentStatus.Done,
          for: PaymentFor.ParkingExpense,
        },
      ],
    })
  }

  const finalAmount = finalParking?.getLead?.finalParkingCharges ?? ''
  return (
    <View style={commonStyle.mainAppContainer}>
      <ScrollView style={commonStyle.flex1}>
        <Separator size={1} />
        <Row style={[commonStyle.sectionStyle, commonStyle.margin8]}>
          <P1>Approved parking charges</P1>
          <P1>{`₹ ${finalAmount}`}</P1>
        </Row>
        <PickerSelectButton
          placeholder={'Select Payment Mode *'}
          items={enumToItems(PaymentMethod)}
          onValueChange={onPaymentModeChange}
          value={paymentMode}
          isRequired={IS_MANDATORY_FIELD}
        />
        <Input
          label="Enter the payment Amount in INR *"
          keyboardType={'numeric'}
          value={paymentAmount?.toString()}
          onChangeText={onChangePaymentAmount}
          isRequired={IS_MANDATORY_FIELD}
          uniqueKey="payment-amount"
          checkValidation={finalAmount === paymentAmount}
        />
        <DatePicker
          isRequired={IS_MANDATORY_FIELD}
          placeholder="Enter the Payment Date *"
          value={paymentDate as Date}
          onChange={onChangePaymentDate}
        />
        <RNFilerUploader
          isRequired={IS_MANDATORY_FIELD}
          variant="docs"
          header="Payment Receipt"
          title="Upload Document"
          saveDoc={onAddingPickupParkingPaymentReceipt}
          value={leadInput?.payments?.[0]?.receiptUrl}
        />
        <Input
          label="Enter the Remarks"
          // value={remarks?.remarks}
          onChangeText={onChangeRemarks}
          uniqueKey="Remarks"
          isRequired={IS_NOT_MANDATORY_FIELD}
        />
      </ScrollView>
      {/* <Row style={commonStyle.buttonView}>
        <Button
          variant="primary"
          title={desiredButtonText ? desiredButtonText : "Upload Payment"}
          type="enable"
        />
      </Row> */}
    </View>
  )
}

export default UploadPickupParkingPaymentReceipts
