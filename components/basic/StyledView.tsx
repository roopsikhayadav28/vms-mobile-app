import React from 'react'
import {StyleSheet, View} from 'react-native'
import Colors from '../../constants/Colors'
import Layout from '../../constants/Layout'
import {commonStyle} from '../../constants/style'

export const Row: React.FC<any> = (props: any) => {
  return <View style={styles.rowContainer} {...props} />
}

export const Column = (props: any) => {
  return <View style={commonStyle.flexColumn} {...props} />
}

export const ButtonView = (props: any) => {
  return <View style={styles.buttonViewContainer} {...props}></View>
}

const styles = StyleSheet.create({
  buttonViewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Layout.baseSize * 0.5,
    backgroundColor: Colors.light.background,
    elevation: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'stretch',
    flexWrap: 'wrap',
  },
})
