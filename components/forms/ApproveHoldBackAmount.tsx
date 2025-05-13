import {StyleSheet} from 'react-native'
import {View} from '../basic/Themed'
import Layout from '../../constants/Layout'
import {Text} from 'react-native-paper'
import AvailableDocumentDetail from '../composite/dealerShipCard/AvailableDocument'
import {ScrollView} from 'react-native'
import {commonStyle} from '../../constants/style'
import {
  useFinalCostQuery,
  useGetDocumentsCheckListFromLeadLazyQuery,
} from '../../generated/hooks_and_more'
type FormComponentProps = {leadId: string | undefined; regNo?: string}

const ApproveHoldBackAmount = ({
  leadId = 'new',
  regNo,
}: FormComponentProps): JSX.Element => {
  const {data: procurementCostData} = useFinalCostQuery({
    variables: {
      regNo: regNo as string,
    },
    onCompleted: ({getLead}) => {
      console.log('addUser?.user?.[0]', getLead?.holdbackAmount)
    },
  })
  return (
    <View style={commonStyle.mainAppContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.innerContainer}>
          <Text style={{color: 'black', fontWeight: 'bold'}}>
            Documents Charges
          </Text>
          <Text>
            INR {procurementCostData?.getLead?.documentCharges ?? '0'}
          </Text>
        </View>
        <View style={styles.innerContainer}>
          <Text style={{color: 'black', fontWeight: 'bold'}}>
            Hold Back Charges
          </Text>
          <Text>INR {procurementCostData?.getLead?.holdbackAmount ?? '0'}</Text>
        </View>
        <AvailableDocumentDetail regNo={regNo} />
      </ScrollView>
    </View>
  )
}
export default ApproveHoldBackAmount
const styles = StyleSheet.create({
  innerContainer: {
    borderBottomRightRadius: Layout.baseSize,
    borderBottomLeftRadius: Layout.baseSize,
    borderTopRightRadius: Layout.baseSize,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Layout.baseSize / 2,
    marginHorizontal: Layout.baseSize,
  },
})
function useGetDocumentsCheckList(arg0: {
  fetchPolicy: string
  variables: {regNo: string}
  onCompleted: (getAvailableDocument: any) => void
}): {data: any} {
  throw new Error('Function not implemented.')
}
