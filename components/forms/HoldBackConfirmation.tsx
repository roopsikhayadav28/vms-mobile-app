import {ScrollView, View} from 'react-native'
import {Input} from '../basic/Input'
import {commonStyle} from '../../constants/style'
import AvailableDocumentDetail from '../composite/dealerShipCard/AvailableDocument'
import useUpdateLeadInput from '../../hooks/useUpdateLeadInput'
import {useGetDocumentsCheckListFromLeadQuery} from '../../generated/hooks_and_more'
type FormComponentProps = {leadId: string | undefined; regNo?: string}

const HoldBackConfirmation = ({
  leadId = 'new',
  regNo,
}: FormComponentProps): JSX.Element => {
  const {leadInput, setLeadInput} = useUpdateLeadInput(leadId)

  const documentCharges = leadInput?.documentCharges
  const holdBackAmount = leadInput?.holdbackAmount
  function onChangeDocumentCharges(value: string) {
    setLeadInput({
      ...leadInput,
      documentCharges: Number(value),
    })
  }
  function onChangeHoldBackAmount(value: string) {
    setLeadInput({
      ...leadInput,
      holdbackAmount: Number(value),
    })
  }
  console.log({regNo})
  return (
    <View style={commonStyle.mainAppContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Input
          label="Document Charges *"
          value={documentCharges?.toString()}
          onChangeText={onChangeDocumentCharges}
        />
        <Input
          label="Hold Back Amount *"
          value={holdBackAmount?.toString()}
          onChangeText={onChangeHoldBackAmount}
        />
        <AvailableDocumentDetail regNo={regNo} />
      </ScrollView>
    </View>
  )
}
export default HoldBackConfirmation
