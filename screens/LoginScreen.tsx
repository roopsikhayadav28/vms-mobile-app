import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'
import * as React from 'react'
import {useEffect} from 'react'
import {Linking, StyleSheet, ToastAndroid, View} from 'react-native'
import {ActivityIndicator} from 'react-native-paper'
import Button from '../components/basic/Button'
import Separator from '../components/basic/Separator'
import {H2, LinkText, P1} from '../components/basic/StyledText'
import Layout from '../constants/Layout'
import {useCheckUserAuthLazyQuery, UserRef} from '../generated/hooks_and_more'
import useLoggedInUser from '../hooks/useLoggedInUser'
import useUserToken from '../hooks/useUserToken'
import {fetchUserInfo} from '../utils/googleAuthHelper'
import {log} from '../utils/helpers'

WebBrowser.maybeCompleteAuthSession()

const contactEmail = 'tech@tractorjunction.com'

export default function LoginScreen() {
  const {setUserToken} = useUserToken()
  const {setLoggedInUser} = useLoggedInUser()
  const [request, response, promptAsync] = Google.useAuthRequest({
    //TODO: Setup if required for Expo Go
    expoClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    iosClientId:
      '957271575147-clthd67pacb3vfvdmmel6plevl7laiui.apps.googleusercontent.com',
    androidClientId:
      '957271575147-hl1r845nf7evv6g153hkm90109io0mn4.apps.googleusercontent.com',
    // TODO: Finalize redirect URIs and create credentials
    webClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
  })
  const [authError, setAuthError] = React.useState<'unauthorized' | undefined>()

  function login(me: UserRef) {
    setUserToken(me.id)
    setLoggedInUser(me)
  }

  const [checkUserAuth, {data, loading: checkingUserAuth}] =
    useCheckUserAuthLazyQuery({
      fetchPolicy: 'network-only',
      onCompleted: ({getUser}) => {
        log('getUser from checkUserAuth', getUser)
        if (!getUser?.id) {
          setAuthError('unauthorized')
          ToastAndroid.showWithGravity(
            'Logging Failed!',
            (ToastAndroid.SHORT = 10),
            ToastAndroid.CENTER,
          )
        } else {
          login(getUser)
          ToastAndroid.showWithGravity(
            'Logged In Successfully',
            (ToastAndroid.SHORT = 10),
            ToastAndroid.CENTER,
          )
        }
      },
    })

  useEffect(() => {
    if (response?.type === 'success') {
      log('response for authentication', response)
      const {authentication} = response
      if (authentication?.accessToken) {
        fetchUserInfo(authentication?.accessToken as string).then(userInfo => {
          // log('user info from fetch', userInfo?.email)
          checkUserAuth({
            variables: {
              email: userInfo?.email,
            },
          })
        })
        // check if the email has an entry in our db ? 'set the userId/email as token, and log the user in'
      }
    }
  }, [response])

  function onPressEmail() {
    Linking.openURL(`mailto:${contactEmail}`)
  }

  if (authError === 'unauthorized') {
    return (
      <View style={styles.screen}>
        <P1>{"You're not authorized"}</P1>
        <P1>{'Please contact'}</P1>
        <Separator />
        <LinkText onPress={onPressEmail}>{contactEmail}</LinkText>
      </View>
    )
  }

  const handleLogin = () => {
    promptAsync()
  }

  return (
    <View style={styles.screen}>
      <H2>Welcome to Tractor Junction</H2>
      <Separator />
      <P1>{'Manage your leads with ease'}</P1>
      <Separator size={2} />
      {checkingUserAuth ? (
        <ActivityIndicator />
      ) : (
        <Button
          disabled={!request}
          variant="primary"
          title="Login with Email"
          onPress={handleLogin}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    height: Layout.window.height,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
