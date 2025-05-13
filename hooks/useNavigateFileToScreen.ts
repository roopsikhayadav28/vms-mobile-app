import {useCallback} from 'react'
import {ToastAndroid} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {RootStackScreenProps} from '../navigation/navigationTypes'

type Props = {
  fileUrl: string
  title: string
  regNo?: string
}
const useNavigateFileToScreen = () => {
  const navigation =
    useNavigation<
      RootStackScreenProps<'ViewImageScreen' | 'ViewPdfScreen'>['navigation']
    >()

  const navigateToScreen = useCallback(({fileUrl, title, regNo}: Props) => {
    const itemValue = fileUrl
      ?.toString()
      ?.split('?')?.[0]
      ?.split('/')
      ?.reverse()?.[0]
      ?.split('.')
      ?.reverse()?.[0]

    if (
      (fileUrl && itemValue === 'jpg') ||
      itemValue === 'jpeg' ||
      itemValue === 'png'
    ) {
      navigation.navigate('ViewImageScreen', {
        imageUrl: fileUrl,
        title: title,
      })
    } else if ((fileUrl && itemValue === 'jpg') || itemValue === 'pdf') {
      navigation.navigate('ViewPdfScreen', {
        pdfUrl: fileUrl,
        title: title,
        regNo: regNo,
      })
    } else {
      ToastAndroid.showWithGravity('Added Document is not right!', 30, 30)
    }
  }, [])

  return {navigateToScreen}
}

export default useNavigateFileToScreen
