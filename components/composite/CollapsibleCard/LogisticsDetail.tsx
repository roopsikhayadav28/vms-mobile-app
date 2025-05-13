import {format} from 'date-fns'
import React, {useMemo, useState} from 'react'
import {StyleSheet} from 'react-native'
import CollapsibleCard from '.'
import Colors from '../../../constants/Colors'
import Layout from '../../../constants/Layout'
import {Centre, LeadStatus} from '../../../generated/hooks_and_more'
import {log, titleCaseToReadable} from '../../../utils/helpers'

type logisticsDetailProps = {
  regNo: string
  currentStatus: LeadStatus
  centre: string
  driver: string
  driverPhone: string
  expectedPickUpDate: Date
  actualPickupDate: Date
  deliveryDate: Date
  yardName: string
  yardAddress: string
  yardLocationUrl: string
  yardLat: number
  yardLong: number
  centreLat: number
  centreLong: number
  yardSpocName: string
  yardSpocNo: string
}

const LogisticsDetail = ({
  regNo,
  centre,
  centreLat,
  centreLong,
  deliveryDate,
  driver,
  driverPhone,
  expectedPickUpDate,
  actualPickupDate,
  currentStatus,
  yardAddress,
  yardLat,
  yardLocationUrl,
  yardLong,
  yardName,
  yardSpocName,
  yardSpocNo,
}: logisticsDetailProps) => {
  // const [fetchLogisticsDetail, {data: logisticsDetailData}] =
  //   useLogisticsDetailLazyQuery({
  //     variables: {regNo},
  //     fetchPolicy: 'cache-and-network',
  //     onCompleted: fetchedData => {
  //       setStatus(lastEvent)
  //       log('delivery status ', getStatus(currentStatus))
  //       // log('fetched logistics data', fetchedData)
  //     },
  //   })
  // const statusData = useMemo(
  //   () => logisticsDetailData?.getLead?.statusEvents ?? [],
  //   [logisticsDetailData?.getLead?.statusEvents],
  // )
  // const lastEvent =
  //   statusData?.length > 0
  //     ? statusData[statusData.length - 1].status
  //     : undefined

  function getUrl(lat, long) {
    return `https://www.google.com/maps/search/?api=1&query=${lat}%2C${long}`
  }

  // const centre = logisticsDetailData?.getLead?.centre?.name
  // const driver = logisticsDetailData?.getLead?.pickup?.by?.name
  // const driverPhone = logisticsDetailData?.getLead?.pickup?.by?.phoneNo

  // const expectedPickUpDate = logisticsDetailData?.getLead?.expectedexpectedPickupDate
  // const deliveryDate = logisticsDetailData?.getLead?.statusEvents?.find(
  //   event => event?.status === LeadStatus.DeliveryCompleted,
  // )?.createdAt
  // const yardName = logisticsDetailData?.getLead?.yard?.name
  // const yardAddress = logisticsDetailData?.getLead?.yard?.address
  // const yardLocationUrl = logisticsDetailData?.getLead?.yard?.locationUrl
  // const yardLat = logisticsDetailData?.getLead?.yard?.location?.latitude
  // const yardLong = logisticsDetailData?.getLead?.yard?.location?.longitude
  // const centreLat = logisticsDetailData?.getLead?.centre?.location?.latitude
  // const centreLong = logisticsDetailData?.getLead?.centre?.location?.longitude
  // const yardSpocName = logisticsDetailData?.getLead?.yard?.spocName
  // const yardSpocNo = logisticsDetailData?.getLead?.yard?.spocNo

  // const deliveryStatus = useCallback((leadStatus: LeadStatus) => {
  //   if (leadStatus === LeadStatus.PickupAccepted) {
  //     setDeliveryStatusText('Accepted')
  //   } else if (leadStatus === LeadStatus.PickupRequested) {
  //     setDeliveryStatusText('Approval Pending')
  //   } else if (leadStatus === LeadStatus.PickupInitiated) {
  //     setDeliveryStatusText('In Transit')
  //   } else if (leadStatus === LeadStatus.DeliveryCompleted) {
  //     setDeliveryStatusText('Delivered')
  //   } else {
  //     setDeliveryStatusText(' Not there yet!')
  //   }
  //   return deliveryStatusText
  // }, [])
  // const status = logisticsDetailData?.getLead?.statusEvents?.[0]?.status

  function getStatus(status) {
    log('current status', status)
    switch (status) {
      case LeadStatus.PickupAccepted:
        return 'Accepted'
      case LeadStatus.PickupRequested:
        return 'Approval Pending'
      case LeadStatus.PickupInitiated:
        return 'In Transit'
      case LeadStatus.DeliveryCompleted:
        return 'Delivered'
      case LeadStatus.DeliveryVehicleImagesUploaded:
        return 'Delivered'
      case LeadStatus.DeliverySelfieUploaded:
        return 'Delivered'
      case LeadStatus.DeliveryExpensesApproved:
        return 'Delivered'
      case LeadStatus.DeliveryExpensesPaymentReceiptsUploaded:
        log('specific status', status)
        return 'Delivered'
      case LeadStatus.DeliveryExpensesRejected:
        return 'Delivered'
      case LeadStatus.VehicleInStock:
        return 'Delivered'
      case LeadStatus.ReadyForSale:
        return 'Delivered'
      case LeadStatus.PickupVehicleImagesUploaded:
        return 'In Transit'
      default:
        return '-'
    }
  }

  const logisticsDetail: {key: string; value: string; isLink?: boolean}[] = [
    {key: 'Alloted centre', value: centre ?? '-'},
    {
      key: 'Alloted Centre Location',
      value: centreLat && centreLong ? getUrl(centreLat, centreLong) : '-',
      isLink: true,
    }, //FIXME: add centre Location URL in Centre Type
    {
      key: 'Alloted Driver',
      value: driver ?? '-',
    },
    {
      key: 'Driver Mobile',
      value: driverPhone ?? '-',
    },
    {
      key: 'Delivery Status',
      value: !!currentStatus ? getStatus(currentStatus) : '-',
    },
    {
      key: 'Expected Pickup Date',
      value: !!expectedPickUpDate
        ? format(new Date(expectedPickUpDate), 'dd MMM yyyy')
        : '-',
    },
    {
      key: 'Actual Pickup Date',
      value: !!actualPickupDate
        ? format(new Date(actualPickupDate), 'dd MMM yyyy')
        : '-',
    },
    {
      key: 'Delivery Date',
      value: !!deliveryDate
        ? format(new Date(deliveryDate), 'dd MMM yyyy')
        : '-',
    },
    {
      key: 'Yard Name',
      value: yardName ?? '-',
    },
    {
      key: ' Yard Address',
      value: yardAddress ?? '-',
    },
    {
      key: 'Yard Location URL',
      value:
        yardLat && yardLong
          ? getUrl(yardLat, yardLong) ?? '-'
          : yardLocationUrl ?? '-',
      isLink: true,
    },
    {
      key: 'Yard SPOC name',
      value: yardSpocName ?? '-',
    },
    {key: 'Yard SPOC Mobile', value: yardSpocNo ?? '-'},
  ]

  return (
    <CollapsibleCard
      data={logisticsDetail}
      title="Delivery and Logistics Details"
    />
  )
}

export default LogisticsDetail

const styles = StyleSheet.create({
  container: {
    margin: Layout.baseSize * 0.5,
    backgroundColor: Colors.light.background,
    // width: Layout.window.width,
    borderRadius: Layout.baseSize / 5,
    overflow: 'hidden',
  },
  accordionStyle: {
    backgroundColor: Colors.light.inputBg,
    height: Layout.baseSize * 3,
    padding: Layout.baseSize / 5,
  },
})
