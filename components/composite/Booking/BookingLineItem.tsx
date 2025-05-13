import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import Colors from '../../../constants/Colors'
import Layout from '../../../constants/Layout'
import {commonStyle} from '../../../constants/style'
import {H3} from '../../basic/StyledText'
type bookingLineItemProps = {
  itemType: string
  amount: number
  status: string
  date: string
  paymentType: string
}
const BookingLineItem = ({
  itemType,
  amount,
  status,
  date,
  paymentType,
}: bookingLineItemProps) => {
  return (
    <View>
      <View style={styles.headerContainer}>
        <View style={styles.itemTypeContainer}>
          <H3>Item Type</H3>
        </View>

        <View style={styles.amountContainer}>
          <H3>Amount</H3>
        </View>
        <View style={styles.viewContainer}>
          <H3>Status</H3>
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.itemTypeContainer}>
          <Text>{itemType}</Text>
          <Text>{date}</Text>
        </View>

        <View style={styles.amountContainer}>
          <Text>₹ {amount}</Text>
          <Text>{paymentType}</Text>
        </View>
        <View style={styles.viewContainer}>
          <Text>{status}</Text>
        </View>
      </View>
    </View>
  )
}

export default BookingLineItem

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
