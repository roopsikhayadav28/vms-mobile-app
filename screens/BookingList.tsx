import React, {useState} from 'react'
import LeadList from '../components/lists/LeadList'
import {
  LeadPreviewFragment,
  LeadStatus,
  UserRole,
  useAllCentresQuery,
  useFilteredInventoryLazyQuery,
  useFilteredInventoryQuery,
  useFilteredLeadsQuery,
  useSearchLeadsLazyQuery,
} from '../generated/hooks_and_more'
import {View} from 'react-native'
import {StyleSheet} from 'react-native'
import PickerSelectButton from '../components/basic/PickerSelectButton'
import useLoggedInUser from '../hooks/useLoggedInUser'
import useUserToken from '../hooks/useUserToken'

function BookingList() {
  const {userToken} = useUserToken()
  const {loggedInUser} = useLoggedInUser(userToken)
  const [selectedCentreToView, setSelectedCentreToView] =
    useState<string>('all')
  const [showSearchData, setShowSearchData] = useState<boolean>(false)
  const [
    getInventoryData,
    {data: inventoryData, loading: inventoryLoading, refetch: inventoryRefetch},
  ] = useFilteredInventoryLazyQuery({
    variables: {
      centreName: selectedCentreToView,
      status: LeadStatus.ReadyForSale,
    },
    fetchPolicy: 'cache-and-network',
  })
  const {
    data: bookingLeadsData,
    refetch: refetchBookingLeads,
    loading: loadingBookingLeads,
    fetchMore: fetchMoreBookingLeads,
  } = useFilteredLeadsQuery({
    variables: {
      hasStatus: [LeadStatus.ReadyForSale],
    },
    fetchPolicy: 'network-only',
  })
  const {
    data: allInventoryFilteredData,
    loading: loadingAllInventories,
    refetch: refetchingAllInventories,
  } = useFilteredInventoryQuery({
    variables: {
      status: LeadStatus.ReadyForSale,
    },
  })

  const [searchLeads, {data: searchLeadsData}] = useSearchLeadsLazyQuery({
    onCompleted: ({queryLead}) => {
      setShowSearchData(true)
    },
  })

  const rolesToShowAllCentresForRefurbishment = [
    UserRole.Admin,
    UserRole.SalesHead,
    UserRole.FinanceManager,
  ]

  const {data: centreData} = useAllCentresQuery({})

  const centresData = centreData?.queryCentre
    ?.map(c => ({
      label: c.name,
      value: c.name,
    }))
    .concat({label: 'All', value: 'all'})

  function getInchargeCentre() {
    return centreData?.queryCentre?.find(
      centre => centre?.incharge?.email === loggedInUser?.email,
    )?.incharge?.centre?.name
  }

  function onChangeCentrePickerValue(value: string, index: number) {
    setSelectedCentreToView(value)
    if (value !== 'all') {
      getInventoryData({
        variables: {
          centreName: value,
        },
      })
    } else {
      refetchingAllInventories()
    }
  }

  function getBookingData() {
    if (selectedCentreToView !== 'all') {
      return inventoryData?.filteredLeads
    } else {
      if (showSearchData) {
        return searchLeadsData?.queryLead
      } else {
        return bookingLeadsData?.filteredLeads as LeadPreviewFragment[]
      }
    }
  }
  const bookingData = getBookingData()

  function onPullToRefresh() {
    refetchBookingLeads()
  }

  function onFinishTypingSearchText(searchText: string) {
    const role = loggedInUser?.role
    const peId = loggedInUser?.id
    const payload = {
      variables: {
        searchText: '/.*' + searchText.toUpperCase() + '.*/i',
        peId: peId,
      },
    }

    searchLeads({
      variables: {searchText: '/.*' + searchText.toUpperCase() + '.*/i'},
    })

    setShowSearchData(true)
  }
  function onClearSearchText() {
    setShowSearchData(false)
  }
  function onEndReached() {
    if (
      bookingLeadsData &&
      bookingLeadsData?.filteredLeads &&
      bookingLeadsData?.filteredLeads?.length > 0
    )
      fetchMoreBookingLeads({
        variables: {offset: bookingLeadsData?.filteredLeads?.length},
      })
  }
  return (
    <View style={styles.container}>
      <PickerSelectButton
        items={centresData}
        value={
          rolesToShowAllCentresForRefurbishment.includes(loggedInUser?.role)
            ? selectedCentreToView
            : loggedInUser?.role === UserRole.CentreManager
            ? getInchargeCentre()
            : undefined
        }
        disabled={loggedInUser?.role === UserRole.CentreManager}
        onValueChange={onChangeCentrePickerValue}
        placeholder={'Select your center'}
      />
      <LeadList
        leadsData={bookingData}
        // statusAggregates={statusAggregates}
        onPullToRefresh={onPullToRefresh}
        loading={inventoryLoading || loadingBookingLeads}
        onFinishTypingSearchText={onFinishTypingSearchText}
        onClearSearchText={onClearSearchText}
        onEndReached={onEndReached}
      />
    </View>
  )
}

export default BookingList
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
