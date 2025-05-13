import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import React, {useState} from 'react'
import PickerSelectButton from '../components/basic/PickerSelectButton'
import {enumToItems, log, titleCaseToReadable} from '../utils/helpers'
import {
  useAllImagesQuery,
  UserRole,
  VehicleImages,
} from '../generated/hooks_and_more'
import Separator from '../components/basic/Separator'
import {H3} from '../components/basic/StyledText'
import Image from '../components/basic/Image'
import {Row} from '../components/basic/StyledView'
import {LeadStackScreenProps} from '../navigation/navigationTypes'
import Layout from '../constants/Layout'
import {DEFAULT_TRACTOR_IMAGE} from '../constants/constants'
import _ from 'lodash'
import Button from '../components/basic/Button'
import useUserToken from '../hooks/useUserToken'
import useLoggedInUser from '../hooks/useLoggedInUser'
import {commonStyle} from '../constants/style'

type ViewImagesAtStageScreenProps = LeadStackScreenProps<
  'ViewImagesAtStageScreen' | 'UploadImagesAtStageScreen'
>

// Doing this to correct the order in which the list is rendered
enum ImageStage {
  LeadGenerated = 'LEAD_GENERATED',
  BeforeDelivery = 'BEFORE_DELIVERY',
  AfterDelivery = 'AFTER_DELIVERY',
  Listing = 'LISTING',
  DeliveryImage = 'DELIVERY_IMAGE',
  DeliverySelfie = 'DELIVERY_SELFIE',
}

