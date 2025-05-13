import {DateTimePickerEvent} from '@react-native-community/datetimepicker'
import {useEffect, useRef} from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import Layout from '../../../constants/Layout'
import {commonStyle} from '../../../constants/style'
import {
  BankName,
  InsuranceType,
  InsurerName,
} from '../../../generated/hooks_and_more'
import useUpdateLeadInput from '../../../hooks/useUpdateLeadInput'
import {
  isAlphaNumericCaptailStringValid,
  isNumberValid,
  isPhoneValid,
} from '../../../utils/formHelper'
import {compareDate, enumToItems, log} from '../../../utils/helpers'
import {DatePicker} from '../../basic/DatePicker'
import {Input} from '../../basic/Input'
import PickerSelectButton from '../../basic/PickerSelectButton'
import RNRadioButton from '../../basic/RNRadioButton'
import {View} from '../../basic/Themed'
const {baseSize, window} = Layout
type UpdateVehicleDetailsDealerShipProps = {leadId: string | undefined}
const UpdateVehicleDetailsDealerShip = ({
  leadId = 'new',
}: UpdateVehicleDetailsDealerShipProps) => {
  const {leadInput, setLeadInput} = useUpdateLeadInput(leadId)
  const engineNumber = leadInput?.vehicle?.engineNumber
  const chassisNumber = leadInput?.vehicle?.chassisNumber
  const dealerName = leadInput?.dealer?.name
  const dealerPhoneNumber = leadInput?.dealer?.phoneNo

  const registrationDate = leadInput?.vehicle?.registrationDate
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

  function onRegistrationDateChange(event: DateTimePickerEvent, date?: Date) {
    setLeadInput({
      ...leadInput,
      vehicle: {
        ...leadInput?.vehicle,
        registrationDate: date,
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

  return (
    <View style={commonStyle.mainAppContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Input
          key={'dealer-name'}
          label={'Dealer Name *'}
          onChangeText={onDealerNameChange}
          value={dealerName}
          isRequired
          uniqueKey="dealer-name"
        />
        <Input
          key={'dealer-phoneNo'}
          label={'Dealer Mobile *'}
          onChangeText={onDealerPhoneNoChange}
          value={dealerPhoneNumber}
          isRequired
          uniqueKey="dealer-phoneNo"
        />
        <Input
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
        />

        <DatePicker
          placeholder="Registration Date *"
          value={registrationDate}
          onChange={onRegistrationDateChange}
        />
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

        <RNRadioButton
          variant={'pickup'}
          title={'Is Vehicle Financed? *'}
          value={vehicleFinanced ? 'first' : 'second'}
          onValueChange={onVehicleFinancedChange}
        />
        {/* TODO: Financer name as picker?  */}
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
    </View>
  )
}

export default UpdateVehicleDetailsDealerShip

const styles = StyleSheet.create({
  buttonContainer: {
    padding: Layout.baseSize,
    elevation: 2,
  },
})
