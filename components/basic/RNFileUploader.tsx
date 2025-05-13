import {useNetInfo} from '@react-native-community/netinfo'
import {useNavigation} from '@react-navigation/native'
import * as DocumentPicker from 'expo-document-picker'
import * as ExpoImagePicker from 'expo-image-picker'
import {ActivityAction, startActivityAsync} from 'expo-intent-launcher'
import * as React from 'react'
import {useEffect, useRef, useState} from 'react'
import {
  Alert,
  Linking,
  Platform,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native'
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet'
import ImagePicker from 'react-native-image-crop-picker'
import {ActivityIndicator, HelperText} from 'react-native-paper'
import Colors from '../../constants/Colors'
import Layout from '../../constants/Layout'
import {UserRole} from '../../generated/hooks_and_more'
import useLoggedInUser from '../../hooks/useLoggedInUser'
import {useCapturedLocalUrlInput} from '../../hooks/useUpdateLeadInput'

import {RootStackScreenProps} from '../../navigation/navigationTypes'
import {getFileName, log} from '../../utils/helpers'
// import {CType, uploadToFirebaseStorage} from '../../utils/uploadToFirebase'
import {FieldId, isFieldValueValid} from '../../utils/FieldValidator'
import uploadToS3 from '../../utils/uploadToS3'
import Button from './Button'
import Icon from './Icon'
import Separator from './Separator'
import {H3, P2} from './StyledText'
import {Column, Row} from './StyledView'

interface RNFileUploaderProps {
  variant: 'docs' | 'image' | 'docsIcon'
  documentId?: FieldId
  isDataValid?: boolean
  header?: string
  title?: string
  video?: boolean
  isImageSelfie?: boolean
  isDocUploaderIcon?: boolean
  saveCapture?: (url: string) => void

  saveDoc?: (value: string) => void
  onSaveDoc?: ({key, url}: {key: string; url: string}) => void
  isRequired?: boolean
  value?: string
}

const RNFileUploader = ({
  variant,
  documentId,
  isDataValid,
  header,
  title,
  video = false,
  isImageSelfie = false,
  isDocUploaderIcon = false,
  isRequired,
  saveDoc,
  onSaveDoc,
  saveCapture,
  value,
}: RNFileUploaderProps) => {
  const placeholderText = `Upload Document ${isRequired ? '*' : ''}`
  const {capturedLocalUrl, setCapturedLocalUrl} = useCapturedLocalUrlInput()
  const {isConnected, isInternetReachable} = useNetInfo()
  const [placeholder, setPlaceholder] = useState<string>(
    getFileName(value).onlyFileName ?? placeholderText,
  )
  const [isMount, setIsMount] = useState<boolean>(false)
  const [showDelete, setShowDelete] = useState<boolean>(!!value ? true : false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [pickerPermission, requestPickerPermission] =
    ExpoImagePicker.useMediaLibraryPermissions()
  const pickerPermissionGranted = pickerPermission?.granted
  const canAskPickerPermissionAgain = pickerPermission?.canAskAgain

  const {loggedInUser} = useLoggedInUser()

  const actionSheetRef = useRef<ActionSheetRef>(null)
  useEffect(() => {
    setPlaceholder(getFileName(value).onlyFileName ?? placeholderText)
    setShowDelete(!!value ? true : false)
    if (isMount) {
      isFieldValueValid({
        id: documentId,
        value,
        setError: setErrorMessage,
        isDataValid,
      })
    }
    !isMount && setIsMount(true)
  }, [
    placeholder,
    value,
    documentId,
    isDataValid,
    isMount,
    setIsMount,
    setErrorMessage,
    isRequired,
    placeholderText,
  ])

  function clearDoc() {
    saveDoc(null)
    setPlaceholder(placeholderText)
    setShowDelete(false)
  }

  function showOptionsToUpload() {
    actionSheetRef?.current?.show()
  }

  const pickImage = async () => {
    async function pickImageAfterPermissions() {
      try {
        const pickedImg = video
          ? await ImagePicker.openPicker({
              cropperCancelText: 'You cancelled to pick Video',
              mediaType: 'video',
              compressVideoPreset: 'MediumQuality',
            })
          : await ImagePicker.openPicker({
              cropping: true,
              showCropFrame: true,
              showCropGuidelines: true,
              cropperCancelText: 'You cancelled to pick Image',
              mediaType: 'photo',
              compressImageQuality: 0.3,
            })
        log('picked Image', pickedImg.path)
        actionSheetRef?.current?.hide()
        setIsLoading(true)
        // log('the placeholder', {placeholder, pickedImg})
        /* const remoteImageUrl = await uploadToFirebaseStorage(
          pickedImg.path,
          pickedImg?.mime as CType,
        ) */
        if (video && pickedImg?.mime !== 'video/mp4') {
          log('mime type not supported', pickedImg?.mime)
          ToastAndroid.showWithGravity(
            'Please select a valid video',
            ToastAndroid.BOTTOM,
            400,
          )
          setIsLoading(false)
          return
        }

        if (
          pickedImg?.mime !== 'image/jpeg' &&
          pickedImg?.mime !== 'image/png' &&
          !video
        ) {
          log('mime type not supported', pickedImg?.mime)
          ToastAndroid.showWithGravity(
            'Please select a valid image',
            ToastAndroid.BOTTOM,
            400,
          )
          return
        }
        const remoteImageUrl = await uploadToS3({
          url: pickedImg.path,
          mimeType: pickedImg?.mime as 'image/jpeg' | 'image/png',
        })
        // log('remoteImageUrl of picked image', remoteImageUrl)

        if (!!saveDoc && !!remoteImageUrl) {
          saveDoc(remoteImageUrl)
          setPlaceholder(pickedImg.path)
          setShowDelete(true)
          log('one', pickedImg.path)
        }
        if (!!saveCapture && !!remoteImageUrl) {
          saveCapture(remoteImageUrl)
          log('two', {})
        }
        if (onSaveDoc && !!title) {
          onSaveDoc({key: title, url: remoteImageUrl})
          setPlaceholder(pickedImg.path)

          log('three', {}) //TODO : A better name for title and onSaveDoc would be collapsibleDocTitle or Doc key  and saveDocOnCollapsible
        }

        // setPlaceholder(pickedImg.filename)

        setCapturedLocalUrl(undefined)
        setIsLoading(false)
      } catch (err) {
        log('Error while picking Image', err)
        isFieldValueValid({
          id: documentId,
          value,
          setError: setErrorMessage,
          isDataValid,
        })
        ToastAndroid.showWithGravity(
          'Something went wrong while picking Image, please try again!',
          ToastAndroid.BOTTOM,
          400,
        )
        setCapturedLocalUrl(undefined)
        setIsLoading(false)
      }
    }
    if (pickerPermissionGranted) {
      try {
        await pickImageAfterPermissions()
        // log('result at pick ', result)
      } catch (error) {
        log('error while picking image:', error)
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

  const renderActionSheetContent = () => (
    <View style={styles.actionSheetContainer}>
      <H3>Select Option To Upload</H3>

      <View style={styles.actionSheetContent}>
        {(loggedInUser?.role === UserRole?.ProcurementExecutive ||
          variant === 'docs') && (
          <View style={styles.actionSheetOption}>
            <Icon
              iconName="image"
              onPress={!isLoading ? pickImage : () => {}}
            />
            <P2>Gallery</P2>
          </View>
        )}
        {variant === 'docs' && (
          <View style={styles.actionSheetOption}>
            <Icon
              iconName="drive-folder-upload"
              onPress={!isLoading ? pickDocument : () => {}}
            />
            <P2>Storage</P2>
          </View>
        )}
        <View style={styles.actionSheetOption}>
          <Icon
            iconName="camera-alt"
            onPress={!isLoading ? onImageClick : () => {}}
          />
          <P2>Camera</P2>
        </View>
      </View>
    </View>
  )

  const pickDocument = async () => {
    try {
      setIsLoading(true)
      const doc = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf/*',
        multiple: false,
      })

      if (doc.type === 'cancel') {
        setIsLoading(false)
        actionSheetRef.current.hide()
      }
      if (doc.type === 'success') {
        const {name, mimeType, uri} = doc
        log('picked mimeType', mimeType)

        //TODO: Define mimeTypes
        /* const remoteDocUrl = await uploadToFirebaseStorage(
          uri,
          mimeType as CType,
        ) */
        if (mimeType !== 'application/pdf') {
          log('mime type not supported', mimeType)
          ToastAndroid.showWithGravity(
            'Please select a valid document',
            ToastAndroid.BOTTOM,
            400,
          )
          return
        }
        const remoteDocUrl = await uploadToS3({
          url: uri,
          mimeType: mimeType,
        })
        actionSheetRef?.current?.hide()

        saveDoc && saveDoc(remoteDocUrl)
        onSaveDoc &&
          remoteDocUrl &&
          title &&
          onSaveDoc({key: title, url: remoteDocUrl})
        setIsLoading(false)

        setShowDelete(true)
        remoteDocUrl && setPlaceholder(name + ' uploaded')
      }
    } catch (err) {
      actionSheetRef?.current?.hide()
      setIsLoading(false)
      setShowDelete(false)
      log('Error while picking Document', err)
      isFieldValueValid({
        id: documentId,
        value,
        setError: setErrorMessage,
        isDataValid,
      })
      ToastAndroid.showWithGravity(
        'Something went wrong while picking Document, please try again!',
        ToastAndroid.BOTTOM,
        400,
      )
    }
  }

  const uploadCapturedImage = async (contentUrl: string, mimeType: string) => {
    // log('checking here at UploadCaptureImage', contentUrl)
    // log(`Image url at UploadCaptureImage:  ${localUrl}`, {})
    actionSheetRef?.current?.hide()
    setIsLoading(true)

    if (
      mimeType !== 'image/jpeg' &&
      mimeType !== 'image/png' &&
      mimeType !== 'video/mp4'
    ) {
      log('mime type not supported here', mimeType)
      ToastAndroid.showWithGravity(
        'Please select a valid image',
        ToastAndroid.BOTTOM,
        400,
      )
      return
    }

    // await uploadToFirebaseStorage(contentUrl, mimeType as CType)
    await uploadToS3({url: contentUrl, mimeType})
      .then(remoteUrl => {
        // log('Remote url', remoteUrl)
        if (!!saveDoc && !!remoteUrl) {
          saveDoc(remoteUrl)
          setShowDelete(true)
          remoteUrl && setPlaceholder(contentUrl)
        }

        if (!!saveCapture && !!remoteUrl) {
          saveCapture(remoteUrl)
        }

        if (onSaveDoc && !!title) {
          onSaveDoc({key: title, url: remoteUrl})
        }
      })
      .catch(err => {
        log('Error while uploading image', err)

        isFieldValueValid({
          id: documentId,
          value,
          setError: setErrorMessage,
          isDataValid,
        })
        ToastAndroid.showWithGravity(
          'Unable to upload image, Please try again later',
          ToastAndroid.BOTTOM,
          300,
        )
      })
      .finally(() => {
        setIsLoading(false)
        setCapturedLocalUrl(undefined)
      })
  }

  function onImageClick() {
    video
      ? ImagePicker.openCamera({
          mediaType: 'video',
        })
          .then(vid => {
            // log('clicked vid', vid)
            uploadCapturedImage(vid?.path, vid?.mime)
          })
          .catch(err => {
            log('video cancel', err)
          })
      : ImagePicker.openCamera({
          cropping: true,
          showCropFrame: true,
          showCropGuidelines: true,
          useFrontCamera: isImageSelfie,
          compressImageQuality: 0.3,
        })
          .then(img => {
            // log('clicked Image', img)
            uploadCapturedImage(img?.path, img?.mime)
          })
          .catch(err => {
            log('upload cancel', err)
          })

    // if (isLoading === false) {
    //   navigation.navigate('CameraScreen', {
    //     onCapture,
    //     isSelfie: isImageSelfie,
    //     isVideo: video,
    //   })
    // }
  }

  function onPressFileUploader() {
    if (isConnected && isInternetReachable) {
      // onImageClick()
      showOptionsToUpload()
    } else {
      ToastAndroid.showWithGravity(
        'Please check your internet connection',
        (ToastAndroid.SHORT = 10),
        ToastAndroid.CENTER,
      )
    }
  }

  if (variant === 'docs') {
    if (isDocUploaderIcon) {
      return isLoading ? (
        <ActivityIndicator style={styles.containerDoc} />
      ) : (
        <View style={styles.containerDoc}>
          <Icon iconName="file-upload" onPress={showOptionsToUpload} />
          <ActionSheet ref={actionSheetRef}>
            {renderActionSheetContent()}
          </ActionSheet>
        </View>
      )
    }
    return (
      <View style={styles.containerDoc}>
        <>
          {!!header && (
            <>
              <H3>{header}</H3>
              <Separator size={1} />
            </>
          )}
          <View style={styles.uploadButtonView}>
            <Column>
              {isLoading ? (
                <ActivityIndicator style={styles.containerDoc} />
              ) : (
                <P2 numberOfLines={2} style={styles.placeholder}>
                  {placeholder}
                </P2>
              )}
            </Column>
            <Row>
              {showDelete && (
                <Icon
                  iconName="cancel"
                  size={Layout.baseSize}
                  onPress={clearDoc}
                  color={'red'}
                  style={{alignSelf: 'center', margin: Layout.baseSize * 0.5}}
                />
              )}
              <Button
                variant="upload"
                iconName="file-upload"
                title="Upload"
                disabled={isLoading}
                loading={isLoading}
                onPress={showOptionsToUpload}
              />
            </Row>

            <ActionSheet ref={actionSheetRef}>
              {renderActionSheetContent()}
            </ActionSheet>
          </View>
        </>
        {!!errorMessage && (
          <HelperText type="error" visible={!!errorMessage}>
            {errorMessage}
          </HelperText>
        )}
      </View>
    )
  }
  if (variant === 'image') {
    return isLoading ? (
      <ActivityIndicator style={styles.containerImg} />
    ) : (
      <>
        <TouchableOpacity
          style={{
            ...styles.containerImg,
            opacity: !!capturedLocalUrl.url ?? true ? 0.3 : 1,
          }}
          disabled={!!capturedLocalUrl.url ?? true}
          onPress={onPressFileUploader}>
          <Icon iconName={'file-upload'} color={'gray'} />
          <P2>{title}</P2>
        </TouchableOpacity>
        <ActionSheet ref={actionSheetRef}>
          {renderActionSheetContent()}
        </ActionSheet>
      </>
    )
  }
}

export default RNFileUploader

const styles = StyleSheet.create({
  containerImg: {
    borderWidth: StyleSheet.hairlineWidth * 2,
    backgroundColor: Colors.light.inputBg,
    width: Layout.baseSize * 5,
    height: Layout.baseSize * 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
  },
  containerDoc: {
    marginHorizontal: Layout.baseSize * 0.5,
    justifyContent: 'center',
  },
  imageContainer: {
    // borderRadius: Layout.baseSize ,
  },
  uploadButtonView: {
    flexDirection: 'row',
    backgroundColor: Colors.light.inputBg,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: Layout.baseSize * 0.3,
    // borderWidth: StyleSheet.hairlineWidth * 2,
    paddingVertical: Layout.baseSize * 0.5,
    paddingHorizontal: Layout.baseSize * 0.8,
    // maxWidth: Layout.window.width,
    // marginTop: Layout.baseSize,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.primary,
    paddingHorizontal: Layout.baseSize,
    paddingVertical: Layout.baseSize * 0.5,
    borderRadius: Layout.baseSize / 5,
  },
  placeholder: {
    maxWidth: Layout.window.width / 2,
    maxHeight: Layout.baseSize * 2,
    paddingRight: Layout.baseSize / 1.5,
  },
  imageStyle: {
    height: Layout.baseSize,
    width: Layout.baseSize,
    marginLeft: Layout.baseSize / 2,
  },
  titleText: {
    marginTop: Layout.baseSize,
  },
  subTitleText: {
    marginTop: Layout.baseSize / 2,
    marginLeft: Layout.baseSize / 3,
  },

  actionSheetContainer: {padding: Layout.baseSize, alignItems: 'center'},
  actionSheetContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'stretch',
    margin: Layout.baseSize,
  },
  actionSheetOption: {
    flexDirection: 'column',
    alignItems: 'center',
  },
})
