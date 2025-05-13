import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native'

import {useState} from 'react'
import {ScrollView} from 'react-native-gesture-handler'
import {Modal, Portal} from 'react-native-paper'
import Colors from '../../constants/Colors'
import Layout from '../../constants/Layout'
import {commonStyle} from '../../constants/style'
import {
  useCreateFakeUserWithRoleMutation,
  UserRole,
} from '../../generated/hooks_and_more'
import useLoggedInUser from '../../hooks/useLoggedInUser'
import useUserToken from '../../hooks/useUserToken'
import getEnvVars from '../../utils/environment'
import {
  enumToItems,
  getRandomColor,
  getUserInitials,
  titleCaseToReadable,
} from '../../utils/helpers'
import Icon from './Icon'
import Image from './Image'
import Separator from './Separator'
import {H2, P1} from './StyledText'
const {showRoleDropdown} = getEnvVars()

type DrawerHeaderProps = {
  name?: string
  imgUrl?: string
  role?: string
} & TouchableOpacityProps

const DrawerScreenButton = ({name, imgUrl}: DrawerHeaderProps) => {
  const {userToken, setUserToken} = useUserToken()
  const {loggedInUser, setLoggedInUser} = useLoggedInUser(userToken)
  const [createFakeUserWithRole, {data, loading}] =
    useCreateFakeUserWithRoleMutation({
      onCompleted: ({addUser}) => {
        console.log('addUser?.user?.[0]', addUser?.user?.[0])
        // change the user token and loggedin user with new value
        if (addUser?.user?.[0]?.id) {
          setUserToken(addUser?.user?.[0]?.id)
          setLoggedInUser(addUser?.user?.[0])
        }
      },
    })
  const [pickerVisible, setPickerVisible] = useState<boolean>(false)
  function openRoleModal() {
    setPickerVisible(true)
    // console.log('------->', enumToItems(UserRole))
  }
  function closePicker() {
    setPickerVisible(false)
  }
  function onPressModalItem(value: string, index: number) {
    // log('user role picker selected', {value, index})
    const userRole = value as UserRole
    const fakeName =
      loggedInUser?.name?.split(' ')?.[0] + ' ' + titleCaseToReadable(userRole)
    // upsert a fake user with role and then update the userToken and loggedInUser
    createFakeUserWithRole({
      variables: {
        role: userRole,
        fakeEmail: fakeName,
        fakeName,
        phoneNo: Math.floor(Math.random() * 10000000000)?.toString(),
        pnsToken: loggedInUser?.expoPushNotificationAddress,
      },
    })
    closePicker()
  }

  const userInitials = getUserInitials(name)

  return (
    <View style={styles.header}>
      {!!imgUrl ? (
        <Image variant="avatar" sourceUri={imgUrl} />
      ) : (
        <TouchableOpacity
          style={StyleSheet.flatten([
            styles.avatar,
            styles.avatarInitialsStyle,
          ])}>
          <Text style={styles.avatarInitialsTextStyle}>{userInitials}</Text>
        </TouchableOpacity>
      )}
      <Separator size={1} />
      <H2>{name}</H2>

      <Separator />
      <TouchableOpacity
        style={styles.dropdownContainer}
        onPress={openRoleModal}>
        <P1>{titleCaseToReadable(loggedInUser?.role ?? 'Unknown')}</P1>
        {showRoleDropdown && (
          <Icon iconName="keyboard-arrow-down" style={styles.iconStyle} />
        )}
      </TouchableOpacity>

      {showRoleDropdown && (
        <Portal>
          <Modal
            visible={pickerVisible}
            onDismiss={closePicker}
            contentContainerStyle={styles.modalContentContainer}
            style={styles.modalStyle}>
            <ScrollView>
              {enumToItems(UserRole)?.map((i, index) => (
                <TouchableOpacity
                  key={`picker-item-${i?.value}`}
                  onPress={() => onPressModalItem(i?.value, index)}
                  style={commonStyle.paddingVertical16}>
                  <P1>{i?.label}</P1>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Modal>
        </Portal>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    // flexDirection: "column",
    alignItems: 'center',

    justifyContent: 'center',
    paddingVertical: Layout.baseSize,
  },
  dropdownContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {marginLeft: 3},
  modalContentContainer: {
    backgroundColor: Colors.light.background,
    padding: Layout.baseSize,
    margin: Layout.baseSize,
  },
  modalStyle: {flex: 1, marginVertical: Layout.baseSize * 3},
  avatarInitialsStyle: {
    backgroundColor: getRandomColor(),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: Layout.baseSize * 1.5,
  },
  avatarInitialsTextStyle: {
    color: Colors.light.background,
    fontSize: Layout.baseSize,
    fontWeight: 'bold',
  },
  avatar: {
    height: Layout.baseSize * 3,
    width: Layout.baseSize * 3,
    borderRadius: Layout.baseSize * 1.5,
  },
})

export default DrawerScreenButton
