import React from 'react'
import {
  ImageBackground,
  Linking,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native'
import Card from './Card'

import Layout from '../../constants/Layout'
import Icon from './Icon'
import Image from './Image'
import {H3, P1, P2} from './StyledText'
import {Column, Row} from './StyledView'
import Colors from '../../constants/Colors'

type VideoCardProps = {
  title: string
  time: string
  url: string
} & TouchableOpacityProps
const VideoCard = (props: VideoCardProps) => {
  const {title, time, url, onPress, style} = props
  return (
    <TouchableOpacity
      onPress={() => {
        Linking.openURL(url)
      }}
      style={[styles.container, style]}>
      <Icon
        size={Layout.baseSize * 3}
        color={'#fff'}
        iconName="video-library"
      />
      <H3 style={{color: 'white', marginTop: Layout.baseSize}}>{title}</H3>
    </TouchableOpacity>
  )
}

export default VideoCard

const styles = StyleSheet.create({
  container: {
    borderRadius: Layout.baseSize * 0.2,
    overflow: 'hidden',
    backgroundColor: Colors.light.primary,
    height: Layout.baseSize * 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
