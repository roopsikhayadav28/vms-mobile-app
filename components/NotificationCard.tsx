import {useNavigation} from '@react-navigation/native'
import React, {memo, useCallback} from 'react'
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native'
import {Chip, Surface} from 'react-native-paper'
import Colors from '../constants/Colors'
import Layout from '../constants/Layout'
import {LeadStatusEventRef} from '../generated/hooks_and_more'
import {RootStackScreenProps} from '../navigation/navigationTypes'
import {titleCaseToReadable} from '../utils/helpers'
import DataTimeView from './basic/DataTimeView'
import {P1, P2} from './basic/StyledText'

type NotificationCardProps = {
  data: LeadStatusEventRef
}
function NotificationCard({data}: NotificationCardProps) {
  const navigation =
    useNavigation<
      RootStackScreenProps<'ViewNotificationsDetails'>['navigation']
    >()

  const date = new Date(data?.createdAt).toDateString()
  const time = new Date(data?.createdAt)
    .toTimeString()
    .split(' ')[0]
    .slice(0, 5)

  const regNo = data?.lead?.regNo
  const currentStatus = data?.status
  const make = data?.lead?.vehicle?.make

  const handleNavigation = useCallback(() => {
    navigation.navigate('ViewNotificationsDetails', {
      screen: 'LeadDetailsScreen',
      params: {
        regNo: regNo,
        currentStatus: currentStatus,
      },
    })

    // navigation.replace('Drawer', {
    //   screen: 'Leads',
    //   params: {
    //     screen: 'LeadDetailsScreen',
    //     params: {
    //       regNo: regNo,
    //       currentStatus: currentStatus,
    //     },
    //   },
    // })
  }, [regNo, currentStatus])

  return (
    <Surface style={styles.container} elevation={1}>
      <TouchableOpacity
        disabled={!regNo || regNo.length <= 0}
        onPress={handleNavigation}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          style={styles.scrollContainer}
          contentContainerStyle={styles.contentContainerStyle}>
          {regNo && <Chip mode="outlined">{regNo}</Chip>}
          <View style={styles.makerContainer} />
          {make && (
            <>
              <Chip mode="outlined">{titleCaseToReadable(make)}</Chip>
            </>
          )}
        </ScrollView>

        <P1>{`${titleCaseToReadable(data?.status ?? '')} by ${
          data?.createdBy?.name
        }`}</P1>
        {!!data?.remarks && (
          <P2 style={styles.remarksTextStyles}>{data?.remarks}</P2>
        )}
        <DataTimeView date={date} time={time} />
      </TouchableOpacity>
    </Surface>
  )
}

export default memo(NotificationCard)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Layout.baseSize * 0.5,
    marginHorizontal: Layout.baseSize * 0.5,
    borderRadius: Layout.baseSize * 0.5,
    backgroundColor: Colors.light.background,
  },
  scrollContainer: {maxHeight: Layout.baseSize * 3},
  contentContainerStyle: {
    // flexDirection: "row",
    // backgroundColor: "transparent",
    alignItems: 'center',
    margin: Layout.baseSize * 0.1,
    maxHeight: Layout.baseSize * 3,
  },
  remarksTextStyles: {
    marginTop: Layout.baseSize * 0.3,
  },
  makerContainer: {width: Layout.baseSize * 0.5},
})
