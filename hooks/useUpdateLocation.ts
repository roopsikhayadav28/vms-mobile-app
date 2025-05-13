import {useNavigation} from '@react-navigation/native'
import {ActivityAction, startActivityAsync} from 'expo-intent-launcher'
import {getCurrentPositionAsync, useForegroundPermissions} from 'expo-location'
import {useEffect} from 'react'
import {Alert, Linking, Platform} from 'react-native'
import {
  UserRef,
  useUpdateUserLocationMutation,
  useUpdateYardLocationMutation,
} from '../generated/hooks_and_more'
import {log} from '../utils/helpers'

export default function useUpdateLocation(
  loggedInUser: UserRef,
  // setLoggedInUser: (value: UserRef | ((prevValue: UserRef) => UserRef)) => void,
) {
  const navigation = useNavigation<any>()
  const [statusResponse, requestPermission] = useForegroundPermissions()
  const [updateYardLocation] = useUpdateYardLocationMutation()
  const [updateUserLocation] = useUpdateUserLocationMutation({
    /*  onCompleted: ({updateUser}) => {
      // log('response after updating user location', updateUser)
      // setLoggedInUser(updateUser.user[0])
    }, */
  })
  useEffect(() => {
    if (statusResponse != null) {
      if (statusResponse?.granted) {
        getCurrentPositionAsync().then(({coords}) => {
          // log('coords before user changed location', coords)
          const newUserLocation = {
            latitude: coords.latitude,
            longitude: coords.longitude,
          }

          updateUserLocation({
            variables: {
              userId: loggedInUser?.id,
              location: newUserLocation,
            },
          })
          if (!!coords?.latitude && !!coords?.longitude) {
            updateYardLocation({
              variables: {
                location: {
                  latitude: coords.latitude,
                  longitude: coords.longitude,
                },
              },
            })
          }
        })
      } else if (!statusResponse?.granted && statusResponse?.canAskAgain) {
        requestPermission()
      } else {
        // Handle this case by taking the user to respective settings screen
        Alert.alert(
          'Please allow access to Location',
          "Let's go to the app settings and do that",
          [
            {
              text: 'Ok',
              onPress: Platform.select({
                android: () => {
                  navigation.goBack()
                  try {
                    startActivityAsync(
                      ActivityAction.APPLICATION_DETAILS_SETTINGS,
                      {
                        data: 'package:com.tractorjunction.vms',
                      },
                    )
                  } catch (error) {
                    log('error taking user to intent on android', error)
                  }
                },
                ios: () => {
                  Linking.openSettings()
                },
              }),
            },
          ],
        )
      }
    }
  }, [statusResponse])
}
