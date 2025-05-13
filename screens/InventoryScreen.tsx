import React, {useCallback, useEffect, useState} from 'react'
import {RefreshControl, ScrollView, View} from 'react-native'
import PickerSelectButton from '../components/basic/PickerSelectButton'
import LeadList from '../components/lists/LeadList'
import {commonStyle} from '../constants/style'
import {
  LeadStatus,
  useAllCentresQuery,
  useFilteredInventoryLazyQuery,
  useFilteredInventoryQuery,
  useFilteredLeadsLazyQuery,
  useFilteredLeadsQuery,
  useGetAllInventoryQuery,
  useGetStocksDetailsLazyQuery,
  useGetStocksDetailsQuery,
  useInventoryLazyQuery,
} from '../generated/hooks_and_more'
import {
  OurDrawerScreenProps,
  RootStackScreenProps,
} from '../navigation/navigationTypes'
import {log} from '../utils/helpers'
import Colors from '../constants/Colors'
import {SegmentedButtons} from 'react-native-paper'
import Layout from '../constants/Layout'
import Separator from '../components/basic/Separator'
import InventoryCard from '../components/composite/InventoryCard'
import {FlashList} from '@shopify/flash-list'

type InventoryScreenProps = OurDrawerScreenProps<'Inventory'>
export default function InventoryScreen({
  navigation,
}: RootStackScreenProps<'ViewNotificationsDetails'>) {
  const [selectedCentreToView, setSelectedCentreToView] =
    useState<string>('all')

  const {data, refetch: getAllCentreList} = useAllCentresQuery({
    fetchPolicy: 'no-cache',
    onCompleted: ({queryCentre}) => {
      log('data for all centres')
    },
  })

  const centresData = data?.queryCentre
    ?.map(c => ({
      label: c.name,
      value: c.name,
    }))
    .concat({label: 'All', value: 'all'})

  // const {
  //   data: allInventoryData,
  //   loading: loadingAllInventories,
  //   refetch: refetchingAllInventories,
  // } = useGetAllInventoryQuery()

  const {
    data: allInventoryData,
    refetch: refetchingAllInventories,
    loading: loadingAllInventories,
    fetchMore: fetchMoreInStockLeads,
  } = useFilteredInventoryQuery({
    variables: {
      status: [LeadStatus.VehicleInStock],
    },
    fetchPolicy: 'network-only',
  })

  const [getInventoryData, {data: inventoryData, loading, refetch}] =
    useFilteredInventoryLazyQuery({
      fetchPolicy: 'cache-and-network',
      variables: {
        status: [LeadStatus.VehicleInStock],
      },
    })

  // const [getInventoryData, {data: inventoryData, loading, refetch}] =
  //   useInventoryLazyQuery({
  //     fetchPolicy: 'cache-and-network',

  //     /* onCompleted: ({queryLead}) => {
  //       log('data for all leaders', queryLead)
  //     }, */
  //   })

  const [
    getStockCounts,
    {data: stocks, loading: stocksLoading, refetch: getStockData},
  ] = useGetStocksDetailsLazyQuery({
    fetchPolicy: 'cache-and-network',
  })

  useEffect(() => {
    getStockCounts()
  }, [])

  // console.log(stocks)
  function onChangeCentrePickerValue(value: string, index: number) {
    setSelectedCentreToView(value)
    if (value !== 'all') {
      getInventoryData({
        variables: {
          centreName: value,
          status: [LeadStatus.VehicleInStock],
        },
        fetchPolicy: 'cache-and-network',
      })

      const item = data?.queryCentre?.filter(
        item => item?.name?.toUpperCase() === value?.toUpperCase(),
      )

      if (item?.length) {
        getStockCounts({
          variables: {centreId: item?.[0]?.id},
          fetchPolicy: 'no-cache',
          onCompleted(resp) {
            console.log('resp', resp)
          },
        })
      }
    } else {
      refetchingAllInventories()
      getStockCounts()
    }
  }
  function onEndReached() {
    //TODO: Implement pagination for this
    log('on end reached for inventory for center', selectedCentreToView)
  }
  function onPullToRefresh() {
    log('Refetch data in inventory for center')
    refetch()
    getAllCentreList()
    getStockData()
  }

  const onPressCardFn = useCallback(
    ({
      leadId,
      regNo,
      currentStatus,
    }: {
      leadId: string
      regNo: string
      currentStatus: LeadStatus
    }) => {
      navigation.navigate('ViewNotificationsDetails', {
        screen: 'LeadDetailsScreen',
        params: {
          leadId,
          regNo,
          currentStatus,
        },
      })
    },
    [],
  )

  const estimatedListSize = {
    height: Layout.baseSize * 4,
    width: Layout.window.width,
  }

  const leadsData =
    selectedCentreToView === 'all'
      ? allInventoryData?.filteredLeads
      : inventoryData?.filteredLeads
  const [value, setValue] = React.useState('Tractor')

  return (
    <View
      style={[
        commonStyle.flex1,
        {
          backgroundColor: Colors.light.background,
        },
      ]}>
      <PickerSelectButton
        items={centresData}
        value={selectedCentreToView}
        onValueChange={onChangeCentrePickerValue}
        placeholder={'Select your center'}
      />
      <View style={{marginHorizontal: Layout.baseSize * 0.5}}>
        <SegmentedButtons
          value={value}
          onValueChange={setValue}
          buttons={[
            {
              value: 'Tractor',
              label: 'Tractor',
            },
            {
              value: 'Stock',
              label: 'Stock',
            },
          ]}
        />
      </View>
      <Separator />
      {value === 'Tractor' && (
        <LeadList
          loading={loadingAllInventories || loading}
          leadsData={leadsData}
          onEndReached={onEndReached}
          onPullToRefresh={onPullToRefresh}
          onPressCardFn={onPressCardFn}
          isNoItemSelected={!selectedCentreToView}
        />
      )}

      {value === 'Stock' && (
        <FlashList
          data={stocks?.inventoryDetails?.items ?? []}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl
              refreshing={stocksLoading}
              onRefresh={onPullToRefresh}
            />
          }
          renderItem={({item, index}) => {
            return (
              <InventoryCard
                boxLabel={item?.product?.name}
                centreId={selectedCentreToView}
                issuedSpare={item?.consumed}
                inStockSpare={item?.availableInStock}
                id={item.id}
              />
            )
          }}
          estimatedItemSize={225}
          estimatedListSize={estimatedListSize}
        />
      )}
    </View>
  )
}
