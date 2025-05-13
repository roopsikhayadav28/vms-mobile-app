import {useMMKVString} from 'react-native-mmkv'
import {MMKV_STORAGE} from '../utils/graphqlClient'
import {log} from '../utils/helpers'

export default function useMessageLastSeen() {
  const [messageLastSeenAt, setMessageLastSeenAt] = useMMKVString(
    'message-last-seen-at.storage',
    MMKV_STORAGE,
  )
  // log('message last seen at', messageLastSeenAt)
  return {messageLastSeenAt, setMessageLastSeenAt}
}
