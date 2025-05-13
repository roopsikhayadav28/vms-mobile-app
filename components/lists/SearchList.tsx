import {FlashList} from '@shopify/flash-list'
import React from 'react'
import {StyleSheet, View} from 'react-native'
import Layout from '../../constants/Layout'
import {NotificationRef} from '../../generated/hooks_and_more'
import Navigation from '../../navigation'
import ListEmptyComponent from '../basic/ListEmptyComponent'
import Separator from '../basic/Separator'
import NotificationCard from '../NotificationCard'

type NotificationListProps = {
  data: NotificationRef[]
}

export default function NotificationList({data}: NotificationListProps) {
  return (
    <View style={styles.mainContainerStyle}>
      <FlashList
        // style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => `notification-${index}`}
        data={data}
        ListEmptyComponent={
          <ListEmptyComponent text="Search for more result" />
        }
        renderItem={({item}) => {
          return (
            <View style={styles.notificationCardContainer}>
              <NotificationCard data={item} {...Navigation} />
              <Separator />
            </View>
          )
        }}
        estimatedItemSize={80}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainerStyle: {flex: 1},
  notificationCardContainer: {
    marginHorizontal: Layout.baseSize * 0.5,
    paddingTop: Layout.baseSize * 0.5,
  },
  contentContainerStyle: {
    paddingHorizontal: Layout.baseSize * 0.5,
    paddingTop: Layout.baseSize * 0.5,
  },
})
