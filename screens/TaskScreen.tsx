import * as React from 'react'
import {useCallback} from 'react'
import {StyleSheet, ToastAndroid, View} from 'react-native'

// import RNRadioButton from "../components/basic/RNRadioButton";
import Button from '../components/basic/Button'
import TaskList from '../components/lists/TaskList'
import {
  LeadSource,
  useMyPendingTasksQuery,
  useNumberOfPendingTasksQuery,
  usePunchedEventsQuery,
  UserRole,
} from '../generated/hooks_and_more'
import useLoggedInUser from '../hooks/useLoggedInUser'
import useUserToken from '../hooks/useUserToken'
import {RootStackScreenProps} from '../navigation/navigationTypes'
import {log} from '../utils/helpers'
import useUnstuckLeads from '../hooks/useUnstuckLeads'

type TaskScreenProps = RootStackScreenProps<'LeadProcessScreen'>
export default function TaskScreen({navigation}: TaskScreenProps) {
  const {userToken} = useUserToken()
  const {loggedInUser} = useLoggedInUser(userToken)
  const isRoleDriver = loggedInUser?.role === UserRole.Driver
  // get all tasks
  /* const { data, refetch, loading } = useAllTasksQuery({
    fetchPolicy: "cache-and-network",
    variables: { myId: userToken as string },
  }); */

  // console.log('This is the logged in user id', loggedInUser?.id)
  // console.log('User Credentials', {
  //   id: loggedInUser?.id,
  //   role: loggedInUser?.role,
  // })
  const {data, refetch, loading, fetchMore} = useMyPendingTasksQuery({
    skip: !loggedInUser?.id || !loggedInUser?.role,
    variables: {
      myId: loggedInUser?.id,
      role: loggedInUser?.role,
    },
    fetchPolicy: 'cache-and-network',
    onError: error => {
      log('Error in fetching tasks', {error})
      ToastAndroid.showWithGravity(
        'No Internet',
        (ToastAndroid.SHORT = 10),
        ToastAndroid.CENTER,
      )
    },
  })
  const myPendingTasks = data?.myPendingTasks

  // query for number of pending tasks
  const {data: numberOfPendingTasksData} = useNumberOfPendingTasksQuery({
    skip: !loggedInUser?.id || !loggedInUser?.role,
    variables: {role: loggedInUser?.role, myId: loggedInUser?.id},
    fetchPolicy: 'cache-and-network',
    onError: error => {
      log('Error in fetching tasks', {error})
      ToastAndroid.showWithGravity(
        'No Internet',
        (ToastAndroid.SHORT = 10),
        ToastAndroid.CENTER,
      )
    },
  })
  // query for number of tasks completed
  const {data: punchedEventsData} = usePunchedEventsQuery({
    variables: {myId: loggedInUser?.id},
  })
  // console.log('Single data point', data?.pendingTasks[0]?.statusEvents)

  // const {
  //   data: tasksForSearchedDriverData,
  //   loading: loadingTasksForDriverData,
  //   refetch: refetchTasksForDriverData,
  //   fetchMore: fetchTasksForDriver,
  // } = useSearchTasksForDriverQuery({
  //   skip: !isRoleDriver,
  //   variables: {
  //     username: loggedInUser?.name,
  //     userRole: loggedInUser?.role,
  //   },
  // })

  /* TODO: Task data's role based boundary checking only applies to DRIVER for now.
      will be applied to more roles in the future as requirements come.
  */

  // log(`User name: ${loggedInUser?.name} user role:${loggedInUser?.role}`, {})

  // const allTasksDataExceptDriver = data?.queryLead?.filter(
  //   l => l?.statusEvents?.[0]?.assignTaskTo === loggedInUser?.role,
  // )
  // console.log('This is the allTasksDataExceptDriver', allTasksDataExceptDriver)
  // console.log('All leads count', data?.queryLead?.length)
  // console.log(
  //   'All tasks Data except driver for my role',
  //   allTasksDataExceptDriver?.length,
  // )
  const noOfTasksCompletedByMe =
    punchedEventsData?.getUser?.punchedEventsAggregate?.count
  // const noOfTasksPendingOnMe = data?.getUser?.punchedEventsAggregate?.count  //to be separately taken

  const onPullToRefresh = useCallback(() => {
    // log('should refetch tasks', {})
    // if (!isRoleDriver) {
    // console.log(
    //   'This is the offset value before refetch',
    //   data?.queryLead?.length,
    // )
    refetch()
    // } else {
    //   refetchTasksForDriverData()
  }, [refetch])

  const onEndReached = () => {
    if (data && data?.myPendingTasks && data?.myPendingTasks.length > 0) {
      fetchMore({variables: {offset: data?.myPendingTasks?.length}})
      // } else if (
      //   tasksForSearchedDriverData &&
      //   tasksForSearchedDriverData?.queryLead &&
      //   tasksForSearchedDriverData?.queryLead?.length > 0
      // ) {
      //   fetchTasksForDriver({
      //     variables: {offset: tasksForSearchedDriverData?.queryLead?.length},
      //   })
      // }
    }
    // , [
    //   data?.queryLead,
    //   data?.queryLead.length,
    //   tasksForSearchedDriverData?.queryLead,
    //   tasksForSearchedDriverData?.queryLead?.length,
    // ])
  }
  const handleNavigation = () => navigation.navigate('MessagesScreen')

  const handlePressFloatingButton = () => {
    navigation.navigate('LeadProcessScreen', {
      leadId: undefined,
      currentStatus: undefined,
      regNo: undefined,
      source: LeadSource.BankAuction,
    })
  }

  // const taskData = isRoleDriver
  //   ? tasksForSearchedDriverData?.queryLead
  //   : myPendingTasks

  // log('Task data', taskData)

  return (
    <View style={styles.container}>
      <TaskList
        data={myPendingTasks}
        completedTasks={noOfTasksCompletedByMe}
        onPullToRefresh={onPullToRefresh}
        refreshing={loading}
        onEndReached={onEndReached}
        numberOfPendingTasks={
          numberOfPendingTasksData?.numberOfPendingTasks?.count
        }
      />
      {loggedInUser?.role === UserRole.ProcurementExecutive && (
        <Button
          variant="floating"
          iconName="add"
          onPress={handlePressFloatingButton}
        />
      )}
      {/* <Button
        variant="green"
        onPress={() =>
          navigation.navigate("ViewImageScreen", {
            imageUrl: "https://picsum.photos/300",
          })
        }
      />

      <Button
        variant="danger"
        onPress={() =>
          navigation.navigate("ViewPdfScreen", {
            pdfUrl:
              "https://www.motorolasolutions.com/content/dam/msi/docs/products/two-way-radios/mototrbo/mobile-radios/xir-m8600i/xir_m8600i_ds_ap.pdf",
          })
        }
      /> */}
      <Button
        iconName="chat"
        variant="floating_chat"
        onPress={handleNavigation}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
