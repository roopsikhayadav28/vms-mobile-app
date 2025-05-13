import React, {useMemo} from 'react'
import {View, StyleSheet, TouchableOpacity} from 'react-native'
import Colors from '../constants/Colors'
import Layout from '../constants/Layout'
const InnerPart = View
const OuterPart = TouchableOpacity

const {baseSize} = Layout
const outerSize = baseSize * 2.6
const ringWidth = baseSize / 4
const innerSize = baseSize * 2

type CameraButtonProps = {
  onPress: () => any
  onLongPress?: () => any
  innerPartColor?: any
  isRecording?: boolean
  onStopRecording?: () => any
}

export default function CameraButton(props: CameraButtonProps) {
  const styles = useMemo(
    () => getThemedStyles(props?.innerPartColor),
    [props?.innerPartColor],
  )

  return (
    <View style={styles.buttonContainer}>
      <OuterPart
        hitSlop={Layout.hitSlop.icon}
        style={styles.outerRing}
        onLongPress={props.onLongPress}
        onPress={props?.isRecording ? props?.onStopRecording : props.onPress}>
        <InnerPart style={styles.innerPartContainer} />
      </OuterPart>
    </View>
  )
}

const getThemedStyles = innerPartColor =>
  StyleSheet.create({
    positioning: {},
    outerRing: {
      borderRadius: outerSize,
      height: outerSize,
      width: outerSize,
      borderWidth: ringWidth,
      borderColor: Colors.light.background,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
    innerRing: {
      height: innerSize,
      width: innerSize,
      borderRadius: baseSize,
      backgroundColor: Colors.light.background,
    },
    buttonContainer: {
      alignItems: 'center',
    },
    innerPartContainer: {
      height: innerSize,
      width: innerSize,
      borderRadius: baseSize,
      backgroundColor: innerPartColor,
    },
  })
