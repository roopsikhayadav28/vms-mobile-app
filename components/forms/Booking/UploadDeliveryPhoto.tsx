import {ScrollView, View, Text} from 'react-native'
import React from 'react'
import {commonStyle} from '../../../constants/style'
import RNFileUploader from '../../basic/RNFileUploader'
import useUpdateLeadInput, {
  useUpdateRemarksInput,
} from '../../../hooks/useUpdateLeadInput'
import {Input} from '../../basic/Input'
import Image from '../../basic/Image'
import {RootStackScreenProps} from '../../../navigation/navigationTypes'
import {useNavigation} from '@react-navigation/native'
import {StyleSheet} from 'react-native'
import Layout from '../../../constants/Layout'
import Separator from '../../basic/Separator'
import {H2, H3} from '../../basic/StyledText'
type FormComponentProps = {
  leadId: string | undefined
  registrationNo?: string
}
const UploadDeliveryPhoto = ({leadId, registrationNo}: FormComponentProps) => {
  const {leadInput, setLeadInput} = useUpdateLeadInput(leadId)
  const {setRemarks} = useUpdateRemarksInput(registrationNo)
  const navigation =
    useNavigation<RootStackScreenProps<'ViewImageScreen'>['navigation']>()

  const deliveryPhoto = leadInput?.activeBooking?.deliveryPhotoUrl

  function onUploadingDeliveryPhoto(value: string) {
    setLeadInput({
      ...leadInput,
      activeBooking: {
        ...leadInput?.activeBooking,
        deliveryPhotoUrl: value,
      },
    })
  }
  function onChangeRemarks(value: string) {
    setRemarks(value)
  }
  function navigateToViewImageScreen() {
    navigation.navigate('ViewImageScreen', {
      imageUrl: deliveryPhoto,
    })
  }
  return (
    <View style={commonStyle?.mainAppContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <H3>Upload Delivery Photo</H3>
          <Separator />
          {!!deliveryPhoto ? (
            <Image
              sourceUri={deliveryPhoto}
              variant="small_preview"
              onPress={navigateToViewImageScreen}
              onPressClose={() => {
                onUploadingDeliveryPhoto(null)
              }}
            />
          ) : (
            <RNFileUploader
              isRequired
              variant="image"
              title="Upload"
              saveDoc={onUploadingDeliveryPhoto}
            />
          )}
        </View>

        <Input label="Remarks" onChangeText={onChangeRemarks} />
      </ScrollView>
    </View>
  )
}

export default UploadDeliveryPhoto
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Layout.baseSize,
  },
})
