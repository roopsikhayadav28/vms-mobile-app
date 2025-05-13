import React, {useState} from 'react'
import {Dimensions} from 'react-native'
import {LineChart} from 'react-native-chart-kit'
import {Dataset} from 'react-native-chart-kit/dist/HelperTypes'
import {LineChartData} from 'react-native-chart-kit/dist/line-chart/LineChart'
import {Text as TextSVG} from 'react-native-svg'
import {LeadStatus} from '../../../generated/hooks_and_more'

const screenWidth = Dimensions.get('window').width

type LineChartsProps = {
  chartData: LineChartData
  metaData: LeadStatus[] | string[]
}

const LineCharts = ({chartData, metaData = []}: LineChartsProps) => {
  const [getX, setX] = useState<number>(0)
  const [getY, setY] = useState<number>(0)
  const [getLeadStatus, setLeadStatus] = useState<string>('')

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.1,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 3, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: true, // optional,
    //scrollableInfoSize: 100,
  }

  function onDataPointClick(data: {
    index: number
    value: number
    dataset: Dataset
    x: number
    y: number
    getColor: (opacity: number) => string
  }): void {
    setX(data.x)
    setY(data.y)
    setLeadStatus(metaData[data.index])
  }

  return (
    <LineChart
      data={chartData}
      width={screenWidth}
      height={screenWidth * 0.9}
      bezier={true}
      chartConfig={chartConfig}
      onDataPointClick={onDataPointClick}
      verticalLabelRotation={90}
      style={{
        backgroundColor: '#2f95dc',
        marginVertical: 12,
        borderRadius: 10,
        marginHorizontal: 8,
        alignItems: 'center',
        paddingBottom: 60,
        borderWidth: 2,
        borderColor: '#ffffff',
      }}
      renderDotContent={({x, y, index, indexData}) => {
        return (
          <TextSVG
            key={index}
            x={getX}
            y={getY}
            fill="white"
            fontSize="10"
            fillOpacity={5}
            fontWeight="normal"
            textAnchor="middle">
            {getLeadStatus}
          </TextSVG>
        )
      }}
    />
  )
}

export default LineCharts
