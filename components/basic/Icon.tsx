// icon based on fontfiles....
// or a library
// or using images
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import {StyleProp, ViewStyle} from 'react-native'
import Layout from '../../constants/Layout'

/* NOTE: Helps to auto suggest the icon names of MaterialIcons in the IDE.
  Don't need to create a new type for each icon name separately. Helps to avoid typos.
 */
export type IconName = React.ComponentProps<typeof MaterialIcons>['name']

export type IconProps = {
  iconName: IconName
  isFocused?: boolean
  color?: string
  size?: number
  style?: StyleProp<ViewStyle>
  onPress?: () => void
}

export default function Icon({
  iconName,
  style,
  size = Layout.baseSize * 1.6,
  color = 'grey',
  isFocused,
  onPress,
}: IconProps) {
  return (
    <MaterialIcons
      style={style}
      onPress={onPress}
      name={iconName}
      size={size}
      color={color}
    />
  )
}

// export type IconName =
//   | 'notifications-none'
//   | 'picture-as-pdf'
//   | 'search'
//   | 'check-box'
//   | 'video-library'
//   | 'settings'
//   | 'filter-list'
//   | 'add'
//   | 'arrow-back'
//   | 'call'
//   | 'keyboard-arrow-down'
//   | 'chevron-right'
//   | 'date-range'
//   | 'phone-iphone'
//   | 'leaderboard'
//   | 'inventory'
//   | 'logout'
//   | 'analytics'
//   | 'play-circle-fill'
//   | 'play-circle-outline'
//   | 'file-upload'
//   | 'drive-folder-upload'
//   | 'camera-alt'
//   | 'image'
//   | 'cancel'
//   | 'check-circle'
//   | 'list-alt'
//   | 'calendar-today'
//   | 'access-time'
//   | 'playlist-add-check'
//   | 'send'
//   | 'chat'
//   | 'email'
//   | 'crop-square'
//   | 'crop'
//   | 'keyboard-arrow-right'
//   | 'arrow-forward'
//   | 'arrow-drop-down'
//   | 'phone'
