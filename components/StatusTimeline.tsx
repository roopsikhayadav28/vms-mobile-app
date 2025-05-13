import {FlashList, ListRenderItem} from '@shopify/flash-list'
import React, {useRef} from 'react'
import {StyleSheet, View} from 'react-native'
import {Chip} from 'react-native-paper'
import Layout from '../constants/Layout'
import {
  LeadSource,
  LeadStatusEvent,
  useLeadStatusFlowQuery,
} from '../generated/hooks_and_more'
import {fromNow, titleCaseToReadable} from '../utils/helpers'
import Icon from './basic/Icon'
import {P2} from './basic/StyledText'
import {LEAD_UPDATED, UPDATE_LEAD} from '../constants/constants'

type StatusTimelineItem = Pick<
  LeadStatusEvent,
  | 'createdBy'
  | 'createdAt'
  | 'status'
  | 'assignTaskTo'
  | 'postTimeline'
  | 'preTimeline'
>

type StatusTimelineProps = {
  data?: Array<StatusTimelineItem>
  horizontal?: boolean
  source?: LeadSource
}

/* const dummyData: StatusTimelineProps["data"] = [
  {
    status: LeadStatus.LeadGenerated,
    by: "Archit Tiwari",
    createdAt: new Date(),
    isDone: true,
  },
  {
    status: LeadStatus.VehicleDetailsUpdated,
    by: "Archit Tiwari",
    createdAt: new Date(),
    isDone: true,
  },
  {
    status: LeadStatus.LeadVehicleImagesUploaded,
    by: "Archit Tiwari",
    createdAt: new Date(),
    isDone: false,
  },
]; */

const StatusTimeline = ({data, horizontal, source}: StatusTimelineProps) => {
  const nextTimeLineAction =
    data?.[data?.length - 1]?.preTimeline === LEAD_UPDATED
      ? UPDATE_LEAD
      : data?.[data?.length - 1]?.preTimeline

  const flashListRef = useRef<FlashList<StatusTimelineItem>>()
  const {data: leadStatusFlowData} = useLeadStatusFlowQuery({
    variables: {
      source,
    },
    // onCompleted(data) {
    //   // log(
    //   //   ' in status timeline',
    //   //   JSON.stringify(data?.queryLeadStatusFlow, null, 2),
    //   // )
    // },
  })
  const currentStatusSpecs = leadStatusFlowData?.queryLeadStatusFlow?.find(
    e =>
      e.current === data?.[data?.length - 1]?.status &&
      !e?.next?.toLowerCase()?.includes('rejected') &&
      !e?.next?.toLowerCase()?.includes('lost'),
  )
  const handleOnLoad = () => {
    if (flashListRef && flashListRef.current) {
      requestAnimationFrame(() => {
        setTimeout(
          () => flashListRef.current?.scrollToEnd({animated: true}),
          1000,
        )
      })
    }
  }

  const renderItem: ListRenderItem<StatusTimelineItem> = ({item, index}) => {
    // log('Status', item?.status)
    return (
      <View style={styles.renderItemContainer}>
        <Chip mode="outlined" selected={index < (data?.length ?? 0)}>
          {item?.postTimeline ?? titleCaseToReadable(item?.status)}
        </Chip>
        <P2 style={styles.timestampStyles}>{'by ' + item?.createdBy?.name}</P2>
        {!!item.createdAt && (
          <P2 style={styles.timestampStyles}>
            {fromNow(new Date(item.createdAt)) + ' ago'}
          </P2>
        )}
      </View>
    )
  }

  const estimatedListSize = {
    height: Layout.baseSize * 4,
    width: Layout.window.width,
  }

  return (
    <FlashList
      onLoad={handleOnLoad}
      ref={flashListRef}
      showsHorizontalScrollIndicator={false}
      horizontal={horizontal}
      ItemSeparatorComponent={() => (
        <Icon iconName="chevron-right" style={styles.iconStyles} />
      )}
      ListFooterComponent={
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon iconName="chevron-right" style={styles.iconStyles} />
          {currentStatusSpecs?.next && currentStatusSpecs?.assignTaskTo && (
            <View style={{flexDirection: 'column'}}>
              <Chip mode="outlined">
                {`.. ${
                  nextTimeLineAction ??
                  titleCaseToReadable(currentStatusSpecs?.next)
                }`}
              </Chip>
              <P2 style={styles.timestampStyles}>
                {'pending on ' +
                  titleCaseToReadable(currentStatusSpecs?.assignTaskTo)}
              </P2>
            </View>
          )}
        </View>
      }
      ListFooterComponentStyle={styles.listFooterContainerStyle}
      data={data}
      renderItem={renderItem}
      estimatedItemSize={225}
      estimatedListSize={estimatedListSize}
    />
  )
}

export default StatusTimeline

const styles = StyleSheet.create({
  verticalItemContainer: {
    flexDirection: 'row',
  },
  horizontalItemContainer: {
    flexDirection: 'column',
  },
  horizontalLine: {
    width: StyleSheet.hairlineWidth * 4,
    // flex: 1,
    backgroundColor: 'grey',
  },
  verticalLine: {
    height: StyleSheet.hairlineWidth * 4,
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'grey',
  },
  circle: {
    height: Layout.baseSize,
    width: Layout.baseSize,
    borderRadius: Layout.baseSize / 2,
    backgroundColor: 'grey',
  },
  iconStyles: {marginTop: Layout.baseSize * 0.5},
  renderItemContainer: {},
  timestampStyles: {paddingLeft: Layout.baseSize},
  listFooterContainerStyle: {},
})
