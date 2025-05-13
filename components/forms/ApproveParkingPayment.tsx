import React, {useState} from 'react'
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native'
import {Surface} from 'react-native-paper'
import Colors from '../../constants/Colors'
import Layout from '../../constants/Layout'
import {commonStyle} from '../../constants/style'
import {PaymentStatus, useFinalCostQuery} from '../../generated/hooks_and_more'
import useUpdateLeadInput from '../../hooks/useUpdateLeadInput'
import {calculateParkingCharge, log} from '../../utils/helpers'
import {H3, P2} from '../basic/StyledText'

type FormComponentProps = {leadId: string | undefined; regNo?: string}

const ApproveParkingPayment = ({
  leadId,
  regNo,
}: FormComponentProps): JSX.Element => {
  const {leadInput, setLeadInput} = useUpdateLeadInput(leadId)
  const {data: procurementCostData} = useFinalCostQuery({
    variables: {
      regNo: regNo as string,
    },
    // fetchPolicy: 'network-only',
    onCompleted: data => {
      log('procurement cost', data?.getLead?.expectedPickupDate)
      // changes as requested by Anjali
      const epd = data?.getLead?.expectedPickupDate
      const pdp = data?.getLead?.yard?.perDayParkingCharge
      const rd = data?.getLead?.vehicle?.repossessionDate
      const estimatedPcharge = calculateParkingCharge({
        expectedPickupDate: epd,
        perDayParkingCharge: pdp,
        repossessionDate: rd,
      })
      setLeadInput({
        ...leadInput,
        finalParkingCharges: Number(estimatedPcharge ?? 1),
        vehicle: {
          ...leadInput?.vehicle,
          repossessionDate: repoDate,
        },
        yard: {
          ...leadInput?.yard,
          perDayParkingCharge: Number(perDayParkingCharge),
        },
        payments: [{status: PaymentStatus.Estimated}],
      })
      // Changes as requested
    },
  })

  // useEffect(() => {
  //   if (!!procurementCostData?.getLead?.yard?.perDayParkingCharge) {
  //     setLeadInput({
  //       ...leadInput,
  //       finalParkingCharges: Number(estimatedParkingCharge ?? 1),
  //       vehicle: {
  //         ...leadInput?.vehicle,
  //         repossessionDate: repoDate,
  //       },
  //       yard: {
  //         ...leadInput?.yard,
  //         perDayParkingCharge: Number(perDayParkingCharge),
  //       },
  //     })
  //   }
  //   // log(
  //   //   'estimated parking charge set on mounting',
  //   //   Number(estimatedParkingCharge ?? 1),
  //   //)
  // }, [procurementCostData])
  // // log('final parking charge set on mounting', leadInput?.finalParkingCharges)

  function onTouchCalculatedCard(
    value: string,
    perDayCharge: string,
    repoDate: Date,
  ) {
    setSelectedCard('Calculated_Procurement_Cost')
    setFinalValue(value)
    setLeadInput({
      ...leadInput,
      finalParkingCharges: Number(value),
      vehicle: {
        ...leadInput?.vehicle,
        repossessionDate: repoDate,
      },
      yard: {
        ...leadInput?.yard,
        perDayParkingCharge: Number(perDayCharge),
      },
      payments: [{status: PaymentStatus.Estimated}],
    })
  }
  function onTouchActualCard(
    value: string,
    perDayCharge: string,
    repoDate: Date,
  ) {
    setSelectedCard('Actual_Procurement_Cost')
    setFinalValue(value)
    setLeadInput({
      ...leadInput,
      finalParkingCharges: Number(value),
      vehicle: {
        ...leadInput?.vehicle,
        repossessionDate: repoDate,
      },
      yard: {
        ...leadInput.yard,
        perDayParkingCharge: Number(perDayCharge),
      },
      payments: [{status: PaymentStatus.Requested}],
    })
    // console.log(
    //   'This is the lead input on touch actual card',
    //   JSON.stringify(leadInput, null, 2),
    // )
    // console.log(
    //   'This is the procurement cost data on touch actual card',
    //   JSON.stringify(procurementCostData, null, 2),
    // )
  }
  // NOTE: Calculated is from repoDate and perDayPC while actual is from tempRepoDate and tempPerDayCharge
  // final bid amount of the vehicle
  const amount = procurementCostData?.getLead?.finalBidAmount
  const perDayParkingCharge =
    procurementCostData?.getLead?.yard?.perDayParkingCharge
  const tempPerDayParkingCharge =
    procurementCostData?.getLead?.yard?.tempPerDayParkingCharge
  const expectedPickupDate = procurementCostData?.getLead?.expectedPickupDate
  // repo date added in form: UpdateVehicleDetails
  const repoDate = procurementCostData?.getLead?.vehicle?.repossessionDate
  // repo date added by the driver in form: PPPFinalDetailsAdded
  const tempRepoDate =
    procurementCostData?.getLead?.vehicle?.tempRepossessionDate
  // total parking charges at estimation stage
  const estimatedParkingCharge = calculateParkingCharge({
    expectedPickupDate,
    perDayParkingCharge,
    repossessionDate: repoDate,
  })

  // total parking charges at final stage
  const actualParkingCharge = calculateParkingCharge({
    expectedPickupDate: new Date(),
    perDayParkingCharge: tempPerDayParkingCharge,
    repossessionDate: tempRepoDate,
  })

  const [finalValue, setFinalValue] = useState<number | string>(
    estimatedParkingCharge ?? '1',
  )

  const calculatedEstimatedParkingCharge = estimatedParkingCharge + amount
  const actualParkingChargeCost = actualParkingCharge + amount
  const [selectedCard, setSelectedCard] = useState<
    'Actual_Procurement_Cost' | 'Calculated_Procurement_Cost'
  >('Calculated_Procurement_Cost')
  return (
    <View style={commonStyle.mainAppContainer}>
      <ScrollView>
        <ProcuremnentCostCard
          dealAmount={amount}
          date={repoDate}
          perDayParkingCharge={perDayParkingCharge?.toString()}
          parkingCharges={estimatedParkingCharge}
          type="calculated"
          procurementCost={calculatedEstimatedParkingCharge}
          onPress={() =>
            onTouchCalculatedCard(
              estimatedParkingCharge?.toString(),
              perDayParkingCharge?.toString(),
              repoDate,
            )
          }
          // onPress={() => setSelectedCard('Calculated_Procurement_Cost')}
          isSelected={selectedCard === 'Calculated_Procurement_Cost'}
        />

        <ProcuremnentCostCard
          dealAmount={amount}
          date={tempRepoDate}
          perDayParkingCharge={tempPerDayParkingCharge?.toString()}
          parkingCharges={actualParkingCharge}
          type="actual"
          procurementCost={actualParkingChargeCost}
          onPress={() =>
            onTouchActualCard(
              actualParkingCharge?.toString(),
              tempPerDayParkingCharge?.toString(),
              tempRepoDate,
            )
          }
          // onPress={() => setSelectedCard('Actual_Procurement_Cost')}
          isSelected={selectedCard === 'Actual_Procurement_Cost'}
        />
      </ScrollView>
    </View>
  )
}

