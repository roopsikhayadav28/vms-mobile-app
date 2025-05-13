import React from 'react'
import {ScrollView, StyleSheet, View} from 'react-native'
import Colors from '../../constants/Colors'
import {commonStyle} from '../../constants/style'
import {
  PaymentStatus,
  useDeliveryExpensesQuery,
} from '../../generated/hooks_and_more'
import useUpdateLeadInput from '../../hooks/useUpdateLeadInput'
import Card from '../basic/Card'
import Separator from '../basic/Separator'
import {H2, H3} from '../basic/StyledText'
import {Column, Row} from '../basic/StyledView'
import {DeliveryExpense} from '../composite/DeliveryExpense'

type ApproveDeliveryExpensesProps = {leadId: string | undefined}

const ApproveDeliveryExpense = ({
  leadId = 'new',
}: ApproveDeliveryExpensesProps): JSX.Element => {
  const {leadInput} = useUpdateLeadInput(leadId)
  console.log(leadId)
  const {data: expensesData} = useDeliveryExpensesQuery({
    skip: !leadInput?.id,
    fetchPolicy: 'network-only',
    variables: {
      id: leadId,
    },
    onCompleted(data) {
      // log('fetched delivery expenses', data?.getLead?.expenses)
      console.log(
        'This is on delivery query completed',
        JSON.stringify(data, null, 2),
      )
    },
  })
  // console.log('Expenses Data: expensesData', expensesData?.getLead?.expenses)
  // console.log(JSON.stringify(expensesData, null, 2))
  const latestDeliveryExpenses = expensesData?.getLead?.expenses?.filter(
    expense => expense?.paymentStatus !== PaymentStatus.Rejected,
  )

  // console.log('latestDeliveryExpenses', latestDeliveryExpenses)
  let totalExpenses = 0

  latestDeliveryExpenses?.map(item => {
    totalExpenses = totalExpenses + item?.spentAmount
    return totalExpenses
  })

  // function calculateSum(array: [LeadExpense], property: any) {
  //   const total = array.reduce((accumulator: number, object: any) => {
  //     return accumulator + object[property];
  //   }, 0);

  //   return total;
  // }

  // const totalExpenses =
  //   expensesData &&
  //   expensesData?.queryLeadExpense &&
  //   expensesData?.queryLeadExpense?.length > 0 &&
  //   calculateSum(expensesData?.queryLeadExpense, "spentAmount");

  return (
    <View style={commonStyle.mainAppContainer}>
      <ScrollView>
        <Column>
          <Row>
            <H3>Expense Name</H3>
            <H3>Amount</H3>
            <H3>Date</H3>
            <H3>Document</H3>
          </Row>
          <Separator size={1} />
          {/* TODO: Render list on basis of data availability  */}
          {latestDeliveryExpenses?.map((item, index) => (
            <DeliveryExpense
              key={index}
              amount={item.spentAmount}
              date={item?.createdAt?.substring(0, 10)}
              documentURL={item?.receiptUrl}
              expenseName={item.category}
            />
          ))}
        </Column>
      </ScrollView>
      <Card style={styles.cardStyle}>
        <Row>
          <H3>Total Amount</H3>
          <H2 style={styles.totalExpenseTextStyle}>₹ {totalExpenses}</H2>
        </Row>
      </Card>
      {/* <Row style={commonStyle.buttonView}>
        <Button variant="action" title={"REJECT EXPENSE"} type="disable" />
        <Button variant="action" title={"APPROVE EXPENSE"} type="enable" />
      </Row> */}
    </View>
  )
}

export default ApproveDeliveryExpense

const styles = StyleSheet.create({
  cardStyle: {backgroundColor: Colors.light.inputBg, marginBottom: 10},
  totalExpenseTextStyle: {color: Colors.light.primary},
})
