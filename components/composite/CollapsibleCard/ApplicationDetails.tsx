import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import CollapsibleCard from '.'
import {
  BankName,
  LeadSource,
  LeadStatus,
  useGetLeadDetailsLazyQuery,
} from '../../../generated/hooks_and_more'
import {log, titleCaseToReadable} from '../../../utils/helpers'

type ApplicationDetailsProps = {
  regNo: string
  status: LeadStatus
  vehicle: string
  purchaseType: LeadSource
  auctioningAgency: string
  auctionByBankName: BankName
  dealerName: string
  source: LeadSource
}
const ApplicationDetails = ({
  regNo,
  auctioningAgency,
  auctionByBankName,
  purchaseType,
  status,
  dealerName,
  source,
  vehicle,
}: ApplicationDetailsProps) => {
  // const [fetchApplicationDetails, {data: leadDetailsData}] =
  //   useApplicationDetailsLazyQuery({
  //     variables: {
  //       regNo,
  //     },
  //     fetchPolicy: 'cache-and-network',
  //     onCompleted: ({getLead}) => {
  //       log('fetched lead id', getLead?.id)
  //     },
  //   })

  const applicationDetails: {
    key: string
    value: string
    source?: LeadSource
  }[] = [
    {key: 'Registration No', value: regNo ?? ''},
    {
      key: 'Status',
      value: titleCaseToReadable(status) ?? '',
    },
    //FIXME: Remove hard-coded tractor and change it to vehicle type
    {key: 'Vehicle', value: vehicle},
    {
      key: 'Purchase Type',
      value: titleCaseToReadable(purchaseType) ?? '',
    },
    {
      key: 'Auction agency',
      value: auctioningAgency ?? '',
    },
    {
      key: 'Bank name',
      value: !!auctionByBankName ? titleCaseToReadable(auctionByBankName) : '',
    },
    {
      key: 'Dealer Name',
      value: dealerName ?? '',
    },
  ]
  return (
    <CollapsibleCard
      data={applicationDetails}
      title="Application Details"
      // onExpand={fetchApplicationDetails}
    />
  )
}

export default ApplicationDetails

const styles = StyleSheet.create({})
