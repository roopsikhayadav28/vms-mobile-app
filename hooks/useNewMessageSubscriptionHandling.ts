import {
  MessageDetailsFragmentDoc,
  useNewMessagesSubscription,
} from '../generated/hooks_and_more'
import {log} from '../utils/helpers'
import useMessageLastSeen from './useMessageLastSeen'

const now = new Date()
export default function useNewMessageSubscriptionHandling() {
  const {messageLastSeenAt} = useMessageLastSeen()
  const {} = useNewMessagesSubscription({
    variables: {
      afterTime: messageLastSeenAt ?? now,
    },
    onData: ({data, client}) => {
      log('new data for message', data)
      if (data?.data?.queryMessage?.length > 0) {
        for (const message of data?.data?.queryMessage) {
          try {
            client.cache.modify({
              fields: {
                queryMessage(existingMessageRefs = [], {readField}) {
                  if (
                    !existingMessageRefs.some(
                      em => readField('id', em) === message.id,
                    )
                  ) {
                    try {
                      const newMessageRef = client.cache.writeFragment({
                        id: `Message:${message.id}`,
                        data: message,
                        fragment: MessageDetailsFragmentDoc,
                        fragmentName: 'MessageDetails',
                      })
                      log('newMessageRef', newMessageRef)
                      return [newMessageRef, ...existingMessageRefs]
                    } catch (error) {
                      log('error writing message to cache', error)
                    }
                  } else return existingMessageRefs
                },
              },
            })
          } catch (error) {
            log('error writing new messages in cache', error)
          }
        }
      }
    },
  })
}
