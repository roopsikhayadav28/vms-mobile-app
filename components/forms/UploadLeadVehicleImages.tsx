import {useNavigation} from '@react-navigation/native'
import {useCallback, useEffect} from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import Layout from '../../constants/Layout'
import {commonStyle} from '../../constants/style'
import {ImageStage} from '../../generated/hooks_and_more'
import useLeadCacheDataUpdate from '../../hooks/useLeadCacheDataUpdate'
import useUpdateLeadInput from '../../hooks/useUpdateLeadInput'
import {RootStackScreenProps} from '../../navigation/navigationTypes'
import {log} from '../../utils/helpers'
import Image from '../basic/Image'
import RNFileUploader from '../basic/RNFileUploader'
import Separator from '../basic/Separator'
import {H2, H3} from '../basic/StyledText'
import {Row} from '../basic/StyledView'
import {View} from '../basic/Themed'
const {baseSize, window} = Layout

type FormComponentProps = {leadId: string | undefined; regNo: string}

const UploadLeadVehicleImages = ({
  leadId = 'new',
  regNo,
}: FormComponentProps): JSX.Element => {
  const {leadInput, setLeadInput} = useUpdateLeadInput(leadId)
  const rehydrateLeadInput = useLeadCacheDataUpdate({leadId, regNo})
  const navigation =
    useNavigation<
      RootStackScreenProps<'ViewImageScreen' | 'ViewVideoScreen'>['navigation']
    >()
  useEffect(() => {
    //TODO: Ensure that the leadinput rehydrates before the user can perform an action on this lead.
    rehydrateLeadInput()
    return () => {
      setLeadInput({})
    }
  }, [])
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
    setLeadInput({
      ...leadInput,
      vehicle: {
        ...leadInput?.vehicle,
        images: [
          {
            ...soFarImagesAtLeadGenerationStage,
            vehicleImagesId: `${regNo}_${ImageStage.LeadGenerated}`,
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
            vehicleImagesId: `${regNo}_${ImageStage.LeadGenerated}`,
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
            vehicleImagesId: `${regNo}_${ImageStage.LeadGenerated}`,
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
            vehicleImagesId: `${regNo}_${ImageStage.LeadGenerated}`,
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
            vehicleImagesId: `${regNo}_${ImageStage.LeadGenerated}`,
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
            vehicleImagesId: `${regNo}_${ImageStage.LeadGenerated}`,
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
            vehicleImagesId: `${regNo}_${ImageStage.LeadGenerated}`,
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
            vehicleImagesId: `${regNo}_${ImageStage.LeadGenerated}`,
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
            vehicleImagesId: `${regNo}_${ImageStage.LeadGenerated}`,
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
            vehicleImagesId: `${regNo}_${ImageStage.LeadGenerated}`,
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
            vehicleImagesId: `${regNo}_${ImageStage.LeadGenerated}`,
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
            vehicleImagesId: `${regNo}_${ImageStage.LeadGenerated}`,
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
            vehicleImagesId: `${regNo}_${ImageStage.LeadGenerated}`,
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
          <H3>Inspection Video</H3>
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

export default UploadLeadVehicleImages

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: baseSize,
  },
  buttonContainer: {
    padding: Layout.baseSize,
    elevation: 2,
  },
})
