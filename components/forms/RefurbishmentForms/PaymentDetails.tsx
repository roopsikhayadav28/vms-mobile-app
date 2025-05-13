import React, {useEffect, useState} from 'react'
import {ScrollView, StyleSheet, View} from 'react-native'

import _ from 'lodash'
import Colors from '../../../constants/Colors'
import Layout from '../../../constants/Layout'
import {
  IS_MANDATORY_FIELD,
  IS_NOT_MANDATORY_FIELD,
} from '../../../constants/constants'
import {commonStyle} from '../../../constants/style'
import {
  BankName,
  GetAllRefurbishmentBeneficiaryQuery,
  PaymentFor,
  PaymentMethod,
  PaymentStatus,
  PaymentTo,
  useGetAllRefurbishmentBeneficiaryQuery,
  useGetLeadRefurbishmentDetailsQuery,
} from '../../../generated/hooks_and_more'
import useUpdateLeadInput, {
  useUpdateRemarksInput,
} from '../../../hooks/useUpdateLeadInput'
import {
  isAlphaNumericCaptailStringValid,
  isUpiValid,
} from '../../../utils/formHelper'
import {enumToItems} from '../../../utils/helpers'
import {Input} from '../../basic/Input'
import PickerSelectButton, {Item} from '../../basic/PickerSelectButton'
import RNFileUploader from '../../basic/RNFileUploader'
import RNRadioButton from '../../basic/RNRadioButton'

type PaymentDetailsProps = {
  leadId: string
  regNo: string
  requestId: string
}

interface RefurbishmentBeneficiary {
  id: string
  allBeneficiary: GetAllRefurbishmentBeneficiaryQuery
}

function getAccountHolderDetails({
  allBeneficiary,
  id,
}: RefurbishmentBeneficiary) {
  const {queryRefurbishmentBeneficiary} = allBeneficiary

  return queryRefurbishmentBeneficiary?.find(item => item?.id === id)
}

