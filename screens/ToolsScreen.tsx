import React from 'react'
import {Linking, StyleSheet, View, Text} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import Button from '../components/basic/Button'
import Icon from '../components/basic/Icon'
import Separator from '../components/basic/Separator'
import {H3} from '../components/basic/StyledText'
import Colors from '../constants/Colors'
import Layout from '../constants/Layout'
import {log} from '../utils/helpers'
const {baseSize, window} = Layout
export default function ToolsScreen() {
  const EMICalculatorURL =
    'https://www.tractorjunction.com/tractor-loan-emi-calculator/'
  const usedPriceEvaluatorURL =
    'https://www.tractorjunction.com/used-tractor-valuation/'

  const openEMICalculatorURL = async () => {
    const supported = await Linking.canOpenURL(EMICalculatorURL)
    supported
      ? await Linking.openURL(EMICalculatorURL)
      : log("Can't open EMI Calculator")
  }

  const openUsedPriceEvaluationURL = async () => {
    const supported = await Linking.canOpenURL(usedPriceEvaluatorURL)
    supported
      ? await Linking.openURL(usedPriceEvaluatorURL)
      : log('Cant Open Used Price Evaluator at this Time')
  }

  return (
    // <View style={styles.container}>
    //   <H3>Useful Tools</H3>
    //   <Separator />

    //   <Button
    //     title="EMI Calculator"
    //     variant="tools"
    //     onPress={openEMICalculatorURL}
    //   />
    //   <Separator />
    //   <Button
    //     title="Used Price Evaluator"
    //     variant="tools"
    //     onPress={openUsedPriceEvaluationURL}
    //   />
    // </View>
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={openEMICalculatorURL}>
        <Text>EMI Calculator</Text>
        <Icon iconName="arrow-forward" color={Colors.light.primary} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={openUsedPriceEvaluationURL}>
        <Text>Used Price Evaluator</Text>
        <Icon iconName="arrow-forward" color={Colors.light.primary} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Layout.baseSize * 0.5,
    backgroundColor: Colors.light.background,
  },
  button: {
    margin: baseSize / 4,
    padding: baseSize * 0.8,
    borderRadius: baseSize / 4,
    alignItems: 'center',
    backgroundColor: Colors.dark.screenBg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: baseSize / 2,
  },
})
