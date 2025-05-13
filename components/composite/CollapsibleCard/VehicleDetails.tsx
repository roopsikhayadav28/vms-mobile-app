import {format} from 'date-fns'
import React from 'react'
import {StyleSheet} from 'react-native'
import CollapsibleCard from '.'
import {
  InsuranceType,
  InsurerName,
  LoanToBeClosedBy,
  useVehicleDetailsLazyQuery,
  VehicleMake,
} from '../../../generated/hooks_and_more'
import {log, titleCaseToReadable} from '../../../utils/helpers'
type VehicleDetailsProps = {
  make: VehicleMake
  model: string //changed from VehicleModel
  manufacturingYear: Date
  registrationDate: Date
  regNo: string
  engineNo: string
  chassisNo: string
  repossessionDate: Date
  isRCAvailable: boolean
  fitnessValidUpto: Date
  isVehicleFinanced: boolean
  financerName: string
  isLoanClosed: boolean
  pendingLoanAmount: number
  loanToBeClosedBy: LoanToBeClosedBy
  isVehicleInsured: boolean
  insurerName: InsurerName
  insuranceType: InsuranceType
  policyNumber: string
  policyExpiryDate: Date
}

const VehicleDetails = ({
  regNo,
  make,
  model,
  registrationDate,
  chassisNo,
  engineNo,
  fitnessValidUpto,
  insuranceType,
  insurerName,
  isRCAvailable,
  isVehicleInsured,
  manufacturingYear,
  policyExpiryDate,
  policyNumber,
  repossessionDate,
  financerName,
  isLoanClosed,
  isVehicleFinanced,
  loanToBeClosedBy,
  pendingLoanAmount,
}: VehicleDetailsProps) => {
  const [fetchApplicationDetails, {data: vehicleDetailsData}] =
    useVehicleDetailsLazyQuery({
      variables: {
        regNo,
      },
      fetchPolicy: 'network-only',
      onCompleted(data) {
        log('vehicle data', data)
      },
    })
  const vehicleDetails: {key: string; value: string}[] = [
    {
      key: 'Make',
      value: titleCaseToReadable(make) ?? '-',
    },
    {
      key: 'Model',
      value: titleCaseToReadable(model) ?? '-',
    },
    {
      key: 'Manufacturing year',
      value: !!manufacturingYear
        ? new Date(manufacturingYear)?.getFullYear()?.toString()
        : '-',
    },
    {
      key: 'Registration Date',
      value: !!registrationDate
        ? format(new Date(registrationDate), 'dd MMM yyyy')
        : '-',
    },
    {
      key: 'Engine No',
      value: engineNo ?? '-',
    },
    {
      key: 'Chassis No',
      value: chassisNo ?? '-',
    },
    {
      key: 'Repossession Date',
      value: !!repossessionDate
        ? format(new Date(repossessionDate), 'dd MMM yyyy')
        : '-',
    },
    {
      key: 'Is RC Available?',
      value: !!isRCAvailable ? 'Yes' : isRCAvailable === false ? 'No' : '-',
    },
    {
      key: 'Fitness valid upto',
      value: fitnessValidUpto
        ? format(new Date(fitnessValidUpto), 'dd MMM yyyy')
        : '-',
    },
    {
      key: 'Is  vehicle financed ?',
      value: !!isVehicleFinanced
        ? 'Yes'
        : isVehicleFinanced === false
        ? 'No'
        : '-',
    },
    {
      key: 'Financer Name',
      value: !!financerName ? titleCaseToReadable(financerName) : '-',
    },
    {
      key: 'Is loan closed ?',
      value: !!isLoanClosed ? 'Yes' : isLoanClosed === false ? 'No' : '-',
    },
    {
      key: 'Pending loan amount',
      value: !!pendingLoanAmount ? `₹ ${pendingLoanAmount}` : '-',
    },
    {
      key: 'Loan To be Closed By',
      value: !!loanToBeClosedBy ? titleCaseToReadable(loanToBeClosedBy) : '-',
    },
    {
      key: 'Is vehicle insured ?',
      value: !!isVehicleInsured
        ? 'Yes'
        : isVehicleInsured === false
        ? 'No'
        : '-',
    },
    {
      key: 'Insurer name',
      value: insurerName ? titleCaseToReadable(insurerName) : '-',
    },
    {
      key: 'Insurance type',
      value: insuranceType ? titleCaseToReadable(insuranceType) : '-',
    },
    {
      key: 'Policy number',
      value: policyNumber ?? '-',
    },
    {
      key: 'Policy expiry date',
      value: !!policyExpiryDate
        ? new Date(policyExpiryDate).toDateString()
        : '-',
    },
  ]

  return (
    <CollapsibleCard
      data={vehicleDetails}
      title="Vehicle Details"
      onExpand={fetchApplicationDetails}
    />
  )
}

export default VehicleDetails

const styles = StyleSheet.create({})

// changelog
// in line number 67 change ...documentChecklist?.registrationCertificate --> ...vehicle?.isRcAvailable
