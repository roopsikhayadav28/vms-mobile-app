import {StyleSheet, View} from 'react-native'
import Colors from '../../constants/Colors'
import Layout from '../../constants/Layout'
import {commonStyle} from '../../constants/style'
import {P1} from './StyledText'
type LabelProps = {
  title: string
  isImageLabel?: boolean
}

export default function Label({title, isImageLabel}: LabelProps) {
  return (
    <View
      style={[
        styles.container,
        isImageLabel && {
          position: 'absolute',
          top: 0,
          right: 0,
        },
      ]}>
      <P1 style={commonStyle.textWhite}>{title}</P1>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.green,
    borderRadius: Layout.baseSize * 0.25,
    padding: Layout.baseSize / 2,
    // paddingHorizontal: Layout.baseSize/3,
    alignItems: 'center',
    // width: Layout.baseSize * 8,
    justifyContent: 'center',
  },
})
