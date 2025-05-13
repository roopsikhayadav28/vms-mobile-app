import {MaterialIcons} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'
import {
  AutoFocus,
  Camera as ExpoCamera,
  CameraPictureOptions,
  CameraProps as ExpoCameraProps,
  CameraType,
} from 'expo-camera'
import * as ImageManipulator from 'expo-image-manipulator'
import {FlipType} from 'expo-image-manipulator'
import * as ImagePicker from 'expo-image-picker'
import {ActivityAction, startActivityAsync} from 'expo-intent-launcher'
import React, {useMemo, useRef, useState} from 'react'
import {
  Alert,
  Linking,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import {Button, Text} from 'react-native-paper'
import Colors from '../constants/Colors'
import Layout from '../constants/Layout'
import {UserRole} from '../generated/hooks_and_more'
import useLoggedInUser from '../hooks/useLoggedInUser'
import useUserToken from '../hooks/useUserToken'
import {log} from '../utils/helpers'
import CameraButton from './CameraButton'

const {baseSize} = Layout

type ExtraProps = {
  onCapture: ({
    contentUrl,
    isGalleryImage,
  }: {
    contentUrl: string
    isGalleryImage?: boolean
  }) => any
  captureImageOnly?: boolean
  onGoBack?: () => void
  isSelfie?: boolean
  isVideo?: boolean
}

type CameraProps = ExpoCameraProps & ExtraProps & CameraPictureOptions

const {front, back} = CameraType

export default function Camera(props: CameraProps) {
  const navigation = useNavigation()
  // console.log('Camera component rendered')

  const {userToken} = useUserToken()
  const {loggedInUser} = useLoggedInUser()

  const cameraRef = useRef<ExpoCamera>(null)

  const [cameraPermission, requestCameraPermission] =
    ImagePicker.useCameraPermissions()

  const cameraPermissionGranted = cameraPermission?.granted
  const canAskCameraPermissionAgain = cameraPermission?.canAskAgain

  // const [recordingPermission, requestRecordingPermission] =
  //   ExpoCamera.useMicrophonePermissions();
  // const recordingPermissionGranted = recordingPermission?.granted;
  // const canAskRecordingPermissionAgain = recordingPermission?.canAskAgain;

  const [pickerPermission, requestPickerPermission] =
    ImagePicker.useMediaLibraryPermissions()
  const pickerPermissionGranted = pickerPermission?.granted
  const canAskPickerPermissionAgain = pickerPermission?.canAskAgain

  const [type, setType] = useState<CameraType>(props.isSelfie ? front : back)

  //   const [recording, setRecording] = useState<boolean>(false)
  const [ratio, setRatio] = useState<'16:9' | '4:3' | '3:2' | '1:1'>('16:9')

  // const [recording, setRecording] = useState<boolean>(false);

  const captureImage = async () => {
    const originalResult = await cameraRef.current!.takePictureAsync({
      quality: 0.1,
    })
    if (type === front) {
      const flippedImage = await ImageManipulator.manipulateAsync(
        originalResult.uri,
        [
          {
            flip: FlipType.Horizontal,
          },
        ],
      )
      props.onCapture &&
        props.onCapture({
          contentUrl: flippedImage.uri,
        })
    } else {
      props.onCapture &&
        props.onCapture({
          contentUrl: originalResult.uri,
        })
    }
  }

  const pickImage = async () => {
    async function pickImageAfterPermissions() {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: props.captureImageOnly
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.All,
        videoMaxDuration: 60,
        // allowsEditing: true,
        videoExportPreset: ImagePicker.VideoExportPreset.LowQuality,
        quality: 0.1,
        selectionLimit: 1,
      })
      if (result.canceled === true) {
        return
      } else {
        props.onCapture &&
          props.onCapture({
            contentUrl: result?.assets?.[0]?.uri as string,
            isGalleryImage: true,
          })
      }
    }
    if (pickerPermissionGranted) {
      try {
        await pickImageAfterPermissions()
        // log('result at pick ', result)
      } catch (error) {
        console.log('error while picking image:', error)
      }
    } else if (canAskPickerPermissionAgain) {
      const {granted} = await requestPickerPermission()
      if (granted) pickImageAfterPermissions()
    } else {
      Alert.alert(
        'Please allow access to Photos Library to pick',
        "Let's go to the app settings and do that",
        [
          {
            text: 'Ok',
            onPress: Platform.select({
              ios: () => {
                Linking.openSettings()
              },
              android: () => {
                startActivityAsync(
                  ActivityAction.APPLICATION_DETAILS_SETTINGS,
                  {
                    data: 'package:com.tractorjunction.vms',
                  },
                )
              },
            }),
          },
        ],
      )
    }
  }
  const {
    window: {height, width},
  } = Layout

  // const captureVideo = async () => {
  //   console.log("capture video called");
  //   if (canAskRecordingPermissionAgain) await requestRecordingPermission();
  //   setRecording(true);

  //   const result = await cameraRef.current!.recordAsync({
  //     maxDuration: 60,
  //     mirror: type === front && Platform.OS !== "android",
  //     quality: VideoQuality["480p"],
  //   });
  //   props.onCapture({ contentUrl: result.uri });
  //   log("video file after capture video:", result.uri);
  // };
  // const stopRecording = async () => {
  //   console.log("stop recording called");
  //   await cameraRef.current!.stopRecording();
  //   setRecording(false);
  // };

  async function onPressAllowAccessToCamera() {
    if (canAskCameraPermissionAgain) await requestCameraPermission()
    // if (canAskRecordingPermissionAgain) await requestRecordingPermission();
    else
      Alert.alert(
        'Please allow access to Camera for taking pictures',
        "Let's go to the app settings and do that",
        [
          {
            text: 'Ok',
            onPress: Platform.select({
              android: () => {
                try {
                  startActivityAsync(
                    ActivityAction.APPLICATION_DETAILS_SETTINGS,
                    {
                      data: 'package:com.tractorjunction.vms',
                    },
                  )
                  navigation.goBack()
                } catch (error) {
                  log('error taking user to intent on android', error)
                }
              },
              ios: () => {
                Linking.openSettings()
                navigation.goBack()
              },
            }),
          },
        ],
      )
  }
  const getCameraScreenDimensions = () => {
    switch (ratio) {
      case '16:9':
        return {
          height,
          width: Math.floor((height * 9) / 16),
        }
      case '4:3':
        return {
          height,
          width: Math.floor((height * 3) / 4),
        }
      case '3:2':
        return {
          height,
          width: Math.floor((height * 2) / 3),
        }
      case '1:1':
        return {
          height: width,
          width,
        }
      default:
        return {
          height,
          width,
        }
    }
  }

  const styles = useMemo(() => getCameraStyle(getCameraScreenDimensions), [])

  return (
    <View style={styles.container}>
      {/* && recordingPermissionGranted */}
      {cameraPermissionGranted ? (
        <>
          <ExpoCamera
            style={styles.cameraDimension}
            type={type}
            ref={cameraRef}
            autoFocus={AutoFocus.on}
            onCameraReady={() => {
              if (Platform.OS === 'android') {
                cameraRef.current!.getSupportedRatiosAsync().then(ratios => {
                  // log('supported ratios: ', ratios)
                  if (ratios.includes('16:9')) setRatio('16:9')
                  else if (ratios.includes('4:3')) setRatio('4:3')
                  else if (ratios.includes('3:2')) setRatio('3:2')
                  else if (ratios.includes('1:1')) setRatio('1:1')
                })
              }
            }}
            ratio={ratio}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={props.onGoBack}>
              <MaterialIcons
                name="arrow-back"
                color={Colors.light.background}
                size={30}
              />
            </TouchableOpacity>

            {/* {recording ? (
              <P2 style={styles.onRecording}>Recording..</P2>
            ) : (
              <></>
            )} */}

            <View style={styles.bottomBar}>
              {loggedInUser?.role === UserRole.ProcurementExecutive && (
                <TouchableOpacity
                  onPress={pickImage}
                  hitSlop={Layout.hitSlop.icon}
                  style={{
                    position: 'absolute',
                    bottom: Layout.baseSize,
                    left: Layout.baseSize,
                  }}>
                  <MaterialIcons
                    name={'photo-album'}
                    color={'white'}
                    size={baseSize * 2}
                  />
                </TouchableOpacity>
              )}

              {/* Enable this for Video */}
              {/* {
                <CameraButton
                  onPress={props?.isVideo ? () => {} : captureImage}
                  innerPartColor={
                    props?.isVideo ? Colors.light.red : Colors.light.inputBg
                  }
                  onLongPress={props?.isVideo ? captureVideo : () => {}}
                  isRecording={recording}
                  onStopRecording={recording ? stopRecording : () => {}}
                />
                } */}
              {
                <CameraButton
                  onPress={captureImage}
                  innerPartColor={Colors.light.inputBg}
                />
              }
              {/* <TouchableOpacity
                onPress={() =>
                  type === front ? setType(back) : setType(front)
                }
                hitSlop={Layout.hitSlop.icon}
              >
                <MaterialIcons
                  name={"refresh"}
                  color={"white"}
                  size={baseSize * 1.6}
                />
              </TouchableOpacity> */}
            </View>
          </ExpoCamera>
        </>
      ) : (
        <View style={styles.errorContainer}>
          <Text style={styles.permissionTextStyles}>
            Permission to access Camera is needed to capture your pictures, and
            it's not given yet
          </Text>
          <Button onPress={onPressAllowAccessToCamera}>
            {'Allow access to camera'}
          </Button>
        </View>
      )}
    </View>
  )
}

const getCameraStyle = (getCameraScreenDimensions: any) =>
  StyleSheet.create({
    errorContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.light.background,
    },
    container: {flex: 1},
    onRecording: {
      position: 'absolute',
      top: baseSize * 1.5,
      color: Colors.light.red,
      justifyContent: 'flex-end',
      marginHorizontal: baseSize,
    },
    bottomBar: {
      height: 180,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: baseSize,
      paddingVertical: 5,
      marginBottom: baseSize * 1.45,
      width: Layout.window.width,
      // backgroundColor: '#5c6575b2',
    },
    backButton: {
      position: 'absolute',
      top: baseSize * 1.5,
      justifyContent: 'flex-start',
      marginHorizontal: baseSize,
    },
    cameraDimension: {
      height:
        Platform.OS === 'android'
          ? getCameraScreenDimensions().height
          : Layout.window.height,
      width:
        Platform.OS === 'android'
          ? getCameraScreenDimensions().width
          : Layout.window.width,
      justifyContent: 'flex-end',
    },
    permissionTextStyles: {textAlign: 'center', margin: baseSize},
  })
