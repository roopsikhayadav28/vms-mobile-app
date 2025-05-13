import {LazyQueryExecFunction} from '@apollo/client'
import React, {useMemo, useState} from 'react'
import {StyleSheet, View} from 'react-native'
import {ScrollView} from 'react-native-gesture-handler'
import Layout from '../constants/Layout'
import {manufacturingYearList, stateListIndia} from '../constants/constants'
import {commonStyle} from '../constants/style'
import {
  CentreFilter,
  Exact,
  FilterLeadsQuery,
  LeadFilter,
  LeadSource,
  VehicleFilter,
  VehicleMake,
  useAllCentresQuery,
  useModelByMakeQuery,
} from '../generated/hooks_and_more'
import {enumToItems, isEmptyObject} from '../utils/helpers'
import Button from './basic/Button'
import {Input} from './basic/Input'
import PickerSelectButton, {Item} from './basic/PickerSelectButton'
import {Row} from './basic/StyledView'
import {Text} from './basic/Themed'

type FilterProps = {
  onApplyingFilter?: (data) => void
  getFilteredData?: LazyQueryExecFunction<
    FilterLeadsQuery,
    Exact<{
      leadFilter?: LeadFilter
      vehicleFilter?: VehicleFilter
      centreFilter?: CentreFilter
    }>
  >
  showFilter?: Boolean
  setShowFilter?: React.Dispatch<React.SetStateAction<boolean>>
  setIsFilterApplied?: React.Dispatch<React.SetStateAction<boolean>>
}

