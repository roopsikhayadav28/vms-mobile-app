import { useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import Layout from '../../constants/Layout'
import { commonStyle } from '../../constants/style'
import {
  RefurbishmentStatus,
  useGetRequestItemFromLeadQuery
} from '../../generated/hooks_and_more'
import useUpdateLeadInput from '../../hooks/useUpdateLeadInput'
import { RootStackScreenProps } from '../../navigation/navigationTypes'
import { stripFields } from '../../utils/helpers'
import Image from '../basic/Image'
import RNFilerUploader from '../basic/RNFileUploader'
import Separator from '../basic/Separator'
import { H3 } from '../basic/StyledText'
type FormComponentProps = {
  leadId: string | undefined
  registrationNo?: string
  requestId: string
}

const UploadInstallationConfirmImages = ({
  leadId = 'new',
  registrationNo,
  requestId,
}: FormComponentProps): JSX.Element => {
  const {leadInput, setLeadInput} = useUpdateLeadInput(leadId)
  const navigation =
    useNavigation<RootStackScreenProps<'ViewImageScreen'>['navigation']>()
  const items =
    leadInput?.refurbishmentDetails?.requests?.[0]?.items.slice() ?? []

  const {data: issueData, loading} = useGetRequestItemFromLeadQuery({
    variables: {
      regNo: registrationNo,
      requestId,
    },
    onCompleted(data) {
      const stripData = stripFields(data, ['__typename'])

      setLeadInput({
        ...leadInput,
        refurbishmentDetails: {
          ...stripData.getLead.refurbishmentDetails,
        },
      })
    },
  })

  const navigateToViewImageScreen = useCallback((uri: string) => {
    navigation.navigate('ViewImageScreen', {
      imageUrl: uri,
    })
  }, [])
 
  function onUploadingInstallationImages(value: string, index: number) {

    items[index] = {
      ...leadInput?.refurbishmentDetails?.requests?.[0]?.items[index],
      id: issueData?.getLead?.refurbishmentDetails?.requests?.[0]?.items?.[index]?.id,
      installationProofUrl: value,
    }
    setLeadInput({
      ...leadInput,
      refurbishmentDetails: {
        ...leadInput?.refurbishmentDetails,
        requests: [
          {
            ...leadInput?.refurbishmentDetails?.requests?.[0],
            id: requestId,
            items: items,
          },
        ],
      },
    })
  }

  return (
    <View style={commonStyle.mainAppContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {loading && (
          <View style={styles.container}>
            <ActivityIndicator />
          </View>
        )}
        {!loading &&
          leadInput?.refurbishmentDetails?.requests?.[0]?.
          items.map((i, index) => {
              return (i?.status === RefurbishmentStatus.Approved && (
                <View style={styles.container} key={i.id}>
                <Separator size={1} />
                <H3>{i?.product?.name}</H3>
                <Separator size={1} />
                { (!!i?.installationProofUrl ? (
                  <Image
                    sourceUri={i?.installationProofUrl}
                    variant="small_preview"
                    onPress={() =>
                      navigateToViewImageScreen(i?.installationProofUrl)
                    }
                    onPressClose={() => {
                      onUploadingInstallationImages('', index)
                    }}
                  />
                ) : (
                  <RNFilerUploader
                    variant="image"
                    title="upload"
                    saveCapture={value =>
                      onUploadingInstallationImages(value, index)
                    }
                  />
                ))}
              </View>
              )
              
              )
            })}
      </ScrollView>
    </View>
  )
}
export default UploadInstallationConfirmImages
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Layout.baseSize,
  },
})
