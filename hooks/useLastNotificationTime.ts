import {useMMKVString} from 'react-native-mmkv'
import {MMKV_STORAGE} from '../utils/graphqlClient'

export default function useLastNotificationTime() {
  const [lastNotificationTime, setLastNotificationTime] = useMMKVString(
    'noti-count.storage',
    MMKV_STORAGE,
  )

  return {lastNotificationTime, setLastNotificationTime}
}
