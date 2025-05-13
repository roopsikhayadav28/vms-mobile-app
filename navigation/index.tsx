/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem
} from '@react-navigation/drawer'
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  useRoute
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import {
  ColorSchemeName,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

import useUserToken from '../hooks/useUserToken'
import {
  CameraScreen,
  InventoryScreen,
  LeadDetailsScreen,
  LeadProcessScreen,
  LeadScreen,
  LoginScreen,
  MessagesScreen,
  NotificationsScreen,
  ProductStagesScreen,
  ProfileScreen,
  RefurbishmentScreen,
  TaskScreen,
  ToolsScreen,
  TrainingScreen,
  UploadImagesAtStageScreen,
  ViewImagesFilterScreen
} from '../screens'
/* import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
  RootDrawerParamList,
} from "../types"; */
import { getDayMonth, log, titleCaseToReadable } from '../utils/helpers'

import Icon from '../components/basic/Icon'
import { P2 } from '../components/basic/StyledText'
import Layout from '../constants/Layout'
import LinkingConfiguration from './LinkingConfiguration'
import {
  DrawerParamList,
  LeadStackParamList,
  LoanServiceStackparamList,
  RefurbishmentStackParamList,
  RootStackParamList,
  TaskStackParamList
} from './navigationTypes'

import { View } from 'react-native'
import { Badge } from 'react-native-paper'
import DrawerScreenButton from '../components/basic/DrawerScreenButton'
import Colors from '../constants/Colors'
import { useNoOfNewUpdatesQuery, UserRole } from '../generated/hooks_and_more'
import useHandlePushNotification from '../hooks/useHandlePushNotification'
import useLastNotificationTime from '../hooks/useLastNotificationTime'
import useLoggedInUser from '../hooks/useLoggedInUser'
import useLogout from '../hooks/useLogout'
import useLSESubscriptionHandling from '../hooks/useLSESubscriptionHandling'
import useNewMessageSubscriptionHandling from '../hooks/useNewMessageSubscriptionHandling'
import useUpdatePushNotificationAddress from '../hooks/useUpdatePushNotificationAddress'
import PurchaseItemsDetails from '../screens/PurchaseItemsDetails'
import PurchaseItemsList from '../screens/PurchaseItemsList'
import RaisePaymentRequestScreen from '../screens/RaisePaymentRequestScreen'
import ViewImagesAtStagesScreen from '../screens/ViewImagesAtStagesScreen'
import ViewImageScreen from '../screens/ViewImageScreen'
import ViewPdfScreen from '../screens/ViewPdfScreen'
import ViewVideoScreen from '../screens/ViewVideoScreen'
    
import DocumentCheckListScreen from '../screens/DocumentCheckListScreen'
import { getDrawerItemBasedOnRole } from './DrawerItemListData'

import BookingList from '../screens/BookingList'
import LoanServiceList from '../screens/LoanServiceList'
import { APP_VERSION } from './version'

const DUMMY_AVATAR = 'https://picsum.photos/300'

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  )
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * Our root stack contains a drawer of screens, along with Notification and Camera screen to be displayed as a Modal
 * https://reactnavigation.org/docs/modal
 */

const RootStack = createNativeStackNavigator<RootStackParamList>()

