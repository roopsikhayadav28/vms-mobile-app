import {View, Text, TouchableOpacity} from 'react-native'
import React from 'react'
import {useNavigation} from '@react-navigation/native'
import {
  RootStackParamList,
  RootStackScreenProps,
} from '../navigation/navigationTypes'
import PurchaseItemsCard from '../components/composite/PurchaseItemsCard'
import {ScrollView} from 'react-native-gesture-handler'
import {
  useGetStocksDetailsQuery,
  useGetStocksTypeDetailsQuery,
} from '../generated/hooks_and_more'

type TaskScreenProps = RootStackScreenProps<'PurchaseItemsList'>

const PurchaseItemsList = ({navigation, route: {params}}: TaskScreenProps) => {
  const {data, loading} = useGetStocksTypeDetailsQuery({
    skip: !params?.productId,
    variables: {
      productId: params?.productId,
      centreId: params?.centreId === 'all' ? null : params?.centreId,
    },
    fetchPolicy: 'cache-and-network',
    onCompleted(data) {
      console.log('success')
    },
  })
  // console.log('on purchase Item List ' + params?.centreId)
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {data?.queryPurchase?.map((item, index) => {
        // console.log(JSON.stringify(item, null, 2))
        return (
          <PurchaseItemsCard
            quantity={item?.items
              ?.filter(i => i?.product?.id === params?.productId)
              .reduce((a, b) => a + b?.quantity, 0)}
            type="Purchase"
            key={item?.id}
            purchaseOrderId={item?.id}
            purchaseOrderStatus={item?.status}
            updatedBy={item?.madeBy?.name}
            date={item?.createdAt}
            centre={item?.centre}
            purchaseId={item?.id}
          />
        )
      })}

      {data?.queryIssue?.map((item, index) => {
        return (
          <PurchaseItemsCard
            quantity={item?.items
              ?.filter(i => i?.product?.id === params?.productId)
              .reduce((a, b) => a + b?.quantity, 0)}
            key={item?.id}
            type="Issue"
            purchaseOrderId={item?.id}
            purchaseOrderStatus={item?.status}
            updatedBy={item?.madeBy?.name}
            date={item?.createdAt}
            centre={item?.centre}
            purchaseId={item?.id}
          />
        )
      })}
    </ScrollView>
  )
}

export default PurchaseItemsList
