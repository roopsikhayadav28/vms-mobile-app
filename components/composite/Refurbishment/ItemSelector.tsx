import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import {FlashList} from '@shopify/flash-list'
import React, {useEffect, useRef, useState} from 'react'
import {StyleSheet, Text, TextInput, View} from 'react-native'
import {ActivityIndicator, Checkbox} from 'react-native-paper'

import Colors from '../../../constants/Colors'
import Layout from '../../../constants/Layout'
import {commonStyle} from '../../../constants/style'
import {
  IssueRef,
  PurchaseRef,
  RefurbishmentItemRef,
  useGetLeadRefurbishmentDetailsQuery,
} from '../../../generated/hooks_and_more'
import useNavigateFileToScreen from '../../../hooks/useNavigateFileToScreen'
import useUpdateLeadInput, {
  useUpdateRemarksInput,
} from '../../../hooks/useUpdateLeadInput'
import {stripFields} from '../../../utils/helpers'
import {Input} from '../../basic/Input'

export type SelectorItemProps = {
  id?: string
  type: string
  amount: string
  documentUrl: string
  isAmountEditable?: boolean
  isInStock: boolean
  index?: number
  handleCheckboxPress?: (index: number) => void
  isApproved?: boolean
  setUpdatedAmount?: (index: number, text: string) => void
  shownEdit?: boolean
  handleEdit?: (index: number) => void
  handleOnSubmitEditing?: (index: number) => void
  handlePDFButtonPress?: (
    index: number,
    documentUrl: string,
    title: string,
  ) => void
  handleOnBlur?: (index: number) => void
}

export type ItemSelectorProps = {
  regNo: string
  leadId: string
  getSparePartStockStatus: (value: string) => {
    isInStock: boolean
    avgUnitPrice: string
  }
  requestId: string
}

const ESTIMATED_ITEM_SIZE = 42

/**
 * ItemSelector is a component that renders a list of items with a checkbox and an amount.
 */
