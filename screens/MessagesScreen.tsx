import {useFocusEffect} from '@react-navigation/native'
import React, {useCallback} from 'react'
import {StyleSheet} from 'react-native'
import MessageList from '../components/lists/MessageList'
import {useAllMessagesQuery} from '../generated/hooks_and_more'
import useMessageLastSeen from '../hooks/useMessageLastSeen'
import {RootStackScreenProps} from '../navigation/navigationTypes'

const MessagesScreen = (props: RootStackScreenProps<'MessagesScreen'>) => {
  // listener on when a user sees comes in and goes out of this screen
  const {setMessageLastSeenAt} = useMessageLastSeen()

  useFocusEffect(
    useCallback(() => {
      const now = new Date()
      setMessageLastSeenAt(now.toISOString())
      return setMessageLastSeenAt(new Date().toISOString())
    }, []),
  )

  const {data, fetchMore, refetch, subscribeToMore} = useAllMessagesQuery({
    fetchPolicy: 'cache-and-network',
  })

  return (
    <MessageList
      data={data?.queryMessage ?? []}
      fetchMore={fetchMore}
      refetch={refetch}
      subscribeToMore={subscribeToMore}
    />
  )
}

export default MessagesScreen

const styles = StyleSheet.create({})
