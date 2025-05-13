import {FlashList, ListRenderItem} from '@shopify/flash-list'
import React from 'react'
import {RefreshControl, View} from 'react-native'
import Layout from '../../constants/Layout'
import {commonStyle} from '../../constants/style'
import {LeadStatusEventRef} from '../../generated/hooks_and_more'
import ListEmptyComponent from '../basic/ListEmptyComponent'
import Separator from '../basic/Separator'
import NotificationCard from '../NotificationCard'

type NotificationListProps = {
  data: LeadStatusEventRef[]
  onPullToRefresh: () => void
  refreshing: boolean
  onEndReached: () => void
}

export default function NotificationList({
  data,
  onPullToRefresh,
  refreshing,
  onEndReached,
}: NotificationListProps) {
  const EmptyComponent = () => (
    <ListEmptyComponent text="You have no new notifications" />
  )

  const keyExtractor = (item, index) => item?.id + `notification-list-${index}`

  const renderItem: ListRenderItem<LeadStatusEventRef> = ({item}) => {
    return <NotificationCard data={item} />
  }

  const estimatedItemSize = Layout.baseSize * 5

  return (
    <View style={commonStyle.mainAppContainer}>
      <FlashList
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        data={data}
        ListEmptyComponent={EmptyComponent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onPullToRefresh} />
        }
        ListHeaderComponent={Separator}
        ItemSeparatorComponent={Separator}
        onEndReached={onEndReached}
        renderItem={renderItem}
        estimatedItemSize={estimatedItemSize}
      />
    </View>
  )
}
