import {ScrollView, StyleSheet, Text, ToastAndroid, View} from 'react-native'
import React, {useCallback, useEffect, useState} from 'react'
import RNFileUploader from '../components/basic/RNFileUploader'
import Image from '../components/basic/Image'
import {Row} from '../components/basic/StyledView'
import Separator from '../components/basic/Separator'
import {H3} from '../components/basic/StyledText'
import {log} from '../utils/helpers'
import {commonStyle} from '../constants/style'
import {
  ImageStage,
  useAddVehicleImagesMutation,
  VehicleImagesDetailsFragmentDoc,
} from '../generated/hooks_and_more'
import {useNavigation} from '@react-navigation/native'
import useUpdateLeadInput from '../hooks/useUpdateLeadInput'
import {
  LeadStackScreenProps,
  RootStackScreenProps,
} from '../navigation/navigationTypes'
import Layout from '../constants/Layout'
import Button from '../components/basic/Button'
import {ActivityIndicator} from 'react-native-paper'
import Colors from '../constants/Colors'

type UploadImageScreenNavProps =
  LeadStackScreenProps<'UploadImagesAtStageScreen'>

const UploadImagesAtStageScreen = ({
  route,
}: UploadImageScreenNavProps): JSX.Element => {
  const regNo = route?.params?.regNo

  const {leadInput, setLeadInput} = useUpdateLeadInput(regNo)
  const navigation =
    useNavigation<
      RootStackScreenProps<'ViewImageScreen' | 'ViewVideoScreen'>['navigation']
    >()
  // const {vehicleImages, regNo} = route?.params
  const vehicleImageID = `${regNo}_${ImageStage.LeadGenerated}`
  /*   const [vehicleImageID, setVehicleImageId] = useState<VehicleImages['id']>(
    route?.params?.vehicleImages?.id,
  ) */
  // Store the vehicle images id in state
  // Update the vehicle images id after first mutation in case it wasn't present in route params the first time
  const [addImages, {loading, data: imagesData}] = useAddVehicleImagesMutation({
    variables: {
      input: {
        vehicleImagesId: vehicleImageID,
        vehicle: {regNo},
        imagesTakenAtStage: ImageStage.LeadGenerated,
        backBodySide: leadInput?.vehicle?.images?.[0]?.backBodySide,
        backRightTyre: leadInput?.vehicle?.images?.[0]?.backRightTyre,
        backLeftTyre: leadInput?.vehicle?.images?.[0]?.backLeftTyre,
        frontLeftTyre: leadInput?.vehicle?.images?.[0]?.frontLeftTyre,
        frontRightTyre: leadInput?.vehicle?.images?.[0]?.frontRightTyre,
        chassisNumber: leadInput?.vehicle?.images?.[0]?.chassisNumber,
        engineNumber: leadInput?.vehicle?.images?.[0]?.engineNumber,
        frontBodySide: leadInput?.vehicle?.images?.[0]?.frontBodySide,
        leftBodySide: leadInput?.vehicle?.images?.[0]?.leftBodySide,
        rightBodySide: leadInput?.vehicle?.images?.[0]?.rightBodySide,
        inspectionVideoUrl: leadInput?.vehicle?.images?.[0].inspectionVideoUrl,
        fuelInjectionPumpPlate:
          leadInput?.vehicle?.images?.[0]?.fuelInjectionPumpPlate,
        odometer: leadInput?.vehicle?.images?.[0]?.odometer,
      },
    },
    update: (cache, {data}) => {
      // update images field of the vehicle
      const newVehicleImagesRef = cache.writeFragment({
        id: `VehicleImages:${data?.addVehicleImages?.vehicleImages?.[0]?.id}`,
        data: data?.addVehicleImages?.vehicleImages?.[0],
        fragment: VehicleImagesDetailsFragmentDoc,
        fragmentName: 'VehicleImagesDetails',
      })
      cache.modify({
        id: `Vehicle:${data?.addVehicleImages?.vehicleImages?.[0]?.vehicle?.id}`,
        fields: {
          images(existingRefs = [], {readField}) {
            return [
              newVehicleImagesRef,
              ...existingRefs?.filter(
                ref =>
                  readField('id', ref) !==
                  data?.addVehicleImages?.vehicleImages?.[0]?.id,
              ),
            ]
          },
        },
      })
    },
    onCompleted: data => {
      log('images data', data?.addVehicleImages?.vehicleImages)
      ToastAndroid.showWithGravity('Images Uploaded successfully!', 10, 10)
      setLeadInput({})
      if (navigation.canGoBack()) navigation.goBack()
    },
  })
  /* const [updateImages, {loading, data: imagesData}] =
    useUpdateVehicleImagesMutation({
      variables: {
        imageStage: {eq: ImageStage.LeadGenerated},
        vehicleImageID,
        UpdateVehicleImagesPatch: {
          backBodySide: leadInput?.vehicle?.images?.[0]?.backBodySide,
          backRightTyre: leadInput?.vehicle?.images?.[0]?.backRightTyre,
          backLeftTyre: leadInput?.vehicle?.images?.[0]?.backLeftTyre,
          frontLeftTyre: leadInput?.vehicle?.images?.[0]?.frontLeftTyre,
          frontRightTyre: leadInput?.vehicle?.images?.[0]?.frontRightTyre,
          chassisNumber: leadInput?.vehicle?.images?.[0]?.chassisNumber,
          engineNumber: leadInput?.vehicle?.images?.[0]?.engineNumber,
          frontBodySide: leadInput?.vehicle?.images?.[0]?.frontBodySide,
          leftBodySide: leadInput?.vehicle?.images?.[0]?.leftBodySide,
          rightBodySide: leadInput?.vehicle?.images?.[0]?.rightBodySide,
          fuelInjectionPumpPlate:
            leadInput?.vehicle?.images?.[0]?.fuelInjectionPumpPlate,
          odometer: leadInput?.vehicle?.images?.[0]?.odometer,
        },
      },
      onCompleted(data) {
        log('images data', data.updateVehicleImages.vehicleImages)
        ToastAndroid.showWithGravity('Images Uploaded successfully!', 10, 10)
      },
    }) */
  useEffect(() => {
    if (
      !!route?.params?.vehicleImages &&
      Object.entries(route?.params?.vehicleImages)?.length > 0
    ) {
      setLeadInput({
        vehicle: {
          images: [
            {
              ...route?.params?.vehicleImages,
            },
          ],
        },
      })
    } else {
    }

    log('images Data', {imageId: vehicleImageID, regNo, imagesData})

    return () => {
      setLeadInput({})
    }
  }, [])

  // useEffect(() => {

  // }, [])

  // const [updateImages, {}] = useUploadImagesAndCreateEventMutation({
  //   //FIXME: change mutation and remove creating status
  // })
  //navigate to View Image Screen, can add Replace image if need comes up
  const navigateToViewImageScreen = useCallback((uri: string) => {
    //log(' logging imag url here while navigating to View image Screen', uri)
    navigation.navigate('ViewImageScreen', {
      imageUrl: uri,
    })
  }, [])

  const navigateToViewVideoScreen = useCallback((uri: string) => {
    log('logging video url here while navigating to ViewVideo Screen', uri)
    navigation.navigate('ViewVideoScreen', {
      url: uri,
      title: 'Inspection Video at Lead Generated',
    })
  }, [])
  function onUploadImages() {
    addImages()
    log('images we are sending', leadInput)
  }

  //will be used to read Images
  const inspectionVideo = leadInput?.vehicle?.images?.[0]?.inspectionVideoUrl
  const frontBody = leadInput?.vehicle?.images?.[0]?.frontBodySide
  const leftBody = leadInput?.vehicle?.images?.[0]?.leftBodySide
  const backBody = leadInput?.vehicle?.images?.[0]?.backBodySide
  const rightBody = leadInput?.vehicle?.images?.[0]?.rightBodySide

  const backLeftTyre = leadInput?.vehicle?.images?.[0]?.backLeftTyre
  const backRightTyre = leadInput?.vehicle?.images?.[0]?.backRightTyre
  const frontLeftTyre = leadInput?.vehicle?.images?.[0]?.frontLeftTyre
  const frontRightTyre = leadInput?.vehicle?.images?.[0]?.frontRightTyre

  const fuelInjectionPumpPlate =
    leadInput?.vehicle?.images?.[0]?.fuelInjectionPumpPlate
  const odometer = leadInput?.vehicle?.images?.[0]?.odometer
  const chassis = leadInput?.vehicle?.images?.[0]?.chassisNumber
  const engine = leadInput?.vehicle?.images?.[0]?.engineNumber

  const soFarImagesAtLeadGenerationStage =
    leadInput &&
    leadInput?.vehicle &&
    leadInput?.vehicle?.images &&
    leadInput?.vehicle?.images.length > 0 &&
    leadInput?.vehicle?.images?.[0]
  // Ketan is watching
  function onAddingInspectionVideo(value?: string) {
    log('value', value)
    setLeadInput({
      ...leadInput,
      vehicle: {
        ...leadInput?.vehicle,
        images: [
          {
            ...soFarImagesAtLeadGenerationStage,
            vehicle: {regNo},

            inspectionVideoUrl: value,
            imagesTakenAtStage: ImageStage.LeadGenerated,
          },
        ],
      },
    })
  }

  function onAddingFrontBodyImage(value?: string) {
    // log('saveCapture function logging', value)
    setLeadInput({
      ...leadInput,
      vehicle: {
        ...leadInput?.vehicle,
        images: [
          {
            ...soFarImagesAtLeadGenerationStage,
            vehicle: {regNo},

            frontBodySide: value,
            imagesTakenAtStage: ImageStage.LeadGenerated,
          },
        ],
      },
    })
  }
  function onAddingBackBodyImage(value?: string) {
    //log('saveCapture function logging', value)
    setLeadInput({
      ...leadInput,
      vehicle: {
        ...leadInput?.vehicle,
        images: [
          {
            ...soFarImagesAtLeadGenerationStage,
            vehicle: {regNo},

            backBodySide: value,
            imagesTakenAtStage: ImageStage.LeadGenerated,
          },
        ],
      },
    })
  }
  function onAddingLeftBodyImage(value?: string) {
    //log('saveCapture function logging', value)
    setLeadInput({
      ...leadInput,
      vehicle: {
        ...leadInput?.vehicle,
        images: [
          {
            ...soFarImagesAtLeadGenerationStage,
            vehicle: {regNo},

            leftBodySide: value,
            imagesTakenAtStage: ImageStage.LeadGenerated,
          },
        ],
      },
    })
  }
  function onAddingRightBodyImage(value?: string) {
    //log('saveCapture function logging', value)
    setLeadInput({
      ...leadInput,
      vehicle: {
        ...leadInput?.vehicle,
        images: [
          {
            ...soFarImagesAtLeadGenerationStage,
            vehicle: {regNo},

            rightBodySide: value,
            imagesTakenAtStage: ImageStage.LeadGenerated,
          },
        ],
      },
    })
  }

  function onAddingBackLeftTyre(value?: string) {
    // log('saveCapture function logging', value)
    setLeadInput({
      ...leadInput,
      vehicle: {
        ...leadInput?.vehicle,
        images: [
          {
            ...soFarImagesAtLeadGenerationStage,
            vehicle: {regNo},

            backLeftTyre: value,
            imagesTakenAtStage: ImageStage.LeadGenerated,
          },
        ],
      },
    })
  }
  function onAddingBackRightTyre(value?: string) {
    //log('saveCapture function logging', value)
    setLeadInput({
      ...leadInput,
      vehicle: {
        ...leadInput?.vehicle,
        images: [
          {
            ...soFarImagesAtLeadGenerationStage,
            vehicle: {regNo},

            backRightTyre: value,
            imagesTakenAtStage: ImageStage.LeadGenerated,
          },
        ],
      },
    })
  }
  function onAddingFrontLeftTyre(value?: string) {
    //log('saveCapture function logging', value)
    setLeadInput({
      ...leadInput,
      vehicle: {
        ...leadInput?.vehicle,
        images: [
          {
            ...soFarImagesAtLeadGenerationStage,
            vehicle: {regNo},

            frontLeftTyre: value,
            imagesTakenAtStage: ImageStage.LeadGenerated,
          },
        ],
      },
    })
  }

  function onAddingFrontRightTyre(value?: string) {
    //log('saveCapture function logging', value)
    setLeadInput({
      ...leadInput,
      vehicle: {
        ...leadInput?.vehicle,
        images: [
          {
            ...soFarImagesAtLeadGenerationStage,
            vehicle: {regNo},

            frontRightTyre: value,
            imagesTakenAtStage: ImageStage.LeadGenerated,
          },
        ],
      },
    })
  }

  function onAddingFuelInjectionPumpPlate(value?: string) {
    //log('saveCapture function logging', value)
    setLeadInput({
      ...leadInput,
      vehicle: {
        ...leadInput?.vehicle,
        images: [
          {
            ...soFarImagesAtLeadGenerationStage,
            vehicle: {regNo},

            fuelInjectionPumpPlate: value,
            imagesTakenAtStage: ImageStage.LeadGenerated,
          },
        ],
      },
    })
  }

  function onAddingOdometerImage(value?: string) {
    //log('saveCapture function logging', value)
    setLeadInput({
      ...leadInput,
      vehicle: {
        ...leadInput?.vehicle,
        images: [
          {
            ...soFarImagesAtLeadGenerationStage,
            vehicle: {regNo},

            odometer: value,
            imagesTakenAtStage: ImageStage.LeadGenerated,
          },
        ],
      },
    })
  }

  function onAddingChassisImage(value?: string) {
    //log('saveCapture function logging', value)
    setLeadInput({
      ...leadInput,
      vehicle: {
        ...leadInput?.vehicle,
        images: [
          {
            ...soFarImagesAtLeadGenerationStage,
            vehicle: {regNo},

            chassisNumber: value,
            imagesTakenAtStage: ImageStage.LeadGenerated,
          },
        ],
      },
    })
  }
  function onAddingEngineImage(value?: string) {
    //log('saveCapture function logging', value)
    setLeadInput({
      ...leadInput,
      vehicle: {
        ...leadInput?.vehicle,
        images: [
          {
            ...soFarImagesAtLeadGenerationStage,
            vehicle: {regNo},

            engineNumber: value,
            imagesTakenAtStage: ImageStage.LeadGenerated,
          },
        ],
      },
    })
  }

  return (
    <View style={commonStyle.mainAppContainer}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Separator size={1} />
          <H3>Inspection </H3>
          <Separator size={1} />
          {inspectionVideo ? (
            <Image
              sourceUri={inspectionVideo}
              variant="small_preview"
              onPress={() => navigateToViewVideoScreen(inspectionVideo)}
              onPressClose={() => {
                log('Cancel is clicked', {inspectionVideo})
                onAddingInspectionVideo('')
              }}
            /> //TODO: add isVideo flag later
          ) : (
            <RNFileUploader
              variant="image"
              video
              title="Inspection Clip"
              saveCapture={onAddingInspectionVideo}
            />
          )}
          <Separator size={1} />
          <H3>Body Images</H3>
          <Separator size={1} />
          <Row>
            {frontBody ? (
              <Image
                sourceUri={frontBody}
                variant="small_preview"
                onPress={() => navigateToViewImageScreen(frontBody)}
                onPressClose={() => {
                  onAddingFrontBodyImage('')
                }}
              />
            ) : (
              <RNFileUploader
                variant="image"
                title="Front"
                saveCapture={onAddingFrontBodyImage}
              />
            )}
            {leftBody ? (
              <Image
                sourceUri={leftBody}
                variant="small_preview"
                onPress={() => navigateToViewImageScreen(leftBody)}
                onPressClose={() => {
                  onAddingLeftBodyImage('')
                }}
              />
            ) : (
              <RNFileUploader
                variant="image"
                title="Left"
                saveCapture={onAddingLeftBodyImage}
              />
            )}
            {backBody ? (
              <Image
                sourceUri={backBody}
                variant="small_preview"
                onPress={() => navigateToViewImageScreen(backBody)}
                onPressClose={() => {
                  onAddingBackBodyImage('')
                }}
              />
            ) : (
              <RNFileUploader
                variant="image"
                title="Back"
                saveCapture={onAddingBackBodyImage}
              />
            )}
            {rightBody ? (
              <Image
                sourceUri={rightBody}
                variant="small_preview"
                onPress={() => navigateToViewImageScreen(rightBody)}
                onPressClose={() => {
                  onAddingRightBodyImage('')
                }}
              />
            ) : (
              <RNFileUploader
                variant="image"
                title="Right"
                saveCapture={onAddingRightBodyImage}
              />
            )}
          </Row>
          <Separator size={1} />
          <H3>Tyre Images</H3>
          <Separator size={1} />
          <Row>
            {backLeftTyre ? (
              <Image
                sourceUri={backLeftTyre}
                variant="small_preview"
                onPress={() => navigateToViewImageScreen(backLeftTyre)}
                onPressClose={() => {
                  onAddingBackLeftTyre('')
                }}
              />
            ) : (
              <RNFileUploader
                variant="image"
                title="Back left"
                saveCapture={onAddingBackLeftTyre}
              />
            )}
            {backRightTyre ? (
              <Image
                sourceUri={backRightTyre}
                variant="small_preview"
                onPress={() => navigateToViewImageScreen(backRightTyre)}
                onPressClose={() => {
                  onAddingBackRightTyre('')
                }}
              />
            ) : (
              <RNFileUploader
                variant="image"
                title="Back right"
                saveCapture={onAddingBackRightTyre}
              />
            )}
            {frontLeftTyre ? (
              <Image
                sourceUri={frontLeftTyre}
                variant="small_preview"
                onPress={() => navigateToViewImageScreen(frontLeftTyre)}
                onPressClose={() => {
                  onAddingFrontLeftTyre('')
                }}
              />
            ) : (
              <RNFileUploader
                variant="image"
                title="Front left"
                saveCapture={onAddingFrontLeftTyre}
              />
            )}

            {frontRightTyre ? (
              <Image
                sourceUri={frontRightTyre}
                variant="small_preview"
                onPress={() => navigateToViewImageScreen(frontRightTyre)}
                onPressClose={() => {
                  onAddingFrontRightTyre('')
                }}
              />
            ) : (
              <RNFileUploader
                variant="image"
                title="Front right"
                saveCapture={onAddingFrontRightTyre}
              />
            )}
          </Row>
          <Separator size={1} />
          <H3>Others</H3>
          <Separator size={1} />
          <Row>
            {fuelInjectionPumpPlate ? (
              <Image
                sourceUri={fuelInjectionPumpPlate}
                variant="small_preview"
                onPress={() =>
                  navigateToViewImageScreen(fuelInjectionPumpPlate)
                }
                onPressClose={() => {
                  onAddingFuelInjectionPumpPlate('')
                }}
              />
            ) : (
              <RNFileUploader
                variant="image"
                title="FIP"
                saveCapture={onAddingFuelInjectionPumpPlate}
              />
            )}
            {odometer ? (
              <Image
                sourceUri={odometer}
                variant="small_preview"
                onPress={() => navigateToViewImageScreen(odometer)}
                onPressClose={() => {
                  onAddingOdometerImage('')
                }}
              />
            ) : (
              <RNFileUploader
                variant="image"
                title="Odometer"
                saveCapture={onAddingOdometerImage}
              />
            )}
            {chassis ? (
              <Image
                sourceUri={chassis}
                variant="small_preview"
                onPress={() => navigateToViewImageScreen(chassis)}
                onPressClose={() => {
                  onAddingChassisImage('')
                }}
              />
            ) : (
              <RNFileUploader
                variant="image"
                title="Chassis"
                saveCapture={onAddingChassisImage}
              />
            )}
            {engine ? (
              <Image
                sourceUri={engine}
                variant="small_preview"
                onPress={() => navigateToViewImageScreen(engine)}
                onPressClose={() => {
                  onAddingEngineImage('')
                }}
              />
            ) : (
              <RNFileUploader
                variant="image"
                title="Engine"
                saveCapture={onAddingEngineImage}
              />
            )}
          </Row>
          <Separator size={1} />
          <Button
            variant="primary"
            title="Upload Images"
            style={loading && {backgroundColor: Colors.light.inputBg}}
            disabled={loading}
            onPress={onUploadImages}
          />
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Layout.baseSize,
  },
  buttonContainer: {
    padding: Layout.baseSize,
    elevation: 2,
  },
})
export default UploadImagesAtStageScreen
