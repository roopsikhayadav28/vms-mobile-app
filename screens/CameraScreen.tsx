import React, {useRef, useState} from 'react'
import {StyleSheet, ToastAndroid, TouchableOpacity, View} from 'react-native'
import Icon from '../components/basic/Icon'
import Camera from '../components/Camera'
// import { Video, AVPlaybackStatus, ResizeMode } from "expo-av";
import Colors from '../constants/Colors'
import Layout from '../constants/Layout'
import {RootStackScreenProps} from '../navigation/navigationTypes'
import {log} from '../utils/helpers'
import {useCapturedLocalUrlInput} from '../hooks/useUpdateLeadInput'
import {CropView} from 'react-native-image-crop-tools'

/**
 * NOTE:
 * Current Camera Flow:
 * 1. Open camera view
 * 2. After capture image open crop view.
 * 3. After accept image then upload will be called.
 */

type CameraFlow = 'showCameraView' | 'showImageCropView' | 'showImagePreview'

type AspectRatio = {
  height: number
  width: number
}

type CroppedImageResponse = {
  uri: string
  width: number
  height: number
}

export const CameraScreen: React.FC<RootStackScreenProps<'CameraScreen'>> = ({
  navigation: {goBack},
  route: {params},
}: RootStackScreenProps<'CameraScreen'>) => {
  const {onCapture} = params
  const {capturedLocalUrl, setCapturedLocalUrl} = useCapturedLocalUrlInput()
  const [currentFlow, setCurrentFlow] = useState<CameraFlow>('showCameraView')

  const cropViewRef = useRef<CropView>()
  // const video = React.useRef(null);

  /*  const aspectRatio: AspectRatio = {
    height: Layout.window.height,
    width: Layout.window.width,
  } */

  const onImageCapture = ({
    contentUrl,
    isGalleryImage,
  }: {
    contentUrl: string
    isGalleryImage?: boolean
  }) => {
    log('isGalleryImage', isGalleryImage)
    if (!isGalleryImage) {
      setCurrentFlow('showImageCropView')
      setCapturedLocalUrl(contentUrl)
    } else {
      setCapturedLocalUrl(contentUrl)
      onConfirm(contentUrl)
    }
  }

  const handleCroppedImage = () => {
    cropViewRef.current.saveImage(true, 90)
  }

  const onConfirm = (contentUrl: string) => {
    log(
      'should start the upload process here? and show a loading indicator',
      contentUrl,
    )
    try {
      if (
        !!contentUrl &&
        !!capturedLocalUrl?.url &&
        capturedLocalUrl.url !== undefined &&
        !!onCapture
      ) {
        onCapture({
          contentType: 'image',
          contentUrl: contentUrl || capturedLocalUrl.url,
        })

        goBack()

        log('function call with captured localURl', capturedLocalUrl)
        // setCurrentFlow('showCameraView')
      }
    } catch (err) {
      log('error in on confirm', err)
    }
  }

  const onCancel = () => {
    setCapturedLocalUrl(undefined)
    setCurrentFlow('showCameraView')
  }

  const handleGoBack = () => {
    goBack()
    setCurrentFlow('showCameraView')
  }

  const handleImageCrop = (res: CroppedImageResponse) => {
    if (res && res.uri) {
      const filePath = `file:///${res.uri}`
      setCapturedLocalUrl(filePath)
      onConfirm(filePath)
      // setCurrentFlow('showImagePreview')
    } else {
      ToastAndroid.show('Failed to crop image, please try again', 300)
    }
  }

  const ImageCropComponent = () => (
    <View style={styles.cameraContainerStyle}>
      <CropView
        sourceUrl={capturedLocalUrl.url}
        style={styles.cropImageStyle}
        keepAspectRatio={false}
        ref={cropViewRef}
        // aspectRatio={aspectRatio}
        onImageCrop={handleImageCrop}
      />
      <View style={styles.cropViewButtonContainer}>
        <TouchableOpacity onPress={onCancel}>
          <Icon
            iconName="cancel"
            size={Layout.baseSize * 2}
            color={Colors.light.red}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCroppedImage}>
          <Icon
            iconName="check-circle"
            size={Layout.baseSize * 2}
            color={Colors.light.background}
          />
        </TouchableOpacity>
      </View>
    </View>
  )

  /* const ImagePreview = () => (
    <ImageBackground
      resizeMode="contain"
      source={{uri: capturedLocalUrl?.url}}
      style={styles.imageStyle}>
      <View style={styles.cancelButtonStyle}>
        <TouchableOpacity onPress={onCancel}>
          <Icon
            iconName="cancel"
            size={Layout.baseSize * 2}
            color={Colors.light.red}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onConfirm}>
          <Icon
            iconName="check-circle"
            size={Layout.baseSize * 2}
            color={Colors.light.background}
          />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  ) */

  /**
   * Switch case pattern for deciding which component to render.
   * @returns Components based on the currentFlow
   */
  function renderCameraView() {
    switch (currentFlow) {
      case 'showCameraView':
        return (
          <Camera
            captureImageOnly
            onCapture={onImageCapture}
            onGoBack={handleGoBack}
            isSelfie={params?.isSelfie}
            isVideo={params?.isVideo}
          />
        )

      case 'showImageCropView':
        return <ImageCropComponent />

      // case 'showImagePreview':
      //   return <ImagePreview />
    }
  }

  return <View style={styles.cameraContainerStyle}>{renderCameraView()}</View>
}

