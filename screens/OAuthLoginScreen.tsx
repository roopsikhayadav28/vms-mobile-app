import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'
import * as React from 'react'
import {Button, Platform} from 'react-native'
import {log} from '../utils/helpers'

WebBrowser.maybeCompleteAuthSession()

export default function OAuthLoginScreen() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    //TODO: Setup if required for Expo Go
    // expoClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    iosClientId:
      '957271575147-clthd67pacb3vfvdmmel6plevl7laiui.apps.googleusercontent.com',
    androidClientId:
      '957271575147-hl1r845nf7evv6g153hkm90109io0mn4.apps.googleusercontent.com',
    // TODO: Finalize redirect URIs and create credentials
    webClientId:
      '957271575147-oasle1dgc0v20n7j512fl15qupsfdnt3.apps.googleusercontent.com',
    clientId:
      Platform.OS === 'android'
        ? '957271575147-hl1r845nf7evv6g153hkm90109io0mn4.apps.googleusercontent.com'
        : '957271575147-c229ps5u0kub8srpp837g06iocr5sldf.apps.googleusercontent.com',
  })

  React.useEffect(() => {
    if (response?.type === 'success') {
      const {authentication} = response
      log('Authentication successful', authentication)
    }
  }, [response])

  const handleLogin = () => {
    promptAsync()
  }

  return <Button disabled={!request} title="Login" onPress={handleLogin} />
}
