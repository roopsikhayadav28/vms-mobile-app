import {useMemo} from 'react'
import {StyleSheet, TouchableOpacity, TouchableOpacityProps} from 'react-native'
import {IconButton, Button as PaperButton, Text} from 'react-native-paper'
import Colors from '../../constants/Colors'
import Layout from '../../constants/Layout'
import Icon, {IconName} from './Icon'
const {baseSize, window} = Layout

type ButtonType = 'disable' | 'enable'

type ButtonProps = {
  variant?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'call'
    | 'danger'
    | 'green'
    | 'floating'
    | 'action'
    | 'text'
    | 'upload'
    | 'floating_chat'
    | 'back_action'
    | 'call_button'
  title?: string
  type?: ButtonType
  iconName?: IconName
  style?: {}
  loading?: boolean
} & TouchableOpacityProps

export default function Button({
  onPress,
  title,
  variant,
  type,
  iconName,
  style,
  disabled,
  loading,
  ...rest
}: ButtonProps) {
  const styles = useMemo(() => getThemedStyles(type), [type])
  const iconSize = baseSize * 0.9

  function getStyles() {
    switch (variant) {
      case 'primary':
        return styles.primary
      case 'secondary':
        return styles.secondary
      case 'back_action':
        return styles.backAction
      case 'tertiary':
        return styles.tertiary
      case 'danger':
        return styles.danger
      case 'green':
        return styles.green
      case 'text':
        return styles.text
      case 'upload':
        return styles.upload
      case 'floating_chat':
        return styles.floating_chat
      case 'action':
        return styles.action
      case 'call_button':
        return styles.call
      case 'floating':
        return styles.floating

      default:
        return {}
    }
  }
  if (variant === 'text') {
    return (
      <TouchableOpacity style={styles.text} onPress={onPress}>
        <Text>{title}</Text>
      </TouchableOpacity>
    )
  }

  if (
    variant === 'floating_chat' ||
    variant === 'floating' ||
    variant === 'call_button'
  ) {
    return (
      <IconButton
        icon={() => (
          <Icon
            size={Layout.baseSize * 2}
            iconName={iconName}
            color={'white'}
          />
        )}
        style={[getStyles(), style]}
        onPress={onPress}
      />
    )
  }

  if (variant === 'back_action') {
    return (
      <PaperButton
        mode="contained"
        onPress={onPress}
        style={getStyles()}
        labelStyle={styles.titleTextStyle}>
        {'Back'}
      </PaperButton>
    )
  }

  return (
    <PaperButton
      icon={iconName}
      mode="contained"
      onPress={onPress}
      style={[
        getStyles(),
        style,
        disabled && {backgroundColor: Colors.light.tabIconDefault},
      ]}
      {...rest}
      loading={loading}
      disabled={loading || disabled}
      // labelStyle={styles.titleTextStyle}
    >
      {loading ? '' : title}
    </PaperButton>
  )
}

