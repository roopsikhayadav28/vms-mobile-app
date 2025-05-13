import {P2} from '../../basic/StyledText'
import Layout from '../../../constants/Layout'
import {StyleSheet, Text} from 'react-native'
import Colors from '../../../constants/Colors'
import {View} from '../../basic/Themed'
import {commonStyle} from '../../../constants/style'

interface dealershipDetailCardProps {
  data?: {key: string; value: string | number; isHidden?: boolean}[]

  leftCardLabel?: string
  rightCardLabel?: string
}
const DealershipDetailCard = ({
  data,
  leftCardLabel,
  rightCardLabel,
}: dealershipDetailCardProps) => {
  return (
    <View style={styles.mainContainer} key={leftCardLabel}>
      <View style={styles.topContainer}>
        <P2 style={commonStyle.bold600}>{leftCardLabel ?? ''}</P2>
        <P2 style={commonStyle.bold600}>{rightCardLabel ?? ''}</P2>
      </View>
      {data
        .filter(item => !item?.isHidden)
        .map((item, index) => {
          return (
            <View
              style={styles.innerContainer}
              key={item.key + index?.toString()}>
              <Text style={{color: 'grey'}}>{item.key}</Text>
              <Text>{item.value}</Text>
            </View>
          )
        })}
    </View>
  )
}
export default DealershipDetailCard
const styles = StyleSheet.create({
  topContainer: {
    backgroundColor: Colors.light.screenBg,
    borderTopLeftRadius: Layout.baseSize / 2,
    borderTopRightRadius: Layout.baseSize / 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Layout.baseSize / 2,
    paddingHorizontal: Layout.baseSize,
  },
  mainContainer: {
    margin: 8,
    borderRadius: Layout.baseSize / 2,
    elevation: 1,
    paddingBottom: Layout.baseSize,
  },
  innerContainer: {
    borderBottomRightRadius: Layout.baseSize,
    borderBottomLeftRadius: Layout.baseSize,
    borderTopRightRadius: Layout.baseSize,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Layout.baseSize / 2,
    marginHorizontal: Layout.baseSize,
  },
})
