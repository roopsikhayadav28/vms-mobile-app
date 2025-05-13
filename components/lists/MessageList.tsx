import {
  ApolloQueryResult,
  FetchMoreQueryOptions,
  SubscribeToMoreOptions,
} from '@apollo/client'
import {FlashList} from '@shopify/flash-list'
import {openURL} from 'expo-linking'
import React, {useRef, useState} from 'react'
import {StyleSheet, TextInput as RNTextInput, View} from 'react-native'
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet'
import {TextInput} from 'react-native-paper'
import Layout from '../../constants/Layout'
import {
  AllMessagesQuery,
  Exact,
  MessageDetailsFragmentDoc,
  UserRef,
  useSendMessageMutation,
} from '../../generated/hooks_and_more'
import useUserToken from '../../hooks/useUserToken'
import {log, titleCaseToReadable} from '../../utils/helpers'
import Icon from '../basic/Icon'
import Separator from '../basic/Separator'
import {H3, P1} from '../basic/StyledText'
import Message from '../Message'

type MessageListProps = {
  data: AllMessagesQuery['queryMessage']
  refetch: (
    variables?: Partial<
      Exact<{
        offset?: number
        afterTime?: any
      }>
    >,
  ) => Promise<ApolloQueryResult<AllMessagesQuery>>
  fetchMore: <
    TFetchData = AllMessagesQuery,
    TFetchVars = Exact<{
      offset?: number
      afterTime?: any
    }>,
  >(
    fetchMoreOptions: FetchMoreQueryOptions<TFetchVars, TFetchData>,
  ) => Promise<ApolloQueryResult<AllMessagesQuery>>
  subscribeToMore: <
    TSubscriptionData = AllMessagesQuery,
    TSubscriptionVariables = Exact<{
      offset?: number
      afterTime?: any
    }>,
  >(
    options: SubscribeToMoreOptions<
      AllMessagesQuery,
      TSubscriptionVariables,
      TSubscriptionData
    >,
  ) => () => void
}

const MessageList = ({data, fetchMore}: MessageListProps) => {
  const actionSheetRef = useRef<ActionSheetRef>(null)
  const inputRef = useRef<RNTextInput>()
  const {userToken} = useUserToken()
  const [messageText, setMessageText] = useState<string>()
  const [tappedUser, setTappedUser] = useState<UserRef>()

  const [sendMessage] = useSendMessageMutation({
    update: (cache, {data: messagesData}) => {
      const newMessageRef = cache.writeFragment({
        id: `Message:${messagesData?.addMessage?.message?.[0]?.id}`,
        data: messagesData?.addMessage?.message?.[0],
        fragment: MessageDetailsFragmentDoc,
        fragmentName: 'MessageDetails',
      })
      cache.modify({
        fields: {
          queryMessage(existingRefs = [], {readField}) {
            return [newMessageRef, ...existingRefs]
          },
        },
      })
    },
    onCompleted: ({addMessage}) => {
      setMessageText(undefined)
      inputRef?.current?.clear()
      inputRef?.current?.blur()
      log('sent message', addMessage)
    },
  })

  function onChangeText(text: string) {
    setMessageText(text)
  }

  const handlePressedIcon = () => {
    if (!!messageText)
      sendMessage({
        variables: {
          message: {
            createdAt: new Date(),
            text: messageText,
            sentBy: {
              id: userToken,
            },
          },
        },
      })
  }

  const RightIconComponent = (
    <TextInput.Icon
      icon="share"
      hitSlop={Layout.hitSlop.icon}
      // size={Layout.baseSize * 2}
      onPress={handlePressedIcon}
    />
  )

  const estimatedItemSize = Layout.baseSize * 5

  const keyExtractor = (item, index) =>
    item?.id + index?.toString() ?? 'undefined-message'

  const onPressUserAvatar = (user: UserRef) => {
    setTappedUser(user)
    actionSheetRef?.current?.show()
  }
  const renderActionSheetContent = () => (
    <View style={styles.actionSheetContainer}>
      <H3>{tappedUser?.name}</H3>
      <P1>{titleCaseToReadable(tappedUser?.role)}</P1>
      <View style={styles.actionSheetContent}>
        <Icon
          iconName="call"
          onPress={() => openURL('tel:+91' + tappedUser?.phoneNo)}
        />
        <Icon
          iconName="email"
          onPress={() => openURL('mailto:' + tappedUser?.email)}
        />
      </View>
    </View>
  )
  const renderItem = ({item}) => (
    <Message
      data={item}
      myId={userToken}
      onPressUserAvatar={onPressUserAvatar}
    />
  )

  const handleOnEndReached = () =>
    fetchMore({variables: {offset: data?.length}})

  return (
    <>
      <FlashList
        inverted
        data={data ?? []}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        estimatedItemSize={estimatedItemSize}
        ItemSeparatorComponent={Separator}
        onEndReached={handleOnEndReached}
      />
      <TextInput
        ref={inputRef}
        multiline
        mode="outlined"
        onChangeText={onChangeText}
        label={'Message'}
        value={messageText}
        style={styles.inputStyle}
        placeholder={'Type your message here'}
        right={RightIconComponent}
      />
      <ActionSheet ref={actionSheetRef}>
        {renderActionSheetContent()}
      </ActionSheet>
    </>
  )
}

export default MessageList

const styles = StyleSheet.create({
  inputStyle: {
    marginHorizontal: Layout.baseSize * 0.5,
    marginBottom: Layout.baseSize,
  },
  actionSheetContainer: {padding: Layout.baseSize, alignItems: 'center'},
  actionSheetContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'stretch',
    margin: Layout.baseSize,
  },
})
