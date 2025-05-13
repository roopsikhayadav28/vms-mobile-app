import {ScrollView} from 'react-native-gesture-handler'
import {useGetLeadDealDetailsQuery} from '../../generated/hooks_and_more'
import ConfirmDealCard from '../composite/ConfirmDealCard'
import {formDataValidityProps} from './formTypes'
import {CompositeScreenProps, useNavigation} from '@react-navigation/native'
import {
  LeadStackScreenProps,
  RootStackScreenProps,
} from '../../navigation/navigationTypes'
type FormComponentProps = {leadId: string | undefined}

type DealScreenNavProps = CompositeScreenProps<
  RootStackScreenProps<'LeadProcessScreen'>,
  LeadStackScreenProps<'LeadDetailsScreen'>
>

const DealershipUpdateConfirmDeal = ({
  leadId = 'new',
}: FormComponentProps): JSX.Element => {
  const {data: dealData, loading} = useGetLeadDealDetailsQuery({
    variables: {id: leadId},
    fetchPolicy: 'cache-and-network',
  })
  const navigation = useNavigation<DealScreenNavProps['navigation']>()

  const newDealAmount = dealData?.getLead?.proposedDealAmount
  const make = dealData?.getLead?.vehicle?.make
  const model = dealData?.getLead?.vehicle?.model
  const year = dealData?.getLead?.vehicle?.manufacturingDate
  const ownershipType = dealData?.getLead?.ownershipType
  const hoursMeter = dealData?.getLead?.vehicle?.hoursMeter
  const regNo = dealData?.getLead?.regNo

  function onButtonPress() {
    navigation.navigate('ViewImagesAtStageScreen', {regNo})
  }
  return (
    <ScrollView>
      <ConfirmDealCard
        onPress={onButtonPress}
        loading={loading}
        amount={newDealAmount}
        amountLabel="New Deal Amount"
        make={make}
        model={model}
        year={new Date(year)?.getFullYear()?.toString()}
        ownership={ownershipType}
        hoursmeter={hoursMeter}
        registrationNumber={regNo}
      />
    </ScrollView>
  )
}
export default DealershipUpdateConfirmDeal
