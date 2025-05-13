import {ScrollView, StyleSheet} from 'react-native'
import {IS_MANDATORY_FIELD} from '../../constants/constants'
import {
  BankName,
  PaymentFor,
  PaymentStatus,
} from '../../generated/hooks_and_more'
import useUpdateLeadInput, {
  useUpdateRemarksInput,
} from '../../hooks/useUpdateLeadInput'
import {FieldId} from '../../utils/FieldValidator'
import {isAlphaNumericCaptailStringValid} from '../../utils/formHelper'
import {enumToItems} from '../../utils/helpers'
import {Input} from '../basic/Input'
import PickerSelectButton, {Item} from '../basic/PickerSelectButton'
import RNFileUploader from '../basic/RNFileUploader'

type AddDealershipProcurementPaymentProps = {
  regNo: string
  leadId: string
  payFor: PaymentFor
}
const AddDealershipProcurementPayment = ({
  leadId,
  payFor,
  regNo,
}: AddDealershipProcurementPaymentProps) => {
  const {leadInput, setLeadInput} = useUpdateLeadInput(leadId)

  const {remarks, setRemarks} = useUpdateRemarksInput(regNo)

  const bankName = leadInput?.payments?.[0]?.bankName
  const accountholderName = leadInput?.payments?.[0]?.accountHolderName
  const accountNumber = leadInput?.payments?.[0]?.accountNo
  const ifscCode = leadInput?.payments?.[0]?.ifsc
  const bankAccountProofUrl = leadInput?.payments?.[0]?.proofUrl
  const isInputValid =
    !!leadInput?.payments?.[0]?.bankName &&
    !!leadInput?.payments?.[0]?.accountHolderName &&
    !!leadInput?.payments?.[0]?.accountNo &&
    !!leadInput?.payments?.[0]?.ifsc &&
    leadInput?.payments?.[0]?.ifsc?.length === 11 &&
    !!leadInput?.payments?.[0]?.proofUrl

  function onBankNameChange(value: string) {
    // log('Value on bank name change', value)
    setLeadInput({
      ...leadInput,
      payments: [
        {
          ...leadInput?.payments?.[0],
          bankName: value as BankName,
          status: PaymentStatus.Requested,
          for: payFor,
        },
      ],
    })
  }

  function onAccountholderNameChange(value?: string) {
    // setAccountholderName(value);
    setLeadInput({
      ...leadInput,
      payments: [
        {
          ...leadInput?.payments?.[0],
          accountHolderName: value,
          status: PaymentStatus.Requested,
          for: payFor,
        },
      ],
    })
  }

  function onAccountNumberChange(value?: string) {
    // setAccountNumber(value);
    setLeadInput({
      ...leadInput,
      payments: [
        {
          ...leadInput?.payments?.[0],
          accountNo: value,
          status: PaymentStatus.Requested,
          for: payFor,
        },
      ],
    })
  }

  function onSetIfscCodeChange(value?: string) {
    // setIfscCode(value);
    setLeadInput({
      ...leadInput,
      payments: [
        {
          ...leadInput?.payments?.[0],
          ifsc: value,
          status: PaymentStatus.Requested,
          for: payFor,
        },
      ],
    })
  }

  function onAddingProof(value?: string) {
    setLeadInput({
      ...leadInput,
      payments: [
        {
          ...leadInput?.payments?.[0],
          proofUrl: value,
          status: PaymentStatus.Requested,
          for: payFor,
        },
      ],
      documents: {
        ...leadInput?.documents,
        bankAccountProofUrl: value,
      },
    })
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <PickerSelectButton
        isRequired={IS_MANDATORY_FIELD}
        placeholder={'Select a Bank Name *'}
        value={bankName}
        onValueChange={onBankNameChange}
        items={enumToItems(BankName) as Item[]}
      />
      <Input
        key={'account-holder-name'}
        value={accountholderName}
        onChangeText={onAccountholderNameChange}
        label="Enter the Account holder Name *"
        isRequired={IS_MANDATORY_FIELD}
        uniqueKey="account-holder-name"
      />
      <Input
        key={'account-number'}
        label="Enter the Account Number *"
        // keyboardType="number-pad"
        value={accountNumber}
        onChangeText={onAccountNumberChange}
        isRequired={IS_MANDATORY_FIELD}
        uniqueKey="account-number"
        // checkValidation={isAlphaNumericCaptailStringValid(accountNumber)}
      />
      <Input
        key={'ifsc-code'}
        label="Enter IFSC code *"
        value={ifscCode}
        onChangeText={onSetIfscCodeChange}
        isRequired={IS_MANDATORY_FIELD}
        uniqueKey="ifsc-code"
        id={FieldId.IFSC_CODE}
        temporary
        isDataValid={isAlphaNumericCaptailStringValid(ifscCode)}
        minCharLength={1}
        maxCharLength={11}
      />
      <RNFileUploader
        isRequired={IS_MANDATORY_FIELD}
        variant="docs"
        header="Account Proof *"
        title="Upload Document"
        saveDoc={onAddingProof}
        value={bankAccountProofUrl}
      />
    </ScrollView>
  )
}
export default AddDealershipProcurementPayment

const styles = StyleSheet.create({})
