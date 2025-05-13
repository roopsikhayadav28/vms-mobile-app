import * as React from 'react'
import {StyleSheet, View} from 'react-native'
import {RadioButton} from 'react-native-paper'
import Colors from '../../constants/Colors'
import Layout from '../../constants/Layout'
import {commonStyle} from '../../constants/style'
import Separator from './Separator'
import {P1} from './StyledText'
import {Column, Row} from './StyledView'

interface RadioButtonProps {
  variant: 'pickup' | 'doc_check' | 'node' | 'cost' | 'payment_mode'
  title?: string
  value?: string
  firstValue?: string
  secondValue?: string
  firstComponent?: React.ReactNode
  secondComponent?: React.ReactNode
  onPress?: () => void
  onValueChange?: (value: any) => void
}

const RNRadioButton = ({
  variant,
  title,
  value,
  firstValue,
  secondValue,
  firstComponent,
  secondComponent,
  onValueChange,
  onPress,
}: RadioButtonProps) => {
  function getStyles() {
    switch (variant) {
      case 'pickup':
        return styles.pickup
      case 'doc_check':
        return styles.doc_check
      case 'node':
        return styles.node
      case 'cost':
        return styles.cost
      case 'payment_mode':
        return styles.payment_mode
      default:
        return {}
    }
  }
  if (variant === 'node') {
    return (
      <View>
        <P1 style={styles.titleStyle}>{title}</P1>
        <RadioButton.Group
          onValueChange={onValueChange}
          value={value as string}>
          <View style={commonStyle.flexColumn}>
            <View style={styles.radioButtonPickup}>
              <Column>
                <Row>
                  <RadioButton color={Colors.light.primary} value="first" />
                  <P1 style={styles.buttonText}>{firstValue} </P1>
                </Row>
                {firstComponent}
              </Column>
            </View>
            <Separator />
            <View style={[styles.radioButtonPickup]}>
              <Column>
                <Row>
                  <RadioButton color={Colors.light.primary} value="second" />
                  <P1 style={styles.buttonText}>{secondValue}</P1>
                </Row>
                {secondComponent}
              </Column>
            </View>
          </View>
        </RadioButton.Group>
      </View>
    )
  }

  if (variant === 'cost') {
    return (
      <RadioButton.Group onValueChange={onValueChange} value={value as string}>
        <View style={styles.titleStyle}>
          <P1>{title}</P1>
          <View style={styles.container}>
            <RadioButton color={Colors.light.primary} value={firstValue} />
            <P1> Calculated by Ops </P1>
          </View>
          <Separator />
          <View style={styles.container}>
            <RadioButton color={Colors.light.primary} value={secondValue} />
            <P1>Quoted by Driver</P1>
          </View>
        </View>
      </RadioButton.Group>
    )
  }
  if (variant === 'payment_mode') {
    return (
      <View style={getStyles()}>
        <P1>{title}</P1>
        <RadioButton.Group
          onValueChange={onValueChange}
          value={value as string}>
          <View style={commonStyle.flexRow}>
            <View style={styles.radioButtonPickup}>
              <RadioButton color={Colors.light.primary} value="first" />
              <P1 style={styles.buttonText}>{firstValue}</P1>
            </View>
            <View
              style={[
                styles.radioButtonPickup,
                {
                  marginLeft: Layout.baseSize * 3,
                },
              ]}>
              <RadioButton color={Colors.light.primary} value="second" />
              <P1 style={styles.buttonText}> {secondValue}</P1>
            </View>
          </View>
        </RadioButton.Group>
      </View>
    )
  }
  return (
    <View style={getStyles()}>
      <P1>{title}</P1>
      <RadioButton.Group onValueChange={onValueChange} value={value as string}>
        <View style={commonStyle.flexRow}>
          <View style={styles.radioButtonPickup}>
            <RadioButton color={Colors.light.primary} value="first" />
            <P1 style={styles.buttonText}>
              {variant === 'pickup' && firstValue ? firstValue : 'Yes'}
            </P1>
          </View>
          <View
            style={[
              styles.radioButtonPickup,
              {
                marginLeft:
                  variant === 'pickup' ? Layout.baseSize * 3 : Layout.baseSize,
              },
            ]}>
            <RadioButton color={Colors.light.primary} value="second" />
            <P1 style={styles.buttonText}>
              {variant === 'pickup' && secondValue ? secondValue : 'No'}
            </P1>
          </View>
        </View>
      </RadioButton.Group>
    </View>
  )
}

export default RNRadioButton

const styles = StyleSheet.create({
  pickup: {
    // width: Layout.window.width,
    marginHorizontal: Layout.baseSize,
    paddingVertical: Layout.baseSize * 0.3,
  },
  payment_mode: {
    marginHorizontal: Layout.baseSize,
    paddingVertical: Layout.baseSize * 0.3,
  },
  doc_check: {
    marginHorizontal: Layout.baseSize,
    paddingVertical: Layout.baseSize * 0.3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  node: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  titleStyle: {flexDirection: 'column', margin: Layout.baseSize * 0.5},
  buttonText: {
    marginLeft: Layout.baseSize / 13,
  },
  radioButtonPickup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  cost: {},
  container: {flexDirection: 'row', alignItems: 'center'},
})
