import {StyleSheet, TouchableOpacity, Text} from 'react-native'

import {MMKV_STORAGE} from '../utils/graphqlClient'
import {log} from '../utils/helpers'
import useUserToken from '../hooks/useUserToken'
import useLoggedInUser from '../hooks/useLoggedInUser'
import Colors from '../constants/Colors'

export default function Logout() {
  const {userToken, setUserToken} = useUserToken()
  const {setLoggedInUser} = useLoggedInUser()
  return (
    <TouchableOpacity
      onPress={() => {
        log(' usertoken', userToken)
        const keys = MMKV_STORAGE.getAllKeys()
        log('keys', keys)
        setUserToken('')
        setLoggedInUser({})
        log('logged out!!', userToken)
      }}>
      <Text style={styles.logoutTextStyles}>Logout</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  logoutTextStyles: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.light.secondary,
  },
})
