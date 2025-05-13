import React from 'react'
import {ScrollView, StyleSheet, View} from 'react-native'
import {commonStyle} from '../../constants/style'
import useUpdateLeadInput from '../../hooks/useUpdateLeadInput'
import {isNumberValid} from '../../utils/formHelper'
import {Input} from '../basic/Input'

type FormComponentProps = {leadId: string | undefined}

const BidWonOrLost = ({leadId = 'new'}: FormComponentProps): JSX.Element => {
  // const [finalBidAmount, setFinalBidAmount] = useState<string>();
  const {leadInput, setLeadInput} = useUpdateLeadInput(leadId)
  const finalBidAmount = leadInput?.finalBidAmount

  function onFinalBidAmountChange(value: string) {
    setLeadInput({
      ...leadInput,
      finalBidAmount: Number(value),
    })
  }

  return (
    <View style={commonStyle.mainAppContainer}>
      <ScrollView>
        <Input
          key="loan-amount"
          keyboardType="numeric"
          label="Enter Final Bid Amount *"
          onChangeText={onFinalBidAmountChange}
          value={finalBidAmount?.toString()}
          isRequired
          uniqueKey="loan-amounts"
          checkValidation={isNumberValid(finalBidAmount)}
        />
      </ScrollView>
      {/* <Row style={commonStyle.buttonView}>
        <Button variant="danger" title={"DEAL LOST"} type="enable" />
        <Button variant="green" title={"DEAL WON"} type="enable" />
      </Row> */}
    </View>
  )
}

export default BidWonOrLost

const styles = StyleSheet.create({})