const PaymentDetails = ({leadId, regNo, requestId}: PaymentDetailsProps) => {
  const {leadInput, setLeadInput} = useUpdateLeadInput(leadId)
  const {setRemarks} = useUpdateRemarksInput(regNo)
  const [paymentMode, setPaymentMode] = useState('first')
  const [paymentTo, setPaymentTo] = useState('first')

  const refurbishmentBeneficiary =
    leadInput?.refurbishmentDetails?.requests?.[0]?.refurbishmentBeneficiary

  const isUpi =
    leadInput?.refurbishmentDetails?.requests?.[0]?.purchase?.payment?.mode ===
    PaymentMethod.Upi
  const accHolderName = refurbishmentBeneficiary?.accountHolderName
  const accountNumber = refurbishmentBeneficiary?.accountNumber
  const ifscCode = refurbishmentBeneficiary?.ifscCode
  const upiId = refurbishmentBeneficiary?.upiId
  const beneficiaryId = refurbishmentBeneficiary?.id
  const bankName = refurbishmentBeneficiary?.bankName
  const beneficiaryAccountProof = refurbishmentBeneficiary?.proofUrl
  const upiIdProof =
    leadInput?.refurbishmentDetails?.requests?.[0]?.purchase?.payment?.proofUrl

  const {data: allBeneficiary} = useGetAllRefurbishmentBeneficiaryQuery({
    fetchPolicy: 'network-only',
  })

  const {data} = useGetLeadRefurbishmentDetailsQuery({
    variables: {
      regNo,
    },
    skip: !regNo,
    fetchPolicy: 'network-only',
    onCompleted: data => {
      setLeadInput({
        ...leadInput,
        refurbishmentDetails: {
          ...leadInput?.refurbishmentDetails,
          requests: [
            {
              ...leadInput?.refurbishmentDetails?.requests?.find(
                req => req?.id === requestId,
              ),
              id: requestId,
            },
          ],
        },
      })
    },
  })

  const accountHolderNameList: Item[] =
    allBeneficiary?.queryRefurbishmentBeneficiary
      ?.map(item => ({
        label: _.capitalize(item?.accountHolderName),
        value: item?.id,
      }))
      .concat([{label: 'Add new Beneficiary', value: null}])

  // Set the payment mode and payment to the first value
  useEffect(() => {
    if (paymentMode === 'first' && paymentTo === 'first') {
      setLeadInput({
        ...leadInput,
        payments: [
          {
            ...leadInput?.payments?.[0],
            mode:
              paymentMode === 'first'
                ? PaymentMethod.BankTransferNeft
                : PaymentMethod.Upi,
            paymentTo:
              paymentTo === 'first' ? PaymentTo.Employee : PaymentTo.Vendor,
            for: PaymentFor.Refurbishment,
          },
        ],
        refurbishmentDetails: {
          ...leadInput?.refurbishmentDetails,
          requests: [
            {
              ...leadInput?.refurbishmentDetails?.requests?.[0],
              id: requestId,
              purchase: {
                ...leadInput?.refurbishmentDetails?.requests?.[0]?.purchase,
                payment: {
                  ...leadInput?.refurbishmentDetails?.requests?.[0]?.purchase
                    ?.payment,
                  mode:
                    paymentMode === 'first'
                      ? PaymentMethod.BankTransferNeft
                      : PaymentMethod.Upi,
                  paymentTo:
                    paymentTo === 'first'
                      ? PaymentTo.Employee
                      : PaymentTo.Vendor,
                  for: PaymentFor.Refurbishment,
                },
              },
            },
          ],
        },
      })
    }
  }, [paymentTo, requestId])

  function onBankNameChange(value: string): void {
    setLeadInput({
      ...leadInput,
      payments: [
        {
          ...leadInput?.payments?.[0],
          refurbishmentBeneficiary: {
            ...leadInput?.payments?.[0]?.refurbishmentBeneficiary,
            bankName: value as BankName,
          },
          for: PaymentFor.Refurbishment,
        },
      ],
      refurbishmentDetails: {
        ...leadInput?.refurbishmentDetails,
        requests: [
          {
            ...leadInput?.refurbishmentDetails?.requests?.[0],
            id: requestId,
            refurbishmentBeneficiary: {
              ...leadInput?.refurbishmentDetails?.requests?.[0]
                ?.refurbishmentBeneficiary,
              bankName: value as BankName,
            },
            purchase: {
              ...leadInput?.refurbishmentDetails?.requests?.[0]?.purchase,
              payment: {
                ...leadInput?.refurbishmentDetails?.requests?.[0]?.purchase
                  ?.payment,
                bankName: value as BankName,
                for: PaymentFor.Refurbishment,
              },
            },
          },
        ],
      },
    })
  }

  function onAccHolderNameChange(value: string): void {
    setLeadInput({
      ...leadInput,
      payments: [
        {
          ...leadInput?.payments?.[0],
          refurbishmentBeneficiary: {
            ...leadInput?.payments?.[0]?.refurbishmentBeneficiary,
            accountHolderName: value,
          },
          for: PaymentFor.Refurbishment,
        },
      ],
      refurbishmentDetails: {
        ...leadInput?.refurbishmentDetails,
        requests: [
          {
            ...leadInput?.refurbishmentDetails?.requests?.[0],
            id: requestId,
            refurbishmentBeneficiary: {
              ...leadInput?.refurbishmentDetails?.requests?.[0]
                ?.refurbishmentBeneficiary,
              accountHolderName: value,
            },
            purchase: {
              ...leadInput?.refurbishmentDetails?.requests?.[0]?.purchase,
              payment: {
                ...leadInput?.refurbishmentDetails?.requests?.[0]?.purchase
                  ?.payment,
                accountHolderName: value,
                for: PaymentFor.Refurbishment,
              },
            },
          },
        ],
      },
    })
  }

  // Trigger when payment mode is changed
  function onPaymentModeChange(value: string) {
    setPaymentMode(value)
    setLeadInput({
      ...leadInput,
      payments: [
        {
          ...leadInput?.payments?.[0],
          mode:
            value === 'first'
              ? PaymentMethod.BankTransferNeft
              : PaymentMethod.Upi,
          for: PaymentFor.Refurbishment,
          status: PaymentStatus.Requested,
          refurbishmentBeneficiary: {},
        },
      ],
      refurbishmentDetails: {
        ...leadInput?.refurbishmentDetails,
        requests: [
          {
            ...leadInput?.refurbishmentDetails?.requests?.[0],
            id: requestId,
            purchase: {
              ...leadInput?.refurbishmentDetails?.requests?.[0]?.purchase,
              payment: {
                ...leadInput?.refurbishmentDetails?.requests?.[0]?.purchase
                  ?.payment,
                mode:
                  value === 'first'
                    ? PaymentMethod.BankTransferNeft
                    : PaymentMethod.Upi,
                for: PaymentFor.Refurbishment,
                proofUrl: null,
              },
            },
            refurbishmentBeneficiary: {},
          },
        ],
      },
    })
    setRemarks(null)
  }

  function onPaymentToChange(value: string) {
    setPaymentTo(value)
    setLeadInput({
      ...leadInput,
      payments: [
        {
          ...leadInput?.payments?.[0],
          paymentTo: value === 'first' ? PaymentTo.Employee : PaymentTo.Vendor,
          for: PaymentFor.Refurbishment,
        },
      ],
      refurbishmentDetails: {
        requests: [
          {
            ...leadInput?.refurbishmentDetails?.requests?.[0],
            id: requestId,
            purchase: {
              ...leadInput?.refurbishmentDetails?.requests?.[0]?.purchase,
              payment: {
                ...leadInput?.refurbishmentDetails?.requests?.[0]?.purchase
                  ?.payment,
                paymentTo:
                  value === 'first' ? PaymentTo.Employee : PaymentTo.Vendor,
                for: PaymentFor.Refurbishment,
              },
            },
          },
        ],
      },
    })
  }

  function onUpiIdChange(value: string) {
    setLeadInput({
      ...leadInput,
      payments: [
        {
          ...leadInput?.payments?.[0],
          upiId: value,
          for: PaymentFor.Refurbishment,
        },
      ],
      refurbishmentDetails: {
        ...leadInput?.refurbishmentDetails,
        requests: [
          {
            ...leadInput?.refurbishmentDetails?.requests?.[0],
            id: requestId,
            purchase: {
              ...leadInput?.refurbishmentDetails?.requests?.[0]?.purchase,
              payment: {
                ...leadInput?.refurbishmentDetails?.requests?.[0]?.purchase
                  ?.payment,
                upiId: value,
                for: PaymentFor.Refurbishment,
              },
            },
          },
        ],
      },
    })
  }

  function onAddingAccountProof(value?: string) {
    setLeadInput({
      ...leadInput,
      payments: [
        {
          ...leadInput?.payments?.[0],
          refurbishmentBeneficiary: {
            ...leadInput?.payments?.[0]?.refurbishmentBeneficiary,
            proofUrl: value,
          },
          proofUrl: value,
          for: PaymentFor.Refurbishment,
        },
      ],
      refurbishmentDetails: {
        ...leadInput?.refurbishmentDetails,
        requests: [
          {
            ...leadInput?.refurbishmentDetails?.requests?.[0],
            id: requestId,
            refurbishmentBeneficiary: !isUpi
              ? {
                  ...leadInput?.refurbishmentDetails?.requests?.[0]
                    ?.refurbishmentBeneficiary,
                  proofUrl: value,
                }
              : null,
            purchase: {
              ...leadInput?.refurbishmentDetails?.requests?.[0]?.purchase,
              payment: {
                ...leadInput?.refurbishmentDetails?.requests?.[0]?.purchase
                  ?.payment,
                proofUrl: value,
                for: PaymentFor.Refurbishment,
              },
            },
          },
        ],
      },
    })
  }

  /**
   * Set the bank name when we are selecting from the dropdown list
   */
  function onRefurbishmentBeneficiaryChange(value: string) {
    if (!!value) {
      setLeadInput({
        ...leadInput,
        payments: [
          {
            ...leadInput?.payments?.[0],
            for: PaymentFor.Refurbishment,
            mode:
              paymentMode === 'first'
                ? PaymentMethod.BankTransferNeft
                : PaymentMethod.Upi,
            paymentTo:
              paymentTo === 'first' ? PaymentTo.Employee : PaymentTo.Vendor,
            refurbishmentBeneficiary: {
              ...leadInput?.payments?.[0]?.refurbishmentBeneficiary,
              id: value,
              accountHolderName: getAccountHolderDetails({
                allBeneficiary,
                id: value,
              })?.accountHolderName,
              accountNumber: getAccountHolderDetails({
                allBeneficiary,
                id: value,
              })?.accountNumber,
              bankName: getAccountHolderDetails({
                allBeneficiary,
                id: value,
              })?.bankName,
              ifscCode: getAccountHolderDetails({
                allBeneficiary,
                id: value,
              })?.ifscCode,
              proofUrl: getAccountHolderDetails({
                allBeneficiary,
                id: value,
              })?.proofUrl,
            },
          },
        ],
        refurbishmentDetails: {
          ...leadInput?.refurbishmentDetails,
          requests: [
            {
              ...leadInput?.refurbishmentDetails?.requests?.[0],
              id: requestId,
              refurbishmentBeneficiary: {
                ...leadInput?.refurbishmentDetails?.requests?.[0]
                  ?.refurbishmentBeneficiary,
                id: value,
                accountHolderName: getAccountHolderDetails({
                  allBeneficiary,
                  id: value,
                })?.accountHolderName,
                accountNumber: getAccountHolderDetails({
                  allBeneficiary,
                  id: value,
                })?.accountNumber,
                bankName: getAccountHolderDetails({
                  allBeneficiary,
                  id: value,
                })?.bankName,
                ifscCode: getAccountHolderDetails({
                  allBeneficiary,
                  id: value,
                })?.ifscCode,
                proofUrl: getAccountHolderDetails({
                  allBeneficiary,
                  id: value,
                })?.proofUrl,
              },
              purchase: {
                ...leadInput?.refurbishmentDetails?.requests?.[0]?.purchase,
                payment: {
                  ...leadInput?.refurbishmentDetails?.requests?.[0]?.purchase
                    ?.payment,
                  mode:
                    paymentMode === 'first'
                      ? PaymentMethod.BankTransferNeft
                      : PaymentMethod.Upi,
                  paymentTo:
                    paymentTo === 'first'
                      ? PaymentTo.Employee
                      : PaymentTo.Vendor,
                  for: PaymentFor.Refurbishment,
                },
              },
            },
          ],
        },
      })
    } else {
      setLeadInput({
        ...leadInput,
        payments: [
          {
            ...leadInput?.payments?.[0],
            refurbishmentBeneficiary: {
              id: null,
              accountHolderName: null,
            },
          },
        ],
        refurbishmentDetails: {
          ...leadInput?.refurbishmentDetails,
          requests: [
            {
              ...leadInput?.refurbishmentDetails?.requests?.[0],
              refurbishmentBeneficiary: {
                id: null,
                accountHolderName: null,
              },
            },
          ],
        },
      })
    }
  }

  function onRemarksChange(value: string) {
    setRemarks(value)
  }

  function onAccountNumberChange(value: string) {
    setLeadInput({
      ...leadInput,
      payments: [
        {
          ...leadInput?.payments?.[0],
          refurbishmentBeneficiary: {
            ...leadInput?.payments?.[0]?.refurbishmentBeneficiary,
            accountNumber: value,
          },
          for: PaymentFor.Refurbishment,
        },
      ],
      refurbishmentDetails: {
        ...leadInput?.refurbishmentDetails,
        requests: [
          {
            ...leadInput?.refurbishmentDetails?.requests?.[0],
            id: requestId,
            refurbishmentBeneficiary: {
              ...leadInput?.refurbishmentDetails?.requests?.[0]
                ?.refurbishmentBeneficiary,
              accountNumber: value,
            },
            purchase: {
              ...leadInput?.refurbishmentDetails?.requests?.[0]?.purchase,
              payment: {
                ...leadInput?.refurbishmentDetails?.requests?.[0]?.purchase
                  ?.payment,
                accountNo: value,
                for: PaymentFor.Refurbishment,
              },
            },
          },
        ],
      },
    })
  }

  function onIfscCodeChange(value: string) {
    setLeadInput({
      ...leadInput,
      payments: [
        {
          ...leadInput?.payments?.[0],
          refurbishmentBeneficiary: {
            ...leadInput?.payments?.[0]?.refurbishmentBeneficiary,
            ifscCode: value,
          },
          for: PaymentFor.Refurbishment,
        },
      ],
      refurbishmentDetails: {
        ...leadInput?.refurbishmentDetails,
        requests: [
          {
            ...leadInput?.refurbishmentDetails?.requests?.[0],
            id: requestId,
            refurbishmentBeneficiary: {
              ...leadInput?.refurbishmentDetails?.requests?.[0]
                ?.refurbishmentBeneficiary,
              ifscCode: value,
            },
            purchase: {
              ...leadInput?.refurbishmentDetails?.requests?.[0]?.purchase,
              payment: {
                ...leadInput?.refurbishmentDetails?.requests?.[0]?.purchase
                  ?.payment,
                ifsc: value,
                for: PaymentFor.Refurbishment,
              },
            },
          },
        ],
      },
    })
  }

  // log('leadInput', leadInput)
  return (
    <ScrollView style={commonStyle.mainAppContainer}>
      <RNRadioButton
        value={paymentTo}
        variant="payment_mode"
        title="Payment to  *"
        firstValue="Employee"
        secondValue="Vendor"
        onValueChange={onPaymentToChange}
      />
      <View style={styles.separator} />
      <RNRadioButton
        value={paymentMode}
        variant="payment_mode"
        title="Select Payment Mode *"
        firstValue="Bank Transfer"
        secondValue="UPI"
        onValueChange={onPaymentModeChange}
      />
      {!isUpi ? (
        <>
          <PickerSelectButton
            placeholder={'Select beneficiary *'}
            items={accountHolderNameList}
            value={!!beneficiaryId ? accHolderName : 'Add new Benificiary'}
            onValueChange={onRefurbishmentBeneficiaryChange}
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
            onChangeText={onAccountNumberChange}
            isRequired={IS_MANDATORY_FIELD}
            uniqueKey="account-number"
            checkValidation={isAlphaNumericCaptailStringValid(accountNumber)}
            disabled={!!beneficiaryId}
          />
          <Input
            label="Enter the Account IFSC code *"
            value={ifscCode}
            onChangeText={onIfscCodeChange}
            isRequired={IS_MANDATORY_FIELD}
            uniqueKey="ifsc-code"
            checkValidation={isAlphaNumericCaptailStringValid(ifscCode)}
            disabled={!!beneficiaryId}
            minCharLength={1}
            maxCharLength={11}
          />
        </>
      ) : (
        <Input
          label="Enter UPI ID *"
          value={upiId}
          onChangeText={onUpiIdChange}
          isRequired={IS_MANDATORY_FIELD}
          uniqueKey="upi-id"
          checkValidation={isUpiValid(upiId)}
        />
      )}

      <RNFileUploader
        variant="docs"
        header="Account Proof"
        title="Upload Document"
        saveDoc={onAddingAccountProof}
        value={isUpi ? upiIdProof : beneficiaryAccountProof}
        isRequired={IS_MANDATORY_FIELD}
      />
      <Input
        label="Enter the remarks"
        onChangeText={onRemarksChange}
        uniqueKey="Remarks"
        isRequired={IS_NOT_MANDATORY_FIELD}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: Colors.light.screenBg,
    marginHorizontal: Layout.baseSize,
    marginVertical: Layout.baseSize * 0.2,
  },
})

export default PaymentDetails
