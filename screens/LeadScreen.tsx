import React, {useState} from 'react'
import {StyleSheet} from 'react-native'
import Button from '../components/basic/Button'
import {View} from '../components/basic/Themed'
import LeadList from '../components/lists/LeadList'
import {
  LeadPreviewFragment,
  LeadSource,
  StatusAggregate,
  useAllLeadsQuery,
  useFilterLeadsLazyQuery,
  useLeadsForDriverQuery,
  useLeadsForPeQuery,
  UserRole,
  useSearchLeadsForDriverLazyQuery,
  useSearchLeadsForPeLazyQuery,
  useSearchLeadsLazyQuery,
} from '../generated/hooks_and_more'
import useLoggedInUser from '../hooks/useLoggedInUser'
import useUserToken from '../hooks/useUserToken'
import {
  LeadStackScreenProps,
  RootStackScreenProps,
} from '../navigation/navigationTypes'

export const LeadScreen: React.FC<
  RootStackScreenProps<'LeadProcessScreen'> & LeadStackScreenProps<'AllLeads'>
> = ({
  navigation,
}: RootStackScreenProps<'Drawer'> & LeadStackScreenProps<'AllLeads'>) => {
  const {userToken} = useUserToken()
  const {loggedInUser} = useLoggedInUser(userToken)
  const [showSearchData, setShowSearchData] = useState<boolean>(false)
  const [statusAggregates, setStatusAggregates] = useState<StatusAggregate[]>(
    [],
  )
  const [isFilterApplied, setIsFilterApplied] = useState<boolean>(false)

  const {
    data: allLeadsData,
    refetch: refetchAllLeads,
    loading: loadingAllLeads,
    fetchMore: fetchMoreAllLeads,
  } = useAllLeadsQuery({
    skip:
      loggedInUser?.role === UserRole.ProcurementExecutive ||
      loggedInUser?.role === UserRole.Driver,
    fetchPolicy: 'network-only',
    onCompleted: ({queryLead}) => {
      // log('logging leads data for ALL', queryLead)
    },
  })
  // for procurement executive
  const {
    data: leadsForPEData,
    refetch: refetchLeadsForPE,
    loading: loadingLeadsForPE,
    fetchMore: fetchMoreLeadsForPE,
  } = useLeadsForPeQuery({
    variables: {peId: userToken},
    fetchPolicy: 'network-only',
    skip: loggedInUser?.role !== UserRole.ProcurementExecutive,
    onCompleted: ({queryLead}) => {
      // log('logging leads data for PE', queryLead)
    },
  })
  // for driver
  const {
    data: leadsForDriverData,
    refetch: refetchLeadsForDriver,
    loading: loadingLeadsForDriver,
    fetchMore: fetchMoreLeadsForDriver,
  } = useLeadsForDriverQuery({
    variables: {driverId: userToken},
    fetchPolicy: 'network-only',
    skip: loggedInUser?.role !== UserRole.Driver,
    onCompleted: ({queryLead}) => {
      // log('data for driver leads', queryLead)
    },
  })

  // Lazy query for filtered leads
  const [
    getFilteredData,
    {loading: filteredLeadsLoading, error, data: filteredLeads},
  ] = useFilterLeadsLazyQuery()
  // console.log(
  //   'This is the filtered data in the leadscreen',
  //   JSON.stringify(filteredLeads, null, 2),
  // )
  // const getAggrigationStatus = (queryLead: LeadPreviewFragment[]) => {
  //   let statusAggs: StatusAggregate[] = []
  //   queryLead?.forEach(l => {
  //     const status =
  //       l.statusEvents && l.statusEvents[0] && l.statusEvents[0].status
  //     if (status) {
  //       const existingStatusEntry = statusAggs.find(sa => sa.status === status)
  //       if (existingStatusEntry && existingStatusEntry.count) {
  //         existingStatusEntry.count += 1
  //       } else {
  //         statusAggs.push({count: 1, status})
  //       }
  //     }
  //   })
  //   setStatusAggregates(statusAggs)
  // }

  const data =
    loggedInUser?.role === UserRole.ProcurementExecutive
      ? leadsForPEData
      : loggedInUser?.role === UserRole.Driver
      ? leadsForDriverData
      : allLeadsData
  const refetch =
    loggedInUser?.role === UserRole.ProcurementExecutive
      ? refetchLeadsForPE
      : loggedInUser?.role === UserRole.Driver
      ? refetchLeadsForDriver
      : refetchAllLeads

  const fetchMore =
    loggedInUser?.role === UserRole.ProcurementExecutive
      ? fetchMoreLeadsForPE
      : loggedInUser?.role === UserRole.Driver
      ? fetchMoreLeadsForDriver
      : fetchMoreAllLeads

  const loading =
    loggedInUser?.role === UserRole.ProcurementExecutive
      ? loadingLeadsForPE
      : loggedInUser?.role === UserRole.Driver
      ? loadingLeadsForDriver
      : loadingAllLeads
  // search leads
  const [searchLeads, {data: searchLeadsData}] = useSearchLeadsLazyQuery({
    onCompleted: ({queryLead}) => {
      // log('search results for leads', queryLead)

      setShowSearchData(true)
    },
  })

  ///role specific search querry for PE
  const [searchLeadsForPe, {data: searchLeadForPEData}] =
    useSearchLeadsForPeLazyQuery({
      onCompleted: ({queryLead}) => {
        // console.log('leadFeached useSearchLeadsForPeLazyQuery', queryLead)
      },
    })

  //role specific search querry for driver
  const [searchLeadsForDriver, {data: searchLeadForDriverData}] =
    useSearchLeadsForDriverLazyQuery({
      onCompleted: ({queryLead}) => {
        console.log('leadFeached useSearchLeadsForDriverLazyQuery', queryLead)
      },
    })

  function onPullToRefresh() {
    // log('should refetch all leads')
    refetch()
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

    // console.log(payload)
    switch (role) {
      case UserRole.ProcurementExecutive:
        searchLeadsForPe({...payload})
        break
      case UserRole.Driver:
        searchLeadsForDriver({...payload})
      default:
        searchLeads({
          variables: {searchText: '/.*' + searchText.toUpperCase() + '.*/i'},
        })
    }
    setShowSearchData(true)
  }

  function onClearSearchText() {
    setShowSearchData(false)
  }

  function onEndReached() {
    if (data && data?.queryLead && data?.queryLead.length > 0)
      fetchMore({
        variables: {offset: data?.queryLead.length},
      })
  }

  const handleChatButton = () => navigation.navigate('MessagesScreen')

  const handleFloatingButton = () => {
    navigation.navigate('LeadProcessScreen', {
      currentStatus: undefined,
      leadId: undefined,
      regNo: undefined,
      source: LeadSource.BankAuction,
    })
  }

  const leadsData = showSearchData
    ? loggedInUser?.role === UserRole.ProcurementExecutive
      ? searchLeadForPEData?.queryLead
      : loggedInUser?.role === UserRole.Driver
      ? searchLeadForDriverData?.queryLead
      : searchLeadsData?.queryLead
    : data?.queryLead

  return (
    <View style={styles.container}>
      <LeadList
        leadsData={
          isFilterApplied
            ? (filteredLeads?.queryLead as LeadPreviewFragment[])
            : leadsData
        }
        statusAggregates={statusAggregates}
        onPullToRefresh={onPullToRefresh}
        loading={loading}
        onFinishTypingSearchText={onFinishTypingSearchText}
        onClearSearchText={onClearSearchText}
        onEndReached={onEndReached}
        getFilteredData={getFilteredData}
        setIsFilterApplied={setIsFilterApplied}
      />
      {loggedInUser?.role === UserRole.ProcurementExecutive && (
        <Button
          iconName="add"
          variant="floating"
          onPress={handleFloatingButton}
        />
      )}
      <Button
        iconName="chat"
        variant="floating_chat"
        onPress={handleChatButton}
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
