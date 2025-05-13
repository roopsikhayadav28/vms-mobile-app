import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import React from 'react'
import {RootStackScreenProps} from '../../navigation/navigationTypes'
import {useNavigation} from '@react-navigation/native'
import Layout from '../../constants/Layout'
import Colors from '../../constants/Colors'
import Separator from '../basic/Separator'
import {Centre, User} from '../../generated/hooks_and_more'
import {format} from 'date-fns'
import {titleCaseToReadable} from '../../utils/helpers'

type PurchaseItemsCardProps = {
  type: 'Issue' | 'Purchase'
  updatedBy?: string
  date?: string
  purchaseOrderId?: string
  purchaseOrderStatus?: string
  centre: Partial<Centre>
  purchaseId: string
  quantity: number
}

const PurchaseItemsCard = ({
  updatedBy,
  date,
  purchaseOrderId,
  purchaseOrderStatus,
  centre,
  purchaseId,
  type,
  quantity,
}: PurchaseItemsCardProps) => {
  const navigation =
    useNavigation<RootStackScreenProps<'PurchaseItemsList'>['navigation']>()

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('PurchaseItemsDetails', {
            centreId: centre.id,
            purchaseId,
            requestType: type,
            purchaseAt: date,
          })
        }}
        style={styles.cardContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.bold}>{`Quantity : ${quantity}`}</Text>
          <View
            style={{
              ...styles.chipContainer,
              backgroundColor:
                type === 'Issue' ? Colors.light.green : Colors.light.primary,
            }}>
            <Text style={{color: Colors.light.background}}>{type}</Text>
          </View>
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.text}>{`${type} Id : ${purchaseId}`}</Text>
        </View>

        <View style={styles.headerContainer}>
          <Text style={styles.text}>{`Centre : ${centre?.name}`}</Text>
        </View>

        <View style={styles.headerContainer}>
          <Text style={styles.text}>{`Created By : ${updatedBy}`}</Text>
          <Text style={styles.text}>
            {format(new Date(date), 'dd MMM yyyy hh:mm a')}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: Colors.light.background,
    margin: Layout.baseSize * 0.5,
    borderTopLeftRadius: Layout.baseSize * 0.25,
    borderBottomLeftRadius: Layout.baseSize * 0.25,
    borderLeftColor: Colors.light.primary,
    borderLeftWidth: Layout.baseSize * 0.25,
    paddingBottom: Layout.baseSize * 0.5,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Layout.baseSize * 0.25,
    alignItems: 'center',
  },
  chipContainer: {
    borderTopRightRadius: Layout.baseSize * 0.25,
    borderBottomLeftRadius: Layout.baseSize * 0.25,
    paddingHorizontal: Layout.baseSize,
    paddingVertical: Layout.baseSize * 0.35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Colors.light.grey,
  },
  bold: {fontWeight: '600'},
})
export default PurchaseItemsCard
