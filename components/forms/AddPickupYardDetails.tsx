import {DateTimePickerEvent} from '@react-native-community/datetimepicker'
import _ from 'lodash'
import React, {useState} from 'react'
import {ScrollView, StyleSheet, Text, ToastAndroid, View} from 'react-native'
import {HelperText} from 'react-native-paper'
import Layout from '../../constants/Layout'
import {commonStyle} from '../../constants/style'
import {
  useGetAllYardQuery,
  useGetLeadDetailsQuery,
} from '../../generated/hooks_and_more'
import useUpdateLeadInput from '../../hooks/useUpdateLeadInput'
import {isPhoneValid, isValidLocationUrl} from '../../utils/formHelper'
import {DatePicker} from '../basic/DatePicker'
import {Input} from '../basic/Input'
import PickerSelectButton, {Item} from '../basic/PickerSelectButton'

type FormComponentProps = {leadId: string | undefined; regNo?: string}

const AddPickupYardDetails = ({
  leadId = 'new',
  regNo,
}: FormComponentProps): JSX.Element => {
  const {leadInput, setLeadInput} = useUpdateLeadInput(leadId)
  // console.log('The lead in put on load of yard form', leadInput?.yard)
  const [newYardName, setNewYardName] = useState<string>(
    leadInput?.yard?.name ?? undefined,
  )

  const [showErrorMessages, setShowErrorMessages] = useState<boolean>(false)

  const {data: yardsData} = useGetAllYardQuery({
    fetchPolicy: 'network-only',
    onCompleted: data => {
      // log('Yards data', data)
    },
    onError: ({message, networkError, graphQLErrors}) => {
      ToastAndroid.showWithGravity(
        message,
        (ToastAndroid.SHORT = 10),
        ToastAndroid.CENTER,
      )
    },
  })

  const {data: leadDetailsData} = useGetLeadDetailsQuery({
    fetchPolicy: 'cache-and-network',
    skip: !regNo,
    variables: {
      regNo: regNo,
    },
    // onCompleted: ({getLead}) => {
    //   // rehydrate per day parking charge from the server
    //   console.log('getLead==', getLead)
    // },
  })

  const pickupYardDetailsData: Item[] = yardsData?.queryYard
    ?.map(yard => ({
      label: _.capitalize(yard?.name),
      value: yard?.id,
    }))
    .concat([{label: 'Add new yard details', value: null}])

  // const [yardLocation, setYardLocation] = useState<string>();
  const pickupDate = leadInput?.expectedPickupDate
  // const addPickupYard =
  const yardId = leadInput?.yard?.id
  const yardName = leadInput?.yard?.name
  const yardAddress = leadInput?.yard?.address
  const yardSPOC = leadInput?.yard?.spocName
  const yardSPOCNumber = leadInput?.yard?.spocNo
  const yardLocation = leadInput?.yard?.locationUrl
  const yardCity = leadInput?.yard?.city
  const yardPerDayParkingCharge = leadInput?.yard?.perDayParkingCharge
  const checkSpocPhoneNumber =
    yardSPOCNumber?.length > 0 && isPhoneValid(yardSPOCNumber)
  const checkYardLocation =
    yardLocation?.length > 0 && isValidLocationUrl(yardLocation)
  function strippedText(str: string) {
    if (!str) return ''
    return str.trim().toLowerCase().replace(' ', '')
  }
  function onPickupDateChange(event: DateTimePickerEvent, date?: Date) {
    // console.log('Current Date===', date)
    // console.log(
    //   'RepossessionDate',
    //   leadDetailsData?.getLead?.vehicle?.repossessionDate,
    // )
    if (
      new Date(date) <
      new Date(leadDetailsData?.getLead?.vehicle?.repossessionDate)
    ) {
      setShowErrorMessages(true)
    } else {
      setLeadInput({
        ...leadInput,
        expectedPickupDate: date,
      })

      setShowErrorMessages(false)
    }

    // setPickupDate(date ?? new Date());
  }

  function onPickupYardChange(value: string, index: number) {
    if (!!value) {
      // existingYardPresent = true;
      setLeadInput({
        ...leadInput,
        yard: {
          id: value,
          name: yardsData?.queryYard?.find(yard => yard.id === value)?.name,
          city: yardsData?.queryYard?.find(yard => yard.id === value)?.city,
          address: yardsData?.queryYard?.find(yard => yard.id === value)
            ?.address,
          locationUrl: yardsData?.queryYard?.find(yard => yard.id === value)
            ?.locationUrl,
          perDayParkingCharge: yardsData?.queryYard?.find(
            yard => yard.id === value,
          )?.perDayParkingCharge,
          spocName: yardsData?.queryYard?.find(yard => yard.id === value)
            ?.spocName,
          spocNo: yardsData?.queryYard?.find(yard => yard.id === value)?.spocNo,
        },
      })
    } else {
      // existingYardPresent = false;
      setLeadInput({
        ...leadInput,
        yard: {
          id: null,
          name: null,
        },
      })
    }
  }

  function onAddingYardPerDayParkingCharge(value: string) {
    // console.log('yard name', newYardName)
    // console.log('-->', setLeadInput)
    setLeadInput({
      ...leadInput,
      yard: {
        ...leadInput?.yard,
        perDayParkingCharge: Number(value),
      },
    })
  }
  function onAddingYardName(value: string) {
    setLeadInput({
      ...leadInput,
      yard: {
        ...leadInput?.yard,
        name: value,
      },
    })
    setNewYardName(value)
  }
  function checkYardName(value: string) {
    if (
      pickupYardDetailsData?.find(
        i => strippedText(i.label) === strippedText(value),
      )
    ) {
      return true
    } else {
      return false
    }
  }

  function onAddingYardAddress(value?: string) {
    setLeadInput({
      ...leadInput,
      yard: {
        ...leadInput?.yard,
        address: value,
      },
    })
  }

  function onAddingYardSPOC(value: string) {
    setLeadInput({
      ...leadInput,
      yard: {
        ...leadInput?.yard,
        name: newYardName,
        spocName: value,
      },
    })
  }

  function onAddingSpocMobile(value: string) {
    setLeadInput({
      ...leadInput,
      yard: {
        ...leadInput?.yard,
        spocNo: value,
      },
    })
  }

  function onYardLocationChange(value: string) {
    setLeadInput({
      ...leadInput,
      yard: {
        ...leadInput?.yard,
        locationUrl: value,
      },
    })
  }

  function onAddingYardCity(value: string) {
    setLeadInput({
      ...leadInput,
      yard: {
        ...leadInput?.yard,
        city: value,
      },
    })
  }
  // console.log('leadInput at pickupYardDetails Form is: ', leadInput?.yard)
  return (
    <View style={commonStyle.mainAppContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <DatePicker
          placeholder="Enter the Pickup Date *"
          value={pickupDate}
          onChange={onPickupDateChange}
          isRequired
        />
        {showErrorMessages && (
          <HelperText type="error" visible={showErrorMessages}>
            {'Pickup date should be greater than repo date'}
          </HelperText>
        )}
        <PickerSelectButton
          placeholder={'Select Pickup Yard *'}
          onValueChange={onPickupYardChange}
          items={pickupYardDetailsData}
          value={!!yardName ? yardName : 'Add new yard'}
          isRequired
        />
        {/* // TODO how to handle a new yard name? */}

        <Input
          label="Yard Name *"
          value={!!yardName ? yardName : newYardName}
          onChangeText={onAddingYardName}
          isRequired
          uniqueKey="yard-name"
          disabled={!!yardId}
          checkExistingYardName={!!yardId ? false : checkYardName(newYardName)}
        />
        <Input
          label="Yard City *"
          value={yardCity}
          onChangeText={onAddingYardCity}
          isRequired
          disabled={!!yardId}
        />
        <Input
          label="Yard Address *"
          value={yardAddress}
          onChangeText={onAddingYardAddress}
          isRequired
          disabled={!!yardId}
          uniqueKey="yard-address"
        />
        <Input
          label="Yard SPOC Name *"
          value={yardSPOC}
          onChangeText={onAddingYardSPOC}
          isRequired
          uniqueKey="yard-spoc-name"
          disabled={!!yardId}
        />
        <Input
          label="Yard SPOC Mobile *"
          keyboardType="phone-pad"
          value={yardSPOCNumber}
          onChangeText={onAddingSpocMobile}
          isRequired
          uniqueKey="yard-spoc-mobile"
          checkValidation={checkSpocPhoneNumber}
          disabled={!!yardId}
        />
        {/* <Input
                label="Yard Per Day Parking Charge"
                keyboardType="number-pad"
                value={yardPerDayParkingCharge?.toString()}
                onChangeText={onAddingYardPerDayParkingCharge}
                isRequired
              /> */}
        <Input
          label="Yard Location URL *"
          value={yardLocation}
          onChangeText={onYardLocationChange}
          uniqueKey="yard-location"
          checkValidation={checkYardLocation}
          isRequired
          disabled={!!yardId}
        />
      </ScrollView>
    </View>
  )
}

export default AddPickupYardDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: Layout.baseSize,
  },
})
