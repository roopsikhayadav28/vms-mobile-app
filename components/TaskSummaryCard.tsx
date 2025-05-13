import {useNavigation} from '@react-navigation/native'
import * as React from 'react'
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native'
import {Chip, Surface} from 'react-native-paper'
import Colors from '../constants/Colors'
import Layout from '../constants/Layout'
import {LeadStatus, UserRef} from '../generated/hooks_and_more'
import {titleCaseToReadable} from '../utils/helpers'
import DataTimeView from './basic/DataTimeView'
import {H2, H3, P1} from './basic/StyledText'
import {RootStackScreenProps} from '../navigation/navigationTypes'

type TaskCardProps = {
  regNo: string
  title: string
  buttonTitle: string
  date?: string
  time?: string
  leadId: string
  currentStatus: LeadStatus
  make: string
  createdBy: UserRef
  lseId: string
}

const TaskSummaryCard = ({
  buttonTitle,
  date,
  time,
  title,
  leadId,
  currentStatus,
  regNo,
  make,
  createdBy,
  lseId,
}: TaskCardProps) => {
  const navigation =
    useNavigation<
      RootStackScreenProps<'ViewNotificationsDetails'>['navigation']
    >()
  function onPressCard() {
    navigation.navigate('ViewNotificationsDetails', {
      screen: 'LeadDetailsScreen',
      params: {
        leadId,
        regNo,
        currentStatus,
        lseId,
      },
    })
  }
  return (
    <Surface style={styles.container}>
      <TouchableOpacity onPress={onPressCard}>
        <View style={{padding: Layout.baseSize * 0.5}}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal
            style={styles.scrollViewContainer}
            contentContainerStyle={styles.contentContainerStyle}>
            {regNo && <Chip mode="outlined">{regNo}</Chip>}
            <View style={styles.makerContainer} />
            {make && (
              <>
                <Chip mode="outlined">{titleCaseToReadable(make)}</Chip>
              </>
            )}
          </ScrollView>

          <View style={styles.outerView}>
            <P1>{`${titleCaseToReadable(currentStatus)} by ${
              createdBy?.name
            }`}</P1>
            <DataTimeView date={date} time={time} />
          </View>
        </View>
        <H3 style={styles.titleTextStyle}>{title}</H3>
        {/* <Button
        variant="primary"
        title={buttonTitle}
        onPress={() => {
          log('params to pass to lead process screen', {
            leadId,
            currentStatus,
          })
          navigation.navigate('LeadProcessScreen', {
            leadId,
            regNo,
            currentStatus,
          })
        }}
      /> */}
      </TouchableOpacity>
    </Surface>
  )
}

export default React.memo(TaskSummaryCard)

const styles = StyleSheet.create({
  container: {
    borderRadius: Layout.baseSize / 2,
    marginHorizontal: Layout.baseSize * 0.5,
    backgroundColor: Colors.light.background,
    // alignItems: "flex-start",
  },
  outerView: {
    padding: Layout.baseSize * 0.5,
    justifyContent: 'center',
  },
  scrollViewContainer: {maxHeight: Layout.baseSize * 3},
  makerContainer: {width: Layout.baseSize * 0.5},
  titleTextStyle: {
    padding: Layout.baseSize * 0.6,
    backgroundColor: Colors.light.primary,
    color: 'white',
    borderBottomLeftRadius: Layout.baseSize / 2,
    borderBottomRightRadius: Layout.baseSize / 2,
    textAlign: 'center',
  },
  contentContainerStyle: {
    // flexDirection: "row",
    // backgroundColor: "transparent",
    alignItems: 'center',
    margin: Layout.baseSize * 0.1,
    maxHeight: Layout.baseSize * 3,
  },
})
