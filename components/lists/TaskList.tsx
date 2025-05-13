import {FlashList, ListRenderItem} from '@shopify/flash-list'
import {RefreshControl, StyleSheet, View} from 'react-native'
import Layout from '../../constants/Layout'
import {commonStyle} from '../../constants/style'
import {LeadStatus, MyPendingTasksQuery} from '../../generated/hooks_and_more'
import ListEmptyComponent from '../basic/ListEmptyComponent'
import Separator from '../basic/Separator'
import {H3} from '../basic/StyledText'
import TaskGrid from '../basic/TaskGrid'
import TaskSummaryCard from '../TaskSummaryCard'

type TaskListProps = {
  data: MyPendingTasksQuery['myPendingTasks']
  onPullToRefresh: () => void
  refreshing: boolean
  completedTasks: number
  onEndReached: () => void
  numberOfPendingTasks: number
}
export default function TaskList({
  data,
  completedTasks,
  onPullToRefresh,
  refreshing,
  onEndReached,
  numberOfPendingTasks,
}: TaskListProps) {
  const ListHeaderComponent = () => {
    return (
      <View>
        <View style={styles.taskGridContainer}>
          <TaskGrid
            pendingTasksNo={numberOfPendingTasks}
            completedTasks={completedTasks}
          />
        </View>
        <Separator size={1} />
        <View style={styles.textStyles}>
          <H3>Pending Tasks</H3>
          {/* <TouchableOpacity>
            <H3 style={{ color: Colors.light.primary }}>See All</H3>
          </TouchableOpacity> */}
        </View>
      </View>
    )
  }

  const EmptyComponent = () => (
    <ListEmptyComponent text={'You have no pending tasks'} />
  )

  const keyExtractor = (item, index) => `task-${index}`

  const renderItem: ListRenderItem<
    MyPendingTasksQuery['myPendingTasks'][0]
  > = ({item}) => {
    const date = new Date(item?.createdAt).toDateString()
    const time = new Date(item?.createdAt)
      .toTimeString()
      .split(' ')[0]
      .slice(0, 5)
    return (
      <TaskSummaryCard
        buttonTitle={item?.taskButtonTitle ?? 'Do something'}
        title={item?.taskTitle}
        date={date}
        time={time}
        currentStatus={item?.status as LeadStatus}
        leadId={item?.lead?.id}
        regNo={item?.lead?.regNo}
        make={item?.lead?.vehicle?.make}
        createdBy={item?.createdBy}
        lseId={item?.id}
      />
    )
  }

  const estimatedItemSize = Layout.baseSize * 12.5

  return (
    <View style={styles.container}>
      <FlashList
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        data={data}
        onEndReached={onEndReached}
        ListEmptyComponent={EmptyComponent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onPullToRefresh} />
        }
        ListHeaderComponent={ListHeaderComponent}
        ListHeaderComponentStyle={commonStyle.marginBottom16}
        ListFooterComponentStyle={commonStyle.marginBottom16}
        ItemSeparatorComponent={Separator}
        renderItem={renderItem}
        estimatedItemSize={estimatedItemSize}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  taskGridContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Layout.baseSize * 0.5,
  },
  textStyles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Layout.baseSize,
  },
  container: {flexGrow: 1, flexDirection: 'row'},
})
