import React, {useState} from 'react'
import {ScrollView, StyleSheet, View} from 'react-native'
import Colors from '../../constants/Colors'
import Layout from '../../constants/Layout'
import {commonStyle} from '../../constants/style'
import useUpdateLeadInput from '../../hooks/useUpdateLeadInput'
import {isNumberValid} from '../../utils/formHelper'
import {log} from '../../utils/helpers'
import Button from '../basic/Button'
import {Input} from '../basic/Input'
import Separator from '../basic/Separator'
import {H2, H3, P1} from '../basic/StyledText'
import {ButtonView, Column, Row} from '../basic/StyledView'
import {FormProps} from './formTypes'

type FormComponentProps = {leadId: string | undefined}

const ProposeBidAmountLimit = ({
  leadId = 'new',
}: FormComponentProps): JSX.Element => {
  log('Lead id at ProposeBidAmountLimit', leadId)
  const {leadInput, setLeadInput} = useUpdateLeadInput(leadId)
  const proposedBidAmount = leadInput?.proposedBidLimitAmount

  // const [previousBids, setPreviousBids] = useState([
  //   { id: 1, amount: "2,50,000", date: "28-12-2022" },
  //   { id: 2, amount: "2,50,000", date: "28-12-2022" },
  //   { id: 3, amount: "2,50,000", date: "28-12-2022" },
  //   { id: 4, amount: "2,50,000", date: "28-12-2022" },
  // ]);
  // const [proposeBidAmount, setProposeBidAmount] = useState<string>();

  function onBidAmountChange(value: string) {
    // console.log('Proposed bid limit amount at onBidAmountChange', value)
    // setProposeBidAmount(value);
    setLeadInput({...leadInput, proposedBidLimitAmount: Number(value)})
  }

  return (
    <View style={commonStyle.mainAppContainer}>
      <ScrollView>
        <Input
          key={'loan-amount'}
          keyboardType="numeric"
          label={'Enter Bid Amount Limit *'}
          onChangeText={onBidAmountChange}
          value={proposedBidAmount?.toString()}
          isRequired
          minCharLength={3}
          uniqueKey="loan-amount"
          checkValidation={isNumberValid(proposedBidAmount)}
        />
        <Separator size={1} />
        {/* <H2>Auction History</H2> */}
        {/* <Column>
          <Row>
            <H3>Bill Amount</H3>
            <H3>Dated</H3>
          </Row>
          <Separator size={1} />
          {/* {previousBids.map((item) => (
            <Bid amount={item?.amount} date={item?.date} />
          ))} */}
        {/* </Column>  */}
      </ScrollView>
      {/* <Row style={commonStyle.buttonView}>
        <Button variant="primary" title={"Submit"} type="enable" />
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

export default ProposeBidAmountLimit

const styles = StyleSheet.create({})