const getThemedStyles = (type: ButtonType) =>
  StyleSheet.create({
    primary: {
      paddingVertical: baseSize / 3,
      // paddingHorizontal: baseSize,
      backgroundColor: Colors.light.primary,
      borderRadius: baseSize * 0.3,
      justifyContent: 'center',
    },
    outline: {
      // paddingVertical: baseSize * 0.2,
      // paddingHorizontal: baseSize,
      // backgroundColor: Colors.light.primary,
      borderRadius: baseSize * 0.3,
      justifyContent: 'center',
    },
    backAction: {
      flex: 1,
      margin: baseSize / 4,
      padding: baseSize / 4,
      backgroundColor: 'grey',
      borderRadius: baseSize / 4,
      // alignItems: 'center',
      justifyContent: 'center',
      // width: Layout.baseSize * 9,
    },
    actionTitleTextStyle: {
      color: type === 'enable' ? Colors.light.background : Colors.light.text,
      fontSize: baseSize,
    },
    uploadTitleTextStyle: {
      color: Colors.light.background,
    },
    textTitleStyle: {color: Colors.light.primary},
    action: {
      flex: 1,
      margin: baseSize / 4,
      padding: baseSize / 4,
      backgroundColor:
        type === 'enable' ? Colors.light.primary : Colors.light.tabIconDefault,
      borderRadius: baseSize / 4,
      // alignItems: 'center',
      justifyContent: 'center',
    },
    actionDisable: {
      flex: 1,
      padding: baseSize / 4,
      borderRadius: baseSize / 4,
      margin: baseSize / 4,
      // alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.light.tabIconDefault,
      // width: Layout.baseSize * 9,
    },
    secondary: {
      paddingVertical: baseSize / 3,
      // paddingHorizontal: baseSize,
      backgroundColor: Colors.light.secondary,
      borderRadius: baseSize * 0.3,
      // alignItems: 'center',
      justifyContent: 'center',
    },
    tertiary: {
      paddingVertical: baseSize / 2,
      paddingHorizontal: baseSize,
      // alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.light.background,
      width: window.width,
      borderRadius: Layout.baseSize / 3,
    },
    call: {
      backgroundColor: Colors.light.green,
      margin: 0,
      // marginHorizontal: baseSize / 4,
      height: 50, //Layout.baseSize * 3,
      width: 50, //Layout.baseSize * 3,
      borderRadius: baseSize / 4,
      alignItems: 'center',
      justifyContent: 'center',
    },
    danger: {
      flex: 1,
      margin: baseSize / 4,
      padding: baseSize / 4,
      backgroundColor: Colors.light.red,
      borderRadius: baseSize / 4,
      // alignItems: 'center',
      justifyContent: 'center',
      // flexDirection: 'row',
    },
    green: {
      flex: 1,
      margin: baseSize / 4,
      padding: baseSize / 4,
      backgroundColor: Colors.light.green,
      borderRadius: baseSize / 4,
      // alignItems: 'center',
      justifyContent: 'center',
    },
    floating: {
      position: 'absolute',
      right: Layout.baseSize,
      bottom: Layout.baseSize,
      height: Layout.baseSize * 3,
      width: Layout.baseSize * 3,
      borderRadius: Layout.baseSize * 1.5,
      backgroundColor: Colors.light.floatingColor,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: 'grey',
      elevation: 5,
      shadowOffset: {height: 2, width: 2},
      shadowOpacity: 0.5,
      shadowRadius: 2,
    },
    floating_chat: {
      position: 'absolute',
      left: Layout.baseSize,
      bottom: Layout.baseSize,
      height: Layout.baseSize * 3,
      width: Layout.baseSize * 3,
      borderRadius: Layout.baseSize * 1.5,
      backgroundColor: Colors.light.floatingColor,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: 'grey',
      elevation: 5,
      shadowOffset: {height: 2, width: 2},
      shadowOpacity: 0.5,
      shadowRadius: 2,
    },
    text: {
      flex: 1,
      alignSelf: 'flex-end',
      right: Layout.baseSize,
    },
    upload: {
      // paddingVertical: baseSize * 0.1,

      paddingVertical: baseSize * 0.1,
      paddingHorizontal: baseSize * 0.1,
      backgroundColor: Colors.light.primary,
      borderRadius: baseSize * 0.3,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    titleTextStyle: {
      color: !!type
        ? type === 'enable'
          ? Colors.light.background
          : Colors.light.inactiveTintColor
        : Colors.light.background,
      // fontSize: baseSize,
    },
  })

/**default variant */
// <TouchableOpacity
//   onPress={onPress}
//   style={[getStyles(), style, disabled && {backgroundColor: 'grey'}]}
//   disabled={loading || disabled}>
//   {loading ? (
//     <ActivityIndicator color={Colors.light.background} />
//   ) : (
//     <P1 style={styles.titleTextStyle} numberOfLines={1}>
//       {title}
//     </P1>
//   )}
//   {!!iconName && (
//     <Icon iconName={iconName} color={'white'} size={iconSize} />
//   )}
// </TouchableOpacity>

/** variant==='upload'*/
// <TouchableOpacity
//   disabled={disabled}
//   onPress={onPress}
//   style={StyleSheet.flatten([
//     getStyles(),
//     style,
//     disabled && {backgroundColor: 'grey'},
//   ])}>
//   <P1 style={styles.uploadTitleTextStyle} numberOfLines={1}>
//     {title}
//   </P1>
//   {!!iconName && (
//     <Icon
//       iconName={iconName}
//       color={Colors.light.background}
//       size={iconSize}
//     />
//   )}
// </TouchableOpacity>

/**variant==='text' */
// <TouchableOpacity onPress={onPress} style={[getStyles()]}>
//   <P1 style={styles.textTitleStyle} numberOfLines={1}>
//     {title}
//   </P1>
//   {/* <Icon iconName="keyboard-arrow-down" color="blue" /> */}
// </TouchableOpacity>

/**variant==='action' */
// <TouchableOpacity onPress={onPress} style={getStyles()}>
//   {loading ? (
//     <ActivityIndicator />
//   ) : (
//     <P1 style={styles.actionTitleTextStyle} numberOfLines={1}>
//       {title}
//     </P1>
//   )}
// </TouchableOpacity>

// if (variant === 'call') {
//   return (
//     <TouchableOpacity style={styles.call} onPress={onPress}>
//       <Icon iconName="call" color="white" />
//     </TouchableOpacity>
//   )
// }
// if (variant === 'tertiary') {
//   return (
//     <TouchableOpacity style={styles.tertiary} onPress={onPress}>
//       {loading ? (
//         <ActivityIndicator />
//       ) : (
//         <P2 style={styles.actionTitleTextStyle} numberOfLines={1}>
//           {title}
//         </P2>
//       )}
//     </TouchableOpacity>
//   )
// }
