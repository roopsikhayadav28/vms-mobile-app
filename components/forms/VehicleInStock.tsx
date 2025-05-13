import {StyleSheet, View} from 'react-native'
import React from 'react'
import {
  LeadStatus,
  useGetLeadDetailForAdminQuery,
} from '../../generated/hooks_and_more'
import DealershipDetailCard from '../composite/dealerShipCard/DealershipDetailCard'
import {format} from 'date-fns'

type VehicleInStockProps = {
  registrationNo: string
  source: string
  leadId: string
}

const VehicleInStock = ({
  registrationNo,
  source,
  leadId,
}: VehicleInStockProps) => {
  const {data} = useGetLeadDetailForAdminQuery({
    variables: {regNo: registrationNo},
  })

  const queryLead =
    data && data.queryLead && data.queryLead.length && data.queryLead[0]

  const firstEvent = queryLead?.statusEvents?.filter(
    item => item?.status === LeadStatus?.LeadGenerated,
  )

  const createdBy =
    firstEvent && firstEvent.length && firstEvent?.[0]?.createdBy?.name
  const createAt = firstEvent && firstEvent.length && firstEvent?.[0]?.createdAt

  const deliveryComplete = queryLead?.statusEvents?.filter(
    item => item?.status === LeadStatus?.DeliverySelfieUploaded,
  )

  const driverName =
    deliveryComplete &&
    deliveryComplete.length &&
    deliveryComplete?.[0]?.createdBy?.name
  const deleveryDate =
    deliveryComplete &&
    deliveryComplete.length &&
    deliveryComplete?.[0]?.createdAt

  const center = queryLead?.centre.name
  const regNo = queryLead?.regNo

  const procurementDetail: {key: string; value: string; isHidden?: boolean}[] =
    [
      {key: 'Registration no ', value: regNo ?? '-'},
      {key: 'Sourced by  ', value: createdBy},
      {
        key: 'Sourced on ',
        value: createAt ? format(new Date(createAt), 'dd-MMM-yyyy') : '-',
      },
      {key: 'Delivered by ', value: driverName},
      {
        key: 'Delivered on ',
        value: deleveryDate
          ? format(new Date(deleveryDate), 'dd-MMM-yyyy')
          : '-',
      },
      {key: 'Delivered at ', value: center ?? '-'},
    ]

  return (
    <View style={{flex: 1}}>
      <DealershipDetailCard
        data={procurementDetail}
        leftCardLabel="Procurement Detail"
      />
    </View>
  )
}

export default VehicleInStock

const styles = StyleSheet.create({})
