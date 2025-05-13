import {ScrollView, StyleSheet} from 'react-native'
import {View} from 'react-native'
import Card from '../basic/Card'
import {Row} from '../basic/StyledView'
import {P1} from '../basic/StyledText'
import {commonStyle} from '../../constants/style'
import Layout from '../../constants/Layout'
import Separator from '../basic/Separator'
import Colors from '../../constants/Colors'
import RNRadioButton from '../basic/RNRadioButton'
import {ActivityIndicator, Text} from 'react-native-paper'
import useUpdateLeadInput, {
  useUpdateRemarksInput,
} from '../../hooks/useUpdateLeadInput'
import {Input} from '../basic/Input'
import {DatePicker} from '../basic/DatePicker'
import {useVehicleDetailsQuery} from '../../generated/hooks_and_more'
import {log} from '../../utils/helpers'
import {DateTimePickerEvent} from '@react-native-community/datetimepicker'
import {useEffect} from 'react'
type FormComponentProps = {leadId: string | undefined; regNo?: string}

const ConfirmDocumentAvailability = ({
  leadId = 'new',
  regNo,
}: FormComponentProps): JSX.Element => {
  useEffect(() => {
    setLeadInput({
      dealershipDocuments: {
        registrationCertificate: {
          isAvailable: false,
        },
        loanForeclosure: {
          isAvailable: false,
        },
        form26: {
          isAvailable: false,
        },
        bankNOC: {
          isAvailable: false,
        },
        form35: {
          isAvailable: false,
        },
        insuranceCertificate: {
          isAvailable: false,
        },
        form28: {
          isAvailable: false,
        },
        form29: {
          isAvailable: false,
        },
        form30: {
          isAvailable: false,
        },
        form60: {
          isAvailable: false,
        },
        sellerAadharCard: {
          isAvailable: false,
        },
        ownerAddressProof: {
          isAvailable: false,
        },
      },
    })
  }, [])
  const {remarks, setRemarks} = useUpdateRemarksInput(regNo)
  const {leadInput, setLeadInput} = useUpdateLeadInput(leadId)
  const isRegNo =
    leadInput?.dealershipDocuments?.registrationCertificate?.isAvailable
  const regNoExpectedDate =
    leadInput?.dealershipDocuments?.registrationCertificate?.expectedDate
  const isForm26 = leadInput?.dealershipDocuments?.form26?.isAvailable
  const form26ExpectedDate =
    leadInput?.dealershipDocuments?.form26?.expectedDate
  const isLoanForeclosure =
    leadInput?.dealershipDocuments?.loanForeclosure?.isAvailable
  const loanForeClosureExpectedDate =
    leadInput?.dealershipDocuments?.loanForeclosure?.expectedDate
  const isBankNoc = leadInput?.dealershipDocuments?.bankNOC?.isAvailable
  const bankNocExpectedDate =
    leadInput?.dealershipDocuments?.bankNOC?.expectedDate
  const isForm35 = leadInput?.dealershipDocuments?.form35?.isAvailable
  const form35ExpectedDate =
    leadInput?.dealershipDocuments?.form35?.expectedDate
  const isInsuranceCertificate =
    leadInput?.dealershipDocuments?.insuranceCertificate?.isAvailable
  const insuranceCertificateExpectedDate =
    leadInput?.dealershipDocuments?.insuranceCertificate?.expectedDate
  const isForm28 = leadInput?.dealershipDocuments?.form28?.isAvailable
  const form28ExpectedDate =
    leadInput?.dealershipDocuments?.form28?.expectedDate
  const isForm29 = leadInput?.dealershipDocuments?.form29?.isAvailable
  const form29ExpectedDate =
    leadInput?.dealershipDocuments?.form29?.expectedDate
  const isForm30 = leadInput?.dealershipDocuments?.form30?.isAvailable
  const form30ExpectedDate =
    leadInput?.dealershipDocuments?.form30?.expectedDate
  const isform60 = leadInput?.dealershipDocuments?.form60?.isAvailable
  const form60ExpectedDate =
    leadInput?.dealershipDocuments?.form60?.expectedDate
  const isOwnerAddressProof =
    leadInput?.dealershipDocuments?.ownerAddressProof?.isAvailable
  const ownerAddressProofExpectedDate =
    leadInput?.dealershipDocuments?.ownerAddressProof?.expectedDate
  const isForm36 = leadInput?.dealershipDocuments?.form36?.isAvailable
  const form36ExpectedDate =
    leadInput?.dealershipDocuments?.form36?.expectedDate
  const isSellerAadharCard =
    leadInput?.dealershipDocuments?.sellerAadharCard?.isAvailable
  const sellarAadharCardExpectedDate =
    leadInput?.dealershipDocuments?.sellerAadharCard?.expectedDate
  const isClearChallan = leadInput?.dealerStance?.clearChallan
  const isClearBlackListed = leadInput?.dealerStance?.clearBlackList
  const isClearHsrp = leadInput?.dealerStance?.clearHSRP
  const {data, loading} = useVehicleDetailsQuery({
    fetchPolicy: 'network-only',
    variables: {
      regNo: regNo as string,
    },

    // onCompleted: getAvailableDocument => {
    //   console.log(
    //     'data...........',
    //     getAvailableDocument?.getLead?.vehicle?.chassisNumber,
    //   )
    // },
  })

  const item = data?.getLead?.documentChecklist
  console.log({item})
  function onRemarksChange(value: string) {
    setRemarks(value)
  }
  console.log({isRegNo})

  function onRegNoChange(value: string) {
    setLeadInput({
      ...leadInput,
      dealershipDocuments: {
        ...leadInput?.dealershipDocuments,
        registrationCertificate: {
          ...leadInput?.dealershipDocuments?.registrationCertificate,
          isAvailable: value === 'first',
        },
      },
    })
  }
  function onForm26Change(value: string) {
    setLeadInput({
      ...leadInput,
      dealershipDocuments: {
        ...leadInput?.dealershipDocuments,
        form26: {
          ...leadInput?.dealershipDocuments?.form26,
          isAvailable: value === 'first',
        },
      },
    })
  }
  function onLoanForceClosureChange(value: string) {
    setLeadInput({
      ...leadInput,
      dealershipDocuments: {
        ...leadInput?.dealershipDocuments,
        loanForeclosure: {
          ...leadInput?.dealershipDocuments?.loanForeclosure,
          isAvailable: value === 'first',
        },
      },
    })
  }
  function onBankNocChange(value: string) {
    setLeadInput({
      ...leadInput,
      dealershipDocuments: {
        ...leadInput?.dealershipDocuments,
        bankNOC: {
          ...leadInput?.dealershipDocuments?.bankNOC,
          isAvailable: value === 'first',
        },
      },
    })
  }
  function onForm35Change(value: string) {
    setLeadInput({
      ...leadInput,
      dealershipDocuments: {
        ...leadInput?.dealershipDocuments,
        form35: {
          ...leadInput?.dealershipDocuments?.form35,
          isAvailable: value === 'first',
        },
      },
    })
  }
  function onInsuranceCertificateChange(value: string) {
    setLeadInput({
      ...leadInput,
      dealershipDocuments: {
        ...leadInput?.dealershipDocuments,
        insuranceCertificate: {
          ...leadInput?.dealershipDocuments?.insuranceCertificate,
          isAvailable: value === 'first',
        },
      },
    })
  }
  function onForm28Change(value: string) {
    setLeadInput({
      ...leadInput,
      dealershipDocuments: {
        ...leadInput?.dealershipDocuments,
        form28: {
          ...leadInput?.dealershipDocuments?.form28,
          isAvailable: value === 'first',
        },
      },
    })
  }
  function onForm29Change(value: string) {
    setLeadInput({
      ...leadInput,
      dealershipDocuments: {
        ...leadInput?.dealershipDocuments,
        form29: {
          ...leadInput?.dealershipDocuments?.form29,
          isAvailable: value === 'first',
        },
      },
    })
  }
  function onForm30Change(value: string) {
    setLeadInput({
      ...leadInput,
      dealershipDocuments: {
        ...leadInput?.dealershipDocuments,
        form30: {
          ...leadInput?.dealershipDocuments?.form30,
          isAvailable: value === 'first',
        },
      },
    })
  }
  function onform60Change(value: string) {
    setLeadInput({
      ...leadInput,
      dealershipDocuments: {
        ...leadInput?.dealershipDocuments,
        form60: {
          ...leadInput?.dealershipDocuments?.form60,
          isAvailable: value === 'first',
        },
      },
    })
  }
  function onSellerAadharCardChange(value: string) {
    setLeadInput({
      ...leadInput,
      dealershipDocuments: {
        ...leadInput?.dealershipDocuments,
        sellerAadharCard: {
          ...leadInput?.dealershipDocuments?.sellerAadharCard,
          isAvailable: value === 'first',
        },
      },
    })
  }
  function onOwnerAddressProofChange(value: string) {
    setLeadInput({
      ...leadInput,
      dealershipDocuments: {
        ...leadInput?.dealershipDocuments,
        ownerAddressProof: {
          ...leadInput?.dealershipDocuments?.ownerAddressProof,
          isAvailable: value === 'first',
        },
      },
    })
  }
  function onRcExpectedDateChange(event: DateTimePickerEvent, date?: Date) {
    setLeadInput({
      ...leadInput,
      dealershipDocuments: {
        ...leadInput?.dealershipDocuments,
        registrationCertificate: {
          ...leadInput?.dealershipDocuments?.registrationCertificate,
          expectedDate: date,
        },
      },
    })
  }
  function onForm26ExpectedDateChange(event: DateTimePickerEvent, date?: Date) {
    setLeadInput({
      ...leadInput,
      dealershipDocuments: {
        ...leadInput?.dealershipDocuments,
        form26: {
          ...leadInput?.dealershipDocuments?.form26,
          expectedDate: date,
        },
      },
    })
  }
  function onLoanForceClosureExpectedDateChange(
    event: DateTimePickerEvent,
    date?: Date,
  ) {
    setLeadInput({
      ...leadInput,
      dealershipDocuments: {
        ...leadInput?.dealershipDocuments,
        loanForeclosure: {
          ...leadInput?.dealershipDocuments?.loanForeclosure,
          expectedDate: date,
        },
      },
    })
  }
  function onBankNocExpectedDateChange(
    event: DateTimePickerEvent,
    date?: Date,
  ) {
    setLeadInput({
      ...leadInput,
      dealershipDocuments: {
        ...leadInput?.dealershipDocuments,
        bankNOC: {
          ...leadInput?.dealershipDocuments?.bankNOC,
          expectedDate: date,
        },
      },
    })
  }
  function onForm29ExpectedChange(event: DateTimePickerEvent, date?: Date) {
    setLeadInput({
      ...leadInput,
      dealershipDocuments: {
        ...leadInput?.dealershipDocuments,
        form29: {
          ...leadInput?.dealershipDocuments?.form29,
          expectedDate: date,
        },
      },
    })
  }
  function onForm35ExpectedDateChange(event: DateTimePickerEvent, date?: Date) {
    setLeadInput({
      ...leadInput,
      dealershipDocuments: {
        ...leadInput?.dealershipDocuments,
        form35: {
          ...leadInput?.dealershipDocuments?.form35,
          expectedDate: date,
        },
      },
    })
  }
  function onInsuranceCertificateExpectedDateChange(
    event: DateTimePickerEvent,
    date?: Date,
  ) {
    setLeadInput({
      ...leadInput,
      dealershipDocuments: {
        ...leadInput?.dealershipDocuments,
        insuranceCertificate: {
          ...leadInput?.dealershipDocuments?.insuranceCertificate,
          expectedDate: date,
        },
      },
    })
  }
  function onForm28ExpectedDateChange(event: DateTimePickerEvent, date?: Date) {
    setLeadInput({
      ...leadInput,
      dealershipDocuments: {
        ...leadInput?.dealershipDocuments,
        form28: {
          ...leadInput?.dealershipDocuments?.form28,
          expectedDate: date,
        },
      },
    })
  }
  function onForm30ExpectedDateChange(event: DateTimePickerEvent, date?: Date) {
    setLeadInput({
      ...leadInput,
      dealershipDocuments: {
        ...leadInput?.dealershipDocuments,
        form30: {
          ...leadInput?.dealershipDocuments?.form30,
          expectedDate: date,
        },
      },
    })
  }
  function onform60ExpectedDateChange(event: DateTimePickerEvent, date?: Date) {
    setLeadInput({
      ...leadInput,
      dealershipDocuments: {
        ...leadInput?.dealershipDocuments,
        form60: {
          ...leadInput?.dealershipDocuments?.form60,
          expectedDate: date,
        },
      },
    })
  }
  function onSellerAadharCardExpectedDateChange(
    event: DateTimePickerEvent,
    date?: Date,
  ) {
    setLeadInput({
      ...leadInput,
      dealershipDocuments: {
        ...leadInput?.dealershipDocuments,
        sellerAadharCard: {
          ...leadInput?.dealershipDocuments?.sellerAadharCard,
          expectedDate: date,
        },
      },
    })
  }
  function onOwnerAddressProofExpectedDateChange(
    event: DateTimePickerEvent,
    date?: Date,
  ) {
    setLeadInput({
      ...leadInput,
      dealershipDocuments: {
        ...leadInput?.dealershipDocuments,
        ownerAddressProof: {
          ...leadInput?.dealershipDocuments?.ownerAddressProof,
          expectedDate: date,
        },
      },
    })
  }
  function onform36Change(value: string) {
    setLeadInput({
      ...leadInput,
      dealershipDocuments: {
        ...leadInput?.dealershipDocuments,
        form36: {
          ...leadInput?.dealershipDocuments?.form36,
          isAvailable: value === 'first',
        },
      },
    })
  }
  function onForm36ExpectedChange(event: DateTimePickerEvent, date?: Date) {
    setLeadInput({
      ...leadInput,
      dealershipDocuments: {
        ...leadInput?.dealershipDocuments,
        form36: {
          ...leadInput?.dealershipDocuments?.form36,
          expectedDate: date,
        },
      },
    })
  }
  function onChallanChange(value: string) {
    setLeadInput({
      ...leadInput,
      dealerStance: {
        ...leadInput?.dealerStance,
        clearChallan: value === 'first',
      },
    })
  }
  function onClearBlacklistedChange(value: string) {
    setLeadInput({
      ...leadInput,
      dealerStance: {
        ...leadInput?.dealerStance,
        clearBlackList: value === 'first',
      },
    })
  }
  function onHsrpChange(value: string) {
    setLeadInput({
      ...leadInput,
      dealerStance: {
        ...leadInput?.dealerStance,
        clearHSRP: value === 'first',
      },
    })
  }
  return (
    <View style={commonStyle.mainAppContainer}>
      {loading ? (
        <ActivityIndicator style={commonStyle.mainAppContainer} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Separator size={1} />
          <Card style={styles.cardStyle}>
            <Row>
              <P1>Document Name</P1>
              <P1>Availability Status</P1>
            </Row>
          </Card>
          {item?.registrationCertificate && (
            <RNRadioButton
              variant={'doc_check'}
              title={'Registration certificate *'}
              value={isRegNo ? 'first' : 'second'}
              onValueChange={onRegNoChange}
            />
          )}

          {isRegNo === true && (
            <DatePicker
              placeholder="Expected Date *"
              value={regNoExpectedDate}
              onChange={onRcExpectedDateChange}
              isRequired
            />
          )}

          <Separator size={0.1} bgColor />
          {item?.form26 && (
            <>
              <RNRadioButton
                variant={'doc_check'}
                title={'Form 26 *'}
                value={isForm26 ? 'first' : 'second'}
                onValueChange={onForm26Change}
              />
              {isForm26 && (
                <DatePicker
                  placeholder="Expected Date *"
                  value={form26ExpectedDate}
                  onChange={onForm26ExpectedDateChange}
                  isRequired
                />
              )}
            </>
          )}
          <Separator size={0.1} bgColor />
          {item?.loanForeclosure && (
            <>
              <RNRadioButton
                variant={'doc_check'}
                title={'Loan foreclosure *'}
                value={isLoanForeclosure ? 'first' : 'second'}
                onValueChange={onLoanForceClosureChange}
              />
              {isLoanForeclosure && (
                <DatePicker
                  placeholder="Expected Date *"
                  value={loanForeClosureExpectedDate}
                  onChange={onLoanForceClosureExpectedDateChange}
                  isRequired
                />
              )}
            </>
          )}
          <Separator size={0.1} bgColor />
          {item?.bankNOC && (
            <>
              <RNRadioButton
                variant={'doc_check'}
                title={'Bank NOC *'}
                value={isBankNoc ? 'first' : 'second'}
                onValueChange={onBankNocChange}
              />
              {isBankNoc && (
                <DatePicker
                  placeholder="Expected Date *"
                  value={bankNocExpectedDate}
                  onChange={onBankNocExpectedDateChange}
                  isRequired
                />
              )}
            </>
          )}
          <Separator size={0.1} bgColor />
          {item?.form35 && (
            <>
              <RNRadioButton
                variant={'doc_check'}
                title={'Form 35 *'}
                value={isForm35 ? 'first' : 'second'}
                onValueChange={onForm35Change}
              />
              {isForm35 && (
                <DatePicker
                  placeholder="Expected Date *"
                  value={form35ExpectedDate}
                  onChange={onForm35ExpectedDateChange}
                  isRequired
                />
              )}
            </>
          )}
          {item?.insuranceCertificate && (
            <>
              <RNRadioButton
                variant={'doc_check'}
                title={'Insurance Certificate *'}
                value={isInsuranceCertificate ? 'first' : 'second'}
                onValueChange={onInsuranceCertificateChange}
              />
              {isInsuranceCertificate && (
                <DatePicker
                  placeholder="Expected Date *"
                  value={insuranceCertificateExpectedDate}
                  onChange={onInsuranceCertificateExpectedDateChange}
                  isRequired
                />
              )}
            </>
          )}
          <Separator size={0.1} bgColor />
          {item?.form28 && (
            <>
              <RNRadioButton
                variant={'doc_check'}
                title={'Form 28 *'}
                value={isForm28 ? 'first' : 'second'}
                onValueChange={onForm28Change}
              />
              {isForm28 && (
                <DatePicker
                  placeholder="Expected Date *"
                  value={form28ExpectedDate}
                  onChange={onForm28ExpectedDateChange}
                  isRequired
                />
              )}
            </>
          )}
          <Separator size={0.1} bgColor />
          {item?.form29 && (
            <>
              <RNRadioButton
                variant={'doc_check'}
                title={'Form 29 *'}
                value={isForm29 ? 'first' : 'second'}
                onValueChange={onForm29Change}
              />
              {isForm29 && (
                <DatePicker
                  placeholder="Expected Date *"
                  value={form29ExpectedDate}
                  onChange={onForm29ExpectedChange}
                  isRequired
                />
              )}
            </>
          )}
          <Separator size={0.1} bgColor />
          {item?.form30 && (
            <>
              <RNRadioButton
                variant={'doc_check'}
                title={'Form 30 *'}
                value={isForm30 ? 'first' : 'second'}
                onValueChange={onForm30Change}
              />
              {isForm30 && (
                <DatePicker
                  placeholder="Expected Date *"
                  value={form30ExpectedDate}
                  onChange={onForm30ExpectedDateChange}
                  isRequired
                />
              )}
            </>
          )}
          <Separator size={0.1} bgColor />
          {item?.form60 && (
            <>
              <RNRadioButton
                variant={'doc_check'}
                title={'Seller PAN / Form 60 *'}
                value={isform60 ? 'first' : 'second'}
                onValueChange={onform60Change}
              />
              {isform60 && (
                <DatePicker
                  placeholder="Expected Date *"
                  value={form60ExpectedDate}
                  onChange={onform60ExpectedDateChange}
                  isRequired
                />
              )}
            </>
          )}

          <Separator size={0.1} bgColor />
          {item?.sellerAadharCard && (
            <>
              <RNRadioButton
                variant={'doc_check'}
                title={'Seller Aadhar Card *'}
                value={isSellerAadharCard ? 'first' : 'second'}
                onValueChange={onSellerAadharCardChange}
              />
              {isSellerAadharCard && (
                <DatePicker
                  placeholder="Expected Date *"
                  value={sellarAadharCardExpectedDate}
                  onChange={onSellerAadharCardExpectedDateChange}
                  isRequired
                />
              )}
            </>
          )}
          <Separator size={0.1} bgColor />
          {item?.ownerAddressProof && (
            <>
              <RNRadioButton
                variant={'doc_check'}
                title={'Owner Address Proof *'}
                value={isOwnerAddressProof ? 'first' : 'second'}
                onValueChange={onOwnerAddressProofChange}
              />
              {isOwnerAddressProof && (
                <DatePicker
                  placeholder="Expected Date *"
                  value={ownerAddressProofExpectedDate}
                  onChange={onOwnerAddressProofExpectedDateChange}
                  isRequired
                />
              )}
            </>
          )}
          <Separator size={0.1} bgColor />
          {item?.form36 && (
            <>
              <RNRadioButton
                variant={'doc_check'}
                title={'Form 36 *'}
                value={isForm36 ? 'first' : 'second'}
                onValueChange={onform36Change}
              />
              {isForm36 && (
                <DatePicker
                  placeholder="Expected Date *"
                  value={form36ExpectedDate}
                  onChange={onForm36ExpectedChange}
                  isRequired
                />
              )}
            </>
          )}
          {data?.getLead?.vehicle?.isChallanAvailable && (
            <RNRadioButton
              variant={'payment_mode'}
              title={'Will Dealer clear challan issue? *'}
              firstValue="Yes"
              secondValue="No"
              value={isClearChallan ? 'first' : 'second'}
              onValueChange={onChallanChange}
            />
          )}
          {data?.getLead?.vehicle?.isBlacklisted && (
            <RNRadioButton
              variant={'payment_mode'}
              title={'Will dealer clear blacklisted issue? *'}
              firstValue="Yes"
              secondValue="No"
              value={isClearBlackListed ? 'first' : 'second'}
              onValueChange={onClearBlacklistedChange}
            />
          )}
          {data?.getLead?.vehicle?.isHSRPAvailable && (
            <RNRadioButton
              variant={'payment_mode'}
              title={'will dealer clear HSRP issue? *'}
              firstValue="Yes"
              secondValue="No"
              value={isClearHsrp ? 'first' : 'second'}
              onValueChange={onHsrpChange}
            />
          )}
          <Input
            label="Enter the remarks"
            // value={remarks?.remarks}
            onChangeText={onRemarksChange}
            uniqueKey="Remarks"
          />
        </ScrollView>
      )}
    </View>
  )
}

export default ConfirmDocumentAvailability
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Layout.baseSize,
  },
  buttonContainer: {
    padding: Layout.baseSize,
    elevation: 2,
  },
  cardStyle: {
    padding: Layout.baseSize * 0.5,
    backgroundColor: Colors.dark.inputBg,
  },
})
