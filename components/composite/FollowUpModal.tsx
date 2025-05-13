import React, {useState} from 'react'
import {StyleSheet, ToastAndroid, View} from 'react-native'
import {Modal, Portal} from 'react-native-paper'
import Colors from '../../constants/Colors'
import Layout from '../../constants/Layout'
import {DatePicker} from '../basic/DatePicker'
import {Input} from '../basic/Input'
import Button from '../basic/Button'
import PickerSelectButton from '../basic/PickerSelectButton'
import * as Notifications from 'expo-notifications'
import {P1} from '../basic/StyledText'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
})

async function schedulePushNotification(data: InputTypes, regNo: string) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `follow up reminder for ${data?.docName} 📬`,
      body: `${data.comments}`,
      data: {data: data},
    },
    trigger: {date: data?.followUpDate},
  })
}

type FollowUpModalProps = {
  isVisble: boolean
  hidePopup: () => void
  docType: string
  regNo: string
}

type InputTypes = {
  followUpDate: Date
  comments: string
  docName: string
  doc: string
}

const FollowUpModal = ({
  isVisble,
  hidePopup,
  regNo,
  docType,
}: FollowUpModalProps) => {
  const [folloupInputs, setFolloupInputs] = useState<InputTypes>(null)

  const handleChange = (value: Date | string, key: string) => {
    setFolloupInputs({
      ...folloupInputs,
      [key]: value,
    })
  }

  // const options = [
  //   {
  //     label: 'Bank NOC',
  //     value: 'Bank NOC',
  //   },
  //   {
  //     label: 'Form 26',
  //     value: 'Form 26',
  //   },
  // ]

  return (
    <Portal>
      <Modal
        visible={isVisble}
        onDismiss={hidePopup}
        dismissable={true}
        contentContainerStyle={styles.modalContainer}>
        <P1
          style={{
            paddingLeft: Layout.baseSize / 2,
          }}>
          Follow up reminder
        </P1>
        <Input
          // key={'Comments'}
          label={'Doc type'}
          value={docType}
          disabled
          // onChangeText={value => {
          //   handleChange(value, 'comments')
          // }}
          //   isRequired={!!maxSellingPrice}
        />

        {/* <PickerSelectButton
          placeholder="Select Doc Type"
          value={folloupInputs?.docName}
          onValueChange={value => {
            handleChange(value, 'docName')
          }}
          items={options}
        /> */}
        <DatePicker
          placeholder="Follow up Date"
          value={folloupInputs?.followUpDate}
          onChange={(_, value) => {
            handleChange(value, 'followUpDate')
          }}
          isRequired
        />
        <Input
          // key={'Comments'}
          //   keyboardType=""
          label={'Comments'}
          value={folloupInputs?.comments}
          onChangeText={value => {
            handleChange(value, 'comments')
          }}
          //   isRequired={!!maxSellingPrice}
        />

        <View style={{padding: Layout.baseSize / 2}}>
          <Button
            title={'Set Reminder'}
            variant="primary"
            onPress={async () => {
              //   onFolloUpDateClicked()
              await schedulePushNotification(
                {...folloupInputs, docName: docType},
                regNo,
              )
              hidePopup()
              ToastAndroid.show(
                'Reminder added successfully!!!',
                ToastAndroid.LONG,
              )
            }}
          />
        </View>
      </Modal>
    </Portal>
  )
}

export default FollowUpModal

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: Colors.light.background,
    marginHorizontal: Layout.baseSize * 0.5,
    padding: Layout.baseSize,
    borderRadius: Layout.baseSize,
  },
})