export const ItemSelector = (props: ItemSelectorProps) => {
  const {leadId, getSparePartStockStatus, regNo, requestId} = props
  const {leadInput, setLeadInput} = useUpdateLeadInput(leadId)
  const {navigateToScreen} = useNavigateFileToScreen()
  const {setRemarks} = useUpdateRemarksInput(leadInput?.regNo)
  const [checkedList, setCheckedList] = useState<SelectorItemProps[]>([])
  const {data} = useGetLeadRefurbishmentDetailsQuery({
    variables: {
      regNo,
    },
    skip: !regNo,
    fetchPolicy: 'network-only',
    onCompleted: ({queryLead}) => {
      if (
        !queryLead?.[0]?.refurbishmentDetails?.requests?.find(
          req => req?.id === requestId,
        ).items ||
        checkedList?.length > 0
      ) {
        return
      } else {
        const itemDetails: SelectorItemProps[] =
          queryLead?.[0]?.refurbishmentDetails?.requests
            ?.find(req => req?.id === requestId)
            ?.items?.map(item => {
              return {
                id: item?.id,
                type: item?.product?.name,
                amount: !!item?.price
                  ? item?.price?.toString()
                  : getSparePartStockStatus(item?.product?.name)?.avgUnitPrice,
                documentUrl: item?.refurbishmentProofUrl,
                isInStock: getSparePartStockStatus(item?.product?.name)
                  ?.isInStock,
              }
            })
        setCheckedList(itemDetails)
        setLeadInput({
          ...leadInput,
          refurbishmentDetails: {
            ...leadInput?.refurbishmentDetails,
            requests: [
              {
                ...leadInput?.refurbishmentDetails?.requests[0],
                items: stripFields(
                  queryLead?.[0]?.refurbishmentDetails?.requests?.[0]?.items, //FIXME: Might need to add filter for the requestID
                  ['__typename'],
                ),
              },
            ],
          },
        })
      }
    },
  })

  useEffect(() => {
    const issueItems = checkedList
      ?.filter(item => item?.isApproved)
      ?.map(item => {
        return {
          price: item?.isInStock ? Number(item?.amount) : null,
          product: {
            name: item?.type,
          },
          isApproved: item?.isApproved,
        }
      })

    const issuedItems: IssueRef = {
      ...leadInput?.refurbishmentDetails?.requests[0]?.issue,
      items: issueItems,
    }

    const purchaseItems = checkedList
      ?.filter(item => item?.isApproved && !item?.isInStock)
      ?.map(item => {
        return {
          price: null,
          approvedPriceLimit: item?.isInStock ? null : Number(item?.amount),
          product: {
            name: item?.type,
          },
          isApproved: item?.isApproved,
        }
      })

    const purchasedItems: PurchaseRef = {
      ...leadInput?.refurbishmentDetails?.requests[0]?.purchase,
      items: purchaseItems,
    }

    const requestItems: RefurbishmentItemRef[] = checkedList
      ?.filter(item => item?.isApproved)
      ?.map(item => {
        return {
          id: item?.id,
          price: Number(item?.amount),
          product: {
            name: item?.type,
          },
        }
      })

    setLeadInput({
      ...leadInput,
      refurbishmentDetails: {
        ...leadInput?.refurbishmentDetails,
        requests: [
          {
            id: requestId,
            ...leadInput?.refurbishmentDetails?.requests[0],
            items: requestItems,
            issue: issuedItems,
            purchase: purchasedItems,
          },
        ],
      },
    })
  }, [checkedList, requestId])

  const isAllChecked =
    checkedList?.length > 0 && checkedList?.every(item => item?.isApproved)

  const handleCheckboxPress = (index: number) => {
    const updatedList = [...checkedList]
    updatedList[index].isApproved = !updatedList[index].isApproved
    setCheckedList(updatedList)
  }

  const keyExtractor = (item, index) =>
    item.documentUrl?.toString() + index?.toString()

  function handleOnSubmitEditing(index) {
    const updatedList = [...checkedList]
    updatedList[index].shownEdit = false
    setCheckedList(updatedList)
  }

  function handleEdit(index) {
    const updatedList = [...checkedList]
    updatedList[index].shownEdit = !updatedList[index].shownEdit
    setCheckedList(updatedList)
  }

  function handleUpdatedAmount(index: number, text: string) {
    const updatedList = [...checkedList]
    updatedList[index].amount = text
    setCheckedList(updatedList)
  }

  function handleOnBlur(index) {
    const updatedList = [...checkedList]
    updatedList[index].shownEdit = false
    setCheckedList(updatedList)
  }

  function handlePDFButtonPress(index, documentUrl, title) {
    if (!documentUrl || !title) return

    navigateToScreen({
      fileUrl: documentUrl,
      title,
      regNo: leadInput?.regNo,
    })
  }

  const renderItem = ({item, index}) => (
    <SelectorItem
      index={index}
      isAmountEditable={item?.isAmountEditable}
      handleCheckboxPress={handleCheckboxPress}
      isApproved={item?.isApproved}
      amount={item?.amount}
      setUpdatedAmount={handleUpdatedAmount}
      shownEdit={item?.shownEdit}
      handleEdit={handleEdit}
      handleOnSubmitEditing={handleOnSubmitEditing}
      handleOnBlur={handleOnBlur}
      handlePDFButtonPress={handlePDFButtonPress}
      {...item}
    />
  )

  const ListHeaderComponent = () => (
    <View style={styles.headerContainer}>
      <View style={styles.checkboxContainer}>
        <Checkbox
          status={isAllChecked ? 'checked' : 'unchecked'}
          onPress={() => {
            setCheckedList(item =>
              item?.map(item => ({...item, isApproved: !isAllChecked})),
            )
          }}
        />
        <Text style={styles.selectAllText}>Select All</Text>
      </View>

      <View style={styles.itemTypeContainer}>
        <Text style={styles.boldText}>Item Type</Text>
      </View>

      <View style={styles.amountContainer}>
        <Text style={[commonStyle.textAlignCenter, styles.boldText]}>
          Amount
        </Text>
      </View>
      <View style={styles.viewContainer}>
        <Text style={styles.boldText}>View</Text>
      </View>
    </View>
  )

  // Amount will be shown for sum of out-of-stock items only @Tariq Aziz
  const numberOfCheckedItems = checkedList?.filter(
    item => item?.isApproved,
  )?.length

  // This is not used in the current PR, I've used LeadInput, @Avishek Please checkout if this is alright or not, I think we can avoid computation after this.

  const totalAmount = checkedList
    ?.filter(item => item?.isApproved && !item?.isInStock)
    ?.reduce((total, item) => {
      const amount = isNaN(Number(item?.amount)) ? 0 : Number(item?.amount)
      return total + Number(amount)
    }, 0)

  //TODO: Show sum of only purchaseItem that is selected.
  /* Show 'All' if all items are checked else show the number of checked items
   * as told by @Tariq Aziz
   * */
  const numberOfItemsString =
    checkedList?.length === numberOfCheckedItems
      ? 'All'
      : `(${numberOfCheckedItems?.toString()})`

  const onChangeRemarks = (value: string) => {
    setRemarks(value)
  }

  const Loader = () => (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="small" color={Colors.light.primary} />
    </View>
  )

  return (
    <View style={styles.container}>
      <FlashList
        data={checkedList}
        estimatedItemSize={ESTIMATED_ITEM_SIZE}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListHeaderComponent={ListHeaderComponent}
        ItemSeparatorComponent={Separator}
        ListFooterComponent={
          <View>
            <Separator />
            <Input label="Enter the Remarks" onChangeText={onChangeRemarks} />
          </View>
        }
        ListFooterComponentStyle={commonStyle.marginVertical8}
        ListEmptyComponent={Loader}
      />

      {numberOfCheckedItems > 0 && (
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: Colors.light.inputBg,
            padding: Layout.baseSize,
            justifyContent: 'space-between',
            marginTop: Layout.baseSize * 0.5,
          }}>
          <Text
            style={{
              color: Colors.light.primary,
              fontWeight: 'bold',
              fontSize: Layout.baseSize,
            }}>
            {`${numberOfItemsString} Items Selected`}
          </Text>

          <Text
            style={{
              color: Colors.light.primary,
              fontWeight: 'bold',
              fontSize: Layout.baseSize,
            }}>{`Rs ${totalAmount?.toLocaleString()}`}</Text>
        </View>
      )}
    </View>
  )
}

