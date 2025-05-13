import {StyleSheet, Text, View} from 'react-native'
import React, {useState} from 'react'
import LeadList from '../components/lists/LeadList'
import {
  LeadStatus,
  useGetBookingLeadWithLoanQuery,
  useSearchLeadsLazyQuery,
} from '../generated/hooks_and_more'
import useLoggedInUser from '../hooks/useLoggedInUser'
import useUserToken from '../hooks/useUserToken'

const LoanServiceList = () => {
  const {
    data: getLeadWithLoan,
    refetch: refetchLeadsWithLoan,
    loading: loadingLeadWithLoan,
    fetchMore: fetchMoreLeadWithBooking,
  } = useGetBookingLeadWithLoanQuery({
    variables: {
      status: LeadStatus.BookingFinanceRequested,
    },
    fetchPolicy: 'cache-and-network',
  })
  const {userToken} = useUserToken()

  const {loggedInUser} = useLoggedInUser(userToken)
  const [showSearchData, setShowSearchData] = useState<boolean>(false)

  const [searchLeads, {data: searchLeadsData}] = useSearchLeadsLazyQuery({
    onCompleted: ({queryLead}) => {
      setShowSearchData(true)
    },
  })

  function onPullToRefresh() {
    refetchLeadsWithLoan()
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
      getLeadWithLoan &&
      getLeadWithLoan?.filteredLeads &&
      getLeadWithLoan?.filteredLeads?.length > 0
    )
      fetchMoreLeadWithBooking({
        variables: {offset: getLeadWithLoan?.filteredLeads?.length},
      })
  }
  return (
    <View style={styles.container}>
      <LeadList
        leadsData={getLeadWithLoan?.filteredLeads}
        // statusAggregates={statusAggregates}
        onPullToRefresh={onPullToRefresh}
        loading={loadingLeadWithLoan}
        onFinishTypingSearchText={onFinishTypingSearchText}
        onClearSearchText={onClearSearchText}
        onEndReached={onEndReached}
      />
    </View>
  )
}

export default LoanServiceList

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