const Filter = ({
  onApplyingFilter,
  getFilteredData,
  showFilter,
  setShowFilter,
  setIsFilterApplied,
}: FilterProps) => {
  const [purchaseType, setPurchaseType] = useState<LeadSource>()
  const [state, setState] = useState<string>()
  const [vehicleMake, setVehicleMake] = useState<string>()
  const [vehicleModel, setVehicleModel] = useState<string>()
  const [manufacturingYear, setManufacturingYear] = useState<string>()
  const [centre, setCentre] = useState()
  const [minSellingPrice, setMinSellingPrice] = useState<string>(undefined)
  const [maxSellingPrice, setMaxSellingPrice] = useState<string>(undefined)
  const [minListingPrice, setMinListingPrice] = useState<string>(undefined)
  const [maxListingPrice, setMaxListingPrice] = useState<string>(undefined)
  const [leadFilter, setLeadFilter] = useState()
  const [vehicleFilter, setVehicleFilter] = useState()
  const [centreFilter, setCentreFilter] = useState()
  const {data: modelData} = useModelByMakeQuery({
    variables: {
      make: vehicleMake?.includes('_')
        ? vehicleMake.replace('_', ' ')
        : vehicleMake,
    },
    // fetchPolicy: 'network-only',
    skip: !vehicleMake,
  })
  const {data: centresData} = useAllCentresQuery({})
  const vehicleModelList = modelData?.queryModelByMake?.map(i => ({
    label: i?.model,
    value: i?.model,
  }))

  const allocationCenterData = useMemo(
    () =>
      centresData?.queryCentre?.map(centre => ({
        value: centre?.name,
        label: centre?.name,
      })),
    [centresData?.queryCentre],
  )
  function onPurchaseTypeChange(value: string) {
    setPurchaseType(value as LeadSource)
  }
  function onStateChange(value) {
    setState(value)
  }
  function onVehicleMakeChange(value: string) {
    setVehicleMake(value as VehicleMake)
    setVehicleModel(undefined)
  }
  function onVehicleModelChange(value: string) {
    setVehicleModel(value)
  }
  function onManufacturingYearChange(value: string) {
    setManufacturingYear(value)
  }
  function onCentreChange(value) {
    setCentre(value)
  }
  function onMinSellingPriceChange(value: string) {
    setMinSellingPrice(value)
  }
  function onMaxSellingPriceChange(value: string) {
    setMaxSellingPrice(value)
  }
  function onMinListingPriceChange(value: string) {
    setMinListingPrice(value)
  }
  function onMaxListingPriceChange(value: string) {
    setMaxListingPrice(value)
  }
  function onPressReset() {
    setPurchaseType(undefined)
    setState(undefined)
    setVehicleMake(undefined)
    setVehicleModel(undefined)
    setManufacturingYear(undefined)
    setCentre(undefined)
    setMinSellingPrice('')
    setMaxSellingPrice('')
    setMinListingPrice('')
    setMaxListingPrice('')
    setIsFilterApplied(old => false)

    setShowFilter(old => false)
  }

  async function onPressApplyFilter() {
    const leadFilterVariables = {
      leadFilter: {
        source: {
          eq: purchaseType,
        },
        sellingPrice: {
          between: {
            min: minSellingPrice ? Number(minSellingPrice) : undefined,
            max: maxSellingPrice ? Number(maxSellingPrice) : undefined,
          },
        },
        listingPrice: {
          between: {
            min: minListingPrice ? Number(minListingPrice) : undefined,
            max: maxListingPrice ? Number(maxListingPrice) : undefined,
          },
        },
        registrationState: {
          alloftext: state,
        },
      },
      vehicleFilter: {
        make: {
          eq: vehicleMake as VehicleMake,
        },
        model: {
          alloftext: vehicleModel,
        },
        manufacturingDate: {
          eq: manufacturingYear,
        },
      },
      centreFilter: {
        name: {allofterms: centre},
      },
    }
    // console.log(
    //   'This is the lead Filter variable',
    //   JSON.stringify(leadFilterVariables, null, 2),
    // )
    const filter = compactObject(leadFilterVariables)
    if (!isEmptyObject(filter)) {
      filter.cascade = centre ? ['vehicle', 'centre'] : ['vehicle']
    }

    // console.log('This is the filtered obj', JSON.stringify(filter, null, 2))
    await getFilteredData({
      variables: filter,
    })
    //handles empty filter case. if filter object is empty then show all leads list.
    if (isEmptyObject(filter)) {
      setIsFilterApplied(old => false)
    } else {
      setIsFilterApplied(old => true)
    }

    setShowFilter(old => false)
  }

  function compactObject(data) {
    if (typeof data !== 'object') {
      return data
    }

    return Object.keys(data).reduce(function (accumulator, key) {
      const isObject = typeof data[key] === 'object'
      const value = isObject ? compactObject(data[key]) : data[key]
      const isEmptyObject = isObject && !Object.keys(value).length
      if (value === undefined || isEmptyObject) {
        return accumulator
      }

      return Object.assign(accumulator, {[key]: value})
    }, {})
  }
  return (
    <View>
      <ScrollView>
        <Text style={{textAlign: 'center', fontSize: Layout.baseSize}}>
          Apply Filter
        </Text>
        <PickerSelectButton
          placeholder="Purchase type"
          value={purchaseType}
          onValueChange={onPurchaseTypeChange}
          items={enumToItems(LeadSource) as Item[]}
        />
        <PickerSelectButton
          placeholder="State"
          value={state}
          onValueChange={onStateChange}
          items={stateListIndia}
        />
        <PickerSelectButton
          placeholder="Make"
          value={vehicleMake}
          onValueChange={onVehicleMakeChange}
          items={enumToItems(VehicleMake) as Item[]}
          showSearchBar
        />
        <PickerSelectButton
          placeholder="Model"
          value={vehicleModel}
          onValueChange={onVehicleModelChange}
          items={vehicleModelList}
          showSearchBar={!!VehicleMake}
        />
        <PickerSelectButton
          placeholder="Manufacturing Year *"
          value={manufacturingYear}
          onValueChange={onManufacturingYearChange}
          items={manufacturingYearList}
        />
        {centresData &&
          centresData?.queryCentre &&
          centresData?.queryCentre?.length > 0 && (
            <PickerSelectButton
              placeholder={'Select the Centre for Allocation'}
              onValueChange={onCentreChange}
              items={allocationCenterData}
              value={centre}
            />
          )}
        <Row style={styles.rowStyle}>
          <View style={styles.viewFlexStyle}>
            <Input
              key={'Min Selling Price'}
              keyboardType="numeric"
              label={'Min Selling Price'}
              value={minSellingPrice}
              onChangeText={onMinSellingPriceChange}
              isRequired={!!maxSellingPrice}
            />
          </View>
          <View style={styles.viewFlexStyle}>
            <Input
              key={'Max Selling Price'}
              keyboardType="numeric"
              label={'Max Selling Price'}
              value={maxSellingPrice}
              onChangeText={onMaxSellingPriceChange}
              isRequired={!!minSellingPrice}
            />
          </View>
        </Row>
        <Row style={styles.rowStyle}>
          <View style={styles.viewFlexStyle}>
            <Input
              key={'Min Listing Price'}
              keyboardType="numeric"
              label={'Min Listing Price'}
              value={minListingPrice}
              onChangeText={onMinListingPriceChange}
              isRequired={!!maxListingPrice}
            />
          </View>
          <View style={styles.viewFlexStyle}>
            <Input
              key={'Max Listing Price'}
              keyboardType="numeric"
              label={'Max Listing Price'}
              value={maxListingPrice}
              onChangeText={onMaxListingPriceChange}
              isRequired={!!minListingPrice}
            />
          </View>
        </Row>
        <Row style={commonStyle.buttonView}>
          <View
            style={{
              ...styles.viewFlexStyle,
              alignSelf: 'stretch',
            }}>
            <Button
              title="Reset Filter"
              variant="secondary"
              style={styles.buttonStyle}
              onPress={onPressReset}
            />
          </View>
          <View
            style={{
              ...styles.viewFlexStyle,
              paddingLeft: Layout.baseSize * 0.5,
            }}>
            <Button
              title="Apply Filter"
              variant="primary"
              style={styles.buttonStyle}
              onPress={onPressApplyFilter}
            />
          </View>
        </Row>
      </ScrollView>
    </View>
  )
}

export default Filter

const styles = StyleSheet.create({
  rowStyle: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  buttonStyle: {
    alignSelf: 'stretch',
    height: Layout.baseSize * 3,
    borderRadius: Layout.baseSize / 2,
  },
  viewFlexStyle: {
    flex: 1,
  },
})