// FIXME: Remove this code when ready for live and there is no bug related to this,
/* <Text
            style={{
              color: Colors.light.primary,
              fontWeight: 'bold',
              fontSize: Layout.baseSize,
            }}>{`Rs ${leadInput?.refurbishmentDetails?.requests?.[0]?.purchase?.items
            ?.filter(i => i?.isApproved)
            ?.reduce(
              (initialPrice, p) => p?.approvedPriceLimit + initialPrice,
              0,
            )}`}</Text> */

const SelectorItem = ({
  type,
  amount,
  documentUrl,
  isInStock,
  handleCheckboxPress,
  index,
  isApproved,
  setUpdatedAmount,
  shownEdit,
  handleOnSubmitEditing,
  handleEdit,
  handlePDFButtonPress,
  handleOnBlur,
}: SelectorItemProps) => {
  const ref = useRef<TextInput>(null)
  const onPressEdit = () => {
    handleEdit(index)
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
      }}>
      <View style={styles.checkboxContainer}>
        <Checkbox
          status={isApproved ? 'checked' : 'unchecked'}
          onPress={() => handleCheckboxPress(index)}
        />
      </View>

      {/*  Item Type section  */}
      <View style={styles.itemTypeContainer}>
        <Text numberOfLines={1} style={styles.boldText}>
          {type}
        </Text>
        <Text numberOfLines={1} style={{fontSize: 10}}>
          {isInStock ? 'In Stock' : 'Out of Stock'}
        </Text>
      </View>

      {/*  Amount section  */}

      <View style={styles.amountContainer}>
        {!isInStock ? (
          <>
            {shownEdit ? (
              <Input
                autoFocus
                keyboardType="numeric"
                temporary={false}
                defaultValue={amount?.toLocaleString()}
                onChangeText={text => setUpdatedAmount(index, text)}
                onSubmitEditing={() => handleOnSubmitEditing(index)}
                onBlur={() => handleOnBlur(index)}
              />
            ) : (
              <>
                <Text
                  numberOfLines={1}
                  style={[
                    styles.semiBoldText,
                    {textAlign: 'left'},
                  ]}>{`Rs ${amount?.toLocaleString()}`}</Text>

                {!shownEdit && (
                  <MaterialIcons
                    name="edit"
                    color={Colors.light.primary}
                    size={Layout.baseSize}
                    style={styles.editIcon}
                    onPress={onPressEdit}
                  />
                )}
              </>
            )}
          </>
        ) : (
          <Text>-</Text>
        )}
      </View>

      {/*  View section  */}
      <View style={styles.viewContainer}>
        <MaterialIcons
          name="visibility"
          size={Layout.baseSize * 1.5}
          color={Colors.light.lightGray}
          onPress={() => handlePDFButtonPress(index, documentUrl, type)}
        />
        <MaterialIcons
          name="error"
          size={Layout.baseSize}
          color={Colors.light.yellow}
          style={{paddingHorizontal: 7}}
        />
      </View>
    </View>
  )
}

const Separator = () => <View style={styles.separator} />

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
    backgroundColor: Colors.light.background,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Layout.baseSize * 0.5,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.colorRbg,
    paddingVertical: Layout.baseSize * 0.3,
    borderRadius: 4,
  },
  checkboxContainer: {flex: 0.42},
  itemTypeContainer: {flex: 1.3},
  amountContainer: {
    flex: 1.3,
    alignItems: 'center',
    flexDirection: 'row',
    // justifyContent: 'center',
    // backgroundColor: 'pink',
  },
  viewContainer: {
    flex: 0.6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  boldText: {
    fontSize: 15,
    fontWeight: '500',
  },
  semiBoldText: {
    fontSize: 15,
    fontWeight: '400',
  },
  editIcon: {paddingLeft: 2},
  separator: {
    margin: Layout.baseSize * 0.5,
    height: 0.3,
    backgroundColor: Colors.light.imagePickerBg,
  },
  selectAllText: {fontSize: 8, paddingLeft: 4},
})

export default ItemSelector