function RootNavigator() {
  const {userToken} = useUserToken()
  //Last notification time

  const {lastNotificationTime, setLastNotificationTime} =
    useLastNotificationTime()
  function onHeaderLeftPress() {
    setLastNotificationTime(new Date().toISOString())
  }
  return userToken ? (
    <RootStack.Navigator initialRouteName="Drawer">
      <RootStack.Screen
        name="Drawer"
        options={{headerShown: false}}
        component={DrawerNavigator}
      />
      <RootStack.Screen
        name="LeadProcessScreen"
        component={LeadProcessScreen}
        options={({route}) => ({
          headerTitle: route?.params?.regNo ?? 'Add new lead',
          headerShown: false,
        })}
      />
      <RootStack.Screen
        name="MessagesScreen"
        component={MessagesScreen}
        options={{headerTitle: 'Messages'}}
      />
      <RootStack.Screen name="Profile" component={ProfileScreen} />
      <RootStack.Screen
        name="PurchaseItemsList"
        options={({route}) => {
          return {
            headerTitle: route?.params?.productName?.toUpperCase(),
          }
        }}
        component={PurchaseItemsList}
      />
      <RootStack.Screen
        name="PurchaseItemsDetails"
        component={PurchaseItemsDetails}
        options={({route}) => {
          const titleString = `${route?.params?.requestType?.toUpperCase()}(${getDayMonth(
            route?.params?.purchaseAt,
          )})`
          return {
            headerTitle: titleString,
          }
        }}
      />
      <RootStack.Group screenOptions={{presentation: 'modal'}}>
        <RootStack.Screen
          name="CameraScreen"
          component={CameraScreen}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name="Notifications"
          component={NotificationsScreen}
          options={({navigation}) => ({
            headerTitle: 'Updates on leads',
            headerLeft: ({}) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Drawer', {
                    screen: 'TaskScreen',
                  }),
                    onHeaderLeftPress()
                }}>
                <Icon iconName="arrow-back" size={Layout.baseSize * 1.5} />
              </TouchableOpacity>
            ),
          })}
        />
        <RootStack.Screen
          name="ViewImageScreen"
          component={ViewImageScreen}
          options={{headerShown: false}}
        />

        <RootStack.Screen
          name="DocumentsCheckList"
          component={DocumentCheckListScreen}
        />
        <RootStack.Screen name="ViewVideoScreen" component={ViewVideoScreen} />
        <RootStack.Screen name="ViewPdfScreen" component={ViewPdfScreen} />
        <RootStack.Screen
          name="RaisePaymentRequestScreen"
          component={RaisePaymentRequestScreen}
          options={
            {headerShown: false}
            //   ({route}) => ({
            //   headerTitle: route?.params?.title,
            // })
          }
        />
        <RootStack.Screen
          options={{headerShown: false}}
          name="ViewNotificationsDetails"
          component={LeadStackNavigator}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  ) : (
    <RootStack.Navigator>
      <RootStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
    </RootStack.Navigator>
  )
}

const LeadStack = createNativeStackNavigator<LeadStackParamList>()

function LeadStackNavigator() {
  return (
    <LeadStack.Navigator
      initialRouteName="AllLeads"
      screenOptions={({route, navigation}) => ({
        headerShown: route?.name !== 'AllLeads',
        headerTitle: route?.params?.regNo,
        headerLeft: ({}) => (
          <TouchableOpacity
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack()
              } else {
                navigation.navigate('AllLeads')
              }
            }}>
            <Icon iconName="arrow-back" size={Layout.baseSize * 1.5} />
          </TouchableOpacity>
        ),
      })}>
      <LeadStack.Screen name="AllLeads" component={LeadScreen} />

      <LeadStack.Screen
        name="LeadDetailsScreen"
        component={LeadDetailsScreen}
      />

      <LeadStack.Screen
        name="ProductStagesScreen"
        component={ProductStagesScreen}
      />
      <LeadStack.Screen
        name="ViewImagesFilterScreen"
        component={ViewImagesFilterScreen}
      />
      <LeadStack.Screen
        name="ViewImagesAtStageScreen"
        component={ViewImagesAtStagesScreen}
      />
      <LeadStack.Screen
        name="UploadImagesAtStageScreen"
        component={UploadImagesAtStageScreen}
      />
    </LeadStack.Navigator>
  )
}

/**
 *
 * Task Stack
 *
 */
const TaskStack = createNativeStackNavigator<TaskStackParamList>()

function TaskStackNavigator() {
  return (
    <TaskStack.Navigator
      initialRouteName="AllTask"
      screenOptions={({route, navigation}) => ({
        headerShown: route?.name !== 'AllTask',
        headerTitle: route?.params?.regNo,
        headerLeft: ({}) => (
          <TouchableOpacity
            onPress={() => {
              navigation.goBack()
            }}>
            <Icon iconName="arrow-back" size={Layout.baseSize * 1.5} />
          </TouchableOpacity>
        ),
      })}>
      <TaskStack.Screen name="AllTask" component={TaskScreen} />
      <TaskStack.Screen
        name="LeadDetailsScreenFromTask"
        component={LeadDetailsScreen}
      />

      <TaskStack.Screen
        name="ProductStagesScreen"
        component={ProductStagesScreen}
      />
      <TaskStack.Screen
        name="ViewImagesFilterScreen"
        component={ViewImagesFilterScreen}
      />
      <TaskStack.Screen
        name="ViewImagesAtStageScreen"
        component={ViewImagesAtStagesScreen}
      />
      <LeadStack.Screen
        name="UploadImagesAtStageScreen"
        component={UploadImagesAtStageScreen}
      />
    </TaskStack.Navigator>
  )
}

