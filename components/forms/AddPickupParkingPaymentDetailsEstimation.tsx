import _ from 'lodash'
import React, {useEffect, useState} from 'react'
import {ScrollView, View} from 'react-native'
import {
  IS_MANDATORY_FIELD,
  IS_NOT_MANDATORY_FIELD,
} from '../../constants/constants'
import {commonStyle} from '../../constants/style'
import {
  BankName,
  PaymentFor,
  PaymentMethod,
  PaymentStatus,
  useGetAllParkingBeneficiaryQuery,
  useGetLeadDetailsQuery,
} from '../../generated/hooks_and_more'
import useUpdateLeadInput, {
  useUpdateRemarksInput,
} from '../../hooks/useUpdateLeadInput'
import {isNumberValid, isUpiValid} from '../../utils/formHelper'
import {calculateParkingCharge, enumToItems, log} from '../../utils/helpers'
import {Input} from '../basic/Input'
import PickerSelectButton, {Item} from '../basic/PickerSelectButton'
import RNFilerUploader from '../basic/RNFileUploader'
import RNRadioButton from '../basic/RNRadioButton'

type FormComponentProps = {leadId: string | undefined; regNo?: string}

const AddPickupParkingPaymentDetailsEstimation = ({
  leadId = 'new',
  regNo,
}: FormComponentProps): JSX.Element => {
  const {leadInput, setLeadInput} = useUpdateLeadInput(leadId)
  // const {data: banksData} = useAllBanksQuery()
  log('reg no in AddPickupEstform props', {regNo, leadId})
  // const registrationNumber = leadInput && leadInput.regNo
  const {remarks, setRemarks} = useUpdateRemarksInput(
    // registrationNumber as string,
    regNo,
  )
  const perDayParkingCharge = leadInput?.yard?.perDayParkingCharge
  // const {data: yardsData} = useGetAllYardQuery({
  //   // fetchPolicy: 'network-only',
  //   onCompleted: data => {
  //     log('Yards data', data)
  //   },
  // })
  // const [perDayParkingCharge, setPerDayParkingCharge] = useState<number>(0)

  const {data: leadDetailsData} = useGetLeadDetailsQuery({
    fetchPolicy: 'network-only',
    variables: {
      regNo: regNo as string,
    },
    onCompleted: ({getLead}) => {
      // rehydrate per day parking charge from the server
      setLeadInput({
        ...leadInput,
        yard: {
          ...leadInput?.yard,
          perDayParkingCharge: getLead?.yard?.perDayParkingCharge,
        },
      })
    },
  })
  const estimatedCharges = calculateParkingCharge({
    expectedPickupDate: leadDetailsData?.getLead?.expectedPickupDate,
    repossessionDate: leadDetailsData?.getLead?.vehicle?.repossessionDate,
    perDayParkingCharge,
  })
  // console.log('These are the estimated parking charges', estimatedCharges)
  const {data: parkingBenificiaryData} = useGetAllParkingBeneficiaryQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: data => {
      // setPerDayParkingCharge(perDayParkingCharge)
      // log('parkingBenificiaryData----------', data)
    },
  })

  // const paymentMode = leadInput?.payments?.[0]?.mode
  const [paymentMode, setPaymentMode] = useState('first')
  const selectBank = leadInput?.auctionByBank
  const accHolderName = leadInput?.parkingBeneficiary?.accountHolderName
  const accountNumber = leadInput?.parkingBeneficiary?.accountNumber
  const ifscCode = leadInput?.parkingBeneficiary?.ifscCode
  const upiId = leadInput?.payments?.[0]?.upiId
  const beneficiaryId = leadInput?.parkingBeneficiary?.id
  const bankName = leadInput?.parkingBeneficiary?.bankName
  // if payment mode is UPI then account proof should be from payment else from parking beneficiary

  const beneficiaryAccountProof =
    leadInput?.payments?.[0]?.mode === PaymentMethod.Upi
      ? leadInput?.payments?.[0]?.proofUrl
      : leadInput?.parkingBeneficiary?.proofUrl

  useEffect(() => {
    if (paymentMode === 'first') {
      setLeadInput({
        ...leadInput,
        estimatedParkingCharges: estimatedCharges,
        payments: [
          {
            ...leadInput?.payments?.[0],
            mode:
              paymentMode === 'first'
                ? PaymentMethod.BankTransferNeft
                : PaymentMethod.Upi,
            for: PaymentFor.ParkingExpense,
            status: PaymentStatus.Estimated,
          },
        ],
      })
    }
  }, [])

  const accountHolderNameList: Item[] =
    parkingBenificiaryData?.queryParkingBeneficiary
      ?.map(item => ({
        label: _.capitalize(item?.accountHolderName),
        value: item?.id,
      }))
      .concat([{label: 'Add new Benificiary', value: null}])

  // log('perDayParkingCharge ? perDayParkingCharge?.toString()................', {
  //   perDayParkingCharge,
  // })

  // useEffect(() => {
  //   setPerDayParkingCharge(perDayParkingCharge)
  //   setLeadInput({
  //     ...leadInput,
  //     yard: {
  //       ...leadInput?.yard,
  //       perDayParkingCharge: perDayParkingCharge,
  //     },
  //   })
  // }, [])
  // const [paymentModes, setPaymentMode] = useState<'first' | 'second'>('first')

  // log('Selected bank name', bankName)

  function onperDayParkingChargesChange(value: string) {
    // setPerDayParkingCharge(value)
    // log('from input', value)
    // perDayParkingCharge = Number(value)
    setLeadInput({
      ...leadInput,
      estimatedParkingCharges: estimatedCharges,
      yard: {
        ...leadInput?.yard,
        perDayParkingCharge: Number(value),
      },
    })
  }

  // console.log('Payment mode', leadInput?.payments?.[0]?.mode)

  function onPaymentModeChange(value: string) {
    setPaymentMode(value)
    console.log('value', value)
    setLeadInput({
      ...leadInput,
      estimatedParkingCharges: estimatedCharges,
      payments: [
        {
          ...leadInput?.payments?.[0],
          // proofUrl: null,
          mode:
            value === 'first'
              ? PaymentMethod.BankTransferNeft
              : PaymentMethod.Upi,
          for: PaymentFor.ParkingExpense,
          status: PaymentStatus.Estimated,
        },
      ],
      parkingBeneficiary: {},
      documents: {},
    })
  }

  /**
   * Set the bank name when we are selecting from the dropdown list
   */
  function onBankNameChange(value: string) {
    setLeadInput({
      ...leadInput,
      estimatedParkingCharges: estimatedCharges,
      parkingBeneficiary: {
        ...leadInput?.parkingBeneficiary,
        bankName: value as BankName,
      },
      payments: [
        {
          ...leadInput?.payments?.[0],
          parkingBeneficiary: {
            ...leadInput?.parkingBeneficiary,
            bankName: value as BankName,
          },
          bankName: value as BankName,
          for: PaymentFor.ParkingExpense,
          status: PaymentStatus.Estimated,
        },
      ],
    })
  }

  function onAccHolderNameChange(value: string) {
    // setAccHolderName(value);
    setLeadInput({
      ...leadInput,
      estimatedParkingCharges: estimatedCharges,
      parkingBeneficiary: {
        ...leadInput?.parkingBeneficiary,
        accountHolderName: value,
      },
      payments: [
        {
          ...leadInput?.payments?.[0],
          parkingBeneficiary: {
            ...leadInput?.parkingBeneficiary,
            accountHolderName: value,
          },
          mode: PaymentMethod.BankTransferNeft,
          accountHolderName: value,
          for: PaymentFor.ParkingExpense,
          status: PaymentStatus.Estimated,
        },
      ],
    })
  }

  function onAccountNumberChange(value: string) {
    // setAccountNumber(value);
    setLeadInput({
      ...leadInput,
      estimatedParkingCharges: estimatedCharges,
      parkingBeneficiary: {
        ...leadInput?.parkingBeneficiary,
        accountNumber: value,
      },
      payments: [
        {
          ...leadInput?.payments?.[0],
          parkingBeneficiary: {
            ...leadInput?.parkingBeneficiary,
            accountNumber: value,
          },
          accountNo: value,
          for: PaymentFor.ParkingExpense,
          status: PaymentStatus.Estimated,
        },
      ],
    })
  }

  function onAddingAccountProof(value?: string) {
    // console.log('value off acc', value)
    if (leadInput?.payments?.[0]?.mode === PaymentMethod.Upi) {
      setLeadInput({
        ...leadInput,
        estimatedParkingCharges: estimatedCharges,
        payments: [
          {
            ...leadInput?.payments?.[0],
            proofUrl: value,
            for: PaymentFor.ParkingExpense,
            status: PaymentStatus.Estimated,
          },
        ],
      })
    } else {
      setLeadInput({
        ...leadInput,
        estimatedParkingCharges: estimatedCharges,
        parkingBeneficiary: {
          ...leadInput?.parkingBeneficiary,
          proofUrl: value,
        },
        payments: [
          {
            ...leadInput?.payments?.[0],
            // proofUrl: value,
            for: PaymentFor.ParkingExpense,
            status: PaymentStatus.Estimated,
            parkingBeneficiary: {
              ...leadInput?.parkingBeneficiary,
              proofUrl: value,
            },
          },
        ],
        documents: {
          ...leadInput?.documents,
          bankAccountProofUrl: value,
        },
      })
    }
  }

  function onIfscCodeChange(value: string) {
    // setIfscCode(value);
    setLeadInput({
      ...leadInput,
      estimatedParkingCharges: estimatedCharges,
      parkingBeneficiary: {
        ...leadInput?.parkingBeneficiary,
        ifscCode: value,
      },
      payments: [
        {
          ...leadInput?.payments?.[0],
          for: PaymentFor.ParkingExpense,
          status: PaymentStatus.Estimated,
          parkingBeneficiary: {
            ...leadInput?.parkingBeneficiary,
            ifscCode: value,
          },
          // ifsc: value,
        },
      ],
    })
  }

  function onRemarksChange(value: string) {
    // setRemarks(value);
    setRemarks(value)
  }

  function onUpiIdChange(value: string) {
    setLeadInput({
      ...leadInput,
      estimatedParkingCharges: estimatedCharges,
      payments: [
        {
          ...leadInput?.payments?.[0],
          upiId: value,
        },
      ],
    })
  }
  // log('beneficiary proof', beneficiaryAccountProof)
  function onBeneFiciaryNameChange(value: string) {
    if (!!value) {
      setLeadInput({
        ...leadInput,
        estimatedParkingCharges: estimatedCharges,
        payments: [
          {
            ...leadInput?.payments?.[0],
            for: PaymentFor.ParkingExpense,
            status: PaymentStatus.Estimated,
            parkingBeneficiary: {
              ...leadInput?.parkingBeneficiary,
              id: value,
              bankName: parkingBenificiaryData?.queryParkingBeneficiary?.find(
                i => i.id === value,
              )?.bankName,
              accountHolderName:
                parkingBenificiaryData?.queryParkingBeneficiary?.find(
                  i => i.id === value,
                )?.accountHolderName,
              ifscCode: parkingBenificiaryData?.queryParkingBeneficiary?.find(
                i => i.id === value,
              )?.ifscCode,
              accountNumber:
                parkingBenificiaryData?.queryParkingBeneficiary?.find(
                  i => i.id === value,
                )?.accountNumber,
              proofUrl: parkingBenificiaryData?.queryParkingBeneficiary?.find(
                i => i.id === value,
              )?.proofUrl,
            },
          },
        ],
        parkingBeneficiary: {
          ...leadInput?.parkingBeneficiary,
          id: value,
          bankName: parkingBenificiaryData?.queryParkingBeneficiary?.find(
            i => i.id === value,
          )?.bankName,
          accountHolderName:
            parkingBenificiaryData?.queryParkingBeneficiary?.find(
              i => i.id === value,
            )?.accountHolderName,
          ifscCode: parkingBenificiaryData?.queryParkingBeneficiary?.find(
            i => i.id === value,
          )?.ifscCode,
          accountNumber: parkingBenificiaryData?.queryParkingBeneficiary?.find(
            i => i.id === value,
          )?.accountNumber,
          proofUrl: parkingBenificiaryData?.queryParkingBeneficiary?.find(
            i => i.id === value,
          )?.proofUrl,
        },
      })
    } else {
      setLeadInput({
        ...leadInput,
        estimatedParkingCharges: estimatedCharges,
        parkingBeneficiary: {
          id: null,
          accountHolderName: null,
        },
      })
    }
  }

  // log('This is the leadinput payments on Beneficiary Change', leadInput)
  return (
    <View style={commonStyle.mainAppContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Input
          label="Enter per day Parking Charges *"
          keyboardType={'numeric'}
          onChangeText={onperDayParkingChargesChange}
          value={perDayParkingCharge?.toString()}
          isRequired={IS_MANDATORY_FIELD}
          uniqueKey="per-day-parking-charges"
          checkValidation={isNumberValid(perDayParkingCharge)}
        />
        <Input
          isRequired={IS_MANDATORY_FIELD}
          label="Estimated Parking Charges *"
          value={estimatedCharges?.toString()}
          keyboardType={'numeric'}
          disabled
          uniqueKey="estimated-parking-charges"
          checkValidation={isNumberValid(estimatedCharges)}
        />
        <RNRadioButton
          // value={
          //   paymentMode === PaymentMethod.BankTransferNeft ||
          //   paymentMode === undefined
          //     ? 'first'
          //     : 'second'
          // }
          value={paymentMode}
          firstValue={'Bank Transfer'}
          secondValue={'UPI'}
          onValueChange={onPaymentModeChange}
          variant="pickup"
          title={'Select Payment Mode *'}
        />
        {/* <PickerSelectButton
          placeholder={'Select Payment Mode'}
          items={enumToItems(PaymentMethod) as Item[]}
          onValueChange={onPaymentModeChange}
          value={paymentMode}
          isRequired
        /> */}

        {/* //TODO:Redesign as per need */}
        {leadInput?.payments?.[0]?.mode !== 'UPI' && (
          <>
            <PickerSelectButton
              placeholder={'Select beneficiary *'}
              items={accountHolderNameList}
              value={!!beneficiaryId ? accHolderName : 'Add new Benificiary'}
              onValueChange={onBeneFiciaryNameChange}
              isRequired={IS_MANDATORY_FIELD}
            />
            <PickerSelectButton
              isRequired={IS_MANDATORY_FIELD}
              placeholder={'Select The Bank Name *'}
              items={enumToItems(BankName) as Item[]}
              value={bankName}
              onValueChange={onBankNameChange}
              disabled={!!beneficiaryId}
            />
            <Input
              label="Enter the Account Holder Name *"
              value={accHolderName}
              onChangeText={onAccHolderNameChange}
              isRequired={IS_MANDATORY_FIELD}
              uniqueKey="account-holder-name"
              disabled={!!beneficiaryId}
            />
            <Input
              label="Enter the Account Number *"
              value={accountNumber}
              // keyboardType={'numeric'}
              onChangeText={onAccountNumberChange}
              isRequired={IS_MANDATORY_FIELD}
              uniqueKey="account-number"
              // checkValidation={isAlphaNumericCaptailStringValid(accountNumber)}
              disabled={!!beneficiaryId}
            />
            <Input
              label="Enter the Account IFSC code *"
              value={ifscCode}
              onChangeText={onIfscCodeChange}
              isRequired={IS_MANDATORY_FIELD}
              uniqueKey="ifsc-code"
              // checkValidation={isAlphaNumericCaptailStringValid(ifscCode)}
              disabled={!!beneficiaryId}
              minCharLength={1}
              maxCharLength={11}
            />
          </>
        )}
        {leadInput?.payments?.[0]?.mode === 'UPI' && (
          <Input
            label="Enter UPI ID *"
            value={upiId}
            onChangeText={onUpiIdChange}
            isRequired={IS_MANDATORY_FIELD}
            uniqueKey="upi-id"
            checkValidation={isUpiValid(upiId)}
          />
        )}
        <RNFilerUploader
          variant="docs"
          header="Account Proof"
          title="Upload Document"
          saveDoc={onAddingAccountProof}
          value={beneficiaryAccountProof}
          isRequired={IS_MANDATORY_FIELD}
        />
        <Input
          label="Enter the remarks"
          // value={remarks?.remarks}
          onChangeText={onRemarksChange}
          uniqueKey="Remarks"
          isRequired={IS_NOT_MANDATORY_FIELD}
        />
      </ScrollView>
      {/* <Row style={commonStyle.buttonView}>
        <Button variant="primary" title={"Request Pickup"} type="enable" />
      </Row> */}
    </View>
  )
}

export default AddPickupParkingPaymentDetailsEstimation
