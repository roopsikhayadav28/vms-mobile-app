import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import React from 'react'
import {
  PaymentStatus,
  RefurbishmentStatus,
} from '../../generated/hooks_and_more'
import Layout from '../../constants/Layout'
import Colors from '../../constants/Colors'
import {getIconColorForStatus, getIconNameForStatus} from '../../utils/helpers'
import Icon from './Icon'
import {P2} from './StyledText'

type TouchableLineItemProps = {
  onPress: () => void
  label: string | number | boolean
  value: string | number | boolean | RefurbishmentStatus
  style?: StyleProp<ViewStyle>
  variant?: '1' | '2' | '3' | '3withIcon'
  secondValue?: string | number | boolean
}

const TouchableLineItem = ({
  onPress,
  label,
  value,
  variant,
  secondValue,
}: TouchableLineItemProps) => {
  if (variant === '3') {
    return (
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <Text style={{color: 'grey'}}>{label}</Text>
        <Text style={{color: 'grey'}}>{secondValue}</Text>
        <Text style={{color: 'grey'}}>{value}</Text>
      </TouchableOpacity>
    )
  }

  if (variant === '3withIcon') {
    return (
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <Text style={{color: 'grey'}}>{label}</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={{color: 'grey', marginRight: Layout.baseSize}}>
            {value}
          </Text>
          {!!secondValue ? (
            <Icon
              iconName={getIconNameForStatus(secondValue as PaymentStatus)}
              color={getIconColorForStatus(secondValue as PaymentStatus)}
            />
          ) : (
            <P2>-</P2>
          )}
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={{color: 'grey'}}>{label}</Text>
      <Text style={{color: 'grey'}}>{value}</Text>
    </TouchableOpacity>
  )
}

export default TouchableLineItem

const styles = StyleSheet.create({
  container: {
    borderBottomRightRadius: Layout.baseSize,
    borderBottomLeftRadius: Layout.baseSize,
    borderTopRightRadius: Layout.baseSize,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Layout.baseSize / 2,
    marginHorizontal: Layout.baseSize,
  },
})
