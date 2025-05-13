import {format} from 'date-fns'
import React, {useEffect} from 'react'
import {ScrollView, StyleSheet, View} from 'react-native'
import {manufacturingYearList} from '../../constants/constants'
import Layout from '../../constants/Layout'
import {commonStyle} from '../../constants/style'
import {
  BankName,
  LeadSource,
  Ownership,
  useGetLeadDealDetailsQuery,
  useModelByMakeQuery,
  useStateInRegNoLazyQuery,
  VehicleMake,
} from '../../generated/hooks_and_more'
import useUpdateLeadInput, {
  useUpdateRemarksInput,
} from '../../hooks/useUpdateLeadInput'
import {FieldId} from '../../utils/FieldValidator'
import {enumToItems, log, titleCaseToReadable} from '../../utils/helpers'
import {Input} from '../basic/Input'
import PickerSelectButton, {Item} from '../basic/PickerSelectButton'

type FormComponentProps = {leadId: string | undefined; registrationNo?: string}

const GenerateLead = ({
  leadId = 'new',
  registrationNo,
}: FormComponentProps): JSX.Element => {
  const {leadInput, setLeadInput} = useUpdateLeadInput(leadId)
  const regNo = registrationNo ?? leadInput?.regNo
  const {remarks, setRemarks} = useUpdateRemarksInput(regNo)

  //const purchaseType = leadInput?.source
  const purchaseType = leadInput?.source ?? LeadSource.BankAuction

  const {data: dealData} = useGetLeadDealDetailsQuery({
    skip: leadId === 'new',
    variables: {
      id: leadId,
    },
    onCompleted: ({getLead}) => {
      setLeadInput({
        regNo,
        source: getLead?.source,
        auctionByBank: getLead?.auctionByBank,
        ownershipType: getLead?.ownershipType,
        demandAmount: getLead?.demandAmount,
        vehicle: {
          registrationNumber: registrationNo,
          make: getLead?.vehicle?.make,
          model: getLead?.vehicle?.model,
          chassisNumber: getLead?.vehicle?.chassisNumber,
          engineNumber: getLead?.vehicle?.engineNumber,
          manufacturingDate: getLead?.vehicle?.manufacturingDate,
          hoursMeter: getLead?.vehicle?.hoursMeter,
        },
      })
    },
  })

  useEffect(() => {
    console.log({purchaseType, leadId})

    if (purchaseType === LeadSource.BankAuction) {
      onPurchaseTypeChange(LeadSource.BankAuction)
    }

    if (leadId !== 'new') {
      console.log('New lead data', dealData)

      // NOTE: State updating inside useEffect can have side effects and lead to regression

      /*    setLeadInput({
        regNo: registrationNo,
        source: dealData?.getLead?.source,
        auctionByBank: dealData?.getLead?.auctionByBank,
        ownershipType: dealData?.getLead?.ownershipType,
        demandAmount: dealData?.getLead?.demandAmount,
        vehicle: {
          registrationNumber: registrationNo,
          make: dealData?.getLead?.vehicle?.make,
          model: dealData?.getLead?.vehicle?.model,
          chassisNumber: dealData?.getLead?.vehicle?.chassisNumber,
          engineNumber: dealData?.getLead?.vehicle?.engineNumber,
          manufacturingDate: dealData?.getLead?.vehicle?.manufacturingDate,
          hoursMeter: dealData?.getLead?.vehicle?.hoursMeter,
        },
      }) */
      return () => setLeadInput({})
    }
  }, [leadId, purchaseType])

  const [checkRegNoState, {data: statecodeData}] = useStateInRegNoLazyQuery({})

  const regNoRTOcode = regNo && regNo.length > 2 && regNo.slice(0, 2)
  // const auctionAgencyName = leadInput?.auctioningAgency?.name
  // const agencySpocMobile = leadInput?.auctioningAgency?.spocNo
  const regNoState = statecodeData?.queryStateCodeWithRegNumber?.find(state => {
    if (regNoRTOcode) {
      return state.RTOCode === regNoRTOcode?.toUpperCase()
    }
    return false
  })?.state
  const vehicleMake = leadInput?.vehicle?.make
  const vehicleModel = leadInput?.vehicle?.model
  const manufacturingYear =
    leadInput?.vehicle?.manufacturingDate &&
    format(Date.parse(leadInput?.vehicle?.manufacturingDate), 'yyyy')
  const bankName = leadInput?.auctionByBank
  const engineNumber = leadInput?.vehicle?.engineNumber
  const chassisNumber = leadInput?.vehicle?.chassisNumber
  const hoursMeters = leadInput?.vehicle?.hoursMeter
  const demandedAmount = leadInput?.demandAmount
  const ownership = leadInput?.ownershipType
  let vehicleMakeCheck = ''
  const {data: modelData} = useModelByMakeQuery({
    variables: {
      make: vehicleMake?.includes('_')
        ? vehicleMake.replace('_', ' ')
        : vehicleMake,
    },
    // fetchPolicy: 'network-only',
    skip: !vehicleMake,
    /* onCompleted: modelData => {
      log('logging models', modelData)
    }, */
  })

  // const hideModal = () => setVisible(false)

  /* function onYesPress() {
    log(
      "should take to next step of vehicle documents collection reg No:",
      regNo
    );
    navigation.setParams({
      leadId: newLeadId.current,
      currentStatus: LeadStatus.LeadGenerated,
    });
  }

  function onNoPress() {
    setVisible(false);
    navigation.goBack();
  } */

  function onChangeRegNoText(regNo: string) {
    // setRegNo(text?.trim());
    setLeadInput({
      ...leadInput,
      // source: purchaseType,
      regNo,
      vehicle: {
        ...leadInput?.vehicle,
        regNo: regNo,
      },
    })
    checkRegNoState()
    log('state for the reg no', regNoState)
    setLeadInput({
      ...leadInput,
      registrationState: regNoState,
      // source: purchaseType,
      regNo,
      vehicle: {
        ...leadInput?.vehicle,
        regNo: regNo,
      },
    })
  }
  function onRemarksChange(value: string) {
    setRemarks(value)
  }

  function onPurchaseTypeChange(value: string) {
    if (value === LeadSource.BankAuction) {
      setLeadInput({
        ...leadInput,
        ownershipType: null,
        demandAmount: null,
        vehicle: {
          ...leadInput?.vehicle,
          hoursMeter: null,
        },
        source: value as LeadSource,
      })
    } else {
      setLeadInput({
        ...leadInput,
        vehicle: {
          ...leadInput?.vehicle,
          chassisNumber: null,
          engineNumber: null,
        },
        auctionByBank: null,
        source: value as LeadSource,
      })
    }
  }

  // function onAuctionAgencyNameChange(value: string) {
  //   // log('input text to update agency name', value)
  //   setLeadInput({
  //     ...leadInput,
  //     auctioningAgency: {
  //       ...leadInput?.auctioningAgency,
  //       name: value,
  //     },
  //   })
  // }

  function onBankNameChange(value: string) {
    // setBankName(value);
    setLeadInput({
      ...leadInput,
      auctionByBank: value as BankName,
      // auctioningBank: {
      //   ...leadInput?.auctioningBank,
      //   name: value,
      // },
    })
  }

  // function onAgencySpocMobileChange(spocNo: string) {
  //   // setAgencySpocMobile(value?.trim());

  //   setLeadInput({
  //     ...leadInput,
  //     auctioningAgency: {
  //       ...leadInput?.auctioningAgency,
  //       spocNo,
  //     },
  //   })
  // }

  function onVehicleMakeChange(value: string, index: number) {
    // setVehicleMake(value as VehicleMake);
    setLeadInput({
      ...leadInput,
      vehicle: {
        ...leadInput?.vehicle,
        make: value as VehicleMake,
        model: undefined,
      },
    })
  }

  function onVehicleModelChange(value: string, index: number) {
    // setVehicleModel(value);
    setLeadInput({
      ...leadInput,
      vehicle: {
        ...leadInput?.vehicle,
        model: value,
      },
    })
  }

  function onManufacturingYearChange(value?: string, index?: number) {
    // setManufacturingYear(date ?? new Date());
    setLeadInput({
      ...leadInput,
      vehicle: {
        ...leadInput?.vehicle,
        manufacturingDate: value,
      },
    })
  }

  function onEngineNumberChange(value: string) {
    // setEngineNumber(value);
    setLeadInput({
      ...leadInput,
      vehicle: {
        ...leadInput?.vehicle,
        engineNumber: value,
      },
    })
  }

  function onChassisNumberChange(value: string) {
    // setChesisNumber(value);
    setLeadInput({
      ...leadInput,
      vehicle: {
        ...leadInput?.vehicle,
        chassisNumber: value,
      },
    })
  }

  const vehicleModelList = modelData?.queryModelByMake?.map(i => ({
    label: i.model,
    value: i.model,
  }))

  const purchaseTypeItems = [
    {label: titleCaseToReadable(purchaseType), value: purchaseType},
  ]

  // function onRegistrationNumberChange(value: string) {
  //   setRegistrationNumber(value);
  // }

  // log("show modal", visible);
  function onOwnershipTypeChange(value: string) {
    setLeadInput({
      ...leadInput,
      ownershipType: value as Ownership,
    })
  }
  function onHoursMeterChange(value: string) {
    setLeadInput({
      ...leadInput,
      vehicle: {
        ...leadInput?.vehicle,
        hoursMeter: Number(value),
      },
    })
  }
  function onDemandAmountChange(value: string) {
    setLeadInput({
      ...leadInput,
      demandAmount: Number(value),
    })
  }
  return (
    <View style={commonStyle.mainAppContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <PickerSelectButton
          placeholder="Purchase type *"
          value={purchaseType}
          onValueChange={onPurchaseTypeChange}
          items={enumToItems(LeadSource) as Item[]}
          isRequired
          // disabled
        />
        <Input
          key="registration-number"
          label="Registration Number *"
          value={regNo}
          onChangeText={onChangeRegNoText}
          isRequired
          uniqueKey="registration-number"
          disabled={!!registrationNo}
        />
        <PickerSelectButton
          placeholder="Make *"
          value={vehicleMake}
          onValueChange={onVehicleMakeChange}
          items={enumToItems(VehicleMake) as Item[]}
          showSearchBar
        />
        <PickerSelectButton
          placeholder="Model *"
          value={vehicleModel}
          onValueChange={onVehicleModelChange}
          items={vehicleModelList}
          showSearchBar={!!vehicleMake}
        />
        <PickerSelectButton
          placeholder="Manufacturing Year *"
          value={manufacturingYear}
          onValueChange={onManufacturingYearChange}
          items={manufacturingYearList}
        />
        {purchaseType === LeadSource.DealershipSale && (
          <>
            <PickerSelectButton
              placeholder="Ownership Type *"
              value={ownership}
              onValueChange={onOwnershipTypeChange}
              items={enumToItems(Ownership) as Item[]}
            />
            <Input
              key={'hours-meter'}
              keyboardType="numeric"
              id={FieldId.HOURS_METER}
              temporary
              label={'Hours Meter *'}
              value={hoursMeters?.toString()}
              onChangeText={onHoursMeterChange}
              isRequired
            />
            <Input
              key={'demanded-amount'}
              id={FieldId.DEMANDED_AMOUNT}
              temporary
              label={'Demanded Amount *'}
              keyboardType="numeric"
              onChangeText={onDemandAmountChange}
              value={demandedAmount?.toString()}
              isRequired
              minCharLength={3}
            />
          </>
        )}

        {purchaseType === LeadSource.BankAuction && (
          <PickerSelectButton
            isRequired
            placeholder="Bank Name *"
            value={bankName}
            onValueChange={onBankNameChange}
            items={enumToItems(BankName) as Item[]}
          />
        )}
        {/* <Input
          key={'bank-name'}
          label={'Bank Name *'}
          onChangeText={onBankNameChange}
          value={bankName}
          onValueChange={onBankNameChange}
          isRequired
          minCharLength={3}
        /> */}
        {/* <Input
          key="agency-spoc-mobile"
          label="Agency Spoc Mobile *"
          onChangeText={onAgencySpocMobileChange}
          value={agencySpocMobile}
          keyboardType={'phone-pad'}
          isRequired
          minCharLength={10}
          maxCharLength={10}
          checkValidation={checkPhoneNumber}
          uniqueKey="agency-spoc-mobile"
        /> */}

        {/* <DatePicker
          placeholder="Manufacturing Year *"
          value={manufacturingYear}
          onChange={onManufacturingYearChange}
          isRequired
          formatString="yyyy"
        /> */}
        {purchaseType === LeadSource.BankAuction && (
          <>
            <Input
              key={'engine-number'}
              label={'Engine Number *'}
              onChangeText={onEngineNumberChange}
              value={engineNumber}
              isRequired
              minCharLength={3}
              // checkValidation={isAlphaNumericCaptailStringValid(engineNumber)}
              uniqueKey="engine-number"
            />
            <Input
              key={'chesis-number'}
              label={'Chassis Number *'}
              onChangeText={onChassisNumberChange}
              value={chassisNumber}
              isRequired
              minCharLength={3}
              // checkValidation={isAlphaNumericCaptailStringValid(chassisNumber)}
              uniqueKey="chessis-number"
            />
          </>
        )}
        {purchaseType === LeadSource.DealershipSale && (
          <Input
            label="Enter the remarks"
            // value={remarks?.remarks}
            onChangeText={onRemarksChange}
            uniqueKey="Remarks"
          />
        )}
      </ScrollView>
    </View>
  )
}

export default GenerateLead

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: baseSize,
  },
  containerStyle: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    padding: Layout.baseSize,
    borderRadius: Layout.baseSize / 5,
  },
})
