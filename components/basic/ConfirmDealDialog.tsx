import * as React from 'react'
import {Text, View, StyleSheet, TextInput} from 'react-native'
import Colors from '../../constants/Colors'
import Layout from '../../constants/Layout'
import Button from './Button'
import {H1, H2, P1, P2} from './StyledText'

interface ConfirmDealDialogProps {
  variant: string
  title: string
  sub_title: string
  onYesPress: () => void
  onNoPress: () => void
}

const ConfirmDealDialog = (props: ConfirmDealDialogProps) => {
  function getStyles() {
    switch (props.variant) {
      case 'remark':
        return styles.remarks
      default:
        return {}
    }
  }
  return (
    <View style={styles.container}>
      <H2>{props.title}</H2>
      {props.variant != 'remark' && (
        <P1 style={styles.subTitle}>{props.sub_title}</P1>
      )}
      {props.variant === 'remark' && (
        <View style={styles.remarksInput}>
          <TextInput
            placeholder={'Enter the Remarks'}
            multiline={true}
            numberOfLines={5}
            style={getStyles()}
          />
        </View>
      )}
      <View style={styles.buttonView}>
        <Button
          variant="action"
          title={'No'}
          type="disable"
          onPress={props.onNoPress}
        />
        <Button
          variant="action"
          title="YES"
          type="enable"
          onPress={props.onYesPress}
        />
      </View>
    </View>
  )
}

export default ConfirmDealDialog

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
    borderColor: Colors.light.primary,
    borderRadius: Layout.baseSize * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: Layout.baseSize * 2,
    width: Layout.window.width * 0.8,
  },
  subTitle: {
    marginTop: Layout.baseSize * 0.3,
  },
  remarks: {
    backgroundColor: Colors.light.inputBg,
    height: Layout.baseSize * 5,
    width: Layout.window.width * 0.95,
    padding: Layout.baseSize,
    marginTop: Layout.baseSize,
    textAlignVertical: 'top',
    borderRadius: Layout.baseSize * 0.3,
  },
  remarksInput: {marginVertical: Layout.baseSize * 2},
})
