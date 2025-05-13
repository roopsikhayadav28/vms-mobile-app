import * as React from 'react'
import {View, StyleSheet, Image} from 'react-native'
import {Surface} from 'react-native-paper'
import Colors from '../../constants/Colors'
import Layout from '../../constants/Layout'
import Button from './Button'
import DataTimeView from './DataTimeView'
import {H1, H3, P1, P2} from './StyledText'
import {Text} from './Themed'

interface TaskCardProps {}

const TaskCard = (props: TaskCardProps) => {
  return (
    <Surface style={styles.container} elevation={3}>
      <View>
        <View style={styles.outerView}>
          <H3>
            Verification Pending with operations for lead RJTR1234 from 30 mins
          </H3>
          <DataTimeView date={'24 Sep 2022'} time={'04:30 PM'} />
        </View>
        <View style={styles.cardButtonView}>
          <H3 style={styles.paymentReqStyle}>"Raise Payment Request {'>>'}"</H3>
        </View>
      </View>
    </Surface>
  )
}

export default TaskCard

const styles = StyleSheet.create({
  container: {
    borderRadius: Layout.baseSize / 3,
  },
  outerView: {
    padding: Layout.baseSize,
    justifyContent: 'center',
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
  cardButtonView: {
    marginTop: Layout.baseSize / 5,
    height: Layout.baseSize * 2.8,
    width: '100%',
    backgroundColor: Colors.light.primary,
    borderBottomLeftRadius: Layout.baseSize / 3,
    borderBottomRightRadius: Layout.baseSize / 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentReqStyle: {color: Colors.light.background},
})
