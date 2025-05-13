import React from 'react'

import {StyleSheet, Text, View} from 'react-native'
import Colors from '../../constants/Colors'

const RefurbishmentDetailScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Refurbishment Detail Screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
    backgroundColor: Colors.light.background,
  },
})

export default RefurbishmentDetailScreen
