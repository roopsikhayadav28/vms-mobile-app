import React, {useCallback, useState} from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import {commonStyle} from '../../../constants/style'
import useUpdateLeadInput from '../../../hooks/useUpdateLeadInput'
import {enumToItems, titleCaseToReadable} from '../../../utils/helpers'
import PickerSelectButton from '../../basic/PickerSelectButton'

import {useNavigation} from '@react-navigation/native'
import Colors from '../../../constants/Colors'
import Layout from '../../../constants/Layout'
import {
  RefurbishmentStatus,
  SparePart,
  useGetCenterFormLeadQuery,
  useGetStocksDetailsQuery,
} from '../../../generated/hooks_and_more'
import {RootStackScreenProps} from '../../../navigation/navigationTypes'
import Image from '../../basic/Image'
import {Input} from '../../basic/Input'
import RNFileUploader from '../../basic/RNFileUploader'
import Separator from '../../basic/Separator'
import {Divider} from 'react-native-paper'

type FormComponentProps = {
  leadId?: string
  regNo?: string
}

const InspectVehicle = ({leadId, regNo}: FormComponentProps) => {
  const {leadInput, setLeadInput} = useUpdateLeadInput(leadId)

  const {data: centerData} = useGetCenterFormLeadQuery({
    variables: {
      regNo: regNo,
    },
  })
  const centerId = centerData?.getLead?.centre?.id

  const {data: stockDetailData} = useGetStocksDetailsQuery({
    variables: {
      centreId: centerId,
    },
    fetchPolicy: 'network-only',
  })

  function getSparePart(index: number) {
    const sparePartData =
      leadInput?.refurbishmentDetails?.requests?.[0]?.items?.[index]
    return sparePartData
  }

  function getSparePartStockStatus(value: string) {
    const sparePartStockStatus = stockDetailData?.inventoryDetails?.items?.find(
      i =>
        i?.product?.name?.toUpperCase() ===
        titleCaseToReadable(value)?.toUpperCase(),
    )?.availableInStock

    return sparePartStockStatus > 0 ? 'Available' : 'Not Available'
  }

  const navigation =
    useNavigation<RootStackScreenProps<'ViewImageScreen'>['navigation']>()
  const navigateToViewImageScreen = useCallback((uri: string) => {
    navigation.navigate('ViewImageScreen', {
      imageUrl: uri,
    })
  }, [])

  const newRefurbishmentRequestItems =
    leadInput?.refurbishmentDetails?.requests?.[0]?.items?.slice() ?? []
  const [showEmptyItem, setShowEmptyItem] = useState<boolean>(false)

  // Trigger on Selecting Refurbishment Category
  function onChangingSparePart(value: string, index: number) {
    newRefurbishmentRequestItems[index] = {
      ...leadInput?.refurbishmentDetails?.requests?.[0]?.items[index],
      status: RefurbishmentStatus.Requested,
      product: {
        ...leadInput?.refurbishmentDetails?.requests?.[0]?.items[index]
          ?.product,
        name: titleCaseToReadable(value),
      },
    }

    // Setting the new Refurbishment Item in the Lead Input
    setLeadInput({
      ...leadInput,
      refurbishmentDetails: {
        ...leadInput?.refurbishmentDetails,
        requests: [
          {
            ...leadInput?.refurbishmentDetails?.requests?.[0],
            items: newRefurbishmentRequestItems,
          },
        ],
      },
    })
  }

  // Trigger on Add More Button
  function onPressAddMore() {
    setShowEmptyItem(true)
  }

  function onAddingDescription(value: string, index: number) {
    newRefurbishmentRequestItems[index] = {
      ...leadInput?.refurbishmentDetails?.requests?.[0]?.items[index],
      product: {
        ...leadInput?.refurbishmentDetails?.requests?.[0]?.items[index]
          ?.product,
        description: value,
      },
    }

    // Setting the new Refurbishment Item in the Lead Input
    setLeadInput({
      ...leadInput,
      refurbishmentDetails: {
        ...leadInput?.refurbishmentDetails,
        requests: [
          {
            ...leadInput?.refurbishmentDetails?.requests?.[0],
            items: newRefurbishmentRequestItems,
          },
        ],
      },
    })
  }

  function onSparePartAmountChange(value: string, index: number) {
    if (!isNaN(parseFloat(value)) && isFinite(Number(value))) {
      newRefurbishmentRequestItems[index] = {
        ...leadInput?.refurbishmentDetails?.requests?.[0]?.items[index],
        price: Number(value),
        status: RefurbishmentStatus.Requested,
      }
    } else {
      newRefurbishmentRequestItems[index] = {
        ...leadInput?.refurbishmentDetails?.requests?.[0]?.items[index],
        price: 0,
        status: RefurbishmentStatus.Requested,
      }
    }

    // Setting the new Refurbishment Item in the Lead Input
    setLeadInput({
      ...leadInput,
      refurbishmentDetails: {
        ...leadInput?.refurbishmentDetails,
        requests: [
          {
            ...leadInput?.refurbishmentDetails?.requests?.[0],
            items: newRefurbishmentRequestItems,
          },
        ],
      },
    })
  }

  function onAddingSparePartImage(value: string, index: number) {
    newRefurbishmentRequestItems[index] = {
      ...leadInput?.refurbishmentDetails?.requests?.[0]?.items[index],
      refurbishmentProofUrl: value,
    }

    // Setting the new Refurbishment Item in the Lead Input
    setLeadInput({
      ...leadInput,
      refurbishmentDetails: {
        ...leadInput?.refurbishmentDetails,
        requests: [
          {
            ...leadInput?.refurbishmentDetails?.requests?.[0],
            items: newRefurbishmentRequestItems,
          },
        ],
      },
    })
  }

  function removeSparePart(index: number) {
    // console.log({index})

    newRefurbishmentRequestItems?.splice(index, 1)

    setLeadInput({
      ...leadInput,
      refurbishmentDetails: {
        ...leadInput?.refurbishmentDetails,
        requests: [
          {
            ...leadInput?.refurbishmentDetails?.requests?.[0],
            items: newRefurbishmentRequestItems,
          },
        ],
      },
    })
  }

  console.log(
    'refurbishmentDetails at inspect vehicle form => ',
    JSON.stringify(leadInput, null, 2),
  )

  return (
    <View style={commonStyle?.mainAppContainer}>
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Flow when Refurbishment is not required */}

          {newRefurbishmentRequestItems?.concat({}).map((_, index) => {
            return (
              <View
                key={index}
                style={{
                  opacity:
                    index === newRefurbishmentRequestItems?.length ? 0.5 : 1,
                }}>
                <PickerSelectButton
                  placeholder="Select Part to be refurbished *"
                  items={enumToItems(SparePart)}
                  value={getSparePart(index)?.product?.name}
                  onValueChange={value => onChangingSparePart(value, index)}
                  stockInStatus={
                    !!getSparePart(index)?.product?.name
                      ? getSparePart(index)?.product?.name === SparePart.Others
                        ? undefined
                        : getSparePartStockStatus(
                            getSparePart(index)?.product?.name,
                          )
                      : undefined
                  }
                />

                {getSparePart(index)?.product?.name === 'Others' && (
                  <Input
                    label="Description *"
                    value={getSparePart(index)?.product?.description}
                    onChangeText={value => onAddingDescription(value, index)}
                    isRequired
                    uniqueKey="spare-part-name"
                  />
                )}

                {getSparePartStockStatus(getSparePart(index)?.product?.name) ===
                  'Not Available' && (
                  <Input
                    label="Enter Amount *"
                    value={getSparePart(index)?.price?.toString()}
                    onChangeText={value =>
                      onSparePartAmountChange(value, index)
                    }
                    keyboardType="number-pad"
                  />
                )}
                <Separator />
                <View style={styles.container}>
                  {!!getSparePart(index)?.refurbishmentProofUrl ? (
                    <Image
                      sourceUri={getSparePart(index)?.refurbishmentProofUrl}
                      variant="small_preview"
                      onPress={() =>
                        navigateToViewImageScreen(
                          getSparePart(index)?.refurbishmentProofUrl,
                        )
                      }
                      onPressClose={() => {
                        onAddingSparePartImage('', index)
                      }}
                    />
                  ) : (
                    <RNFileUploader
                      variant="image"
                      title="Upload"
                      saveDoc={value => onAddingSparePartImage(value, index)}
                    />
                  )}
                </View>
                {index !== newRefurbishmentRequestItems?.length && (
                  <TouchableOpacity
                    style={{
                      paddingTop: 4,
                      alignItems: 'flex-end',
                      paddingRight: 10,
                    }}
                    onPress={() => removeSparePart(index)}>
                    <Text style={{paddingTop: 4, color: Colors.light.red}}>
                      Remove
                    </Text>
                  </TouchableOpacity>
                )}
                <Separator size={1} />
                <Divider />
              </View>
            )
          })}

          {/* <Button variant="text" title="Add More +" onPress={onPressAddMore} /> */}
        </ScrollView>
      </View>
    </View>
  )
}

export default InspectVehicle

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Layout.baseSize,
  },
})
