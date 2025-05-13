import {useNavigation} from '@react-navigation/native'
import React, {memo} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import Colors from '../constants/Colors'
import Layout from '../constants/Layout'
import {MessageRef, UserRef} from '../generated/hooks_and_more'
import {fromNow, log} from '../utils/helpers'
import {H3, LinkText, P1, P2} from './basic/StyledText'

type MessageProps = {
  data: MessageRef
  myId: string
  onPressUserAvatar: (user: UserRef) => void
}

const Message = ({data, myId, onPressUserAvatar}: MessageProps) => {
  const navigation = useNavigation<any>()
  function onPressAvatar() {
    onPressUserAvatar(data?.sentBy)
  }
  const sentByMe = data?.sentBy?.id === myId
  const phrases = data?.text?.split(' ')
  const hashtags = phrases?.filter(word => word?.includes('#'))
  log('hashtag', hashtags)
  return (
    <View style={styles(sentByMe).container}>
      {!sentByMe && (
        <LinkText onPress={onPressAvatar}>{data?.sentBy?.name}</LinkText>
      )}
      {hashtags?.length <= 0 ? (
        <P1 style={sentByMe && {color: Colors.light.background}}>
          {data?.text}
        </P1>
      ) : (
        <Text>
          {phrases?.map(p =>
            hashtags?.some(h => p === h) ? (
              <H3
                style={sentByMe && {color: Colors.light.background}}
                onPress={() =>
                  navigation.navigate('Drawer', {
                    screen: 'Leads',
                    params: {
                      screen: 'LeadDetailsScreen',
                      params: {
                        regNo: p.replace('#', ''),
                      },
                    },
                  })
                }>
                {p + ' '}
              </H3>
            ) : (
              <P1 style={sentByMe && {color: Colors.light.background}}>
                {p + ' '}
              </P1>
            ),
          )}
        </Text>
      )}
      {data?.createdAt && (
        <P2 style={sentByMe && {color: Colors.light.background}}>
          {fromNow(new Date(data?.createdAt)) + ' ago'}
        </P2>
      )}
    </View>
  )
}

export default memo(Message)

const styles = (isSentByMe: boolean) =>
  StyleSheet.create({
    container: {
      // height: Layout.baseSize * 5,
      backgroundColor: isSentByMe
        ? Colors.light.primary
        : Colors.light.background,
      alignSelf: isSentByMe ? 'flex-end' : 'flex-start',
      borderRadius: Layout.baseSize * 0.5,
      padding: Layout.baseSize * 0.5,
      marginHorizontal: Layout.baseSize * 0.5,
      maxWidth: Layout.window.width * 0.8,
    },
  })
