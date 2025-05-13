import React, {useMemo, useState} from 'react'
import {ScrollView, View} from 'react-native'
import {commonStyle} from '../../constants/style'
import {
  LeadSource,
  useAllCentresQuery,
  useDriversQuery,
  useGetLeadDetailsQuery,
} from '../../generated/hooks_and_more'
import useUpdateLeadInput from '../../hooks/useUpdateLeadInput'
import {log} from '../../utils/helpers'
import PickerSelectButton from '../basic/PickerSelectButton'
import RNFilerUploader from '../basic/RNFileUploader'

type FormComponentProps = {
  leadId?: string
  regNo?: string
}

const AddPickupAssignmentDetails = ({
  leadId = 'new',
  regNo,
}: FormComponentProps): JSX.Element => {
  const {leadInput, setLeadInput} = useUpdateLeadInput(leadId)
  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false)
  // log('registration Number', regNo)
  const {data: centresData} = useAllCentresQuery({
    // fetchPolicy: 'cache-and-network',
    // onCompleted: ({queryCentre}) => log('data for all centres', queryCentre),
  })
  const {data: driversData} = useDriversQuery()
  const {
    data: leadDetailsData,
    refetch,
    loading,
  } = useGetLeadDetailsQuery({
    fetchPolicy: 'network-only',
    variables: {
      regNo: regNo,
    },
    onCompleted: ({getLead}) => {
      log('fetched documents', getLead?.documents?.releaseOrder)
    },
  })

  const centerName = leadInput?.centre?.name
  const driver = leadInput?.pickup?.by
  // const indemnityBondUrl = leadInput?.documents?.indemnityBond
  // const releaseOrderUrl = leadInput?.documents?.releaseOrder

  function onCenterChange(value: string, index: number) {
    // setCenterName(value);
    setLeadInput({
      ...leadInput,
      centre: {
        ...leadInput?.centre,
        name: value,
        id: centresData?.queryCentre?.find(centre => centre.name === value)?.id,
      },
    })
  }

  function onDriverChange(value: string, index: number) {
    // setDriver(value);
    setLeadInput({
      ...leadInput,
      pickup: {
        ...leadInput?.pickup,
        by: {
          ...leadInput?.pickup?.by,
          name: value,
          id: driversData?.queryUser?.find(driver => driver.name === value)?.id,
        },
      },
    })
  }

  function onAddingIndemnityBond(value: string) {
    setLeadInput({
      ...leadInput,
      documents: {
        ...leadInput?.documents,
        indemnityBond: value,
      },
    })
  }

  function onAddingReleaseOrder(value?: string) {
    setLeadInput({
      ...leadInput,
      documents: {
        ...leadInput?.documents,
        releaseOrder: value,
      },
    })
  }

  const allocationCenterData = useMemo(
    () =>
      centresData?.queryCentre?.map(centre => ({
        value: centre.name,
        label: centre.name,
      })),
    [centresData?.queryCentre],
  )

  const driverForPickUpData = useMemo(
    () => [
      ...new Set(
        driversData?.queryUser?.map(user => ({
          value: user.name,
          label: user.name,
        })),
      ),
    ],
    [driversData?.queryUser],
  )

  return (
    <View style={commonStyle.mainAppContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {centresData &&
          centresData.queryCentre &&
          centresData.queryCentre.length > 0 && (
            <PickerSelectButton
              placeholder={'Select the Centre for Allocation *'}
              onValueChange={onCenterChange}
              items={allocationCenterData}
              value={centerName}
              isRequired
            />
          )}
        {driversData &&
          driversData.queryUser &&
          driversData.queryUser.length > 0 && (
            <PickerSelectButton
              placeholder={'Select driver for pickup *'}
              onValueChange={onDriverChange}
              items={driverForPickUpData}
              value={driver?.name}
              isRequired
            />
          )}

        {/* //TODO: Handle file uploader variables */}
        {/* {leadDetailsData?.getLead?.documents?.releaseOrder ? (
          <></>
        ) : ( */}
        {leadDetailsData?.getLead?.source === LeadSource.BankAuction && (
          <>
            <RNFilerUploader
              variant="docs"
              header="Release Order"
              title="Upload Document"
              value={leadInput?.documents?.releaseOrder}
              saveDoc={onAddingReleaseOrder}
              uploadingImage={isUploadingImage}
              onUploadingImage={value => setIsUploadingImage(value)}
              initialFileName={leadInput?.documents?.releaseOrder}
              isRequired
            />
            <RNFilerUploader
              variant="docs"
              header="Indemnity Bond"
              title="Upload Document"
              value={leadInput?.documents?.indemnityBond}
              saveDoc={onAddingIndemnityBond}
              uploadingImage={isUploadingImage}
              onUploadingImage={value => setIsUploadingImage(value)}
              initialFileName={leadInput?.documents?.indemnityBond}
              isRequired
            />
          </>
        )}
        {/* )} */}
        {/* {leadDetailsData?.getLead?.documents?.indemnityBond ? (
          <></>
        ) : ( */}

        {/* )} */}
      </ScrollView>
      {/* <Row style={commonStyle.buttonView}>
        <Button variant="primary" title={"Save and Continue"} type="enable" />
      </Row> */}
    </View>
  )
}

export default AddPickupAssignmentDetails
