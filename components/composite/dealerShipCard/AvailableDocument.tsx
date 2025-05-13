import {format} from 'date-fns'
import {
  useFinalCostLazyQuery,
  useFinalCostQuery,
  useGetDocumentsCheckListFromLeadQuery,
  useVehicleDetailsQuery,
} from '../../../generated/hooks_and_more'
import DealershipDetailCard from './DealershipDetailCard'
type AvailableDocumentDetailProps = {
  regNo: string
}
const AvailableDocumentDetail = ({regNo}: AvailableDocumentDetailProps) => {
  const {data} = useVehicleDetailsQuery({
    // fetchPolicy: 'network-only',
    variables: {
      regNo: regNo as string,
    },

    onCompleted: getAvailableDocument => {
      console.log(
        'data...........',
        getAvailableDocument?.getLead?.dealershipDocuments
          ?.registrationCertificate?.expectedDate,
      )
    },
  })
  const item = data?.getLead
  function getformatvalue(isAvailable: boolean, expectedDate: any) {
    const formatDate = !!expectedDate
      ? format(Date.parse(expectedDate), 'dd-MMM-yyyy')
      : ''
    return isAvailable ? 'Yes, ' + formatDate : 'No'
  }
  const availableDocumentDetail: {
    key: string
    value: string
    isHidden: boolean
  }[] = [
    {
      key: 'Registration certificate ',
      value: getformatvalue(
        item?.dealershipDocuments?.registrationCertificate?.isAvailable,
        item?.dealershipDocuments?.registrationCertificate?.expectedDate,
      ),
      isHidden: !item?.documentChecklist?.registrationCertificate,
    },
    {
      key: 'Form 26  ',
      value: getformatvalue(
        item?.dealershipDocuments?.form26?.isAvailable,
        item?.dealershipDocuments?.form26?.expectedDate,
      ),
      isHidden: !item?.documentChecklist?.form26,
    },
    {
      key: 'Loan foreclosure  ',
      value: getformatvalue(
        item?.dealershipDocuments?.loanForeclosure?.isAvailable,
        item?.dealershipDocuments?.loanForeclosure?.expectedDate,
      ),

      isHidden: !item?.documentChecklist?.loanForeclosure,
    },
    {
      key: 'Bank NOC ',
      value: getformatvalue(
        item?.dealershipDocuments?.bankNOC?.isAvailable,
        item?.dealershipDocuments?.bankNOC?.expectedDate,
      ),

      isHidden: !item?.documentChecklist?.bankNOC,
    },
    {
      key: 'Form 35 ',
      value: getformatvalue(
        item?.dealershipDocuments?.form35?.isAvailable,
        item?.dealershipDocuments?.form35?.expectedDate,
      ),

      isHidden: !item?.documentChecklist?.form35,
    },
    {
      key: 'Insurance Certificate  ',
      value: getformatvalue(
        item?.dealershipDocuments?.insuranceCertificate?.isAvailable,
        item?.dealershipDocuments?.insuranceCertificate?.expectedDate,
      ),

      isHidden: !item?.documentChecklist?.insuranceCertificate,
    },
    {
      key: 'Form 28 ',
      value: getformatvalue(
        item?.dealershipDocuments?.form28?.isAvailable,
        item?.dealershipDocuments?.form28?.expectedDate,
      ),

      isHidden: !item?.documentChecklist?.form28,
    },

    {
      key: 'Form 29',
      value: getformatvalue(
        item?.dealershipDocuments?.form29?.isAvailable,
        item?.dealershipDocuments?.form29?.expectedDate,
      ),

      isHidden: !item?.documentChecklist?.form29,
    },

    {
      key: 'Form 30 ',
      value: getformatvalue(
        item?.dealershipDocuments?.form30?.isAvailable,
        item?.dealershipDocuments?.form30?.expectedDate,
      ),

      isHidden: !item?.documentChecklist?.form30,
    },

    {
      key: 'Seller PAN / Form 60  ',
      value: getformatvalue(
        item?.dealershipDocuments?.sellerPAN?.isAvailable,
        item?.dealershipDocuments?.sellerPAN?.expectedDate,
      ),

      isHidden: !item?.documentChecklist?.sellerPAN,
    },

    {
      key: 'Seller Aadhar Card  ',
      value: getformatvalue(
        item?.dealershipDocuments?.sellerAadharCard?.isAvailable,
        item?.dealershipDocuments?.sellerAadharCard?.expectedDate,
      ),

      isHidden: !item?.documentChecklist?.sellerAadharCard,
    },

    {
      key: 'Owner Address Proof  ',
      value: getformatvalue(
        item?.dealershipDocuments?.ownerAddressProof?.isAvailable,
        item?.dealershipDocuments?.ownerAddressProof?.expectedDate,
      ),

      isHidden: !item?.documentChecklist?.ownerAddressProof,
    },
    {
      key: 'Form 36',
      value: getformatvalue(
        item?.dealershipDocuments?.form36?.isAvailable,
        item?.dealershipDocuments?.form36?.expectedDate,
      ),
      isHidden: !item?.documentChecklist?.form36,
    },
    {
      key: 'Will Dealer clear chalan issue?',
      value: item?.dealerStance?.clearChallan ? 'Yes' : 'No',
      isHidden: !item?.vehicle?.isChallanAvailable,
    },
    {
      key: 'Will dealer clear blacklisted issue? ',
      value: item?.dealerStance?.clearBlackList ? 'Yes' : 'No',
      isHidden: !item?.vehicle?.isBlacklisted,
    },
    {
      key: 'Will dealer clear HSRP issue?',
      value: item?.dealerStance?.clearHSRP ? 'Yes' : 'No',
      isHidden: !item?.vehicle?.isHSRPAvailable,
    },
  ]
  return (
    <DealershipDetailCard
      data={availableDocumentDetail}
      leftCardLabel="Document Name"
      rightCardLabel="Availability Status"
    />
  )
}
export default AvailableDocumentDetail
