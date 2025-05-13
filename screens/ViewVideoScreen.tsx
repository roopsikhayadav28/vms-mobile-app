import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {RootStackScreenProps} from '../navigation/navigationTypes'
import VideoPlayer from '../components/basic/Video'

type ViewVideoScreenProps = RootStackScreenProps<'ViewVideoScreen'>

const ViewVideoScreen = ({route}: ViewVideoScreenProps) => {
  return <VideoPlayer url={route?.params?.url} />
}

export default ViewVideoScreen

const styles = StyleSheet.create({})
