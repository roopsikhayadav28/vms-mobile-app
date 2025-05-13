import {useNavigation} from '@react-navigation/native'
import {ToastAndroid, TouchableOpacity} from 'react-native'
import {RootStackScreenProps} from '../../navigation/navigationTypes'
import {log} from '../../utils/helpers'
import Icon from '../basic/Icon'
import {P1} from '../basic/StyledText'
import {Row} from '../basic/StyledView'

type DeliveryExpenseProps = {
  expenseName: string
  amount: number
  date: string
  documentURL?: string
}

export const DeliveryExpense = ({
  expenseName,
  amount,
  date,
  documentURL,
}: DeliveryExpenseProps): JSX.Element => {
  const navigation =
    useNavigation<
      RootStackScreenProps<'ViewPdfScreen' | 'ViewImageScreen'>['navigation']
    >()
  function navigateToDedicatedScreen(item) {
    log('document opened', item)
    const itemValue = item
      ?.toString()
      ?.split('?')?.[0]
      ?.split('/')
      ?.reverse()?.[0]
      ?.split('.')
      ?.reverse()?.[0]
    if (itemValue === 'jpg' || itemValue === 'jpeg' || itemValue === 'png') {
      navigation.navigate('ViewImageScreen', {
        imageUrl: item?.toString(),
      })
    } else if (itemValue === 'pdf') {
      navigation.navigate('ViewPdfScreen', {
        pdfUrl: item,
      })
    } else {
      ToastAndroid.showWithGravity('Added Document is not right!', 30, 30)
    }
    log('clicked to View Document', item)
  }
  return (
    <Row>
      <P1>{expenseName}</P1>
      <P1>{amount}</P1>
      <P1>{date}</P1>
      <TouchableOpacity onPress={() => navigateToDedicatedScreen(documentURL)}>
        <Icon iconName="picture-as-pdf" />
      </TouchableOpacity>
    </Row>
  )
}
