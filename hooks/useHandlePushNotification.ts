import {useNavigation} from '@react-navigation/native'
import * as Notifications from 'expo-notifications'
import {useEffect} from 'react'
import {RootStackScreenProps} from '../navigation/navigationTypes'
import {log} from '../utils/helpers'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
})
export default function useHandlePushNotification() {
  // const [notification, setNotification] = useState<Notifications.Notification>();

  const navigation =
    useNavigation<RootStackScreenProps<'Drawer'>['navigation']>()

  const lastNotificationResponse = Notifications.useLastNotificationResponse()

  // This listener is fired whenever a notification is received while the app is foregrounded
  // const notificationListener = Notifications.addNotificationReceivedListener(notification => {
  //   log(" App in foreground Notification data : ", notification);
  //   setNotification(notification);
  // });

  useEffect(() => {
    if (
      lastNotificationResponse &&
      lastNotificationResponse.actionIdentifier ===
        Notifications.DEFAULT_ACTION_IDENTIFIER
    ) {
      const screen =
        lastNotificationResponse.notification.request.content.data?.screen
      const params =
        lastNotificationResponse.notification.request.content.data?.params

      log('Last Notification data : ', lastNotificationResponse)

      switch (screen) {
        case 'LeadDetailsScreen':
          navigation.navigate('ViewNotificationsDetails', {
            screen: 'LeadDetailsScreen',
            params: {
              regNo: params?.regNo,
              currentStatus: params?.currentStatus,
            },
          })
          // navigation.navigate('Drawer', {
          //   screen: 'Leads',
          //   params: {
          //     screen: screen,
          //     params: params,
          //   },
          // })
          break
        case 'MessagesScreen':
          navigation.navigate(screen)
          console.log('Navigate to Messages screen')
          break
        default:
          console.log('default notifications')
      }
    }

    // return () => {
    //   Notifications.removeNotificationSubscription(notificationListener);
    // };
  }, [lastNotificationResponse])
}
