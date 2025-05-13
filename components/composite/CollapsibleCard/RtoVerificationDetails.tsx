import {format} from 'date-fns'
import React from 'react'
import {StyleSheet} from 'react-native'
import CollapsibleCard from '.'
import Colors from '../../../constants/Colors'
import {LeadStatus, LeadStatusEventRef} from '../../../generated/hooks_and_more'
import {titleCaseToReadable} from '../../../utils/helpers'

type RtoVerificationDetailsProps = {
  currentStatus: LeadStatus
  statusEvents: Partial<LeadStatusEventRef>[]
  hypothecationUrl: string
  rtoVerificationUrl: string
  challanUrl: string
  hsrpUrl: string
  approveMailUrl: string
  financerName: string
  tempFinancerName?: string //FIXME: Add this in Dealership
  dueChallanAmount: Number
  blackListedConfirmation: string
  make: string
  model: string
  mfg: Date
  engine: string
  chassis: string
  tempMake: string
  tempModel: string
  tempMfg: Date
  tempChassis: string
  tempEngine: string
  hypoStatus: boolean
  challanStatus: boolean
  blackListedStatus: boolean
  hsrpStatus: boolean
}

const RtoVerificationDetails = ({
  approveMailUrl,
  challanUrl,
  hsrpUrl,
  hypothecationUrl,
  rtoVerificationUrl,
  statusEvents,
  blackListedConfirmation,
  make,
  model,
  engine,
  chassis,
  mfg,
  tempChassis,
  tempEngine,
  tempMake,
  tempModel,
  tempMfg,
  financerName,
  dueChallanAmount,
  hsrpStatus,
  hypoStatus,
  challanStatus,
  blackListedStatus,
}: RtoVerificationDetailsProps) => {
  // Sorting the RTO verification statuses by creation time
  const latestRTOVerificationStatues = statusEvents?.sort(
    (a, b) =>
      new Date(b?.createdAt).getTime() - new Date(a?.createdAt).getTime(),
  )

  // Finding out if the current lead reached the RTO verification stage.
  const rtoVerificationDetails = latestRTOVerificationStatues?.find(
    currentStatus =>
      currentStatus?.status === LeadStatus.RtoVerificationCompleted ||
      currentStatus?.status === LeadStatus.RtoVerificationRejected,
  )
  const lastRtoVerificationCompletion = latestRTOVerificationStatues?.find(
    currentStatus =>
      currentStatus?.status === LeadStatus.RtoVerificationCompleted,
  )
  const lastRTOVerificationRejection = latestRTOVerificationStatues?.find(
    currentStatus =>
      currentStatus?.status === LeadStatus.RtoVerificationRejected,
  )

  /**
   * Based on the RTO Verification response, showing Verified or Not Verified or
   * showing "-" is Lead hasn't reached to the RTO Verification stage.
   */

  const rtoVerificationDate =
    !!rtoVerificationDetails && rtoVerificationDetails?.createdAt

  const rtoVerificationStatus =
    rtoVerificationDetails?.status === LeadStatus.RtoVerificationCompleted
      ? 'Verified'
      : rtoVerificationDetails?.status === LeadStatus.RtoVerificationRejected
      ? 'Not Verified'
      : '-'

  const isMake = make === tempMake
  const isModel = model === tempModel
  const isMfg = mfg === tempMfg
  const isChassis = chassis === tempChassis
  const isEngine = engine === tempEngine
  const noRTODataYet =
    !tempEngine && !tempChassis && !tempMake && !tempModel && !tempMfg
  const rtoStatus = isMake && isModel && isMfg && isChassis && isEngine
  const cardMake =
    (!!make ? titleCaseToReadable(make) : '-') +
    '/' +
    titleCaseToReadable(tempMake)

  const cardModel =
    (!!model ? titleCaseToReadable(model) : '-') +
    '/' +
    titleCaseToReadable(tempModel)

  const cardMfg =
    !!mfg || !!tempMfg
      ? format(new Date(mfg), 'yyyy') +
        '/' +
        (!!tempMfg ? format(new Date(tempMfg), 'yyyy') : '')
      : '-'
  const cardEngine = engine + '/' + (tempEngine ?? '')
  const cardChassis = chassis + '/' + (tempChassis ?? '')

  // const hypothecationUrl = leadData?.vehicle?.documents?.hypothecationProofUrl
  // const rtoVerificationUrl =
  //   leadData?.vehicle?.documents?.rtoVerificationProofUrl
  // const challanUrl = leadData?.vehicle?.documents?.challanUrl
  // const hsrpUrl = leadData?.vehicle?.documents?.hsrbProofUrl
  // const approveMailUrl = leadData?.vehicle?.documents?.approvalMailUrl

  // const rtoDetails: {key: string; value: string; isDoc?: boolean}[] = [
  //   {
  //     key: 'RTO Verification Status',
  //     value: rtoVerificationStatus,
  //   },
  //   {
  //     key: 'RTO Verification Date',
  //     value: !!rtoVerificationDate
  //       ? format(new Date(rtoVerificationDate), 'dd-MMM-yyyy')
  //       : '-',
  //   },
  //   {
  //     key: 'RTO verification Proof',
  //     value: rtoVerificationUrl ?? '',
  //     isDoc: true,
  //   },
  //   {
  //     key: 'Hypothecation Proof',
  //     value: hypothecationUrl ?? '',
  //     isDoc: true,
  //   },
  //   {
  //     key: 'Pending Dues Proof',
  //     value: challanUrl ?? '',
  //     isDoc: true,
  //   },
  //   {
  //     key: 'HSRP Proof',
  //     value: hsrpUrl ?? '',
  //     isDoc: true,
  //   },
  //   {
  //     key: 'Approval mail (If Any)',
  //     value: approveMailUrl ?? '',
  //     isDoc: true,
  //   },
  // ]

  const rtoDetails: {
    key: string
    value: string
    isDoc?: boolean
    textColor?: string
    isHidden?: boolean
  }[] = [
    {
      key: 'Confirmation Date',
      value: !!rtoVerificationDate
        ? format(new Date(rtoVerificationDate), 'dd-MMM-yyyy')
        : '-',
      isHidden: false,
    },
    {
      key: 'RTO Confirmation',
      value: rtoVerificationUrl ?? '',
      isDoc: true,
      isHidden: false,
    },
    {
      key: 'Status',
      value: noRTODataYet ? '-' : rtoStatus ? 'Matched' : 'Not Matched',
      isHidden: false,
    },
    {
      key: 'Make',
      value: cardMake,
      textColor: isMake ? Colors.dark.green : Colors.dark.red,
      isHidden: isMake,
    },
    {
      key: 'Model',
      value: cardModel,
      textColor: isModel ? Colors.dark.green : Colors.dark.red,
      isHidden: isModel,
    },
    {
      key: 'MFG',
      value: cardMfg,
      textColor: isMfg ? Colors.dark.green : Colors.dark.red,
      isHidden: isMfg,
    },
    {
      key: 'Chassis',
      value: cardChassis,
      textColor: isChassis ? Colors.dark.green : Colors.dark.red,
      isHidden: isChassis,
    },
    {
      key: 'Engine',
      value: cardEngine,
      textColor: isEngine ? Colors.dark.green : Colors.dark.red,
      isHidden: isEngine,
    },
    {
      key: 'Hypo Confirmation ',
      value: hypothecationUrl ?? '',
      isDoc: true,
      isHidden: false,
    },
    {
      key: 'Status',
      value: !!hypoStatus
        ? 'Available'
        : hypoStatus === false
        ? 'Not Available'
        : '-',
      isHidden: false,
    },
    {
      key: 'Financer Name',
      value: !!financerName ? titleCaseToReadable(financerName) : '-',
      isHidden: !hypoStatus,
    },
    {
      key: 'Challan Confirmation ',
      value: challanUrl ?? '',
      isDoc: true,
      isHidden: false,
    },
    {
      key: 'Status',
      value: !!challanStatus
        ? 'challan found'
        : challanStatus === false
        ? 'challan not found'
        : '-',
      isHidden: false,
    },
    {
      key: 'Challan amount',
      value: dueChallanAmount?.toString(),
      isHidden: !challanStatus,
    },
    {
      key: 'Blacklisted Confirmation ',
      value: blackListedConfirmation ?? '',
      isDoc: true,
      isHidden: false,
    },
    {
      key: 'Status',
      value: !!blackListedStatus
        ? 'BlackListed'
        : blackListedStatus === false
        ? 'Not BlackListed'
        : '-',
      isHidden: false,
    },
    {
      key: 'Hsrp Confirmation ',
      value: hsrpUrl ?? '',
      isDoc: true,
      isHidden: false,
    },
    {
      key: 'Status',
      value: !!hsrpStatus
        ? 'Available'
        : hsrpStatus === false
        ? 'Not Available'
        : '-',
      isHidden: false,
    },
    {
      key: 'Approval mail (If Any)',
      value: approveMailUrl ?? '',
      isDoc: true,
      isHidden: false,
    },
  ]

  return (
    <CollapsibleCard
      data={rtoDetails}
      title="RTO Verification Details"
      isVehicleDocument
    />
  )
}

export default RtoVerificationDetails

const styles = StyleSheet.create({})

// CHANGELOG
/**
 * CHANGE:
 * RTO Verification status -
 * changed the logic for RTO verification status, as it will show the latest RTO related status as VERIFIED or NOT VERIFIED or -
 *
 * BEFORE:
 * It was rendering if there is RTOVerificationCompleted status was fired and based on that, it was showing related status, which never take care for an edge case
 *
 * release hotfix: 05-04-2023
 */
