import {Video, AVPlaybackStatus, ResizeMode} from 'expo-av'
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native'
import React, {useRef} from 'react'
import {log} from '../../utils/helpers'
type VideoProps = {
  url: string
  style?: StyleProp<ViewStyle>
}

// Within your render function, assuming you have a file called
// "background.mp4" in your project. You can include multiple videos
// on a single screen if you like.

const VideoPlayer = ({url, style}: VideoProps) => {
  const playerRef = useRef(null)
  const [status, setStatus] = React.useState({})

  log('video url', url)
  return (
    // <>
    //   <Text>{url}</Text>
    // </>

    <Video
      source={{uri: url}} // Can be a URL or a local file.
      ref={playerRef} // Store reference
      resizeMode={ResizeMode.CONTAIN}
      useNativeControls
      shouldPlay
      //    onBuffer={onBuffer}                // Callback when remote video is buffering
      //    onError={onVideoError}               // Callback when video cannot be loaded
      style={[style, styles.backgroundVideo]}
    />
  )
}

export default VideoPlayer

// Later on in your styles..
const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
})
