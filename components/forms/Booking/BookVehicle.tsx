import React from 'react'
import {View} from 'react-native'
import {ScrollView} from 'react-native-gesture-handler'
import {INSURANCE_CHARGES, RTO_CHARGES} from '../../../constants/constants'
import {commonStyle} from '../../../constants/style'
import {
  BookingType,
  useGetSaleStructureInfoQuery,
} from '../../../generated/hooks_and_more'
import useUpdateLeadInput from '../../../hooks/useUpdateLeadInput'
import {enumToItems} from '../../../utils/helpers'
import {Input} from '../../basic/Input'
import PickerSelectButton, {Item} from '../../basic/PickerSelectButton'
import DealershipDetailCard from '../../composite/dealerShipCard/DealershipDetailCard'
import {FieldId} from '../../../utils/FieldValidator'

type FormComponentProps = {leadId: string | undefined; regNo?: string}
const BookVehicle = ({leadId, regNo}: FormComponentProps) => {
  const {leadInput, setLeadInput} = useUpdateLeadInput(leadId)
  const {data: getSaleStructureInfo} = useGetSaleStructureInfoQuery({
    fetchPolicy: 'cache-and-network',
    variables: {regNo},
  })

  const saleAmount = leadInput?.activeBooking?.bookingPayment?.saleAmount
  const paymentMode = leadInput?.activeBooking?.bookingPayment?.bookingType
  const requestedLoanAmount =
    leadInput?.activeBooking?.bookingPayment?.appliedLoanAmount

  function onChangeSaleAmount(value: string) {
    if (!isNaN(parseFloat(value)) && isFinite(Number(value))) {
      setLeadInput({
        ...leadInput,
        activeBooking: {
          ...leadInput?.activeBooking,
          bookingPayment: {
            ...leadInput?.activeBooking?.bookingPayment,
            saleAmount: Number(value),
          },
        },
      })
    } else {
      setLeadInput({
        ...leadInput,
        activeBooking: {
          ...leadInput?.activeBooking,
          bookingPayment: {
            ...leadInput?.activeBooking?.bookingPayment,
            saleAmount: 0,
          },
        },
      })
    }
  }
  function onChangePaymentMode(value: string) {
    setLeadInput({
      ...leadInput,
      activeBooking: {
        ...leadInput?.activeBooking,
        bookingPayment: {
          ...leadInput?.activeBooking?.bookingPayment,
          bookingType: value as BookingType,
          appliedLoanAmount: undefined,
        },
      },
    })
  }

  function onRequestedLoanAmountChange(value: string) {
    if (!isNaN(parseFloat(value)) && isFinite(Number(value))) {
      setLeadInput({
        ...leadInput,
        activeBooking: {
          ...leadInput?.activeBooking,
          bookingPayment: {
            ...leadInput?.activeBooking?.bookingPayment,
            appliedLoanAmount: parseInt(value),
          },
        },
      })
    } else {
      setLeadInput({
        ...leadInput,
        activeBooking: {
          ...leadInput?.activeBooking,
          bookingPayment: {
            ...leadInput?.activeBooking?.bookingPayment,
            appliedLoanAmount: 0,
          },
        },
      })
    }
  }

  const saleData: {
    key: string
    value: string
    isHidden?: boolean
  }[] = [
    {
      key: 'Sale Amount',
      value: leadInput?.activeBooking?.bookingPayment?.saleAmount?.toString(),
    },
    {
      key: 'RC Transfer',
      value: getSaleStructureInfo?.getLead?.activeBooking?.isRCTransferReq
        ? RTO_CHARGES?.toString()
        : '0',
      isHidden: leadInput?.activeBooking?.isRCTransferReq,
    },
    {
      key: 'Insurance',
      value: getSaleStructureInfo?.getLead?.activeBooking?.isInsuranceReq
        ? INSURANCE_CHARGES?.toString()
        : 0?.toString(),
      isHidden: leadInput?.activeBooking?.isInsuranceReq,
    },
    {
      key: 'Total Sale Amount',
      value: !!saleAmount
        ? (
            saleAmount +
            (!!getSaleStructureInfo?.getLead?.activeBooking?.isInsuranceReq
              ? INSURANCE_CHARGES
              : 0) +
            (!!getSaleStructureInfo?.getLead?.activeBooking?.isRCTransferReq
              ? RTO_CHARGES
              : 0)
          )?.toString()
        : '-',
    },
  ]

  // const isSaleAmountValid =
  //   leadInput?.activeBooking?.bookingPayment?.saleAmount >
  //   getSaleStructureInfo?.getLead?.listingPrice
  return (
    <View style={commonStyle.mainAppContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Input
          key="Sale Amount"
          label="Enter Sale Amount *"
          value={saleAmount?.toString()}
          onChangeText={onChangeSaleAmount}
          isRequired
          keyboardType="number-pad"
          // id={FieldId.SALE_AMOUNT}
          // isDataValid={isSaleAmountValid}
        />
        <PickerSelectButton
          placeholder="Booking Type *"
          value={paymentMode}
          onValueChange={onChangePaymentMode}
          items={enumToItems(BookingType) as Item[]}
        />
        {paymentMode === BookingType.Finance && (
          <Input
            key="loan-amount"
            label="Enter Loan Amount *"
            value={requestedLoanAmount?.toString()}
            onChangeText={onRequestedLoanAmountChange}
            isRequired
            keyboardType="number-pad"
          />
        )}
        <DealershipDetailCard data={saleData} leftCardLabel="Sale Structure" />
      </ScrollView>
    </View>
  )
}

export default BookVehicle
