import * as React from 'react'
import {Image, StyleSheet, View} from 'react-native'
import Layout from '../../constants/Layout'
import Colors from '../../constants/Colors'
import Icon from './Icon'
import {P2} from './StyledText'

interface DataTimeViewProps {
  date?: string
  time?: string
}

const DataTimeView = (props: DataTimeViewProps) => {
  return (
    <View style={styles.mainView}>
      <View style={styles.imageTextView}>
        {/* <Image
          style={styles.imageStyle}
          source={require("../../assets/images/total_task.png")}
        /> */}
        <Icon
          iconName="calendar-today"
          size={Layout.baseSize * 1}
          style={styles.iconStyle}
        />
        <P2 style={styles.subTitleText}>{props.date}</P2>
      </View>
      <View
        style={StyleSheet.flatten([
          styles.imageTextView,
          styles.timeContainer,
        ])}>
        {/* <Image
          style={styles.imageStyle}
          source={require("../../assets/images/total_task.png")}
        /> */}
        <Icon
          iconName="access-time"
          size={Layout.baseSize * 1}
          style={styles.iconStyle}
        />
        <P2 style={styles.subTitleText}>{props.time}</P2>
      </View>
    </View>
  )
}

export default DataTimeView

const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    marginTop: Layout.baseSize * 0.5,
  },
  imageTextView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageStyle: {
    height: Layout.baseSize,
    width: Layout.baseSize,
    marginTop: Layout.baseSize / 2,
  },
  titleText: {
    marginTop: Layout.baseSize,
  },
  subTitleText: {
    marginTop: Layout.baseSize / 2,
    marginLeft: Layout.baseSize / 3,
  },
  iconStyle: {paddingTop: Layout.baseSize * 0.5},
  timeContainer: {
    marginLeft: Layout.baseSize * 1.5,
  },
})
