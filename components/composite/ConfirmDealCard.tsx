import {ActivityIndicator, Text} from 'react-native-paper'
import {View} from '../basic/Themed'
import {StyleSheet} from 'react-native'
import Layout from '../../constants/Layout'
import Colors from '../../constants/Colors'
import {P1} from '../basic/StyledText'
import Button from '../basic/Button'
import {titleCaseToReadable} from '../../utils/helpers'

type ConfirmDealCardProps = {
  data?: {key: string; value: string}[]
  loading: boolean
  amountLabel: string
  amount: number
  make: string
  model: string
  year: string
  ownership: string
  hoursmeter: number
  registrationNumber: string
  onPress: () => void
}
const ConfirmDealCard = ({
  data,
  amountLabel,
  loading,
  amount,
  make,
  model,
  year,
  ownership,
  hoursmeter,
  registrationNumber,
  onPress,
}: ConfirmDealCardProps) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <P1>{amountLabel}</P1>
        {loading ? <ActivityIndicator /> : <P1>{`${amount} INR`}</P1>}
      </View>
      <View style={styles.innerContainer}>
        <Text style={{color: 'grey'}}>Make</Text>
        <Text>{titleCaseToReadable(make)}</Text>
      </View>
      <View style={styles.innerContainer}>
        <Text style={{color: 'grey'}}>Model</Text>
        <Text>{titleCaseToReadable(model)}</Text>
      </View>
      <View style={styles.innerContainer}>
        <Text style={{color: 'grey'}}>Year</Text>
        <Text>{year}</Text>
      </View>
      <View style={styles.innerContainer}>
        <Text style={{color: 'grey'}}>Ownership</Text>
        <Text>{titleCaseToReadable(ownership)}</Text>
      </View>
      {/* <View style={styles.innerContainer}>
        <Text style={{color: 'grey'}}>Demand Amount</Text>
        <Text>{amount}</Text>
      </View> */}
      <View style={styles.innerContainer}>
        <Text style={{color: 'grey'}}>Hours Meters</Text>
        <Text>{hoursmeter}</Text>
      </View>
      <View style={styles.innerContainer}>
        <Text style={{color: 'grey'}}>Registration no.</Text>
        <Text>{registrationNumber}</Text>
      </View>
      <View style={styles.innerContainer}>
        <Text style={{color: 'grey'}}>Images</Text>
        <Button
          loading={false}
          title="view all"
          style={styles.viewALl}
          onPress={onPress}
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  innerContainer: {
    borderBottomRightRadius: Layout.baseSize,
    borderBottomLeftRadius: Layout.baseSize,
    borderTopRightRadius: Layout.baseSize,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Layout.baseSize / 2,
    marginHorizontal: Layout.baseSize,
  },
  topContainer: {
    backgroundColor: Colors.light.screenBg,
    borderTopLeftRadius: Layout.baseSize,
    borderTopRightRadius: Layout.baseSize,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Layout.baseSize / 2,
    paddingHorizontal: Layout.baseSize,
  },
  mainContainer: {
    marginHorizontal: Layout.baseSize,
    borderRadius: Layout.baseSize,
    elevation: 1,
    paddingBottom: Layout.baseSize,
  },
  viewALl: {
    backgroundColor: Colors.light.primary,
    borderRadius: Layout.baseSize * 0.3,
  },
})
export default ConfirmDealCard
