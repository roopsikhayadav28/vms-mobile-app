import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import DataRowItem from '../../basic/DataRowItem'
import Separator from '../../basic/Separator'
import Layout from '../../../constants/Layout'

type BookingPriceCardProps = {
  sellingPrice: number
  listingPrice: number
}

const BookingPriceCard = ({
  listingPrice,
  sellingPrice,
}: BookingPriceCardProps) => {
  return (
    <View style={styles.container}>
      <Separator />
      <DataRowItem label="Selling Price" value={sellingPrice ?? '-'} />
      <Separator />
      <DataRowItem label="Listing Price" value={listingPrice ?? '-'} />
    </View>
  )
}

export default BookingPriceCard

const styles = StyleSheet.create({
  container: {
    padding: Layout.baseSize / 4,
  },
})
