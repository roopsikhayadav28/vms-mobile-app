import {format} from 'date-fns'
import React from 'react'
import {ScrollView, StyleSheet, Text, View} from 'react-native'
import Colors from '../../../constants/Colors'
import Layout from '../../../constants/Layout'
import {commonStyle} from '../../../constants/style'
import {
  LeadStatusEvent,
  PaymentFor,
  PaymentStatus,
  useGetBookingPaymentForReviewQuery,
} from '../../../generated/hooks_and_more'
import {useUpdateRemarksInput} from '../../../hooks/useUpdateLeadInput'
import {titleCaseToReadable} from '../../../utils/helpers'
import {Input} from '../../basic/Input'
import {H3} from '../../basic/StyledText'
type FormComponentProps = {
  leadId: string | undefined
  registrationNo?: string
  paymentFor?: PaymentFor
  status?: LeadStatusEvent
  paymentId?: string
}
const ReviewBookingPayment = ({
  leadId,
  registrationNo,
  paymentFor,
  paymentId,
}: FormComponentProps) => {
  const {setRemarks} = useUpdateRemarksInput(registrationNo)
  const {data: getBookingPaymentData} = useGetBookingPaymentForReviewQuery({
    fetchPolicy: 'cache-and-network',
    variables: {regNo: registrationNo},
  })
  function onChangeRemarks(value: string) {
    setRemarks(value)
  }

  return (
    <View style={commonStyle?.mainAppContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <View style={styles.itemTypeContainer}>
            <H3>Payment Type</H3>
          </View>

          <View style={styles.amountContainer}>
            <H3>Amount</H3>
          </View>
          <View style={styles.viewContainer}>
            <H3>Status</H3>
          </View>
        </View>
        {getBookingPaymentData?.getLead?.activeBooking?.payments
          ?.filter(
            !paymentFor
              ? i => i?.status === PaymentStatus.Approved
              : i =>
                  i?.for === PaymentFor.BookingPart
                    ? i?.status === PaymentStatus.Requested &&
                      i?.id === paymentId
                    : i?.for === paymentFor &&
                      i?.status === PaymentStatus.Requested,
          )
          ?.map((item, index) => {
            return (
              <View>
                <View style={styles.bodyContainer}>
                  <View style={styles.itemTypeContainer}>
                    <Text>
                      {item?.for === PaymentFor.BookingDelivery
                        ? 'Balance Delivery'
                        : titleCaseToReadable(item?.for)}
                    </Text>
                    <Text>
                      {format(Date.parse(item?.createdAt), 'dd MMM yyyy')}
                    </Text>
                  </View>

                  <View style={styles.amountContainer}>
                    <Text>₹ {item?.amount}</Text>
                    <Text>{titleCaseToReadable(item?.mode)}</Text>
                  </View>
                  <View style={styles.viewContainer}>
                    <Text>{titleCaseToReadable(item?.status)}</Text>
                  </View>
                </View>
              </View>
            )
          })}

        {/* <BookingLineItem
          amount={amount}
          date={!!date ? format(Date.parse(date), 'dd MMM yyyy') : '-'}
          itemType={titleCaseToReadable(itemType)}
          paymentType={titleCaseToReadable(mode)}
          status={titleCaseToReadable(status)}
        /> */}
        <Input label="Remarks" onChangeText={onChangeRemarks} />
      </ScrollView>
    </View>
  )
}

export default ReviewBookingPayment
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.colorRbg,
    paddingVertical: Layout.baseSize * 0.3,
    borderRadius: 4,
    paddingHorizontal: Layout.baseSize,
    marginHorizontal: Layout.baseSize * 0.5,
  },
  itemTypeContainer: {flex: 1.2},
  boldText: {
    fontSize: 15,
    fontWeight: '500',
  },
  amountContainer: {
    flex: 1,
  },
  viewContainer: {
    flex: 0.8,
  },
  bodyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Layout.baseSize,
    paddingHorizontal: Layout.baseSize,
    marginHorizontal: Layout.baseSize * 0.5,
  },
})
