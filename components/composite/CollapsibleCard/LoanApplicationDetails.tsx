import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {List, Surface} from 'react-native-paper'
import {
  BankName,
  BookingType,
  LoanStatus,
} from '../../../generated/hooks_and_more'
import DataRowItem from '../../basic/DataRowItem'
import Colors from '../../../constants/Colors'
import {format} from 'date-fns'
import Layout from '../../../constants/Layout'
import {titleCaseToReadable} from '../../../utils/helpers'
type LoanApplicationProps = {
  requestedLoanAmount: number
  bookingType: BookingType
  approvedLoanAmount: number
  requestDate: Date
  bankName: BankName
  loginDate: Date
  fiDate: Date
  fiStatus: LoanStatus //To be deprecated and replaced with LoanStage or not
  doDate: Date
  deliveryOrderProofUrl: string
  doRejectionReason: string
  doValidUpto: number
  fileStatus: LoanStatus
  statusDate: Date
}

const LoanApplicationDetails = ({
  bankName,
  approvedLoanAmount,
  deliveryOrderProofUrl,
  doDate,
  doRejectionReason,
  fiDate,
  fiStatus,
  requestedLoanAmount,
  loginDate,
  requestDate,
  doValidUpto,
  fileStatus,
  statusDate,
  bookingType,
}: LoanApplicationProps) => {
  return (
    <Surface style={styles.container}>
      <List.Accordion
        style={styles.accordianStyle}
        title={'Loan Application Details'}
        // onPress={onExpand}
        titleStyle={{color: Colors.dark.background}}>
        <DataRowItem label="File Status" value={fileStatus ?? '-'} />
        {/* TODO: need clarity on status date */}
        <DataRowItem
          label="Status Date"
          value={
            !!statusDate && bookingType === BookingType.Finance
              ? format(new Date(statusDate), 'dd MMM YYY')
              : '-'
          }
        />
        <DataRowItem
          label="Approved Amount"
          value={approvedLoanAmount ?? '-'}
        />
        <DataRowItem
          label="Requested Amount"
          value={requestedLoanAmount ?? '-'}
        />
        <DataRowItem
          label="Requested Date"
          value={
            !!requestDate && bookingType === BookingType.Finance
              ? format(new Date(requestDate), 'dd MMM YYY')
              : '-'
          }
        />
        <DataRowItem label="Bank Name" value={bankName ?? '-'} />

        <DataRowItem
          label="Login Date"
          value={!!loginDate ? format(new Date(loginDate), 'dd MMM YYY') : '-'}
        />
        <DataRowItem
          label="Fi Date"
          value={!!fiDate ? format(new Date(fiDate), 'dd MMM YYY') : '-'}
        />
        <DataRowItem
          label="DO Date"
          value={!!doDate ? format(new Date(doDate), 'dd MMM YYY') : '-'}
        />

        <DataRowItem
          label="Delivery Order"
          value={deliveryOrderProofUrl}
          isDoc
        />

        <DataRowItem
          label="DO valid Upto(In Days)"
          value={doValidUpto ?? '-'}
        />

        <DataRowItem
          label="DO Rejection Remarks"
          value={doRejectionReason ?? '-'}
        />
      </List.Accordion>
    </Surface>
  )
}

export default LoanApplicationDetails

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