type ProcuremnentCostCardProps = {
  date?: Date
  perDayParkingCharge?: string
  parkingCharges?: number
  dealAmount?: number
  procurementCost?: number
  type?: 'actual' | 'calculated'
  onPress: () => void
  isSelected: boolean
}

const ProcuremnentCostCard = ({
  date,
  perDayParkingCharge,
  parkingCharges,
  dealAmount,
  procurementCost,
  type,
  onPress,
  isSelected,
}: ProcuremnentCostCardProps): JSX.Element => {
  const title =
    type === 'actual'
      ? 'Actual Procurement Cost'
      : 'Calculated Procurement Cost'

  return (
    <Surface style={styles.container} elevation={isSelected ? 4 : 1}>
      <TouchableOpacity
        style={
          isSelected
            ? {
                borderColor: Colors.light.primary,
                borderWidth: 4,
              }
            : {borderWidth: 4, borderColor: 'white'}
        }
        onPress={onPress}>
        <View>
          <H3
            style={{
              marginLeft: Layout.baseSize,
              marginTop: Layout.baseSize,
            }}>
            {title}
          </H3>

          <View style={styles.innerContainer}>
            <P2 numberOfLines={1}>
              {type === 'actual' ? 'Actual ' : 'Expected '}Repossession Date
            </P2>
            {date ? (
              <P2 numberOfLines={1}>{new Date(date)?.toDateString()}</P2>
            ) : (
              <View />
            )}
          </View>

          <View style={styles.innerContainer}>
            <P2 numberOfLines={1}>Deal Amount</P2>
            <P2 numberOfLines={1}>{dealAmount}</P2>
          </View>
          <View style={styles.innerContainer}>
            <P2 numberOfLines={1}>
              {type === 'actual' ? 'Actual ' : 'Calculated '}Per Day Parking
              Charge
            </P2>
            <P2 numberOfLines={1}>{perDayParkingCharge}</P2>
          </View>
          <View style={styles.innerContainer}>
            <P2 numberOfLines={1}>
              {type === 'actual' ? 'Actual ' : 'Calculated '}Parking Charge
            </P2>
            <P2 numberOfLines={1}>{parkingCharges}</P2>
          </View>
          <View
            style={[styles.innerContainer, {marginBottom: Layout.baseSize}]}>
            <P2 numberOfLines={1}>
              {type === 'actual' ? 'Actual ' : 'Calculated '}Procurement Cost
            </P2>
            <P2 numberOfLines={1}>{procurementCost}</P2>
          </View>
        </View>
      </TouchableOpacity>
    </Surface>
  )
}

export default ApproveParkingPayment

const styles = StyleSheet.create({
  card: {padding: Layout.baseSize},
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: Layout.baseSize,
    paddingHorizontal: Layout.baseSize,
  },
  container: {
    margin: Layout.baseSize * 0.5,
    backgroundColor: Colors.light.background,
    // width: Layout.window.width,
    borderRadius: Layout.baseSize / 5,
    overflow: 'hidden',
  },
  accordionStyle: {
    backgroundColor: Colors.light.inputBg,
    height: Layout.baseSize * 3,
    padding: Layout.baseSize / 5,
    flexDirection: 'column',
  },
  mainItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Layout.baseSize / 2,
    paddingHorizontal: Layout.baseSize,
  },
  kayValueStyle: {
    width: '50%',
  },
})
