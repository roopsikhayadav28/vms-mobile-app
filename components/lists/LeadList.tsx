import {LazyQueryExecFunction} from '@apollo/client'
import {FlashList} from '@shopify/flash-list'
import {useCallback, useRef, useState} from 'react'
import {RefreshControl, StyleSheet} from 'react-native'
import {ActionSheetRef} from 'react-native-actions-sheet'
import Colors from '../../constants/Colors'
import Layout from '../../constants/Layout'
import {DEFAULT_TRACTOR_IMAGE} from '../../constants/constants'
import {
  CentreFilter,
  Exact,
  FilterLeadsQuery,
  LeadFilter,
  LeadPreviewFragment,
  LeadSource,
  LeadStatus,
  StatusAggregate,
  VehicleFilter,
} from '../../generated/hooks_and_more'
import useLoggedInUser from '../../hooks/useLoggedInUser'
import useUserToken from '../../hooks/useUserToken'
import {titleCaseToReadable} from '../../utils/helpers'
import LeadSummaryCard from '../LeadSummaryCard'
import ListHeaderComponent from '../ListHeaderComponent'
import ListEmptyComponent from '../basic/ListEmptyComponent'
import Separator from '../basic/Separator'

type LeadListProps = {
  leadsData?: LeadPreviewFragment[]
  statusAggregates?: StatusAggregate[]
  loading: boolean
  onPullToRefresh: () => void
  onFinishTypingSearchText?: (text: string) => void
  onClearSearchText?: () => void
  onEndReached: () => void
  onPressCardFn?: ({
    leadId,
    regNo,
    currentStatus,
  }: {
    leadId: string
    regNo: string
    currentStatus: LeadStatus
  }) => void
  isNoItemSelected?: boolean
  getFilteredData?: LazyQueryExecFunction<
    FilterLeadsQuery,
    Exact<{
      leadFilter?: LeadFilter
      vehicleFilter?: VehicleFilter
      centreFilter?: CentreFilter
    }>
  >
  setIsFilterApplied?: React.Dispatch<React.SetStateAction<boolean>>
}
export default function LeadList({
  leadsData = [],
  statusAggregates = [],
  loading,
  isNoItemSelected,
  onPullToRefresh,
  onFinishTypingSearchText,
  onClearSearchText,
  onEndReached,
  onPressCardFn,
  getFilteredData,
  setIsFilterApplied,
}: LeadListProps) {
  const {userToken} = useUserToken()
  const {loggedInUser} = useLoggedInUser(userToken)
  const actionSheetRef = useRef<ActionSheetRef>(null)
  const [searchText, setSearchText] = useState<string>('')
  const [showFilter, setShowFilter] = useState<boolean>(false)
  const [selectedStatuses, setSelectedStatus] = useState<LeadStatus[]>([])

  function onPressStatusChip(status: LeadStatus) {
    if (selectedStatuses.includes(status)) {
      setSelectedStatus(selectedStatuses?.filter(s => s !== status))
    } else {
      setSelectedStatus([status, ...selectedStatuses])
    }
  }
  function onFinishTypingStuff() {
    onFinishTypingSearchText(searchText)
  }
  // const SearchAndFilter = () => {
  //   return (
  //     <View style={{ marginBottom: Layout.baseSize * 0.5 }}>
  //       <Searchbar
  //         value={searchText}
  //         placeholder={"Try make model and more"}
  //         style={{
  //           margin: Layout.baseSize * 0.5,
  //           borderWidth: StyleSheet.hairlineWidth * 2,
  //           borderColor: "grey",
  //           backgroundColor: Colors.light.background,
  //         }}
  //         onChangeText={(text) => setSearchText(text)}
  //       />
  //       <FlashList
  //         data={statusAggregates}
  //         horizontal
  //         estimatedItemSize={232}
  //         renderItem={({ item: i }) => (
  //           <Chip
  //             style={{
  //               margin: Layout.baseSize * 0.25,
  //             }}
  //             elevation={2}
  //             onPress={() => {
  //               console.log("select this chip");
  //               if (i.status) onPressStatusChip(i.status);
  //             }}
  //             mode={"outlined"}
  //             selected={i.status && selectedStatuses?.includes(i.status)}
  //           >
  //             {i.count &&
  //             i.count > 1 &&
  //             i.status &&
  //             !selectedStatuses?.includes(i.status)
  //               ? i.count.toString() +
  //                 "  " +
  //                 titleCaseToReadable(i?.status ?? "Somewhere..")
  //               : "" + titleCaseToReadable(i?.status ?? "Somewhere..")}
  //           </Chip>
  //         )}
  //       />
  //     </View>
  //   );
  // };

  const showCallButton = useCallback(
    (item: LeadPreviewFragment) => {
      const spocNo = item?.auctioningAgency?.spocNo
      const dealerNo = item?.dealer?.phoneNo

      // console.log({spocNo, dealerNo})

      const numberToCall =
        item?.source === LeadSource.BankAuction ? spocNo : dealerNo

      /* NOTE: If the user is not OPERATIONS or PROCUREMENT, then they if the lead
       have a spocNo or dealerNo to be able to call. 
      */
      if (
        (loggedInUser?.role?.includes('OPERATIONS') ||
          loggedInUser?.role?.includes('PROCUREMENT')) &&
        !!numberToCall
      ) {
        return true
      } else {
        return false
      }

      // const showCallButton =
      //   (loggedInUser?.role?.includes('OPERATIONS') ||
      //     loggedInUser?.role?.includes('PROCUREMENT')) &&
      //   !!spocNo

      // const showCallButton =
      //   (loggedInUser?.role?.includes('OPERATIONS') ||
      //     loggedInUser?.role?.includes('PROCUREMENT')) &&
      //   !!spocNo

      // console.log({showCallButton})

      // return showCallButton ? true : false
    },
    [loggedInUser?.role],
  )

  function renderItem({
    item,
    index,
  }: {
    item: LeadPreviewFragment
    index: number
  }) {
    const imageUrl =
      item &&
      item.vehicle &&
      item.vehicle.images &&
      item.vehicle.images.length > 0
        ? item?.vehicle?.images?.[0]?.frontBodySide
          ? item?.vehicle?.images?.[0]?.frontBodySide
          : DEFAULT_TRACTOR_IMAGE
        : DEFAULT_TRACTOR_IMAGE

    // log('from lead summary card', location)
    return (
      <LeadSummaryCard
        leadId={item?.id}
        imageUri={imageUrl as string}
        source={item?.source}
        leadTitle={`${titleCaseToReadable(item?.vehicle?.make ?? '')} ${
          item?.vehicle?.model
        } | ${new Date(item?.vehicle?.manufacturingDate).getFullYear()}`}
        leadOwnerName={item?.createdBy?.name as string}
        leadSubtitle={
          !!item?.finalBidAmount ? `₹ ${item?.finalBidAmount}` : undefined
        }
        // labelTitle={"Verified"}
        location={item?.registrationState}
        hideButton={
          item?.statusEvents?.[0]?.assignTaskTo !== loggedInUser?.role
        }
        spocNo={item?.auctioningAgency?.spocNo}
        showCallButton={showCallButton(item)}
        actionButtonTitle={item?.statusEvents?.[0]?.taskButtonTitle}
        currentStatus={
          item?.statusEvents && item?.statusEvents?.length > 0
            ? item?.statusEvents[0]?.status
            : undefined
        }
        regNo={item?.regNo}
        onPressCardFn={onPressCardFn}
        postTimeline={item?.statusEvents?.[0]?.postTimeline}
        dealerNo={item?.dealer?.phoneNo}
      />
    )
  }

  // const ListHeaderComponent = (
  //   <View style={styles.searchBarContainerStyle}>
  //     <Row>
  //       <View style={{flex: 1}}>
  //         <Searchbar
  //           value={searchText}
  //           placeholder={'Try make model and more'}
  //           style={styles.searchBarStyle}
  //           onChangeText={onChangeText}
  //           onBlur={onFinishTypingStuff}
  //           onSubmitEditing={onFinishTypingStuff}
  //         />
  //       </View>
  //       <View
  //         style={{
  //           alignItems: 'center',
  //           marginTop: Layout.baseSize,
  //           marginRight: Layout.baseSize / 2,
  //         }}>
  //         <Icon
  //           iconName={'filter-alt'}
  //           onPress={onPressFilterIcon}
  //           style={{borderColor: '#ffffff'}}
  //         />
  //       </View>
  //     </Row>
  //     <View style={{zIndex: 10}}>
  //       <ActionSheet containerStyle={{height: '80%'}} ref={actionSheetRef}>
  //         <FilterForm />
  //       </ActionSheet>
  //     </View>
  //   </View>
  // )

  // console.log(searchText)

  function onChangeText(text: string) {
    if (!text || text.length <= 0) {
      setSearchText('')
      onClearSearchText()
    } else {
      setSearchText(text)
    }
  }

  function renderEmptyComponent() {
    const text = isNoItemSelected
      ? 'Please select an item'
      : 'No leads to show you'
    return <ListEmptyComponent text={text} />
  }
  return (
    <>
      {/* <ListHeaderComponent /> */}
      <FlashList<LeadPreviewFragment>
        showsVerticalScrollIndicator={false}
        data={leadsData}
        keyExtractor={({id}) => `lead-preview-${id}`}
        renderItem={renderItem}
        onEndReached={onEndReached}
        ListHeaderComponent={
          (onFinishTypingSearchText || onClearSearchText) && (
            <ListHeaderComponent
              onClearSearchText={onClearSearchText}
              onFinishTypingSearchText={onFinishTypingSearchText}
              getFilteredData={getFilteredData}
              setIsFilterApplied={setIsFilterApplied}
            />
          )
        }
        ItemSeparatorComponent={Separator}
        estimatedItemSize={220}
        ListEmptyComponent={renderEmptyComponent}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onPullToRefresh} />
        }
      />
    </>
  )
}

const styles = StyleSheet.create({
  searchBarStyle: {
    margin: Layout.baseSize * 0.5,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: 'grey',
    backgroundColor: Colors.light.background,
  },
  searchBarContainerStyle: {marginBottom: Layout.baseSize * 0.5},
})
