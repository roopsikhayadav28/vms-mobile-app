import React, {useState} from 'react'
import {StyleSheet} from 'react-native'
import LeadList from '../components/lists/LeadList'
import {
  LeadStatus,
  StatusAggregate,
  UserRole,
  useAllCentresQuery,
  useFilteredInventoryLazyQuery,
  useFilteredInventoryQuery,
  useSearchLeadsLazyQuery,
} from '../generated/hooks_and_more'
import useLoggedInUser from '../hooks/useLoggedInUser'
import useUserToken from '../hooks/useUserToken'

import PickerSelectButton from '../components/basic/PickerSelectButton'
import {View} from '../components/basic/Themed'
import {
  RefurbishmentStackScreenProps,
  RootStackScreenProps,
} from '../navigation/navigationTypes'

export const RefurbishmentScreen: React.FC<
  RefurbishmentStackScreenProps<'InStockLeads'>
> = ({
  navigation,
}: RootStackScreenProps<'Drawer'> &
  RefurbishmentStackScreenProps<'InStockLeads'>) => {
  const {userToken} = useUserToken()
  const {loggedInUser} = useLoggedInUser(userToken)
  const [showSearchData, setShowSearchData] = useState<boolean>(false)
  const [statusAggregates, setStatusAggregates] = useState<StatusAggregate[]>(
    [],
  )
  const [selectedCentreToView, setSelectedCentreToView] =
    useState<string>('all')
  const {data: centreData} = useAllCentresQuery({
    fetchPolicy: 'cache-and-network',
    // onCompleted: ({queryCentre}) => {log('data for all centres', queryCentre)},
  })
  const centresData = centreData?.queryCentre
    ?.map(c => ({
      label: c.name,
      value: c.name,
    }))
    .concat({label: 'All', value: 'all'})

  const [searchLeads, {data: searchLeadsData}] = useSearchLeadsLazyQuery({
    onCompleted: ({queryLead}) => {
      // log('search results for leads', queryLead)

      setShowSearchData(true)
    },
  })
  const [
    getInventoryData,
    {data: inventoryData, loading: inventoryLoading, refetch: inventoryRefetch},
  ] = useFilteredInventoryLazyQuery({
    variables: {
      sortByUpdatedAt: true,
      status: LeadStatus.VehicleInStock,
    },
  })
  const isUserCM = loggedInUser?.role === UserRole.CentreManager
  console.log(
    'This is the inventory data',
    inventoryData?.filteredLeads?.length,
  )
  const {
    data: inventoryDataForCM,
    loading: InventoryForCMLoading,
    refetch: inventoryForCMRefetch,
  } = useFilteredInventoryQuery({
    skip: loggedInUser?.role !== UserRole.CentreManager,
    variables: {
      sortByUpdatedAt: true,
      status: LeadStatus.VehicleInStock,
      centreName: centreData?.queryCentre?.find(
        centre => centre?.incharge?.email === loggedInUser?.email,
      )?.name,
    },
  })

  console.log('CENTRE NAME', loggedInUser)
  console.log('Hello data', inventoryDataForCM?.filteredLeads?.length)
  // const {
  //   data: allInventoryData,
  //   loading: loadingAllInventories,
  //   refetch: refetchingAllInventories,
  // } = useGetAllInventoryQuery()
  // useEffect(() => {
  //   if (loggedInUser?.role === UserRole.CentreManager) {
  //     getInventoryData({
  //       variables: {
  //         centreName: loggedInUser?.centre?.name,
  //         status: LeadStatus.VehicleInStock,
  //         sortByUpdatedAt: true,
  //       },
  //     })
  //   } else {
  //     getInventoryData({
  //       variables: {
  //         status: LeadStatus.VehicleInStock,
  //         sortByUpdatedAt: true,
  //       },
  //     })
  //   }
  // }, [])
  function onPullToRefresh() {
    // log('should refetch all leads')
    isUserCM ? inventoryForCMRefetch() : inventoryRefetch()
  }

  function onFinishTypingSearchText(searchText: string) {
    searchLeads({
      variables: {searchText: '/.*' + searchText.toUpperCase() + '.*/i'},
    })
    setShowSearchData(true)
  }

  function onClearSearchText() {
    setShowSearchData(false)
  }
  // const data = inventoryData
  // const fetchMore = inventoryRefetch
  function onEndReached() {
    inventoryRefetch()
  }

  function onChangeCentrePickerValue(value: string, index: number) {
    console.log('This is the latest value', value)
    setSelectedCentreToView(value)
    if (value !== 'all') {
      getInventoryData({
        variables: {
          centreName: value,
          sortByUpdatedAt: true,
          status: LeadStatus.VehicleInStock,
        },
      })
    } else {
      getInventoryData({
        variables: {
          sortByUpdatedAt: true,
          status: LeadStatus.VehicleInStock,
        },
      })
    }
  }
  // function getLeadsData() {
  //   if (loggedInUser?.role === UserRole.CentreManager) {
  //     // getInventoryData({
  //     //   variables: {
  //     //     centreName: loggedInUser?.centre?.name,
  //     //   },
  //     // })
  //   } else {
  //     if (selectedCentreToView !== 'all') {
  //       // console.log(
  //       //   'This is when a centre is selected',
  //       //   inventoryData?.filteredLeads?.length,
  //       // )
  //       return inventoryData?.filteredLeads
  //     } else {
  //       if (showSearchData) {
  //         return searchLeadsData?.queryLead
  //         // } else {
  //         //   return data?.filteredLeads as LeadPreviewFragment[]
  //         // }
  //       }
  //     }
  //   }
  // }
  const rolesToShowAllCentresForRefurbishment = [
    UserRole.Admin,
    UserRole.SalesHead,
    UserRole.FinanceManager,
  ]
  function getInchargeCentre() {
    // console.log('Logged in user role', loggedInUser?.email)
    // console.log(
    //   'This is the centre data',
    //   centreData?.queryCentre?.find(
    //     centre => centre?.incharge?.email === loggedInUser?.email,
    //   ),
    // )
    const centre = centreData?.queryCentre?.find(
      centre => centre?.incharge?.email === loggedInUser?.email,
    )?.name
    return centre
  }

  return (
    <View style={styles.container}>
      <PickerSelectButton
        items={centresData}
        value={
          rolesToShowAllCentresForRefurbishment.includes(loggedInUser?.role)
            ? selectedCentreToView
            : isUserCM
            ? getInchargeCentre()
            : undefined
        }
        disabled={isUserCM}
        onValueChange={onChangeCentrePickerValue}
        placeholder={'Select your center'}
      />
      <LeadList
        leadsData={
          showSearchData
            ? searchLeadsData?.queryLead
            : isUserCM
            ? inventoryDataForCM?.filteredLeads
            : inventoryData?.filteredLeads
        }
        statusAggregates={statusAggregates}
        onPullToRefresh={onPullToRefresh}
        loading={inventoryLoading || InventoryForCMLoading}
        onFinishTypingSearchText={onFinishTypingSearchText}
        onClearSearchText={onClearSearchText}
        onEndReached={onEndReached}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: Layout.baseSize,
    // backgroundColor: "pink",
    // alignItems: "center",
    // justifyContent: "center",
  },
})
