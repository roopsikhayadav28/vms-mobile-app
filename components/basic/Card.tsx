import {StyleSheet} from 'react-native'
import Layout from '../../constants/Layout'
import {View} from './Themed'

type CardProps = {
  children: React.ReactNode
  style?: {}
}

export default function Card(props: CardProps) {
  return <View style={[styles.container, props.style]}>{props.children}</View>
}

const styles = StyleSheet.create({
  container: {
    // height: Layout.baseSize * 21,
    // paddingHorizontal: Layout.baseSize,
    // paddingBottom: Layout.baseSize * 0.5,
    borderRadius: Layout.baseSize * 0.3,
    marginHorizontal: Layout.baseSize * 0.5,
    // elevation: 1,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    // shadowOffset: {
    //   width: Layout.dropX,
    //   height: Layout.dropY,
    // },
    // shadowRadius: Layout.drop,
    // shadowOpacity: 0.5,
    // alignSelf: 'stretch',
    // flex: 1,
  },
})