/**
 *
 * Refurbishment Stack
 *
 */

const RefurbishmentStack =
  createNativeStackNavigator<RefurbishmentStackParamList>()

function RefurbishmentStackNavigator() {
  return (
    <RefurbishmentStack.Navigator
      initialRouteName="InStockLeads"
      screenOptions={({route, navigation}) => ({
        headerShown: route?.name !== 'InStockLeads',
        headerTitle: route?.params?.regNo,
        headerLeft: ({}) => (
          <TouchableOpacity
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack()
              } else {
                navigation.navigate('InStockLeads')
              }
            }}>
            <Icon iconName="arrow-back" size={Layout.baseSize * 1.5} />
          </TouchableOpacity>
        ),
      })}>
      <RefurbishmentStack.Screen
        name="InStockLeads"
        component={RefurbishmentScreen}
      />

      <RefurbishmentStack.Screen
        name="LeadDetailsScreen"
        component={LeadDetailsScreen}
      />

      <RefurbishmentStack.Screen
        name="ProductStagesScreen"
        component={ProductStagesScreen}
      />
      <RefurbishmentStack.Screen
        name="ViewImagesFilterScreen"
        component={ViewImagesFilterScreen}
      />
      <RefurbishmentStack.Screen
        name="ViewImagesAtStageScreen"
        component={ViewImagesAtStagesScreen}
      />
      <RefurbishmentStack.Screen
        name="UploadImagesAtStageScreen"
        component={UploadImagesAtStageScreen}
      />
    </RefurbishmentStack.Navigator>
  )
}

// Booking with Loan Leads Navigation

const LoanServiceStack = createNativeStackNavigator<LoanServiceStackparamList>()

function LoanServiceStackNavigator() {
  return (
    <LoanServiceStack.Navigator
      initialRouteName="FinancedLeads"
      screenOptions={({route, navigation}) => ({
        headerShown: route?.name !== 'FinancedLeads',
        headerTitle: route?.params?.regNo,
        headerLeft: ({}) => (
          <TouchableOpacity
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack()
              } else {
                navigation.navigate('FinancedLeads')
              }
            }}>
            <Icon iconName="arrow-back" size={Layout.baseSize * 1.5} />
          </TouchableOpacity>
        ),
      })}>
      <LoanServiceStack.Screen
        name="FinancedLeads"
        component={LoanServiceList}
      />

      <LoanServiceStack.Screen
        name="LeadDetailsScreen"
        component={LeadDetailsScreen}
      />

      <LoanServiceStack.Screen
        name="ProductStagesScreen"
        component={ProductStagesScreen}
      />
      <LoanServiceStack.Screen
        name="ViewImagesFilterScreen"
        component={ViewImagesFilterScreen}
      />
      <LoanServiceStack.Screen
        name="ViewImagesAtStageScreen"
        component={ViewImagesAtStagesScreen}
      />
      <LoanServiceStack.Screen
        name="UploadImagesAtStageScreen"
        component={UploadImagesAtStageScreen}
      />
    </LoanServiceStack.Navigator>
  )
}

/**
 * Implementing Drawer Navigation
 */

const Drawer = createDrawerNavigator<DrawerParamList>()

