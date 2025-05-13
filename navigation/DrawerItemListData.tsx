import type {IconName} from '../components/basic/Icon'
import {DrawerParamList} from './navigationTypes'
import {UserRole} from '../generated/hooks_and_more'

export type DrawerName =
  | 'Task'
  | 'Leads'
  | 'Refurbishment'
  | 'Training'
  | 'Analytics'
  | 'Inventory'
  | 'Tools'
  | 'Booking'
  | 'Loan Service'

export type DrawerItemListDataProps = {
  /* The name of the item to display */
  name: DrawerName

  /* The name of the icon to display */
  iconName: IconName

  /* The name of the screen to navigate to */
  navigateTo: keyof DrawerParamList

  /* Whether the item should be shown by default or not (e.g. Refurbishment is not shown by default)
   * Since only CM and SM can see Refurbishment, we need to hide it by default.
   * */
  roles?: UserRole[] | null
}

export const DrawerItemListData: DrawerItemListDataProps[] = [
  {
    name: 'Task',
    iconName: 'check-box',
    navigateTo: 'Tasks',
    roles: [
      UserRole.ProcurementExecutive,
      UserRole.ProcurementHead,
      UserRole.ProcurementManager,
      UserRole.OperationsHead,
      UserRole.OperationsManager,
      UserRole.LogisticsManager,
      UserRole.Driver,
      UserRole.FinanceManager,
      UserRole.CentreManager,
      UserRole.SalesHead,
      UserRole.RetailFinanceManager,
    ],
  },
  {
    name: 'Leads',
    iconName: 'leaderboard',
    navigateTo: 'Leads',
    roles: [
      UserRole.ProcurementExecutive,
      UserRole.ProcurementHead,
      UserRole.ProcurementManager,
      UserRole.OperationsHead,
      UserRole.OperationsManager,
      UserRole.LogisticsManager,
      UserRole.Driver,
      UserRole.FinanceManager,
    ],
  },
  {
    name: 'Refurbishment',
    iconName: 'add-business',
    navigateTo: 'Refurbishment',
    roles: [
      UserRole.CentreManager,
      UserRole.SalesHead,
      UserRole.FinanceManager,
    ],
  },
  {
    name: 'Booking',
    iconName: 'book-online',
    navigateTo: 'BookingList',
    roles: [
      UserRole.CentreManager,
      UserRole.SalesHead,
      UserRole.FinanceManager,
    ],
  },
  {
    name: 'Loan Service',
    iconName: 'account-balance',
    navigateTo: 'LoanServiceList',
    roles: [UserRole.RetailFinanceManager],
  },
  {
    name: 'Training',
    iconName: 'video-library',
    navigateTo: 'Training',
    roles: [
      UserRole.ProcurementExecutive,
      UserRole.ProcurementHead,
      UserRole.ProcurementManager,
    ],
  },
  // {
  //   name: 'Analytics',
  //   iconName: 'analytics',
  //   navigateTo: 'Analytics',
  // },
  {
    name: 'Inventory',
    iconName: 'inventory',
    navigateTo: 'Inventory',
    roles: [UserRole.FinanceManager, UserRole.CentreManager],
  },
  {
    name: 'Tools',
    iconName: 'settings',
    navigateTo: 'Tools',
    roles: [
      UserRole.ProcurementManager,
      UserRole.ProcurementHead,
      UserRole.SalesHead,
      UserRole.RetailFinanceManager,
    ],
  },
]

// Returns the list of items to be displayed in the drawer based on the user's role
export const getDrawerItemBasedOnRole = (
  userRole: UserRole,
): DrawerItemListDataProps[] => {
  return DrawerItemListData.filter(item => {
    if (item?.roles) {
      return item?.roles?.includes(userRole)
    }
    return true
  })
}
