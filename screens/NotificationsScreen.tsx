import {StyleSheet} from 'react-native'

import NotificationList from '../components/lists/NotificationList'
import {UserRole, useUpdatesForMyRoleQuery} from '../generated/hooks_and_more'
import useLoggedInUser from '../hooks/useLoggedInUser'
import useUserToken from '../hooks/useUserToken'
import {log} from '../utils/helpers'

export default function NotificationsScreen() {
  const {userToken} = useUserToken()
  const {loggedInUser} = useLoggedInUser(userToken)
  log('role for fetching updates', loggedInUser?.role)
  const {data, loading, refetch, fetchMore} = useUpdatesForMyRoleQuery({
    fetchPolicy: 'cache-and-network',
    skip: !loggedInUser?.role,
    variables: {myRole: loggedInUser?.role as UserRole},
  })

  function onPullToRefresh() {
    log('should refetch Notification List', {data})
    refetch()
  }

  function onEndReached() {
    fetchMore({variables: {offset: data?.queryLeadStatusEvent?.length}})
  }

  return (
    <NotificationList
      data={data?.queryLeadStatusEvent ?? []}
      onPullToRefresh={onPullToRefresh}
      refreshing={loading}
      onEndReached={onEndReached}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