function DrawerNavigator() {
  const {userToken} = useUserToken()
  const {loggedInUser} = useLoggedInUser(userToken)

  const {lastNotificationTime} = useLastNotificationTime()
  // update push notification address
  useUpdatePushNotificationAddress()
  useHandlePushNotification()
  // real-time subscriptions
  useNewMessageSubscriptionHandling()
  useLSESubscriptionHandling()
  const {data} = useNoOfNewUpdatesQuery({
    fetchPolicy: 'network-only',
    variables: {
      myRole: loggedInUser?.role as UserRole,
      afterTime: lastNotificationTime,
    },
    onCompleted: () => log('Query Getting Called', lastNotificationTime),
  })
  return (
    <Drawer.Navigator
      useLegacyImplementation={false}
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={({navigation}) => ({
        // headerShown: false,
        drawerActiveBackgroundColor: '#006DB71A',
        drawerActiveTintColor: '#000',
        drawerInactiveTintColor: '#333',
        headerShadowVisible: true,
        headerStyle: {
          shadowOffset: {height: 2, width: 2},
          shadowOpacity: 0.5,
          shadowRadius: 2,
          elevation: 5,
          shadowColor: 'grey',
        },
        headerRight: () => (
          <TouchableOpacity>
            <Icon
              iconName="notifications-none"
              onPress={() => {
                log('this should take the user to notifications screen', {})
                navigation.navigate('Notifications')
              }}
            />
            {!!lastNotificationTime &&
              data?.aggregateLeadStatusEvent?.count > 0 && (
                <Badge
                  size={15}
                  visible={true}
                  style={{top: 0, position: 'absolute'}}>
                  {data?.aggregateLeadStatusEvent?.count}
                </Badge>
              )}
          </TouchableOpacity>
        ),
        headerRightContainerStyle: {
          paddingHorizontal: Layout.baseSize / 2,
        },
      })}>
      <Drawer.Screen
        name="Tasks"
        component={TaskStackNavigator}
        options={{drawerIcon: () => <Icon iconName="check-box" />}}
      />
      {/* options={{drawerIcon= () =><Icon iconName="leaderboard"  color="black"/>}} */}
      <Drawer.Screen
        name="Leads"
        component={LeadStackNavigator}
        options={{drawerIcon: () => <Icon iconName="leaderboard" />}}
      />
      <Drawer.Screen name="BookingList" component={BookingList} />

      <Drawer.Screen
        name="Refurbishment"
        component={RefurbishmentStackNavigator}
        options={{drawerIcon: () => <Icon iconName="leaderboard" />}}
      />

      <Drawer.Screen name="LoanServiceList" component={LoanServiceList} />

      {/* Commenting for now */}

      <Drawer.Screen
        name="Training"
        component={TrainingScreen}
        options={{drawerIcon: () => <Icon iconName="video-library" />}}
      />
      {/*
      <Drawer.Screen
        name="Analytics"
        component={AnalyticsScreen}
        options={{drawerIcon: () => <Icon iconName="analytics" />}}
      /> */}
      <Drawer.Screen
        name="Inventory"
        component={InventoryScreen}
        options={{drawerIcon: () => <Icon iconName="inventory" />}}
      />
      <Drawer.Screen
        name="Tools"
        component={ToolsScreen}
        options={{drawerIcon: () => <Icon iconName="settings" />}}
      />
    </Drawer.Navigator>
  )
}

function CustomDrawerContent(props: any) {
  const {userToken} = useUserToken()
  const {loggedInUser} = useLoggedInUser(userToken)
  const route = useRoute()

  const logout = useLogout()

  return (
    <SafeAreaView style={styles.container}>
      <DrawerContentScrollView {...props}>
        <DrawerScreenButton
          name={loggedInUser?.name}
          role={titleCaseToReadable(loggedInUser?.role ?? '')}
          imgUrl={loggedInUser?.avatar}
          // TODO: for testing add picker
        />

        {getDrawerItemBasedOnRole(loggedInUser?.role).map(item => (
          <DrawerItem
            key={item.name}
            activeBackgroundColor={Colors.light.activeTint}
            activeTintColor={Colors.light.activeTint}
            inactiveTintColor={Colors.light.inactiveTintColor}
            pressColor={Colors.light.activeTint}
            label={item.name}
            onPress={() => {
              const {navigation, route} = props
              console.log(props.navigation.canGoBack())
              // console.log(props.navigation.canGoBack())

              // if (
              //   navigation.canGoBack() &&
              //   (item.name === 'Leads' || item.name === 'Task')
              // ) {
              //   // navigation.popToTop()
              // }
              navigation.navigate(item.navigateTo)
            }}
            icon={() => <Icon iconName={item.iconName} />}
          />
        ))}

        {/* <DrawerItemList {...props} /> */}
      </DrawerContentScrollView>

      <DrawerItem
        activeBackgroundColor={Colors.light.activeTint}
        activeTintColor={Colors.light.background}
        inactiveTintColor={Colors.light.inactiveTintColor}
        label={'Sign Out'}
        onPress={() => {
          log('logging out', {})
          logout()
        }}
        icon={() => <Icon iconName="logout" />}
      />
      <View style={styles.versionTextStyle}>
        <P2>Version </P2>
        <P2>{APP_VERSION}</P2>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {flex: 1, paddingHorizontal: Layout.baseSize / 3},
  versionTextStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Layout.baseSize / 2,
    paddingHorizontal: Layout.baseSize,
  },
})
