import React from 'react'
import {ScrollView, StyleSheet, View} from 'react-native'
import {IS_MANDATORY_FIELD} from '../../constants/constants'
import {commonStyle} from '../../constants/style'
import {
  BankName,
  PaymentFor,
  PaymentStatus,
} from '../../generated/hooks_and_more'
import useUpdateLeadInput from '../../hooks/useUpdateLeadInput'
import {isAlphaNumericCaptailStringValid} from '../../utils/formHelper'
import {enumToItems} from '../../utils/helpers'
import {Input} from '../basic/Input'
import PickerSelectButton, {Item} from '../basic/PickerSelectButton'
import RNFilerUploader from '../basic/RNFileUploader'

type FormComponentProps = {leadId: string | undefined}

const RequestDealPayment = ({
  leadId = 'new',
}: FormComponentProps): JSX.Element => {
  const {leadInput, setLeadInput} = useUpdateLeadInput(leadId)

  const bankName = leadInput?.payments?.[0]?.bankName
  const accountholderName = leadInput?.payments?.[0]?.accountHolderName
  const accountNumber = leadInput?.payments?.[0]?.accountNo
  const ifscCode = leadInput?.payments?.[0]?.ifsc
  // const lastPayment = leadInput?.payments && leadInput.payments[0]

  // console.log(
  //   `Bank name ${bankName}, accountholderName ${accountholderName},accountNumber ${accountNumber} `,
  // )

  // const [selectStateName, setSelectStateName] = useState<string>();
  // const [accountholderName, setAccountholderName] = useState<string>();
  // const [accountNumber, setAccountNumber] = useState<string>();
  // const [ifscCode, setIfscCode] = useState<string>();

  function onBankNameChange(value: string) {
    // log('Value on bank name change', value)
    setLeadInput({
      ...leadInput,
      payments: [
        {
          ...leadInput?.payments?.[0],
          bankName: value as BankName,
          status: PaymentStatus.Requested,
          for: PaymentFor.DealPayment,
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
          for: PaymentFor.DealPayment,
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
          for: PaymentFor.DealPayment,
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
          for: PaymentFor.DealPayment,
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
          for: PaymentFor.DealPayment,
        },
      ],
      documents: {
        ...leadInput?.documents,
        bankAccountProofUrl: value,
      },
    })
  }

  return (
    <View style={commonStyle.mainAppContainer}>
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
          // checkValidation={isAlphaNumericCaptailStringValid(ifscCode)}
          minCharLength={1}
          maxCharLength={11}
        />
        <RNFilerUploader
          isRequired={IS_MANDATORY_FIELD}
          variant="docs"
          header="Account Proof"
          title="Upload Document"
          saveDoc={onAddingProof}
          value={leadInput?.documents?.bankAccountProofUrl}
        />
      </ScrollView>
      {/* <Row style={commonStyle.buttonView}>
        <Button variant="primary" title={"Request payment"} type="enable" />
      </Row> */}
    </View>
  )
}

export default RequestDealPayment

const styles = StyleSheet.create({})
