import {View, Text, StyleSheet} from 'react-native'
import React, {useEffect} from 'react'
import Colors from '../constants/Colors'
import Layout from '../constants/Layout'
import {Surface} from 'react-native-paper'
import {H3, P2} from '../components/basic/StyledText'
import {RootStackScreenProps} from '../navigation/navigationTypes'
import {
  Purchase,
  PurchaseItem,
  useGetIssueItemDetailsLazyQuery,
  useGetPurchaseItemDetailsLazyQuery,
} from '../generated/hooks_and_more'
import {validDateFormate} from '../utils/helpers'
import {ScrollView} from 'react-native'

type PurchaseItemsDetailsPropsType =
  RootStackScreenProps<'PurchaseItemsDetails'>

const PurchaseItemsDetails = ({
  navigation,
  route: {params},
}: PurchaseItemsDetailsPropsType) => {
  console.log(params)

  const [purchaseItemDetails, {data: purchaseItems, loading}] =
    useGetPurchaseItemDetailsLazyQuery()

  const [issueItemDetails, {data: issueItems, loading: issueLoading}] =
    useGetIssueItemDetailsLazyQuery()

  useEffect(() => {
    if (params.requestType === 'Purchase') {
      purchaseItemDetails({
        variables: {
          purchaseId: params.purchaseId,
        },
      })
    } else {
      issueItemDetails({
        variables: {
          purchaseId: params.purchaseId,
        },
      })
    }
  }, [])

  const data =
    params.requestType === 'Purchase'
      ? purchaseItems?.getPurchase
      : issueItems?.getIssue

  if (loading || issueLoading) {
    return <Text>Loading...</Text>
  }

  return (
    <ScrollView
      style={{backgroundColor: '#fff'}}
      showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Surface style={styles.detailCardContainer} elevation={1}>
          <View style={styles.cardHead}>
            <H3>{params?.requestType} Details</H3>
            <View
              style={{
                ...styles.statusCard,
                backgroundColor:
                  params?.requestType === 'Issue'
                    ? Colors.light.green
                    : Colors.light.primary,
              }}>
              <Text style={{color: Colors.light.background}}>
                {params?.requestType}
              </Text>
            </View>
          </View>

          <View style={styles.updateContainer}>
            <Text style={styles.itemTextStyles}>
              Created By : {data?.madeBy?.name}
            </Text>
            <Text style={styles.itemTextStyles}>
              {validDateFormate(data?.createdAt)}
            </Text>
          </View>
          <View style={styles.updateContainer}>
            <Text style={styles.itemTextStyles}>
              Center : {data?.centre?.name ?? '-'}
            </Text>
          </View>

          {data?.items?.map((item, index) => {
            return (
              <PurchaseItemsCard
                key={`purchase-${item?.id}-${index}`}
                item={item}
                regNo={params?.regNo}
                requestType={params?.requestType}
              />
            )
          })}
        </Surface>
      </View>
    </ScrollView>
  )
}

type PurchaseItemsCardProps = {
  item: PurchaseItem
  regNo: string
  requestType: string
}

const PurchaseItemsCard = ({
  item,
  regNo,
  requestType,
}: PurchaseItemsCardProps) => {
  console.log(requestType)
  return (
    <View style={styles.itemContainer}>
      {requestType === 'Issue' && (
        <Text style={styles.itemTextStyles}>Reg No {regNo ?? ' -'}</Text>
      )}
      <View style={styles.updateContainer}>
        <Text style={styles.itemTextStyles}>Item name</Text>
        <Text style={styles.itemTextStyles}>{item?.product?.name ?? '-'}</Text>
      </View>
      <View style={styles.updateContainer}>
        <Text style={styles.itemTextStyles}>Item size</Text>
        <Text style={styles.itemTextStyles}>
          {item?.product?.variant ?? '-'}
        </Text>
      </View>
      <View style={styles.updateContainer}>
        <Text style={styles.itemTextStyles}>Quantity</Text>
        <Text style={styles.itemTextStyles}>{item?.quantity ?? '-'}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
    flex: 1,
    padding: Layout.baseSize,
    paddingTop: Layout.baseSize * 1.5,
  },
  detailCardContainer: {
    padding: Layout.baseSize,
    backgroundColor: Colors.light.background,
    borderRadius: Layout.baseSize * 0.25,
    borderTopWidth: 3,
    borderTopColor: Colors.light.primary,
  },
  cardHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusCard: {
    borderTopRightRadius: Layout.baseSize * 0.25,
    borderBottomLeftRadius: Layout.baseSize * 0.35,
    backgroundColor: Colors.light.primary,
    paddingHorizontal: Layout.baseSize * 1,
    paddingVertical: Layout.baseSize * 0.35,
  },
  updateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: Layout.baseSize * 0.75,
  },
  itemContainer: {
    backgroundColor: Colors.light.inputBg,
    padding: 12,
    marginTop: Layout.baseSize,
    borderRadius: Layout.baseSize * 0.25,
  },
  itemTextStyles: {
    color: 'grey',
    fontSize: Layout.baseSize * 0.9,
  },
})

export default PurchaseItemsDetails
