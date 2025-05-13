import {ScrollView} from 'react-native-gesture-handler'
import {useGetLeadDealDetailsQuery} from '../../generated/hooks_and_more'
import ConfirmDealCard from '../composite/ConfirmDealCard'
import Navigation from '../../navigation'
import {CompositeScreenProps, useNavigation} from '@react-navigation/native'
import {
  LeadStackScreenProps,
  RootStackScreenProps,
} from '../../navigation/navigationTypes'
type FormComponentProps = {leadId: string | undefined}

const DealershipConfirmDeal = ({
  leadId = 'new',
}: FormComponentProps): JSX.Element => {
  const {data: dealData, loading} = useGetLeadDealDetailsQuery({
    variables: {id: leadId},
    fetchPolicy: 'cache-and-network',
  })
  const demandedAmount = dealData?.getLead?.demandAmount
  const make = dealData?.getLead?.vehicle?.make
  const model = dealData?.getLead?.vehicle?.model
  const year = dealData?.getLead?.vehicle?.manufacturingDate
  const ownershipType = dealData?.getLead?.ownershipType
  const hoursMeter = dealData?.getLead?.vehicle?.hoursMeter
  const regNo = dealData?.getLead?.regNo
  type DealScreenNavProps = CompositeScreenProps<
    RootStackScreenProps<'LeadProcessScreen'>,
    LeadStackScreenProps<'LeadDetailsScreen'>
  >
  const navigation = useNavigation<DealScreenNavProps['navigation']>()

  function onButtonPress() {
    navigation.navigate('ViewImagesAtStageScreen', {regNo})
  }
  return (
    <ScrollView>
      <ConfirmDealCard
        loading={loading}
        amountLabel="Demand Amount"
        amount={demandedAmount}
        make={make}
        model={model}
        year={new Date(year)?.getFullYear()?.toString()}
        ownership={ownershipType}
        hoursmeter={hoursMeter}
        registrationNumber={regNo}
        onPress={onButtonPress}
      />
    </ScrollView>
  )
}
export default DealershipConfirmDeal
