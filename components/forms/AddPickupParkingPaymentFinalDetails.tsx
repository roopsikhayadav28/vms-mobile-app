import {DateTimePickerEvent} from '@react-native-community/datetimepicker'
import _ from 'lodash'
import React, {useEffect, useState} from 'react'
import {ScrollView, StyleSheet, View} from 'react-native'
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
} from '../../generated/hooks_and_more'
import useUpdateLeadInput, {
  useUpdateRemarksInput,
} from '../../hooks/useUpdateLeadInput'
import {isNumberValid, isUpiValid} from '../../utils/formHelper'
import {calculateParkingCharge, enumToItems} from '../../utils/helpers'
import {DatePicker} from '../basic/DatePicker'
import {Input} from '../basic/Input'
import PickerSelectButton, {Item} from '../basic/PickerSelectButton'
import RNFilerUploader from '../basic/RNFileUploader'
import RNRadioButton from '../basic/RNRadioButton'

type FormComponentProps = {leadId: string; regNo: string}

const AddPickupParkingPaymentFinalDetails = ({
  leadId = 'new',
  regNo,
}: FormComponentProps): JSX.Element => {
  const {leadInput, setLeadInput} = useUpdateLeadInput(leadId)

  const {remarks, setRemarks} = useUpdateRemarksInput(regNo)
  const {data: parkingBenificiaryData} = useGetAllParkingBeneficiaryQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: data => {
      // setPerDayParkingCharge(perDayParkingCharge)
      // log('parkingBenificiaryData----------', data)
      // setLeadInput({
      //   ...leadInput,
      //   parkingBeneficiary:
      //     parkingBenificiaryData?.queryParkingBeneficiary?.[0],
      // })
    },
  })
  // const [fetchPickupData, {data: pickupData, loading: loadingPickupData}] =
  //   usePickupDataLazyQuery({
  //     variables: {
  //       leadId,
  //     },
  //     onCompleted: ({getLead}) => {
  //       // log('fetched pick up data', getLead?.pickup)
  //     },
  //   })
  // console.log('fetchPickupData', pickupData?.getLead?.pickup?.pickupStartTime)
  const perDayParkingCharge = leadInput?.yard?.tempPerDayParkingCharge
  // const paymentMode = leadInput?.payments?.[0]?.mode
  const [paymentMode, setPaymentMode] = useState('first')
  const repossessionDate = leadInput?.vehicle?.tempRepossessionDate
  // const accHolderName = leadInput?.parkingBeneficiary?.accountHolderName
  const accountNumber = leadInput?.parkingBeneficiary?.accountNumber
  const ifscCode = leadInput?.parkingBeneficiary?.ifscCode
  const bankName = leadInput?.parkingBeneficiary?.bankName
  const accHolderbeneficiaryName =
    leadInput?.parkingBeneficiary?.accountHolderName
  const upiId = leadInput?.payments?.[0]?.upiId
  const beneficiaryId = leadInput?.parkingBeneficiary?.id
  // if payment mode is UPI then account proof should be from payment else from parking beneficiary
  const beneficiaryAccountProof =
    leadInput?.payments?.[0]?.mode === PaymentMethod.Upi
      ? leadInput?.payments?.[0]?.proofUrl
      : leadInput?.parkingBeneficiary?.proofUrl

  const accountHolderNameList: Item[] =
    parkingBenificiaryData?.queryParkingBeneficiary
      ?.map(item => ({
        label: _.capitalize(item?.accountHolderName),
        value: item?.id,
      }))
      .concat([{label: 'Add new Benificiary', value: null}])
  // log('Selected bank name', bankName)
  const totalCharges = calculateParkingCharge({
    expectedPickupDate: new Date(),
    repossessionDate,
    perDayParkingCharge,
  })

  useEffect(() => {
    if (paymentMode === 'first') {
      setLeadInput({
        ...leadInput,
        actualParkingCharges: Number(totalCharges),
        payments: [
          {
            ...leadInput?.payments?.[0],
            mode:
              paymentMode === 'first'
                ? PaymentMethod.BankTransferNeft
                : PaymentMethod.Upi,
            for: PaymentFor.ParkingExpense,
            status: PaymentStatus.Requested,
          },
        ],
      })
    }
  }, [])

  function onPerDayChargesChange(value: string) {
    // setPerDayCharge(value);
    setLeadInput({
      ...leadInput,
      actualParkingCharges: Number(totalCharges),
      yard: {
        ...leadInput?.yard,
        tempPerDayParkingCharge: Number(value),
      },
    })
  }

  function onPaymentModeChange(value: string) {
    setPaymentMode(value)
    setLeadInput({
      ...leadInput,
      actualParkingCharges: Number(totalCharges),
      payments: [
        {
          ...leadInput?.payments?.[0],
          // proofUrl: null,
          mode:
            value === 'first'
              ? PaymentMethod.BankTransferNeft
              : PaymentMethod.Upi,
          for: PaymentFor.ParkingExpense,
          status: PaymentStatus.Requested,
        },
      ],
      parkingBeneficiary: {},
      documents: {},
    })
  }
  /**
   * Set the bank name when we are selecting from the dropdown list
   */
  function onParkingBeneficiaryChange(value: string) {
    if (!!value) {
      setLeadInput({
        ...leadInput,
        payments: [
          {
            ...leadInput?.payments?.[0],
            for: PaymentFor.ParkingExpense,
            status: PaymentStatus.Requested,
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
        parkingBeneficiary: {
          id: null,
          accountHolderName: null,
        },
      })
    }
  }

  function onBankNameChange(value: string) {
    setLeadInput({
      ...leadInput,
      actualParkingCharges: Number(totalCharges),
      parkingBeneficiary: {
        ...leadInput?.parkingBeneficiary,
        bankName: value as BankName,
      },
      payments: [
        {
          ...leadInput?.payments?.[0],
          bankName: value as BankName,
          for: PaymentFor.ParkingExpense,
          status: PaymentStatus.Requested,
          parkingBeneficiary: {
            ...leadInput?.parkingBeneficiary,
            bankName: value as BankName,
          },
        },
      ],
    })
  }

  function onAddingRepossessionDate(event: DateTimePickerEvent, date?: Date) {
    setLeadInput({
      ...leadInput,
      actualParkingCharges: Number(totalCharges),
      vehicle: {
        ...leadInput.vehicle,
        tempRepossessionDate: date,
      },
    })
  }

  function onAccHolderNameChange(value: string) {
    // setAccHolderName(value);
    setLeadInput({
      ...leadInput,
      actualParkingCharges: Number(totalCharges),
      parkingBeneficiary: {
        ...leadInput?.parkingBeneficiary,
        accountHolderName: value,
      },
      payments: [
        {
          ...leadInput?.payments?.[0],
          accountHolderName: value,
          for: PaymentFor.ParkingExpense,
          status: PaymentStatus.Requested,
          parkingBeneficiary: {
            ...leadInput?.parkingBeneficiary,
            accountHolderName: value,
          },
        },
      ],
    })
  }

  function onAccountNumChange(value: string) {
    // setAccountNumber(value);
    setLeadInput({
      ...leadInput,
      actualParkingCharges: Number(totalCharges),
      parkingBeneficiary: {
        ...leadInput?.parkingBeneficiary,
        accountNumber: value,
      },
      payments: [
        {
          ...leadInput?.payments?.[0],
          accountNo: value,
          for: PaymentFor.ParkingExpense,
          status: PaymentStatus.Requested,
          parkingBeneficiary: {
            ...leadInput?.parkingBeneficiary,
            accountNumber: value,
          },
        },
      ],
    })
  }

  function onAddingAccountProof(value?: string) {
    // if payment mode is upi then setLeadInput with upi id and proof url in payment object
    if (leadInput?.payments?.[0]?.mode === PaymentMethod.Upi) {
      setLeadInput({
        ...leadInput,
        payments: [
          {
            ...leadInput?.payments?.[0],
            proofUrl: value,
            for: PaymentFor.ParkingExpense,
            status: PaymentStatus.Requested,
          },
        ],
        actualParkingCharges: Number(totalCharges),
      })
    } else {
      setLeadInput({
        ...leadInput,
        parkingBeneficiary: {
          ...leadInput?.parkingBeneficiary,
          proofUrl: value,
        },
        payments: [
          {
            ...leadInput?.payments?.[0],
            // proofUrl: value,
            for: PaymentFor.ParkingExpense,
            status: PaymentStatus.Requested,
            parkingBeneficiary: {
              ...leadInput?.parkingBeneficiary,
              proofUrl: value,
            },
          },
        ],
        actualParkingCharges: Number(totalCharges),

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
      actualParkingCharges: Number(totalCharges),
      parkingBeneficiary: {
        ...leadInput?.parkingBeneficiary,
        ifscCode: value,
      },
      payments: [
        {
          ...leadInput?.payments?.[0],
          // ifsc: value,
          for: PaymentFor.ParkingExpense,
          status: PaymentStatus.Requested,
          parkingBeneficiary: {
            ...leadInput?.parkingBeneficiary,
            ifscCode: value,
          },
        },
      ],
    })
  }

  function onRemarksChange(value: string) {
    // setRemarks(value);
    setRemarks(value)
  }

  function onUpiIdChange(value: string) {
    // console.log('UPI ID', value)

    setLeadInput({
      ...leadInput,
      actualParkingCharges: Number(totalCharges),
      payments: [
        {
          ...leadInput?.payments?.[0],
          upiId: value,
          for: PaymentFor.ParkingExpense,
          status: PaymentStatus.Requested,
        },
      ],
    })
  }

  // console.log(
  //   'Lead Input at Final Parking Details',
  //   JSON.stringify(leadInput, null, 2),
  // )

  return (
    <View style={commonStyle.mainAppContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Input
          label="Enter Per Day Parking Charges *"
          keyboardType="numeric"
          value={perDayParkingCharge?.toString()}
          onChangeText={onPerDayChargesChange}
          isRequired={IS_MANDATORY_FIELD}
          uniqueKey="per-day-parking-charges"
          checkValidation={isNumberValid(perDayParkingCharge)}
        />

        <DatePicker
          placeholder="Repossession Date *"
          value={repossessionDate}
          onChange={onAddingRepossessionDate}
          isRequired={IS_MANDATORY_FIELD}
        />
        <Input
          label="Total Parking Charges"
          value={totalCharges?.toString()}
          keyboardType="numeric"
          disabled
          isRequired={IS_MANDATORY_FIELD}
          uniqueKey="total-parking-charges"
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
          placeholder="Select Payment Mode"
          items={enumToItems(PaymentMethod)}
          onValueChange={onPaymentModeChange}
          value={paymentMode}
          isRequired
        /> */}
        {leadInput?.payments?.[0]?.mode !== 'UPI' && (
          <>
            <PickerSelectButton
              placeholder={'Select beneficiary *'}
              items={accountHolderNameList}
              value={
                !!beneficiaryId
                  ? accHolderbeneficiaryName
                  : 'Add new Benificiary'
              }
              onValueChange={onParkingBeneficiaryChange}
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
              // key={"Enter the Account Holder Name"}
              value={accHolderbeneficiaryName}
              onChangeText={onAccHolderNameChange}
              isRequired={IS_MANDATORY_FIELD}
              uniqueKey="account-holder-name"
              disabled={!!beneficiaryId}
            />
            <Input
              label="Enter the Account Number *"
              value={accountNumber}
              // keyboardType={'numeric'}
              onChangeText={onAccountNumChange}
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
    </View>
  )
}

export default AddPickupParkingPaymentFinalDetails

const styles = StyleSheet.create({})
