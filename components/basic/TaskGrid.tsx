import * as React from 'react'
import {StyleSheet, View} from 'react-native'
import {Surface} from 'react-native-paper'
import Colors from '../../constants/Colors'
import Layout from '../../constants/Layout'
import {commonStyle} from '../../constants/style'
import Icon from './Icon'
import {H1, H3} from './StyledText'

interface TaskGridProps {
  pendingTasksNo: number
  completedTasks: number
}

const TaskGrid = ({pendingTasksNo, completedTasks}: TaskGridProps) => {
  return (
    <View style={commonStyle.flexRow}>
      <Surface
        style={{...styles.container, marginRight: Layout.baseSize / 2}}
        elevation={1}>
        <View style={styles.outerView}>
          {/* <Image
          style={styles.imageStyle}
          source={require("../../assets/images/total_task.png")}
        /> */}
          <Icon
            iconName="list-alt"
            size={Layout.baseSize * 2.5}
            color={Colors.dark.primary}
          />
          <H1 style={styles.titleText}>{pendingTasksNo}</H1>
          <H3 style={styles.subTitleText}>{'Pending tasks'}</H3>
        </View>
      </Surface>

      <Surface style={styles.container} elevation={1}>
        <View style={styles.outerView}>
          {/* <Image
          style={styles.imageStyle}
          source={require("../../assets/images/total_task.png")}
        /> */}

          <Icon
            iconName="playlist-add-check"
            size={Layout.baseSize * 2.5}
            color={Colors.dark.primary}
          />
          <H1 style={styles.titleText}>{completedTasks}</H1>
          <H3 style={styles.subTitleText}>{'Tasks Completed'}</H3>
        </View>
      </Surface>
    </View>
  )
}

export default TaskGrid

const styles = StyleSheet.create({
  container: {
    borderRadius: Layout.baseSize / 2,

    // flexDirection: 'row',
    // justifyContent: 'space-around',
    // width: Layout.window.width - Layout.baseSize,
    backgroundColor: Colors.light.background,
  },
  outerView: {
    padding: Layout.baseSize * 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  imageStyle: {
    height: Layout.baseSize * 3,
    width: Layout.baseSize * 3,
  },
  titleText: {
    marginTop: Layout.baseSize,
  },
  subTitleText: {
    marginTop: Layout.baseSize / 2,
  },
})