const styles = StyleSheet.create({
  cameraContainerStyle: {
    flex: 1,
    backgroundColor: Colors.light.text,
    height: Layout.window.height,
    width: Layout.window.width,
  },
  videoContainer: {
    height: Layout.window.height,
    width: Layout.window.width,
  },
  videoPlayButton: {
    top: Layout.baseSize * 10,
  },
  imageStyle: {
    flex: 1,
  },
  cropImageStyle: {
    height: Layout.window.height,
    width: Layout.window.width,
  },
  cancelButtonStyle: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
    alignItems: 'flex-end',
    paddingBottom: Layout.baseSize * 3,
  },
  cropViewButtonContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    bottom: Layout.baseSize * 4,
    backgroundColor: Colors.light.text,
  },
})

// capturedLocalUrl.url !== undefined && params?.isVideo ? (
//   <View style={styles.videoContainer}>
//     <Video
//       ref={video}
//       // style={styles.video}
//       source={{
//         uri: capturedLocalUrl?.url,
//       }}
//       posterSource={{ uri: "https://picsum.photos/300" }}
//       // PosterComponent={<Image source={{uri:capturedLocalUrl?.url}} style={}/>}
//       useNativeControls
//       resizeMode={ResizeMode.CONTAIN}
//       isLooping
//       onPlaybackStatusUpdate={(status) => setStatus(() => status)}
//     />
//     <View style={styles.videoPlayButton}>
//       <Button
//         title={status && status?.isPlaying ? "Pause" : "Play"}
//         onPress={() =>
//           status?.isPlaying
//             ? video?.current?.pauseAsync()
//             : video?.current?.playAsync()
//         }
//       />
//     </View>
//     <View
//       style={{
//         alignSelf: "stretch",
//         flexDirection: "row",
//         justifyContent: "space-around",
//         flex: 1,
//         alignItems: "flex-end",
//         paddingBottom: Layout.baseSize * 3,
//       }}
//     >
//       <TouchableOpacity onPress={onCancel}>
//         <Icon
//           iconName="cancel"
//           size={Layout.baseSize * 3}
//           color={Colors.light.red}
//         />
//       </TouchableOpacity>
//       <TouchableOpacity onPress={onConfirm}>
//         <Icon
//           iconName="check-circle"
//           size={Layout.baseSize * 3}
//           color={Colors.light.background}
//         />
//       </TouchableOpacity>
//     </View>
//   </View>
// ) :

// function onConfirm() {
//   if (!!params?.onCapture && capturedLocalUrl) {
//     log(
//       "should start the upload process here? and show a loading indicator",
//       capturedLocalUrl
//     );
//     // Upload to a bucket and get remote url to write on the backend
//     params?.onCapture({ contentUrl: capturedLocalUrl, contentType: "image" });
//   }
//   goBack();
// }
