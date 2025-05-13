import {useNavigation} from '@react-navigation/native'
import React, {useCallback, useEffect} from 'react'
import {ScrollView, StyleSheet, View} from 'react-native'
import Layout from '../../constants/Layout'
import {commonStyle} from '../../constants/style'
import {
  ImageStage,
  useGetLeadDetailsQuery,
} from '../../generated/hooks_and_more'
import useUpdateLeadInput from '../../hooks/useUpdateLeadInput'
import {log} from '../../utils/helpers'
import Image from '../basic/Image'
import RNFileUploader from '../basic/RNFileUploader'
import Separator from '../basic/Separator'
import {H2, H3} from '../basic/StyledText'
import {Row} from '../basic/StyledView'

type FormComponentProps = {leadId: string | undefined; regNo: string}

const UploadDeliveryVehicleImages = ({
  leadId = 'new',
  regNo,
}: FormComponentProps): JSX.Element => {
  const {leadInput, setLeadInput} = useUpdateLeadInput(leadId)
  const navigation = useNavigation<any>()
  const {data: leadDetailsData} = useGetLeadDetailsQuery({
    variables: {
      regNo: leadId as string,
    },
    onCompleted: ({getLead}) => {
      log('fetched lead details for form ', getLead)
    },
  })

  useEffect(() => {
    setLeadInput({
      ...leadInput,
      vehicle: {
        ...leadInput?.vehicle,
        images: [
          {
            ...leadInput?.vehicle?.images?.[0],
            imagesTakenAtStage: ImageStage.AfterDelivery,
          },
        ],
      },
    })
  }, [])

  const navigateToViewImageScreen = useCallback((uri: string) => {
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

  function onAddingInspectionVideo(value?: string) {
    setLeadInput({
      ...leadInput,
      vehicle: {
        ...leadInput?.vehicle,
        images: [
          {
            ...leadInput?.vehicle?.images?.[0],
            vehicleImagesId: `${regNo}_${ImageStage.AfterDelivery}`,
            inspectionVideoUrl: value,
            imagesTakenAtStage: ImageStage.AfterDelivery,
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
            ...leadInput?.vehicle?.images?.[0],
            vehicleImagesId: `${regNo}_${ImageStage.AfterDelivery}`,
            frontBodySide: value,
            imagesTakenAtStage: ImageStage.AfterDelivery,
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
            ...leadInput?.vehicle?.images?.[0],
            vehicleImagesId: `${regNo}_${ImageStage.AfterDelivery}`,
            backBodySide: value,
            imagesTakenAtStage: ImageStage.AfterDelivery,
          },
        ],
      },
    })
  }
  function onAddingLeftBodyImage(value?: string) {
    // log('saveCapture function logging', value)
    setLeadInput({
      ...leadInput,
      vehicle: {
        ...leadInput?.vehicle,
        images: [
          {
            ...leadInput?.vehicle?.images?.[0],
            vehicleImagesId: `${regNo}_${ImageStage.AfterDelivery}`,
            leftBodySide: value,
            imagesTakenAtStage: ImageStage.AfterDelivery,
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
            ...leadInput?.vehicle?.images?.[0],
            vehicleImagesId: `${regNo}_${ImageStage.AfterDelivery}`,
            rightBodySide: value,
            imagesTakenAtStage: ImageStage.AfterDelivery,
          },
        ],
      },
    })
  }

  function onAddingBackLeftTyre(value?: string) {
    //log('saveCapture function logging', value)
    setLeadInput({
      ...leadInput,
      vehicle: {
        ...leadInput?.vehicle,
        images: [
          {
            ...leadInput?.vehicle?.images?.[0],
            vehicleImagesId: `${regNo}_${ImageStage.AfterDelivery}`,
            backLeftTyre: value,
            imagesTakenAtStage: ImageStage.AfterDelivery,
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
            ...leadInput?.vehicle?.images?.[0],
            vehicleImagesId: `${regNo}_${ImageStage.AfterDelivery}`,
            backRightTyre: value,
            imagesTakenAtStage: ImageStage.AfterDelivery,
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
            ...leadInput?.vehicle?.images?.[0],
            vehicleImagesId: `${regNo}_${ImageStage.AfterDelivery}`,
            frontLeftTyre: value,
            imagesTakenAtStage: ImageStage.AfterDelivery,
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
            ...leadInput?.vehicle?.images?.[0],
            vehicleImagesId: `${regNo}_${ImageStage.AfterDelivery}`,
            frontRightTyre: value,
            imagesTakenAtStage: ImageStage.AfterDelivery,
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
            ...leadInput?.vehicle?.images?.[0],
            vehicleImagesId: `${regNo}_${ImageStage.AfterDelivery}`,
            fuelInjectionPumpPlate: value,
            imagesTakenAtStage: ImageStage.AfterDelivery,
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
            ...leadInput?.vehicle?.images?.[0],
            vehicleImagesId: `${regNo}_${ImageStage.AfterDelivery}`,
            odometer: value,
            imagesTakenAtStage: ImageStage.AfterDelivery,
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
            ...leadInput?.vehicle?.images?.[0],
            vehicleImagesId: `${regNo}_${ImageStage.AfterDelivery}`,
            chassisNumber: value,
            imagesTakenAtStage: ImageStage.AfterDelivery,
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
            ...leadInput?.vehicle?.images?.[0],
            vehicleImagesId: `${regNo}_${ImageStage.AfterDelivery}`,
            engineNumber: value,
            imagesTakenAtStage: ImageStage.AfterDelivery,
          },
        ],
      },
    })
  }
  // NOTE: Check the soFar Images writing for images at different stages, [backend server was down]

  return (
    <View style={commonStyle.mainAppContainer}>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollViewStyle}
          contentContainerStyle={styles.contentContainerStyle}>
          <Separator size={1} />
          <H2>Inspection </H2>
          <Separator size={1} />
          {inspectionVideo ? (
            <Image
              sourceUri={inspectionVideo}
              variant="small_preview"
              onPress={() => navigateToViewVideoScreen(inspectionVideo)}
              onPressClose={() => {
                onAddingInspectionVideo('')
              }}
            />
          ) : (
            <RNFileUploader
              variant="image"
              video
              title="Inspection Clip"
              saveCapture={onAddingInspectionVideo}
            />
          )}
          <Separator />
          <H3>Please upload any four images of tractor</H3>
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
        </ScrollView>
      </View>
    </View>
  )
}

export default UploadDeliveryVehicleImages
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Layout.baseSize,
  },

  scrollViewStyle: {flex: 1},
  contentContainerStyle: {justifyContent: 'space-around'},
})
