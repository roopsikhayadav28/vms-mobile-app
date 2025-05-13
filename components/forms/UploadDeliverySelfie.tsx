import {useNavigation} from '@react-navigation/native'
import React, {useState} from 'react'
import {ScrollView, StyleSheet, View} from 'react-native'
import Layout from '../../constants/Layout'
import {commonStyle} from '../../constants/style'
import useUpdateLeadInput, {
  useUpdateRemarksInput,
} from '../../hooks/useUpdateLeadInput'
import Navigation from '../../navigation'
import {RootStackScreenProps} from '../../navigation/navigationTypes'
import Button from '../basic/Button'
import Image from '../basic/Image'
import {Input} from '../basic/Input'
import RNFilerUploader from '../basic/RNFileUploader'
import Separator from '../basic/Separator'
import {H2} from '../basic/StyledText'
import {ButtonView, Row} from '../basic/StyledView'
import {FormProps} from './formTypes'

type FormComponentProps = {leadId: string | undefined}

const UploadDeliverySelfie = ({
  leadId = 'new',
}: FormComponentProps): JSX.Element => {
  const {leadInput, setLeadInput} = useUpdateLeadInput(leadId)
  const registrationNumber = leadInput && leadInput.regNo

  const selfie = leadInput?.deliveredSelfieUrl
  const navigation =
    useNavigation<RootStackScreenProps<'ViewImageScreen'>['navigation']>() //FIXME: set config for a video player screen
  const {remarks, setRemarks} = useUpdateRemarksInput(
    registrationNumber as string,
  ) //TODO check

  function navigateToVideoPlayerScreen() {
    navigation.navigate('ViewImageScreen', {
      imageUrl: leadInput?.deliveredSelfieUrl,
    })
  }
  function onAddingSelfieImage(value?: string) {
    setLeadInput({
      ...leadInput,
      deliveredSelfieUrl: value,
    })
  }

  function onRemarksChange(value: string) {
    // setRemarks(value);
    setRemarks(value)
  }

  return (
    <View style={commonStyle.mainAppContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Separator size={1} />

        <H2>Upload Selfie With the Center</H2>
        <Separator size={1} />
        <View style={styles.container}>
          {selfie ? (
            <Image
              sourceUri={selfie}
              variant="small_preview"
              onPress={navigateToVideoPlayerScreen}
              onPressClose={() => {
                onAddingSelfieImage(null)
              }}
            />
          ) : (
            <RNFilerUploader
              variant="image"
              title="Selfie"
              isImageSelfie={true}
              saveCapture={onAddingSelfieImage}
            />
          )}
        </View>
        <Separator size={1} />
        <Input
          label="Enter remarks"
          // value={remarks?.remarks}
          onChangeText={onRemarksChange}
          uniqueKey="Remarks"
        />
        <Separator size={1} />
      </ScrollView>
    </View>
  )
}

export default UploadDeliverySelfie

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Layout.baseSize,
  },
})
