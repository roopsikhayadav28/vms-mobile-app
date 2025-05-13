import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import Layout from '../../constants/Layout'
import Colors from '../../constants/Colors'
import Separator from '../basic/Separator'
import {useNavigation} from '@react-navigation/native'
import {RootStackScreenProps} from '../../navigation/navigationTypes'
type InventoryCardProps = {
  boxLabel: string
  issuedSpare: number
  inStockSpare: number
  id: string
  centreId: string
}

export default function InventoryCard({
  boxLabel,
  issuedSpare,
  inStockSpare,
  id,
  centreId,
}: InventoryCardProps) {
  const navigation =
    useNavigation<RootStackScreenProps<'PurchaseItemsList'>['navigation']>()

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate('PurchaseItemsList', {
          productId: id,
          centreId: centreId,
          productName: boxLabel,
        })
      }}>
      <View style={styles.innerContainer}>
        <View style={styles.textView}>
          <Text style={styles.textBold}>{boxLabel}</Text>
        </View>
        <Separator />
        <View style={styles.flexBox}>
          <View style={styles.cardContainer}>
            <Text style={styles.bold}>{issuedSpare}</Text>
            <Text>Issued</Text>
          </View>
          <View style={styles.availableStockcontainer}>
            <Text style={styles.bold}>{inStockSpare}</Text>
            <Text>Available in Stock</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: Layout.baseSize * 0.5,
  },
  innerContainer: {
    backgroundColor: Colors.light.inputBg,
    // height: Layout.baseSize * 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#dfdfdf',
    borderStyle: 'dashed',
    paddingVertical: Layout.baseSize * 2,
    flex: 1,
  },

  flexBox: {
    backgroundColor: Colors.dark.tint,
    marginHorizontal: Layout.baseSize * 1.2,
    marginBottom: Layout.baseSize * 1.5,
    // height: Layout.baseSize * 8,
    flexDirection: 'row',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#dfdfdf',
    justifyContent: 'space-around',
  },
  textBold: {fontSize: Layout.baseSize, fontWeight: '700'},
  textView: {
    alignSelf: 'flex-start',
    marginLeft: Layout.baseSize * 1.2,
  },
  availableStockcontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: Layout.baseSize * 2,
  },
  bold: {
    fontWeight: '700',
  },
})
