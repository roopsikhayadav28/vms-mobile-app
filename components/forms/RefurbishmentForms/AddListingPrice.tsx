import {ScrollView} from 'react-native'
import {commonStyle} from '../../../constants/style'
import {Input} from '../../basic/Input'
import {Row} from '../../basic/StyledView'
import {View} from '../../basic/Themed'
import {H3, P1} from '../../basic/StyledText'
import useUpdateLeadInput from '../../../hooks/useUpdateLeadInput'
import {useProcurementCostQuery} from '../../../generated/hooks_and_more'
import Separator from '../../basic/Separator'
import {log} from '../../../utils/helpers'
import {ActivityIndicator} from 'react-native-paper'
import {FieldId} from '../../../utils/FieldValidator'

type FormComponentProps = {
  leadId?: string
  regNo?: string
}

const AddListingPrice = ({leadId, regNo}: FormComponentProps) => {
  const {leadInput, setLeadInput} = useUpdateLeadInput(leadId)
  const {data: costData, loading} = useProcurementCostQuery({
    variables: {
      regNo: regNo,
    },
    fetchPolicy: 'network-only',
    onCompleted(data) {
      log(
        `in the components ${leadId}`,
        data?.getLead?.sellingPrice?.toString(),
      )
    },
  })
  log('leadId in the component', leadId)
  function onAddingListingPrice(val: string) {
    setLeadInput({
      ...leadInput,
      listingPrice: Number(val),
    })
  }
  const listingPrice = leadInput?.listingPrice
  console.log('selling price', costData?.getLead?.sellingPrice)
  const isDataValid = listingPrice > costData?.getLead?.sellingPrice
  return (
    <View style={commonStyle.mainAppContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Row>
          <P1>Selling Price</P1>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <P1>{costData?.getLead?.sellingPrice}</P1>
          )}
          <Separator />
        </Row>
        <Input
          key={'listing-price'}
          label={'Enter Listing Price *'}
          keyboardType="numeric"
          onChangeText={onAddingListingPrice}
          value={listingPrice?.toString()}
          temporary
          id={FieldId.LISTING_PRICE}
          isDataValid={isDataValid}
        />
      </ScrollView>
    </View>
  )
}
export default AddListingPrice
