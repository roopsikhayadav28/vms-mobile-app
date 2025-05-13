import {StyleSheet} from 'react-native'
import React from 'react'
import Colors from '../constants/Colors'
import {RootStackScreenProps} from '../navigation/navigationTypes'
import ImageZoomViewer from '../components/composite/ImageZoomViewer'

type ViewImageScreenProps = RootStackScreenProps<'ViewImageScreen'>

const ViewImageScreen = ({route}: ViewImageScreenProps) => {
  return (
    <ImageZoomViewer
      imageUrl={route.params?.imageUrl}
      style={styles.imageStyle}
    />
  )
}

export default ViewImageScreen

const styles = StyleSheet.create({
  imageStyle: {backgroundColor: Colors.dark.background},
})
