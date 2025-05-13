import React, {useMemo, useState} from 'react'
import {ScrollView, StyleSheet, View} from 'react-native'
import {commonStyle} from '../../constants/style'
import {
  BankName,
  useModelByMakeQuery,
  VehicleMake,
} from '../../generated/hooks_and_more'
import useUpdateLeadInput, {
  useUpdateRemarksInput,
} from '../../hooks/useUpdateLeadInput'
import {enumToItems} from '../../utils/helpers'
import {Input} from '../basic/Input'
import PickerSelectButton, {Item} from '../basic/PickerSelectButton'
import RNFileUploader from '../basic/RNFileUploader'
import Separator from '../basic/Separator'
import {constant} from 'lodash'
import RNRadioButton from '../basic/RNRadioButton'
import {format} from 'date-fns'
import {manufacturingYearList} from '../../constants/constants'

type FormComponentProps = {leadId: string | undefined}

// TODO: UI changes needed for padding etc
const ConfirmedRto = ({leadId = 'new'}: FormComponentProps): JSX.Element => {
  const {leadInput, setLeadInput} = useUpdateLeadInput(leadId)
  const registrationNumber = leadInput?.regNo
  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false)

  const {remarks, setRemarks} = useUpdateRemarksInput(
    registrationNumber as string,
  ) //TODO check
  const vehicleMake = leadInput?.vehicle?.tempMake
  const vehicleModel = leadInput?.vehicle?.tempModel
  const manufacturingYear =
    leadInput?.vehicle?.tempManufacturingDate &&
    format(Date.parse(leadInput?.vehicle?.manufacturingDate), 'yyyy')
  const engineNumber = leadInput?.vehicle?.tempEngineNumber
  const chassisNumber = leadInput?.vehicle?.tempChassisNumber
  const financerName = leadInput?.vehicle?.financingDetails?.financerName
  const isHypo = leadInput?.vehicle?.isHypo
  const isHsrp = leadInput?.vehicle?.isHSRPAvailable
  const isChallan = leadInput?.vehicle?.isChallanAvailable
  const isBlackListed = leadInput?.vehicle?.isBlacklisted
  const challanAmount = leadInput?.vehicle?.challanAmount
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
  // const rtoVerificationRemarks = leadInput?.vehicle?.verificationRemarks;

  // const [remarks, setRemarks] = useState<string>();
  // TODO:later pick from constant manufacturingYearList

  const vehicleModelList = useMemo(
    () =>
      modelData?.queryModelByMake?.map(i => ({
        label: i.model,
        value: i.model,
      })),
    [modelData?.queryModelByMake],
  )
  function onRemarksChange(value: string) {
    setRemarks(value)
  }

  function onAddingVerificationProof(rtoVerificationProofUrl: string) {
    // log('rtoVerificationProofUrl', rtoVerificationProofUrl)
    setLeadInput({
      ...leadInput,
      vehicle: {
        ...leadInput?.vehicle,
        documents: {
          ...leadInput?.vehicle?.documents,
          rtoVerificationProofUrl: rtoVerificationProofUrl,
        },
      },
    })
  }

  function onAddingHypothecationProof(hypothecationProofUrl: string) {
    // log('hypothecationProofUrl', hypothecationProofUrl)
    setLeadInput({
      ...leadInput,
      vehicle: {
        ...leadInput?.vehicle,
        documents: {
          ...leadInput?.vehicle?.documents,
          hypothecationProofUrl,
        },
      },
    })
  }

  function onAddingChallanProof(challanUrl: string) {
    setLeadInput({
      ...leadInput,
      vehicle: {
        ...leadInput?.vehicle,
        documents: {
          ...leadInput?.vehicle?.documents,
          challanUrl,
        },
      },
    })
  }
  function onAddingBlackListedProof(blacklistProofUrl: string) {
    setLeadInput({
      ...leadInput,
      vehicle: {
        ...leadInput?.vehicle,
        documents: {
          ...leadInput?.vehicle?.documents,
          blacklistProofUrl,
        },
      },
    })
  }
  function onAddingHSRBProof(value?: string) {
    setLeadInput({
      ...leadInput,
      vehicle: {
        ...leadInput?.vehicle,
        documents: {
          ...leadInput?.vehicle?.documents,
          hsrbProofUrl: value,
        },
      },
    })
  }

  function onAddingApprovalMailProof(value?: string) {
    setLeadInput({
      ...leadInput,
      vehicle: {
        ...leadInput?.vehicle,
        documents: {
          ...leadInput?.vehicle?.documents,
          approvalMailUrl: value,
        },
      },
    })
  }
  function onMakeChange(value: string) {
    setLeadInput({
      ...leadInput,
      vehicle: {
        ...leadInput?.vehicle,
        tempMake: value as VehicleMake,
        tempModel: undefined,
      },
    })
  }
  function onModelChange(value: string) {
    setLeadInput({
      ...leadInput,
      vehicle: {
        ...leadInput?.vehicle,
        tempModel: value,
      },
    })
  }
  function onManufacturingYearChange(value: string) {
    setLeadInput({
      ...leadInput,
      vehicle: {
        ...leadInput?.vehicle,
        tempManufacturingDate: value,
      },
    })
  }
  function onEngineNumberChange(value: string) {
    setLeadInput({
      ...leadInput,
      vehicle: {
        ...leadInput?.vehicle,
        tempEngineNumber: value,
      },
    })
  }
  function onChassisNumberChange(value: string) {
    setLeadInput({
      ...leadInput,
      vehicle: {
        ...leadInput?.vehicle,
        tempChassisNumber: value,
      },
    })
  }
  function isHypothecation(value: string) {
    setLeadInput({
      ...leadInput,
      vehicle: {
        ...leadInput?.vehicle,
        isHypo: value === 'first',
      },
    })
  }
  function onCallanAmountChange(value: string) {
    setLeadInput({
      ...leadInput,
      vehicle: {
        ...leadInput?.vehicle,
        challanAmount: Number(value),
      },
    })
  }
  function isChallanFound(value: string) {
    setLeadInput({
      ...leadInput,
      vehicle: {
        ...leadInput?.vehicle,
        isChallanAvailable: value === 'first',
      },
    })
  }

  function isVehicleBlackListed(value: string) {
    setLeadInput({
      ...leadInput,
      vehicle: {
        ...leadInput?.vehicle,
        isBlacklisted: value === 'first',
      },
    })
  }

  function onFinancerNameChange(value: string) {
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
  function isHsrpAvailable(value: string) {
    setLeadInput({
      ...leadInput,
      vehicle: {
        ...leadInput?.vehicle,
        isHSRPAvailable: value === 'first',
      },
    })
  }
  return (
    <View style={commonStyle.mainAppContainer}>
      <ScrollView>
        <Separator size={1} />
        <RNFileUploader
          variant="docs"
          header={'RTO Verification Proof *'}
          saveDoc={onAddingVerificationProof}
          uploadingImage={isUploadingImage}
          onUploadingImage={value => setIsUploadingImage(value)}
          initialFileName={
            leadInput?.vehicle?.documents?.rtoVerificationProofUrl
          }
          value={leadInput?.vehicle?.documents?.rtoVerificationProofUrl}
        />
        <PickerSelectButton
          placeholder="Make *"
          value={vehicleMake}
          onValueChange={onMakeChange}
          items={enumToItems(VehicleMake) as Item[]}
          showSearchBar
        />
        <PickerSelectButton
          placeholder="Model *"
          value={vehicleModel}
          onValueChange={onModelChange}
          items={vehicleModelList}
          showSearchBar={!!vehicleMake}
        />
        {/* <PickerSelectButton
          placeholder="Manufacturing Year *"
          value={manufacturingYear}
          onValueChange={onManufacturingYearChange}
          items={manufacturingYearList}
        /> */}
        <Input
          key={'engine-number'}
          label={'Engine Number *'}
          onChangeText={onEngineNumberChange}
          value={engineNumber}
          isRequired
          minCharLength={3}
          uniqueKey="engine-number"
        />
        <Input
          key={'chesis-number'}
          label={'Chassis Number *'}
          onChangeText={onChassisNumberChange}
          value={chassisNumber}
          isRequired
          minCharLength={3}
          uniqueKey="chessis-number"
        />
        <Separator size={1} />
        <RNFileUploader
          variant="docs"
          header={'Hypothecation Proof *'}
          saveDoc={onAddingHypothecationProof}
          uploadingImage={isUploadingImage}
          onUploadingImage={value => setIsUploadingImage(value)}
          initialFileName={leadInput?.vehicle?.documents?.hypothecationProofUrl}
          value={leadInput?.vehicle?.documents?.hypothecationProofUrl}
        />
        <RNRadioButton
          variant={'payment_mode'}
          value={isHypo ? 'first' : 'second'}
          onValueChange={isHypothecation}
          firstValue="Yes Hypo"
          secondValue="No Hypo"
        />
        {isHypo && (
          <PickerSelectButton
            placeholder={'Financer Name *'}
            onValueChange={onFinancerNameChange}
            items={enumToItems(BankName)}
            value={financerName}
            isRequired
          />
        )}
        <RNFileUploader
          variant="docs"
          header={'Challan Confirmation *'}
          saveDoc={onAddingChallanProof}
          value={leadInput?.vehicle?.documents?.challanUrl}
        />
        <RNRadioButton
          variant={'payment_mode'}
          value={isChallan ? 'first' : 'second'}
          onValueChange={isChallanFound}
          firstValue="Challan Found"
          secondValue="No Challan"
        />
        {isChallan && (
          <Input
            key={'challan-amount'}
            label={'Challan Amount *'}
            onChangeText={onCallanAmountChange}
            value={challanAmount?.toString()}
            isRequired
            uniqueKey="challan-amount"
          />
        )}
        <Separator size={1} />
        <RNFileUploader
          variant="docs"
          header={'Blacklist Confirmation *'}
          saveDoc={onAddingBlackListedProof}
          initialFileName={leadInput?.vehicle?.documents?.blacklistProofUrl}
          value={leadInput?.vehicle?.documents?.blacklistProofUrl}
        />
        <RNRadioButton
          variant={'payment_mode'}
          value={isBlackListed ? 'first' : 'second'}
          onValueChange={isVehicleBlackListed}
          firstValue="Blacklisted"
          secondValue="Not Blacklisted"
        />
        <Separator size={1} />
        <RNFileUploader
          variant="docs"
          header={'HSRP Proof *'}
          saveDoc={onAddingHSRBProof}
          uploadingImage={isUploadingImage}
          onUploadingImage={value => setIsUploadingImage(value)}
          initialFileName={leadInput?.vehicle?.documents?.hsrbProofUrl}
          value={leadInput?.vehicle?.documents?.hsrbProofUrl}
        />
        <RNRadioButton
          variant={'payment_mode'}
          value={isHsrp ? 'first' : 'second'}
          onValueChange={isHsrpAvailable}
          firstValue="Available"
          secondValue="Not Available"
        />
        <Separator size={1} />
        <RNFileUploader
          variant="docs"
          header={'Approval Mail(if applicable)'}
          saveDoc={onAddingApprovalMailProof}
          uploadingImage={isUploadingImage}
          onUploadingImage={value => setIsUploadingImage(value)}
          initialFileName={leadInput?.vehicle?.documents?.approvalMailUrl}
          value={leadInput?.vehicle?.documents?.approvalMailUrl}
        />
        {/* <Separator size={1} /> */}
        <Input
          key={'RTO-verification-remarks'}
          label={'Enter the remarks'}
          onChangeText={onRemarksChange}
          // value={remarks?.remarks}
          isRequired
          minCharLength={3}
          uniqueKey="Remarks"
        />
        <Separator size={0.5} />
      </ScrollView>
      {/* <Row style={commonStyle.buttonView}>
        <Button variant="action" title={"CANCEL"} type="disable" />
        <Button variant="action" title={"CONFIRM"} type="enable" />
      </Row> */}
    </View>
  )
}

export default ConfirmedRto

const styles = StyleSheet.create({})
