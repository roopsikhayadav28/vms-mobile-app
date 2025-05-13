import {useNavigation} from '@react-navigation/native'
import {useCallback, useEffect, useMemo, useState} from 'react'
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native'
import Button from '../components/basic/Button'
import Image from '../components/basic/Image'
import ImageView from '../components/basic/ImageView'
import PickerSelectButton from '../components/basic/PickerSelectButton'
import Separator from '../components/basic/Separator'
import {P2} from '../components/basic/StyledText'
import {Column, Row} from '../components/basic/StyledView'
import VideoPlayer from '../components/basic/Video'
import Colors from '../constants/Colors'
import {DEFAULT_TRACTOR_IMAGE} from '../constants/constants'
import Layout from '../constants/Layout'
import {ImageStage, VehicleImages} from '../generated/hooks_and_more'
import {LeadStackScreenProps} from '../navigation/navigationTypes'
import {camelCaseToReadable, log} from '../utils/helpers'

type ViewImagesFilterScreenProps =
  LeadStackScreenProps<'ViewImagesFilterScreen'>
// type ViewImagesFilterScreenProps = LeadDetailsScreenNavProps
export default function ViewImagesFilterScreen({
  route: {params},
}: ViewImagesFilterScreenProps) {
  const navigation =
    useNavigation<
      LeadStackScreenProps<'ViewImagesFilterScreen'>['navigation']
    >()

  const [imageStageAtFilter, setImageStageAtFilter] = useState<ImageStage>()

  useEffect(() => {
    setImageStageAtFilter(params?.imageStage)
  }, [params?.imageStage])

  const [newSelectedImage, setNewSelectedImage] = useState<string>()

  const selectedKey = params?.imgKey?.[0] || ''
  const [newSelectedKey, setNewSelectedKey] = useState<string>(selectedKey)
  log('selected key', selectedKey)
  //Procurement Image
  const procurementStageImages: VehicleImages =
    params?.imagesArray?.find(
      i => i?.imagesTakenAtStage === ImageStage.LeadGenerated,
    ) || {}
  const procurementImage =
    procurementStageImages &&
    (Object?.entries(procurementStageImages)?.find(
      i => i?.[0] === newSelectedKey,
    )?.[1] as string)

  //pickup Image
  const pickupStageImages: VehicleImages =
    params?.imagesArray?.find(
      i => i?.imagesTakenAtStage === ImageStage.BeforeDelivery,
    ) || {}
  const pickupImage =
    pickupStageImages &&
    (Object?.entries(pickupStageImages)?.find(
      i => i?.[0] === newSelectedKey,
    )?.[1] as string)

  //Drop Image
  const dropStageImages: VehicleImages =
    params?.imagesArray?.find(
      i => i?.imagesTakenAtStage === ImageStage.AfterDelivery,
    ) || {}
  const dropImage =
    dropStageImages &&
    (Object?.entries(dropStageImages)?.find(
      i => i?.[0] === newSelectedKey,
    )?.[1] as string)

  // const [selectedImages, setSelectedImages] = useState<VehicleImages>(procurementStageImages)
  const selectedImages =
    params?.imagesArray?.find(
      i => i?.imagesTakenAtStage === imageStageAtFilter,
    ) || {}
  log('selected images object for a stage', selectedImages)

  // const [imageType, setImageType] = useState(selectedImageType)
  const selectedImage =
    (selectedImages &&
      (Object?.entries(selectedImages)?.find(
        i => i?.[0] === newSelectedKey,
      )?.[1] as string)) ||
    ''
  log('select images at stage', selectedImage)

  //Picker functionality
  const selectedImageType =
    Object?.keys(selectedImages)?.find(i => i === newSelectedKey) || ''
  log('selected Image Type', selectedImageType)

  function onSelectingImageType(value: string, index: number) {
    log('selected new Key', value)
    setNewSelectedKey(value)
    log('changed selected Key', newSelectedKey)
  }

  const arrayForPickerSelect =
    selectedImages &&
    Object.entries(selectedImages)
      .filter(
        i =>
          i?.[0] !== '__typename' &&
          i?.[0] !== 'id' &&
          i?.[0] !== 'imagesTakenAtStage',
      )
      .map(i => {
        return {label: camelCaseToReadable(i?.[0]), value: i?.[0] ?? ''}
      })

  const changeImageStage = useCallback(
    (stage: ImageStage) => {
      setImageStageAtFilter(stage)
      setNewSelectedImage(selectedImage)
      // log('changed stage and Image', {imageStageAtFilter, selectedImage})
    },
    [selectedImage],
  )

  useEffect(() => {
    setNewSelectedImage(selectedKey)
    setNewSelectedImage(selectedImage)
    log('selected params in the useEffect', params)
  }, [params?.imgKey, selectedImage])

  //TODO: Query all Images w.r.t to regNo and Image Stage

  // const [newImageType, setNewImageType] = useState(selectedImageType)

  const handleGalleryImage = () => {
    if (!!newSelectedImage) {
      navigation.navigate('ViewImageScreen', {
        imageUrl: newSelectedImage,
      })
    }
  }

  return (
    <View style={styles.screenBackground}>
      <ScrollView>
        <Separator size={1} />
        <View style={styles.picker}>
          <PickerSelectButton
            placeholder={'Select Image Type'}
            onValueChange={onSelectingImageType}
            value={camelCaseToReadable(newSelectedKey)}
            items={arrayForPickerSelect as Item[]}
            // variant="image_type"
            // placeholder="demo"
          />
        </View>
        <P2 style={styles.screenTitle}>
          {imageStageAtFilter === ImageStage.LeadGenerated
            ? 'Procurement'
            : imageStageAtFilter === ImageStage.BeforeDelivery
            ? 'Pickup'
            : imageStageAtFilter === ImageStage.AfterDelivery
            ? 'Drop'
            : ''}
        </P2>
        <Separator size={1} />
        {selectedImageType === 'inspectionVideoUrl' ? (
          <View
            style={{
              height: Layout.window.height / 2,
              width: Layout.window.width,
              zIndex: 1,
            }}>
            <VideoPlayer url={newSelectedImage || DEFAULT_TRACTOR_IMAGE} />
          </View>
        ) : (
          <Image
            sourceUri={newSelectedImage || DEFAULT_TRACTOR_IMAGE}
            variant="zoom-view"
            onPress={handleGalleryImage}
          />
        )}

        <Separator size={1} />

        <Row>
          <Column>
            <View
              style={
                imageStageAtFilter === ImageStage.LeadGenerated && {
                  ...styles.activeType,
                }
              }>
              <Image
                sourceUri={procurementImage || DEFAULT_TRACTOR_IMAGE}
                variant="small_preview"
                onPress={() => changeImageStage(ImageStage.LeadGenerated)}
              />
            </View>

            <P2 style={styles.screenTitle}>Procurement</P2>
          </Column>
          <Column>
            <View
              style={
                imageStageAtFilter === ImageStage.BeforeDelivery && {
                  ...styles.activeType,
                }
              }>
              <Image
                sourceUri={pickupImage || DEFAULT_TRACTOR_IMAGE}
                variant="small_preview"
                onPress={() => changeImageStage(ImageStage.BeforeDelivery)}
              />
            </View>
            <P2 style={styles.screenTitle}>Pickup</P2>
          </Column>
          <Column>
            <View
              style={
                imageStageAtFilter === ImageStage.AfterDelivery && {
                  ...styles.activeType,
                }
              }>
              <Image
                sourceUri={dropImage || DEFAULT_TRACTOR_IMAGE}
                variant="small_preview"
                onPress={() => changeImageStage(ImageStage.AfterDelivery)}
              />
            </View>
            <P2 style={styles.screenTitle}>Drop</P2>
          </Column>
        </Row>

        <Separator />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  screenBackground: {
    backgroundColor: Colors.light.background,
    flex: 1,
  },
  screenTitle: {
    color: Colors.light.text,
    textAlign: 'center',
    fontWeight: '600',
  },
  picker: {
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    marginHorizontal: Layout.baseSize,
  },
  bigPreview: {
    paddingHorizontal: Layout.baseSize / 2,
  },
  smallPreview: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'stretch',

    //paddingHorizontal:Layout.baseSize*2
  },
  activeType: {
    borderWidth: 1,
    borderColor: Colors.light.red,
    borderRadius: Layout.baseSize / 5,
  },
  bottomButton: {
    alignSelf: 'flex-end',
  },
  smallPreviewTitle: {
    justifyContent: 'center',
  },
})
