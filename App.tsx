import { ApolloProvider } from '@apollo/client'
import NetInfo from '@react-native-community/netinfo'
import { StatusBar } from 'expo-status-bar'
import * as Updates from 'expo-updates'
import { useEffect } from 'react'
import { Alert, LogBox, Platform, ToastAndroid } from 'react-native'
import { Provider } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import useCachedResources from './hooks/useCachedResources'
import useColorScheme from './hooks/useColorScheme'
import useLoggedInUser from './hooks/useLoggedInUser'
import useUserToken from './hooks/useUserToken'
import Navigation from './navigation'
import { APP_VERSION } from './navigation/version'
import { initializeSentry, setExtraContext, setUserContext } from './sentry_telemetry/SentryLogger'
import getEnvVars from './utils/environment'
import { client, purgeCache } from './utils/graphqlClient'
import { log } from './utils/helpers'

const sentryDSN ='https://e7e22127b467458fae6a67059df1c73d@o4504473698369536.ingest.sentry.io/4504473701187584'


LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  "The action 'POP_TO_TOP' was not handled by any navigator",
])

export default function App() {
  const {userToken} = useUserToken()
  const {loggedInUser} = useLoggedInUser()
  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()

  useEffect(() => {
    // Initialize Sentry
    initializeSentry(sentryDSN);
    // Set user context
    setUserContext(userToken,loggedInUser);
    // Set extra context
    setExtraContext({environment: getEnvVars().keyPrefix,version :APP_VERSION});

    console.info("sentry DSN",sentryDSN);
    

    ;(async () => {
      // const isConnected = await NetworkUtils.isNetworkAvailable()
      // if (isConnected) {
      //   AlertsHelper.error('No internet connection...!', {
      //     duration: 4000,
      //     position: 'bottom',
      //   })
      // }
      try {
        // handle user online status
        const update = await Updates.checkForUpdateAsync()
        if (update.isAvailable) {
          await Updates.fetchUpdateAsync()
          // ... notify user of update ...
          Alert.alert(
            'A new update is available',
            'Would you like to update it?',
            [
              {
                text: 'Ok',
                onPress: async () => {
                  await Updates.reloadAsync()
                  try {
                    purgeCache()
                  } catch (error) {
                    log(
                      'Something went wrong while purging the cache after OTA',
                      {},
                    )
                    
                  }
                },
              },
            ],
          )
        }
      } catch (e) {
        // handle or log error
      }
    })()
  }, [])

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener(state => {
      // console.log('Connection type', state.type)
      // console.log('Is connected?', state.isConnected)
      if (!state.isConnected && Platform.OS === 'android')
        ToastAndroid.showWithGravity(
          'No Internet',
          (ToastAndroid.SHORT = 10),
          ToastAndroid.CENTER,
        )
    })

    return () => removeNetInfoSubscription()
  }, [])
  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <SafeAreaProvider>
        <ApolloProvider client={client}>
          <Provider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </Provider>
        </ApolloProvider>
      </SafeAreaProvider>
    )
  }
}
