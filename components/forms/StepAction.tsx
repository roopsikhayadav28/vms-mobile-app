import React from 'react'
import {Linking, StyleSheet, View} from 'react-native'
import {H3, LinkText} from '../basic/StyledText'

type StepActionProps = {leadId: string | undefined}
export default function StepAction({leadId = 'new'}: StepActionProps) {
  function onPressPrimaryButton() {
    // TODO: Call this mutation leading to positive status
    // addLSEMutationFn
  }
  function onPressSecondaryButton() {
    // TODO: Call this mutation leading to negative status
    // addLSEMutationFn
  }
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <H3>What to do with this lead now?</H3>
        <H3>You can try testing the app with a different user role</H3>
        {/* <LinkText
          onPress={() => Linking.openURL("mailto:tech@tractorjunction.com")}
        >
          tech@tractorjunction.com
        </LinkText> */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  textContainer: {alignItems: 'center', justifyContent: 'center'},
})
