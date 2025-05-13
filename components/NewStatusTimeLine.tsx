// import {FlashList, ListRenderItem} from '@shopify/flash-list'
import React from 'react'
import {ListRenderItem, StyleSheet, TouchableOpacity, View} from 'react-native'
import {FlatList} from 'react-native-gesture-handler'
import Colors from '../constants/Colors'
import {LEAD_UPDATED, UPDATE_LEAD} from '../constants/constants'
import Layout from '../constants/Layout'
import {LeadSource, LeadStatusEventRef} from '../generated/hooks_and_more'
import {fromNow, titleCaseToReadable} from '../utils/helpers'
import Icon from './basic/Icon'
import {H3, P1, P2} from './basic/StyledText'

type StatusTimelineProps = {
  data?: Array<LeadStatusEventRef>
  horizontal?: boolean
  source?: LeadSource
  onActionSheethide: () => void
}

const NewStatusTimeLine = ({
  data,
  source,
  onActionSheethide,
}: StatusTimelineProps) => {
  /*
  const {data: leadStatusFlowData} = useLeadStatusFlowQuery({
    variables: {
      source,
    },
  })

  const currentStatusSpecs = leadStatusFlowData?.queryLeadStatusFlow?.find(
    e =>
      e.current === data?.[0]?.status &&
      !e?.next?.toLowerCase()?.includes('rejected') &&
      !e?.next?.toLowerCase()?.includes('lost'),
  ) */

  const renderItem: ListRenderItem<LeadStatusEventRef> = ({item, index}) => {
    const isLastItem = index !== data?.length - 1
    return (
      <>
        {!!item?.assignTaskTo && !item?.isTaskCompleted && (
          <View style={styles.container}>
            <View style={styles.lineContainer}>
              <View style={[styles.circle, {backgroundColor: 'grey'}]} />
              {<View style={styles.verticalLine} />}
            </View>
            <View
              style={{
                ...styles.renderItemContainer,
                paddingBottom: isLastItem
                  ? Layout.baseSize * 2
                  : Layout.baseSize * 4,
              }}>
              <H3>
                {item?.preTimeline === LEAD_UPDATED
                  ? UPDATE_LEAD
                  : item?.preTimeline}
              </H3>
              {!!item.createdAt && (
                <P2 style={styles.timestampStyles}>
                  {fromNow(new Date(item.createdAt)) + ' ago'}
                </P2>
              )}
              <P2 style={styles.timestampStyles}>
                {'pending on ' + titleCaseToReadable(item?.assignTaskTo)}
              </P2>
            </View>
          </View>
        )}
        <View style={styles.container}>
          <View style={styles.lineContainer}>
            <View style={styles.circle} />
            {isLastItem && <View style={styles.verticalLine} />}
          </View>
          <View
            style={{
              ...styles.renderItemContainer,
              paddingBottom: isLastItem
                ? Layout.baseSize * 2
                : Layout.baseSize * 4,
            }}>
            <H3>{item?.postTimeline ?? titleCaseToReadable(item?.status)}</H3>
            {!!item.createdAt && (
              <P2 style={styles.timestampStyles}>
                {fromNow(new Date(item.createdAt)) + ' ago'}
              </P2>
            )}
            <P2 style={styles.timestampStyles}>
              {'by ' + item?.createdBy?.name}
            </P2>
            {item?.remarks && (
              <View style={styles.remarkField}>
                <P2>{item?.remarks}</P2>
              </View>
            )}
          </View>
        </View>
      </>
    )
  }

  return (
    <View style={styles.actionSheetContainer}>
      <View style={styles.actionSheetHeadContainer}>
        <P1>Activity Timeline</P1>
        <TouchableOpacity onPress={onActionSheethide}>
          <Icon iconName="keyboard-arrow-down" />
        </TouchableOpacity>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        /* ListHeaderComponent={
          <View style={styles.listFooterComponent}>
            {currentStatusSpecs?.next && currentStatusSpecs?.assignTaskTo && (
              <View style={styles.lineContainer}>
                <View style={{...styles.circle, backgroundColor: 'gray'}} />
                <View style={styles.verticalLine} />
              </View>
            )}
            {currentStatusSpecs?.next && currentStatusSpecs?.assignTaskTo && (
              <View
                style={{
                  flexDirection: 'column',
                  paddingBottom: Layout.baseSize,
                }}>
                <P2>
                  {`${
                    nextTimeLineAction ??
                    titleCaseToReadable(currentStatusSpecs?.next)
                  }`}
                </P2>
                <P2 style={styles.timestampStyles}>
                  {'pending on ' +
                    titleCaseToReadable(currentStatusSpecs?.assignTaskTo)}
                </P2>
              </View>
            )}
          </View>
        }
        ListFooterComponentStyle={styles.listFooterContainerStyle} */
        data={data ?? []}
        renderItem={renderItem}
      />
    </View>
  )
}

export default NewStatusTimeLine

const styles = StyleSheet.create({
  verticalItemContainer: {
    flexDirection: 'row',
  },
  listFooterComponent: {
    flexDirection: 'row',
  },
  container: {
    flexDirection: 'row',
  },
  lineContainer: {
    alignItems: 'center',
    marginRight: 10,
  },
  actionSheetContainer: {
    paddingHorizontal: Layout.baseSize,
  },
  horizontalItemContainer: {
    flexDirection: 'column',
  },
  remarkField: {
    backgroundColor: Colors.light.colorRbg,
    padding: Layout.baseSize / 2,
    borderRadius: Layout.baseSize / 4,
    marginTop: Layout.baseSize / 4,
  },
  horizontalLine: {
    width: StyleSheet.hairlineWidth * 4,
    backgroundColor: 'grey',
  },
  verticalLine: {
    flex: 1,
    width: 2,
    backgroundColor: Colors.light.tint,
  },
  circle: {
    height: Layout.baseSize * 0.75,
    width: Layout.baseSize * 0.75,
    borderRadius: Layout.baseSize / 2,
    backgroundColor: Colors.light.tint,
  },
  actionSheetHeadContainer: {
    paddingVertical: Layout.baseSize / 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  iconStyles: {marginTop: Layout.baseSize * 0.5},
  renderItemContainer: {
    flex: 1,
  },
  timestampStyles: {
    marginTop: Layout.baseSize / 5,
  },
  listFooterContainerStyle: {},
})