const ViewImagesAtStagesScreen = ({
  navigation,
  route,
}: ViewImagesAtStageScreenProps) => {
  const [stage, setStage] = useState<ImageStage>(ImageStage.LeadGenerated)
  const {userToken} = useUserToken()
  const {loggedInUser} = useLoggedInUser(userToken)

  const {
    data: imagesData,
    loading,
    refetch,
  } = useAllImagesQuery({
    skip: !route?.params?.regNo,
    variables: {
      regNo: route.params.regNo as string,
      hasDeliveryPhoto: stage === ImageStage.DeliveryImage,
    },
    fetchPolicy: 'cache-and-network',
    // onCompleted: ({getVehicle}) => {
    //   log('fetched Images', imagesData)
    // },
  })

  const navigateToFilterImageScreen =
    // useCallback(
    (imgUri?: string) => {
      log('navigating to Image Filter Screen', stage)

      const keyValue = Object.entries(imagesAtStage).find(
        i => i?.[1] === imgUri,
      )

      log(
        `selected image key value ${route.params.regNo}, ${stage}, ${keyValue}, ${imagesData?.getVehicle?.images}`,
      )
      if (
        !_.isEmpty(route.params.regNo) &&
        !_.isEmpty(stage) &&
        !_.isEmpty(keyValue) &&
        !_.isEmpty(imagesData?.getVehicle?.images)
      ) {
        navigation.navigate('ViewImagesFilterScreen', {
          regNo: route.params.regNo,
          imageStage: stage,
          imgKey: keyValue,
          imagesArray: imagesData?.getVehicle?.images as VehicleImages[],
        })
      } else {
        log('No Images captured Yet!', {})
      }
    }
  //   ,
  //   [stage, route?.params?.regNo, ],
  // )
  function changeImageStage(value: string, index: number) {
    log('stage changed click', value)
    setStage(value as ImageStage)
    log('stage changed', {})
  }
  function onPullToRefresh() {
    log('should refetch Imagesin view List', {imagesData})
    refetch()
  }
  // const imagesTakenAtStage =
  //   imagesData?.queryVehicleImages?.[0]?.imagesTakenAtStage

  const imagesAtLeadGenerated =
    imagesData?.getVehicle?.images?.find(
      stage => ImageStage.LeadGenerated === stage.imagesTakenAtStage,
    ) ?? {}
  // log('iamges at lead generation', imagesAtLeadGenerated)
  const imagesAtBeforeDelivery =
    imagesData?.getVehicle?.images?.find(
      stage => ImageStage.BeforeDelivery === stage.imagesTakenAtStage,
    ) ?? {}
  // log('at pickup', imagesAtBeforeDelivery)
  const imagesAtDelivery =
    imagesData?.getVehicle?.images?.find(
      stage => ImageStage.AfterDelivery === stage.imagesTakenAtStage,
    ) ?? {}

  const imagesAtListing =
    imagesData?.getVehicle?.images?.find(
      stage => ImageStage.Listing === stage.imagesTakenAtStage,
    ) ?? {}
  // log('at Delivery', imagesAtDelivery)

  const bookingDeliveryImage =
    imagesData?.getLead?.activeBooking?.deliveryPhotoUrl ?? ''

  const driverDeliveryImage = imagesData?.getLead?.deliveredSelfieUrl ?? ''

  const imagesAtStage = getImages()

  function getImages(): {uri?: string} {
    switch (stage) {
      case ImageStage.LeadGenerated:
        return imagesAtLeadGenerated
      case ImageStage.BeforeDelivery:
        return imagesAtBeforeDelivery
      case ImageStage.AfterDelivery:
        return imagesAtDelivery
      case ImageStage.Listing:
        return imagesAtListing
      case ImageStage.DeliveryImage:
        return {uri: bookingDeliveryImage}
      case ImageStage.DeliverySelfie:
        return {uri: driverDeliveryImage}
      default:
        return imagesAtLeadGenerated
    }
  }

  const inspectionVideo = imagesAtStage?.inspectionVideoUrl //TODO: Work on it
  const frontBody = imagesAtStage?.frontBodySide
  const leftBody = imagesAtStage?.leftBodySide
  const backBody = imagesAtStage?.backBodySide
  const rightBody = imagesAtStage?.rightBodySide

  const backLeftTyre = imagesAtStage?.backLeftTyre
  const backRightTyre = imagesAtStage?.backRightTyre
  const frontLeftTyre = imagesAtStage?.frontLeftTyre
  const frontRightTyre = imagesAtStage?.frontRightTyre

  const fuelInjectionPumpPlate = imagesAtStage?.fuelInjectionPumpPlate
  const odometer = imagesAtStage?.odometer
  const chassis = imagesAtStage?.chassisNumber
  const engine = imagesAtStage?.engineNumber

  const imageUri = imagesAtStage?.uri

  // console.log('rigggg', {rightBody})

  function renderImageBasedOnStage() {
    return (
      <View
        style={{
          marginVertical: Layout.baseSize * 3,
          alignItems: 'center',
        }}>
        <Image
          sourceUri={imageUri || DEFAULT_TRACTOR_IMAGE}
          variant="zoom-view"
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <PickerSelectButton
        items={enumToItems(ImageStage)}
        onValueChange={changeImageStage}
        placeholder={titleCaseToReadable(stage)}
      />

      <ScrollView
        style={commonStyle.marginHalf}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onPullToRefresh} />
        }>
        {stage === ImageStage.DeliveryImage ||
        stage === ImageStage.DeliverySelfie ? (
          renderImageBasedOnStage()
        ) : (
          <>
            <Separator size={1} />

            <H3>Body Images</H3>
            <Separator size={1} />
            <Row>
              <TouchableOpacity
                onPress={() => navigateToFilterImageScreen(frontBody)}
                style={styles.imageContainer}
                activeOpacity={0.5}>
                <Image
                  sourceUri={frontBody ? frontBody : DEFAULT_TRACTOR_IMAGE}
                  variant="parent"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigateToFilterImageScreen(leftBody)}
                style={styles.imageContainer}
                activeOpacity={0.5}>
                <Image
                  sourceUri={leftBody ? leftBody : DEFAULT_TRACTOR_IMAGE}
                  variant="parent"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigateToFilterImageScreen(backBody)}
                style={styles.imageContainer}
                activeOpacity={0.5}>
                <Image
                  sourceUri={backBody ? backBody : DEFAULT_TRACTOR_IMAGE}
                  variant="parent"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigateToFilterImageScreen(rightBody)}
                style={styles.imageContainer}
                activeOpacity={0.5}>
                <Image
                  sourceUri={rightBody ? rightBody : DEFAULT_TRACTOR_IMAGE}
                  variant="parent"
                />
              </TouchableOpacity>
            </Row>
            <Separator size={1} />
            <H3>Tyre Images</H3>
            <Separator size={1} />
            <Row>
              <TouchableOpacity
                onPress={() => navigateToFilterImageScreen(backLeftTyre)}
                style={styles.imageContainer}
                activeOpacity={0.5}>
                <Image
                  sourceUri={
                    backLeftTyre ? backLeftTyre : DEFAULT_TRACTOR_IMAGE
                  }
                  variant="parent"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigateToFilterImageScreen(backRightTyre)}
                style={styles.imageContainer}
                activeOpacity={0.5}>
                <Image
                  sourceUri={
                    backRightTyre ? backRightTyre : DEFAULT_TRACTOR_IMAGE
                  }
                  variant="parent"
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigateToFilterImageScreen(frontLeftTyre)}
                style={styles.imageContainer}
                activeOpacity={0.5}>
                <Image
                  sourceUri={
                    frontLeftTyre ? frontLeftTyre : DEFAULT_TRACTOR_IMAGE
                  }
                  variant="parent"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigateToFilterImageScreen(frontRightTyre)}
                style={styles.imageContainer}
                activeOpacity={0.5}>
                <Image
                  sourceUri={
                    frontRightTyre ? frontRightTyre : DEFAULT_TRACTOR_IMAGE
                  }
                  variant="parent"
                />
              </TouchableOpacity>
            </Row>
            <Separator size={1} />
            <H3>Others</H3>
            <Separator size={1} />
            <Row>
              <TouchableOpacity
                onPress={() =>
                  navigateToFilterImageScreen(fuelInjectionPumpPlate)
                }
                style={styles.imageContainer}
                activeOpacity={0.5}>
                <Image
                  sourceUri={
                    fuelInjectionPumpPlate
                      ? fuelInjectionPumpPlate
                      : DEFAULT_TRACTOR_IMAGE
                  }
                  variant="parent"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigateToFilterImageScreen(odometer)}
                style={styles.imageContainer}
                activeOpacity={0.5}>
                <Image
                  sourceUri={odometer ? odometer : DEFAULT_TRACTOR_IMAGE}
                  variant="parent"
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigateToFilterImageScreen(chassis)}
                style={styles.imageContainer}
                activeOpacity={0.5}>
                <Image
                  sourceUri={chassis ? chassis : DEFAULT_TRACTOR_IMAGE}
                  variant="parent"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigateToFilterImageScreen(engine)}
                style={styles.imageContainer}
                activeOpacity={0.5}>
                <Image
                  sourceUri={engine ? engine : DEFAULT_TRACTOR_IMAGE}
                  variant="parent"
                />
              </TouchableOpacity>
            </Row>
            <Separator size={1} />
            <H3>Inspection Video</H3>
            <Separator size={1} />
            <Image
              sourceUri={
                inspectionVideo ? inspectionVideo : DEFAULT_TRACTOR_IMAGE
              }
              variant="small_preview"
              onPress={() => navigateToFilterImageScreen(inspectionVideo)}
            />

            <Separator size={1} />
            {loggedInUser?.role === UserRole.ProcurementExecutive &&
            stage === ImageStage.LeadGenerated ? (
              <Button
                variant="primary"
                title="Upload Images"
                onPress={() => {
                  const vehicleImages = imagesData?.getVehicle?.images?.find(
                    stage =>
                      ImageStage.LeadGenerated === stage?.imagesTakenAtStage,
                  ) as VehicleImages

                  navigation.navigate('UploadImagesAtStageScreen', {
                    regNo: route?.params?.regNo,
                    vehicleImages,
                  })
                }}
              />
            ) : null}
            <Separator size={1} />
          </>
        )}
      </ScrollView>
    </View>
  )
}

export default ViewImagesAtStagesScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    paddingRight: Layout.baseSize * 0.3,
  },
})
