import React, {useState} from 'react'
import {ScrollView, StyleSheet, View} from 'react-native'
import Layout from '../../constants/Layout'
import {commonStyle} from '../../constants/style'
import {useGetLeadDealDetailsQuery} from '../../generated/hooks_and_more'
import useUpdateLeadInput from '../../hooks/useUpdateLeadInput'
import {log} from '../../utils/helpers'
import Separator from '../basic/Separator'
import {H2, H3, P1} from '../basic/StyledText'
import {Column, Row} from '../basic/StyledView'

type FormComponentProps = {leadId: string | undefined}

const ApproveDeal = ({leadId = 'new'}: FormComponentProps): JSX.Element => {
  const {leadInput} = useUpdateLeadInput(leadId)
  const {data: dealData} = useGetLeadDealDetailsQuery({
    variables: {id: leadId},
  })

  // log('Lead input value at ApproveDeal', leadInput)

  const proposedAmount =
    dealData?.getLead?.proposedBidLimitAmount ??
    leadInput?.proposedBidLimitAmount
  const dealAmount =
    dealData?.getLead?.finalBidAmount ?? leadInput?.finalBidAmount
  const dealDate = dealData?.getLead?.createdAt
    ? new Date(dealData?.getLead?.createdAt)?.toDateString()
    : new Date(leadInput?.createdAt)?.toDateString()
  //TODO; Deal Date to be saved without any input

  // const previousBids = leadInput?.
  // const [previousBids, setPreviousBids] = useState([
  //   { id: 1, amount: "2,50,000", date: "28-12-2022" },
  //   { id: 2, amount: "2,50,000", date: "28-12-2022" },
  //   { id: 3, amount: "2,50,000", date: "28-12-2022" },
  //   { id: 4, amount: "2,50,000", date: "28-12-2022" },
  // ]);

  return (
    <View
      style={StyleSheet.flatten([
        commonStyle.mainAppContainer,
        styles.container,
      ])}>
      <ScrollView>
        <Separator size={1} />

        <H2>Deal Details</H2>
        {/* TODO: fetched data */}
        <Column>
          <Separator size={1} />
          <Row style={styles.sectionStyle}>
            <P1>Proposed Amount</P1>
            <P1>{proposedAmount}</P1>
          </Row>
          <Separator size={1} />

          <Row style={styles.sectionStyle}>
            <P1>Deal Amount</P1>
            <P1>{dealAmount}</P1>
          </Row>
          <Separator size={1} />
          <Row style={styles.sectionStyle}>
            <P1>Deal Date</P1>
            <P1>{dealDate}</P1>
          </Row>
        </Column>
        {/* 
        <H2>Bidding History</H2>
        <Column>
          <Row>
            <H3>Bill Amount</H3>
            <H3>Dated</H3>
          </Row>
          {/* TODO: iterate on the list of previous proposed bids and render that based on their status */}
        {/* {previousBids.map((item) => (            <Bid amount={item?.amount} date={item?.date} />  ))} */}
        {/* </Column> */}
      </ScrollView>

      {/* <Row style={commonStyle.buttonView}>
        <Button variant="danger" title={"NOT APPROVED"} type="enable" />
        <Button variant="green" title={"APPROVED"} type="enable" />
      </Row> */}
    </View>
  )
}

type BidComponentProps = {
  amount: string
  date: string
}
const Bid = ({amount, date}: BidComponentProps): JSX.Element => {
  return (
    <Row>
      <P1>{amount}</P1>
      <P1>{date}</P1>
    </Row>
  )
}

export default ApproveDeal

const styles = StyleSheet.create({
  sectionStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
  },
  container: {paddingHorizontal: Layout.baseSize / 2},
})
