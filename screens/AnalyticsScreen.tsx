import React from 'react'
import {ScrollView} from 'react-native-gesture-handler'
import {Text, View} from '../components/basic/Themed'
import ContributionGraph from '../components/composite/charts/ContributionGraph'
import LineCharts from '../components/composite/charts/LineCharts'
import {
  useLeadsStatusCountQuery,
  usePunchedEventsQuery,
  useUsersTaskDurationQuery,
} from '../generated/hooks_and_more'
import useLoggedInUser from '../hooks/useLoggedInUser'
import useUserToken from '../hooks/useUserToken'
import {getTimeDifference} from '../utils/analyticsHelper'
import {titleCaseToReadable} from '../utils/helpers'

export type ContributionValuesType = {
  count: number
  date: string
}

export default function AnalyticsScreen() {
  const {
    data: leadJourneyData,
    loading,
    error,
  } = useLeadsStatusCountQuery({
    variables: {},
  })
  const {userToken} = useUserToken()
  const {loggedInUser} = useLoggedInUser(userToken)
  const userId = loggedInUser?.id
  const {data: userTaskData, loading: loadingTask} = useUsersTaskDurationQuery({
    variables: {
      userID: userId,
    },
    fetchPolicy: 'network-only',
  })

  const leadJourneylabels = leadJourneyData?.queryLead?.map(item => item.regNo)
  const leadStatusCount = leadJourneyData?.queryLead?.map(
    item => item.statusEventsAggregate?.count,
  )
  const leadJourneyMetaData = leadJourneyData?.queryLead?.map(item =>
    titleCaseToReadable(item.statusEvents[0].status),
  )

  const statusChartData = userTaskData?.getUser?.punchedEvents
    ?.map(event => {
      return {
        status: titleCaseToReadable(event?.status as string),
        timeTaken: getTimeDifference(
          event?.createdAt,
          event?.previous?.createdAt,
        ),
        leadRegNo: event?.lead?.regNo,
      }
    })
    .filter(item => {
      let time = item?.timeTaken
      return !isNaN(time)
    })
  // console.log('statusChartData', statusChartData)

  const timeData = statusChartData?.map(item => item?.timeTaken)

  // console.log('timeData', timeData)

  const userTaskLabel = statusChartData?.map(item => item?.status)

  // console.log('userTaskLabel', userTaskLabel)
  const userTaskMetaData = statusChartData?.map(item => item?.leadRegNo)

  // console.log('userTaskMetaData', userTaskMetaData)

  const leadJourneyDataGraphProps = {
    labels: leadJourneylabels ?? [],
    datasets: [
      {
        data: leadStatusCount ?? [],
        color: (opacity = 5) => `rgba(255, 255,255, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ['Lead Journey (Reg No. / Task Count)'], // optional
  }

  const {data: punchedEventsData, loading: loadingContri} =
    usePunchedEventsQuery({
      //TODO: Check the code here for the difference between userId and loggedInUser?.id
      skip: !loggedInUser?.id,
      variables: {
        myId: userId,
      },
    })

  const userTaskDataGraphProps = {
    labels: userTaskLabel ?? [],
    datasets: [
      {
        data: timeData ?? [],
        color: (opacity = 5) => `rgba(255, 255,255, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ['User Tasks (Task / Task Time Taken,sec)'], // optional
  }

  const myTasksList = punchedEventsData?.getUser?.punchedEvents?.map(task => {
    const date = task?.createdAt
    return {
      date: date.substring(0, 10),
      id: task?.id,
    }
  })

  const map = new Map()
  myTasksList?.map(task => {
    if (map.has(task?.date)) {
      map.set(task?.date, map.get(task?.date) + 1)
    } else {
      map.set(task?.date, 1)
    }
  })
  const taskContributionMapData: Array<ContributionValuesType> = []
  for (const [key, value] of map) {
    taskContributionMapData.push({
      date: key,
      count: value,
    })
  }

  // console.log(taskContributionMapData)
  return (
    <ScrollView>
      {loading || loadingTask ? (
        <View style={{alignItems: 'center'}}>
          <Text>Loading...</Text>
        </View>
      ) : (
        <>
          {leadStatusCount.length ? (
            <LineCharts
              chartData={leadJourneyDataGraphProps}
              metaData={leadJourneyMetaData}
            />
          ) : null}
          {timeData.length ? (
            <LineCharts
              chartData={userTaskDataGraphProps}
              metaData={userTaskMetaData}
            />
          ) : null}
          {!loadingContri && (
            <ContributionGraph values={taskContributionMapData} />
          )}
        </>
      )}
    </ScrollView>
  )
}
