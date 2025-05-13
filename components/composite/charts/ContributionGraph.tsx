import {ContributionGraph} from 'react-native-chart-kit'
import {Rect, Svg, RectProps} from 'react-native-svg'
import {View, Text, Dimensions, StyleSheet} from 'react-native'
import React, {useState} from 'react'
import {ContributionValuesType} from '../../../screens/AnalyticsScreen'
import {validDateFormate} from '../../../utils/helpers'
const screenWidth = Dimensions.get('window').width

export type ContributionChartValue = {
  value: number
  title: string
  tooltipDataAttrs: TooltipDataAttrs
  onDataPointClick?: (data: {
    index: number
    value: number
    x: number
    y: number
    getColor: (opacity: number) => string
  }) => void

  date: Date
}

export type TooltipDataAttrs = (
  value: ContributionChartValue,
) => Partial<RectProps> | Partial<RectProps>

type propsType = {
  values: Array<ContributionValuesType>
}

const ContributionGraphChart = ({values}: propsType) => {
  const [visible, setVisible] = useState(false)
  const [tooltipData, setTooltipData] = useState({count: String, date: String})

  // console.log('value', values)

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(47, 149, 220, ${opacity})`,
    style: {
      borderRadius: 16,
      backgraoundColor: '#f2f2f2',
    },
  }
  const handleToolTip = (): any => {
    return
  }

  // console.log(state)
  return (
    <View style={styles.container}>
      {visible && (
        <View style={styles.tolltipWrapper}>
          <Text style={styles.tooltipText}>{`Date: ${validDateFormate(
            tooltipData.date?.toString(),
          )}, Contribution: ${tooltipData.count}`}</Text>
        </View>
      )}
      <ContributionGraph
        endDate={new Date()}
        numDays={105}
        width={screenWidth - 20}
        height={220}
        chartConfig={chartConfig}
        values={values}
        squareSize={20}
        onDayPress={data1 => {
          setTimeout(() => {
            setVisible(false)
          }, 2000)
          setVisible(true)
          setTooltipData(data1)
        }}
        tooltipDataAttrs={handleToolTip}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {alignItems: 'center', padding: 10},
  tolltipWrapper: {
    position: 'absolute',
    alignItems: 'center',
    width: '100%',
    zIndex: 1,
  },
  tooltipText: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#2f95dc',
  },
  chartContainer: {
    color: '#fff',
    // backgroundColor: '#2f95dc',
  },
})
export default ContributionGraphChart
