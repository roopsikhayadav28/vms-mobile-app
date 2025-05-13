import React from 'react'
import {StyleSheet} from 'react-native'
import {List, Surface} from 'react-native-paper'
import Colors from '../../../constants/Colors'
import Layout from '../../../constants/Layout'
import {CustomerId} from '../../../generated/hooks_and_more'
import DataRowItem from '../../basic/DataRowItem'

type BookingDetailsProps = {
  customerName: string
  state: string
  district: string
  rtoCharges: number
  idType: CustomerId
  idNumber: string
  idProof: string
  isRcTransferRequired: boolean
  isInsuranceRequired: boolean
  vehicleTransactionForm: string
  cancelCheque: string
}

const BookingDetails = ({
  cancelCheque,
  customerName,
  district,
  idNumber,
  idProof,
  idType,
  isInsuranceRequired,
  isRcTransferRequired,
  rtoCharges,
  state,
  vehicleTransactionForm,
}: BookingDetailsProps) => {
  return (
    <Surface style={styles.container}>
      <List.Accordion
        style={styles.accordianStyle}
        title={'Booking Details'}
        // onPress={onExpand}
        titleStyle={{color: Colors.dark.background}}>
        <DataRowItem label="Customer Name" value={customerName ?? '-'} />
        <DataRowItem label="State" value={state ?? '-'} />
        <DataRowItem label="District" value={district ?? '-'} />
        {/* <DataRowItem label="RTO" value={rtoCharges ?? '-'} /> */}
        <DataRowItem label="ID Type" value={idType ?? '-'} />
        <DataRowItem label="ID Number" value={idNumber ?? '-'} />
        <DataRowItem label="Id Proof" value={idProof} isDoc />
        <DataRowItem
          label="RC Transfer Required"
          value={(isRcTransferRequired ? 'Yes' : ' No') ?? '-'}
        />
        <DataRowItem
          label="Insurance Required"
          value={(isInsuranceRequired ? 'Yes' : ' No') ?? '-'}
        />
        <DataRowItem
          label="Vehicle TXN Form"
          value={vehicleTransactionForm}
          isDoc
        />
        <DataRowItem label="Cheque" value={cancelCheque} isDoc />
      </List.Accordion>
    </Surface>
  )
}

export default BookingDetails
const styles = StyleSheet.create({
  container: {
    margin: Layout.baseSize * 0.5,
    backgroundColor: Colors.light.background,
    // width: Layout.window.width,
    borderRadius: Layout.baseSize / 5,
    overflow: 'hidden',
  },
  accordianStyle: {
    backgroundColor: Colors.light.inputBg,
    height: Layout.baseSize * 3,
    padding: Layout.baseSize / 5,
  },
  innerContainer: {
    borderBottomRightRadius: Layout.baseSize,
    borderBottomLeftRadius: Layout.baseSize,
    borderTopRightRadius: Layout.baseSize,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Layout.baseSize / 2,
    marginHorizontal: Layout.baseSize,
  },
  boldText: {
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
})
