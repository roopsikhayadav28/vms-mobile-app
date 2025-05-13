import {DateTimePickerEvent} from '@react-native-community/datetimepicker'
import {useEffect, useRef} from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import Layout from '../../constants/Layout'
import {commonStyle} from '../../constants/style'
import {
  BankName,
  InsuranceType,
  InsurerName,
  LeadSource,
  LoanToBeClosedBy,
} from '../../generated/hooks_and_more'
import useUpdateLeadInput from '../../hooks/useUpdateLeadInput'
import {FieldId} from '../../utils/FieldValidator'
import {
  isAlphaNumericCaptailStringValid,
  isNumberValid,
  isPhoneValid,
} from '../../utils/formHelper'
import {compareDate, enumToItems, log} from '../../utils/helpers'
import {DatePicker} from '../basic/DatePicker'
import {Input} from '../basic/Input'
import PickerSelectButton from '../basic/PickerSelectButton'
import RNRadioButton from '../basic/RNRadioButton'
import {View} from '../basic/Themed'
const {baseSize, window} = Layout
type UpdateVehicleDetailsProps = {
  leadId: string | undefined
  source?: LeadSource
}
const UpdateVehicleDetails = ({
  leadId = 'new',
  source,
}: UpdateVehicleDetailsProps) => {
  const {leadInput, setLeadInput} = useUpdateLeadInput(leadId)
  /* const [certificateAvailable, setCertificateAvailable] = useState<
    string | undefined
  >("second");
  const [engineNumber, setEngineNumber] = useState<string>();
  const [chesisNumber, setChesisNumber] = useState<string>();
  const [registrationDate, setRegistrationDate] = useState<Date>(new Date());
  const [reposessionDate, setReposessionDate] = useState<Date>(new Date());
  const [fitnessValidity, setFitnessValidity] = useState<Date>(new Date());
  const [vehicleFinanced, setVehicleFinanced] = useState<string | undefined>(
    "first"
  );
  const [financerName, setFinancerName] = useState<string>();
  const [loanClosed, setLoanClosed] = useState<string | undefined>("first");
  const [loanAmount, setLoanAmount] = useState<string>();
  const [vehicleInsured, setVehicleInsured] = useState<string | undefined>(
    "first"
  );
  const [insurerName, setInsurerName] = useState<string>();
  const [insuranceType, setInsuranceType] = useState<string>();
  const [policyNumber, setPolicyNumber] = useState<string>();
  const [policyExpiryDate, setPolicyExpiryDate] = useState<Date>(new Date()); */
  // const engineNumber = leadInput?.vehicle?.engineNumber
  // const chassisNumber = leadInput?.vehicle?.chassisNumber
  const auctionAgencyName = leadInput?.auctioningAgency?.name
  const agencySpocMobile = leadInput?.auctioningAgency?.spocNo

  const checkPhoneNumber =
    agencySpocMobile?.length > 0 && isPhoneValid(agencySpocMobile)

  const registrationDate = leadInput?.vehicle?.registrationDate
  const reposessionDate = leadInput?.vehicle?.repossessionDate
  const certificateAvailable = leadInput?.vehicle?.isRcAvailable
  const fitnessValidity = leadInput?.vehicle?.fitnessValidUpto
  const vehicleFinanced = leadInput?.vehicle?.isVehicleFinanced
  const financerName = leadInput?.vehicle?.financingDetails?.financerName
  const loanClosed = leadInput?.vehicle?.financingDetails?.isLoanClosed
  const insurerName = leadInput?.vehicle?.insuranceDetails?.insurerName
  const insuranceType = leadInput?.vehicle?.insuranceDetails?.insuranceType
  const policyNumber = leadInput?.vehicle?.insuranceDetails?.policyNumber
  const policyExpiryDate =
    leadInput?.vehicle?.insuranceDetails?.policyExpiryDate
  const loanAmount = leadInput?.vehicle?.financingDetails?.pendingLoanAmount
  const vehicleInsured = leadInput?.vehicle?.isVehicleInsured
  const checkRepoDateValidationRef = useRef<boolean>(false)
  const checkFitnessDateValidationRef = useRef<boolean>(false)
  log('checkRepoDateValidationRef', checkRepoDateValidationRef)
  const dealerName = leadInput?.dealer?.name
  const dealerPhoneNumber = leadInput?.dealer?.phoneNo
  const engineNumber = leadInput?.vehicle?.engineNumber
  const chassisNumber = leadInput?.vehicle?.chassisNumber
  const loanClosedBy =
    leadInput?.vehicle?.financingDetails?.tempLoanToBeClosedBy // This is the case that will be updated

  useEffect(() => {
    if (
      registrationDate &&
      fitnessValidity &&
      compareDate(registrationDate, fitnessValidity)
    ) {
      checkFitnessDateValidationRef.current = true
    } else {
      checkFitnessDateValidationRef.current = false
    }
    if (
      registrationDate &&
      reposessionDate &&
      compareDate(registrationDate, reposessionDate)
    ) {
      checkRepoDateValidationRef.current = true
    } else {
      checkRepoDateValidationRef.current = false
    }
  }, [reposessionDate, registrationDate, fitnessValidity])

  useEffect(() => {
    if (source === LeadSource.BankAuction) {
      setLeadInput({
        ...leadInput,
        vehicle: {
          ...leadInput?.vehicle,
          isRcAvailable: false,
          isVehicleFinanced: false,
        },
      })
    } else if (source === LeadSource.DealershipSale) {
      // setLeadInput({}) //TODO : for hypocrite behaviour
      setLeadInput({
        ...leadInput,
        vehicle: {
          ...leadInput?.vehicle,
          isRcAvailable: false,
          isVehicleFinanced: false,
          isVehicleInsured: false,
          financingDetails: {
            ...leadInput?.vehicle?.financingDetails,
            isLoanClosed: true,
          },
        },
      })
    }
  }, [])
  // log('checkDateValidation current value', checkDateValidationRef.current)

  // function onEngineNumberChange(value: string) {
  //   // setEngineNumber(value);
  //   setLeadInput({
  //     ...leadInput,
  //     vehicle: {
  //       ...leadInput?.vehicle,
  //       engineNumber: value,
  //     },
  //   })
  // }

  // function onChesisNumberChange(value: string) {
  //   // setChesisNumber(value);
  //   setLeadInput({
  //     ...leadInput,
  //     vehicle: {
  //       ...leadInput?.vehicle,
  //       chassisNumber: value,
  //     },
  //   })
  // }

  function onAuctionAgencyNameChange(value: string) {
    // log('input text to update agency name', value)
    setLeadInput({
      ...leadInput,
      auctioningAgency: {
        ...leadInput?.auctioningAgency,
        name: value,
      },
    })
  }
  function onAgencySpocMobileChange(spocNo: string) {
    // setAgencySpocMobile(value?.trim());
    setLeadInput({
      ...leadInput,
      auctioningAgency: {
        ...leadInput?.auctioningAgency,
        spocNo,
      },
    })
  }

  function onRegistrationDateChange(event: DateTimePickerEvent, date?: Date) {
    // setRegistrationDate(date ?? new Date());

    setLeadInput({
      ...leadInput,
      vehicle: {
        ...leadInput?.vehicle,
        registrationDate: date,
      },
    })
  }

  function onReposessionDateChange(event: DateTimePickerEvent, date?: Date) {
    // setReposessionDate(date ?? new Date());
    setLeadInput({
      ...leadInput,
      vehicle: {
        ...leadInput?.vehicle,
        repossessionDate: date,
      },
    })
  }

  function onCertificateAvailableChange(value?: string) {
    setLeadInput({
      ...leadInput,
      vehicle: {
        ...leadInput?.vehicle,
        isRcAvailable: value === 'first',
      },
    })
  }

  function onFitnessValidityChange(event: DateTimePickerEvent, date?: Date) {
    // setFitnessValidity(date ?? new Date());

    setLeadInput({
      ...leadInput,
      vehicle: {
        ...leadInput?.vehicle,
        fitnessValidUpto: date,
      },
    })
  }

  function onVehicleFinancedChange(value?: string) {
    setLeadInput({
      ...leadInput,
      vehicle: {
        ...leadInput?.vehicle,
        isVehicleFinanced: value === 'first',
      },
    })
  }

  function onFinancerNameChange(value: string, index: number) {
    // setFinancerName(value);
    setLeadInput({
      ...leadInput,
      vehicle: {
        ...leadInput?.vehicle,
        financingDetails: {
          ...leadInput?.vehicle?.financingDetails,
          financerName: value,
        },
      },
    })
  }

  function onLoanClosedChange(value?: string) {
    setLeadInput({
      ...leadInput,
      vehicle: {
        ...leadInput?.vehicle,
        financingDetails: {
          ...leadInput?.vehicle?.financingDetails,
          isLoanClosed: value === 'first',
        },
      },
    })
  }

  function onLoanAmountChange(value: string) {
    setLeadInput({
      ...leadInput,
      vehicle: {
        ...leadInput?.vehicle,
        financingDetails: {
          ...leadInput?.vehicle?.financingDetails,
          pendingLoanAmount: Number(value),
        },
      },
    })
  }

  function onVehicleInsuredChange(value?: string) {
    setLeadInput({
      ...leadInput,
      vehicle: {
        ...leadInput?.vehicle,
        isVehicleInsured: value === 'first',
      },
    })
  }

  function onInsurerNameChange(value: string, index: number) {
    setLeadInput({
      ...leadInput,
      vehicle: {
        ...leadInput?.vehicle,
        insuranceDetails: {
          ...leadInput?.vehicle?.insuranceDetails,
          insurerName: value as InsurerName,
        },
      },
    })
  }

  function onInsuranceTypeChange(value: string, index: number) {
    // setInsuranceType(value);
    setLeadInput({
      ...leadInput,
      vehicle: {
        ...leadInput?.vehicle,
        insuranceDetails: {
          ...leadInput?.vehicle?.insuranceDetails,
          insuranceType: value as InsuranceType,
        },
      },
    })
  }

  function onPolicyNumberChange(value: string) {
    // setPolicyNumber(value);
    setLeadInput({
      ...leadInput,
      vehicle: {
        ...leadInput?.vehicle,
        insuranceDetails: {
          ...leadInput?.vehicle?.insuranceDetails,
          policyNumber: value,
        },
      },
    })
  }

  function onPolicyExpiryDateChange(event: DateTimePickerEvent, date?: Date) {
    // setPolicyExpiryDate(date ?? new Date());
    setLeadInput({
      ...leadInput,
      vehicle: {
        ...leadInput?.vehicle,
        insuranceDetails: {
          ...leadInput?.vehicle?.insuranceDetails,
          policyExpiryDate: date,
        },
      },
    })
  }
  function onDealerNameChange(value: string) {
    setLeadInput({
      ...leadInput,
      dealer: {
        ...leadInput?.dealer,
        name: value,
      },
    })
  }
  function onDealerPhoneNoChange(value: string) {
    setLeadInput({
      ...leadInput,
      dealer: {
        ...leadInput?.dealer,
        phoneNo: value,
      },
    })
  }
  function onEngineNumberChange(value: string) {
    setLeadInput({
      ...leadInput,
      vehicle: {
        ...leadInput?.vehicle,
        engineNumber: value,
      },
    })
  }
  function onChesisNumberChange(value: string) {
    setLeadInput({
      ...leadInput,
      vehicle: {
        ...leadInput?.vehicle,
        chassisNumber: value,
      },
    })
  }
  function onLoanClosedByChange(value: string) {
    setLeadInput({
      ...leadInput,

      vehicle: {
        ...leadInput?.vehicle,
        financingDetails: {
          ...leadInput?.vehicle?.financingDetails,
          tempLoanToBeClosedBy: value as LoanToBeClosedBy,
        },
      },
    })
  }
  return (
    <View style={commonStyle.mainAppContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <Input
          key={'engine-number'}
          label={'Engine Number *'}
          onChangeText={onEngineNumberChange}
          value={engineNumber}
          isRequired
          minCharLength={3}
          checkValidation={isAlphaNumericCaptailStringValid(engineNumber)}
          uniqueKey="engine-number"
        />
        <Input
          key={'chesis-number'}
          label={'Chassis Number *'}
          onChangeText={onChesisNumberChange}
          value={chassisNumber}
          isRequired
          minCharLength={3}
          checkValidation={isAlphaNumericCaptailStringValid(chassisNumber)}
          uniqueKey="chesis-number"
        /> */}
        {source === LeadSource.BankAuction && (
          <>
            <Input
              key="auction-agency-name"
              id={FieldId.AUCTION_AGENCY_NAME}
              label="Auction Agency Name *"
              onChangeText={onAuctionAgencyNameChange}
              value={auctionAgencyName}
              isRequired
              minCharLength={3}
              uniqueKey="auction-agency-name"
            />
            <Input
              key="agency-spoc-mobile"
              id={FieldId.AUCTION_SPOC_NUMBER}
              label="Agency Spoc Mobile *"
              onChangeText={onAgencySpocMobileChange}
              value={agencySpocMobile}
              keyboardType={'phone-pad'}
              isRequired
              minCharLength={10}
              maxCharLength={10}
              checkValidation={checkPhoneNumber}
              uniqueKey="agency-spoc-mobile"
            />
          </>
        )}
        {source === LeadSource.DealershipSale && (
          <>
            <Input
              key={'dealer-name'}
              id={FieldId.DEALER_NAME}
              label={'Dealer Name *'}
              temporary
              onChangeText={onDealerNameChange}
              value={dealerName}
              isRequired
              uniqueKey="dealer-name"
            />
            <Input
              key={'dealer-phoneNo'}
              id={FieldId.DEALER_MOBILE}
              temporary
              label={'Dealer Mobile *'}
              keyboardType="phone-pad"
              onChangeText={onDealerPhoneNoChange}
              value={dealerPhoneNumber}
              isRequired
              uniqueKey="dealer-phoneNo"
            />
            <Input
              key={'engine-number'}
              id={FieldId.ENGINE_NUMBER}
              label={'Engine Number *'}
              onChangeText={onEngineNumberChange}
              value={engineNumber}
              isRequired
              minCharLength={3}
              checkValidation={isAlphaNumericCaptailStringValid(engineNumber)}
              uniqueKey="engine-number"
            />
            <Input
              key={'chesis-number'}
              id={FieldId.CHASSIS_NUMBER}
              label={'Chassis Number *'}
              onChangeText={onChesisNumberChange}
              value={chassisNumber}
              isRequired
              minCharLength={3}
              checkValidation={isAlphaNumericCaptailStringValid(chassisNumber)}
              uniqueKey="chesis-number"
            />
          </>
        )}
        <DatePicker
          placeholder="Registration Date *"
          value={registrationDate}
          onChange={onRegistrationDateChange}
        />
        {source === LeadSource.BankAuction && (
          <DatePicker
            placeholder="Reposession Date *"
            value={reposessionDate}
            onChange={onReposessionDateChange}
            isRepoDateGreatorThanRegDate={checkRepoDateValidationRef?.current}
          />
        )}
        <RNRadioButton
          variant={'pickup'}
          title={'Registration certificate Available? *'}
          value={certificateAvailable ? 'first' : 'second'}
          onValueChange={onCertificateAvailableChange}
        />
        {certificateAvailable && (
          <DatePicker
            placeholder="Fitness Valid upto *"
            value={fitnessValidity}
            onChange={onFitnessValidityChange}
            isRequired
            isFitnessDateGreatorThanRegDate={
              checkFitnessDateValidationRef?.current
            }
          />
        )}
        {source === LeadSource.DealershipSale && (
          <>
            <RNRadioButton
              variant={'pickup'}
              title={'Is Vehicle Financed? *'}
              value={vehicleFinanced ? 'first' : 'second'}
              onValueChange={onVehicleFinancedChange}
            />
            {/* TODO: Financer name as picker? */}
            {vehicleFinanced && (
              <>
                <PickerSelectButton
                  placeholder={'Select Financer Name *'}
                  onValueChange={onFinancerNameChange}
                  items={enumToItems(BankName)}
                  value={financerName}
                  isRequired
                />
                <RNRadioButton
                  variant={'pickup'}
                  title={'Is Loan Closed? *'}
                  value={loanClosed ? 'first' : 'second'}
                  onValueChange={onLoanClosedChange}
                />
                {!loanClosed && (
                  <>
                    <Input
                      key={'loan-amount'}
                      label={'Enter pending Loan Amount *'}
                      keyboardType={'numeric'}
                      onChangeText={onLoanAmountChange}
                      value={loanAmount?.toString()}
                      isRequired
                      minCharLength={3}
                      uniqueKey="loan-amount"
                      checkValidation={isNumberValid(loanAmount)}
                    />
                    <PickerSelectButton
                      placeholder={'Loan to be Closed by *'}
                      onValueChange={onLoanClosedByChange}
                      items={enumToItems(LoanToBeClosedBy)}
                      value={loanClosedBy}
                      isRequired
                    />
                  </>
                )}
              </>
            )}
          </>
        )}

        <RNRadioButton
          variant={'pickup'}
          title={'Is Vehicle Insured? *'}
          value={vehicleInsured ? 'first' : 'second'}
          onValueChange={onVehicleInsuredChange}
        />
        {/* TODO: Financer name as picker?*/}
        {vehicleInsured && (
          <>
            <PickerSelectButton
              placeholder={'Select Insurer Name *'}
              onValueChange={onInsurerNameChange}
              items={enumToItems(InsurerName)}
              value={insurerName}
              isRequired
            />
            <PickerSelectButton
              placeholder={'Insurance Type *'}
              onValueChange={onInsuranceTypeChange}
              items={enumToItems(InsuranceType)}
              value={insuranceType}
              isRequired
            />
            <Input
              key={'policy-number'}
              label={'Enter Policy Number *'}
              onChangeText={onPolicyNumberChange}
              value={policyNumber}
              isRequired
              minCharLength={3}
              uniqueKey="policy-number"
              // checkValidation={isAlphaNumericCaptailStringValid(policyNumber)}
            />
            <DatePicker
              placeholder="Enter Policy Expiry Date *"
              value={policyExpiryDate}
              onChange={onPolicyExpiryDateChange}
              isRequired
            />
          </>
        )}
      </ScrollView>
      {/* <Row style={commonStyle.buttonView}>
        <Button
          variant="primary"
          title="SAVE & CONTIMUE"
          type="enable"
          onPress={() => {}}
        />
      </Row> */}
    </View>
  )
}

export default UpdateVehicleDetails

const styles = StyleSheet.create({
  buttonContainer: {
    padding: Layout.baseSize,
    elevation: 2,
  },
})
