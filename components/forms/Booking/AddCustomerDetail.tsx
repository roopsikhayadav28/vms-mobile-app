import {View, Text, ScrollView} from 'react-native'
import React from 'react'
import {commonStyle} from '../../../constants/style'
import {Input} from '../../basic/Input'
import PickerSelectButton, {Item} from '../../basic/PickerSelectButton'
import {stateListIndia} from '../../../constants/constants'
import RNFileUploader from '../../basic/RNFileUploader'
import RNRadioButton from '../../basic/RNRadioButton'
import Separator from '../../basic/Separator'
import useUpdateLeadInput from '../../../hooks/useUpdateLeadInput'
import {enumToItems} from '../../../utils/helpers'
import {
  CustomerId,
  CustomerRef,
  useGetDistrictQuery,
} from '../../../generated/hooks_and_more'
import {FieldId} from '../../../utils/FieldValidator'
type FormComponentProps = {leadId: string | undefined; registrationNo?: string}
const AddCustomerDetail = ({leadId, registrationNo}: FormComponentProps) => {
  const {leadInput, setLeadInput} = useUpdateLeadInput(leadId)

  const customerName = leadInput?.activeBooking?.customer?.name
  const mobileNumber = leadInput?.activeBooking?.customer?.phoneNo
  const state = leadInput?.activeBooking?.customer?.customerState?.state // TODO: need to change the name of customerState to state
  const district = leadInput?.activeBooking?.customer?.customerDistrict?.name // TODO: need to change name of customerDistrict --> district
  const indentificationProof = leadInput?.activeBooking?.customer?.customerId
  const idNumber = leadInput?.activeBooking?.customer?.idNumber
  const isRcRequired = leadInput?.activeBooking?.isRCTransferReq
  const isInsuranceRequired = leadInput?.activeBooking?.isInsuranceReq

  const {data: districtData} = useGetDistrictQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      state,
    },
    skip: !state,
  })

  const districtList =
    districtData?.queryStateCodeWithRegNumber?.[0]?.districts?.map(i => ({
      label: i.name,
      value: i.name,
    }))

  function onChangeCustomerName(value: string) {
    setLeadInput({
      ...leadInput,
      activeBooking: {
        ...leadInput?.activeBooking,
        customer: {
          ...leadInput?.activeBooking?.customer,
          name: value,
        },
      },
    })
  }
  function onChangeMobileNumber(value: string) {
    setLeadInput({
      ...leadInput,
      activeBooking: {
        ...leadInput?.activeBooking,
        customer: {
          ...leadInput?.activeBooking?.customer,
          phoneNo: value,
        },
      },
    })
  }
  function onStateChange(value: string) {
    if (value === state) return
    setLeadInput({
      ...leadInput,
      activeBooking: {
        ...leadInput?.activeBooking,
        customer: {
          ...leadInput?.activeBooking?.customer,
          customerState: {
            ...leadInput?.activeBooking?.customer?.customerState,
            state: value,
          },
          customerDistrict: {
            ...leadInput?.activeBooking?.customer?.customerDistrict,
            name: undefined,
          },
        },
      },
    })
  }
  function onChangeDistrict(value: string) {
    if (value === district) return
    setLeadInput({
      ...leadInput,
      activeBooking: {
        ...leadInput?.activeBooking,
        customer: {
          ...leadInput?.activeBooking?.customer,
          customerDistrict: {
            ...leadInput?.activeBooking?.customer?.customerDistrict,
            name: value,
          },
        },
      },
    })
  }
  function onChangeindentificationProof(value: string) {
    setLeadInput({
      ...leadInput,
      activeBooking: {
        ...leadInput?.activeBooking,
        customer: {
          ...leadInput?.activeBooking?.customer,
          customerId: value as CustomerId,
        },
      },
    })
  }
  function onChangeIdNumber(value: string) {
    setLeadInput({
      ...leadInput,
      activeBooking: {
        ...leadInput?.activeBooking,
        customer: {
          ...leadInput?.activeBooking?.customer,
          idNumber: value,
        },
      },
    })
  }
  function onAddingProof(value: string) {
    setLeadInput({
      ...leadInput,
      activeBooking: {
        ...leadInput?.activeBooking,
        customer: {
          ...leadInput?.activeBooking?.customer,
          idProofUrl: value,
        },
      },
    })
  }
  function onRcChange(value: string) {
    setLeadInput({
      ...leadInput,
      activeBooking: {
        ...leadInput?.activeBooking,
        isRCTransferReq: value === 'first',
      },
    })
  }
  function onAddingVehicleTransactionForm(value: string) {
    setLeadInput({
      ...leadInput,
      activeBooking: {
        ...leadInput?.activeBooking,
        vehicleTransferFormUrl: value,
      },
    })
  }
  function onInsuranceChange(value: string) {
    setLeadInput({
      ...leadInput,
      activeBooking: {
        ...leadInput?.activeBooking,
        isInsuranceReq: value === 'first',
      },
    })
  }
  function onAddingCheque(value: string) {
    setLeadInput({
      ...leadInput,
      activeBooking: {
        ...leadInput?.activeBooking,
        cancelledChequeUrl: value,
      },
    })
  }

  return (
    <View style={commonStyle.mainAppContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Input
          key="Customer Name"
          label="Customer Name *"
          value={customerName}
          onChangeText={onChangeCustomerName}
          isRequired
        />
        <Input
          key="Mobile Number"
          label="Mobile Number *"
          value={mobileNumber}
          onChangeText={onChangeMobileNumber}
          keyboardType="number-pad"
          isRequired
          id={FieldId.MOBILE_NUMBER}
          temporary
        />
        <PickerSelectButton
          placeholder="Select State *"
          value={state}
          onValueChange={onStateChange}
          items={stateListIndia}
        />
        <PickerSelectButton
          placeholder="Select District *"
          value={district}
          onValueChange={onChangeDistrict}
          items={districtList}
          showSearchBar
        />
        {/* <Input
          key="District"
          label="Select District"
          value={district}
          onChangeText={onChangeDistrict}
          isRequired
        /> */}
        <PickerSelectButton
          placeholder="Select Identification Document *"
          value={indentificationProof}
          onValueChange={onChangeindentificationProof}
          items={enumToItems(CustomerId) as Item[]}
        />
        <Input
          key="ID Number"
          label="ID Number *"
          value={idNumber}
          onChangeText={onChangeIdNumber}
          isRequired
        />
        <RNFileUploader
          isRequired
          variant="docs"
          header="ID Proof"
          title="Upload Document"
          saveDoc={onAddingProof}
          value={leadInput?.activeBooking?.customer?.idProofUrl}
        />
        <Separator size={1} />
        <RNRadioButton
          variant={'payment_mode'}
          title={'Is RC transfer required? *'}
          firstValue="Yes"
          secondValue="No"
          value={isRcRequired ? 'first' : 'second'}
          onValueChange={onRcChange}
        />
        <Separator size={1} />
        <RNRadioButton
          variant={'payment_mode'}
          title={'Is Insurance Required? *'}
          firstValue="Yes"
          secondValue="No"
          value={isInsuranceRequired ? 'first' : 'second'}
          onValueChange={onInsuranceChange}
        />
        <Separator size={1} />
        <RNFileUploader
          isRequired
          variant="docs"
          header="Vehicle Transaction Form"
          title="Upload Document"
          saveDoc={onAddingVehicleTransactionForm}
          value={leadInput?.activeBooking?.vehicleTransferFormUrl}
        />
        <Separator size={1} />
        <RNFileUploader
          isRequired
          variant="docs"
          header="Cheque"
          title="Upload Document"
          saveDoc={onAddingCheque}
          value={leadInput?.activeBooking?.cancelledChequeUrl}
        />
      </ScrollView>
    </View>
  )
}

export default AddCustomerDetail
