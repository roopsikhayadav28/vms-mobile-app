import {ScrollView, View} from 'react-native'
import {P1} from '../../basic/StyledText'
import DealershipDetailCard from '../../composite/dealerShipCard/DealershipDetailCard'
import Layout from '../../../constants/Layout'
import {Input} from '../../basic/Input'
import RNFileUploader from '../../basic/RNFileUploader'
import RNRadioButton from '../../basic/RNRadioButton'
import {commonStyle} from '../../../constants/style'
import useUpdateLeadInput from '../../../hooks/useUpdateLeadInput'
import {
  PurchaseItem,
  useGetLeadRefurbishmentDetailsQuery,
} from '../../../generated/hooks_and_more'

type RaiseInstallationPaymentsProps = {
  leadId?: string
  regNo?: string
  requestId: string
}

function getPurchaseItems(dbPurchasedItems, productName: string): PurchaseItem {
  return dbPurchasedItems?.find(item => item?.product?.name === productName)
}

const RaiseInstallationPayments = ({
  leadId,
  regNo,
  requestId,
}: RaiseInstallationPaymentsProps) => {
  const {leadInput, setLeadInput} = useUpdateLeadInput(leadId)

  const {data: refurbishmentDetailsData} = useGetLeadRefurbishmentDetailsQuery({
    variables: {
      regNo,
    },
    skip: !regNo,
    fetchPolicy: 'network-only',
  })

  const dbPurchasedItems =
    refurbishmentDetailsData?.queryLead?.[0]?.refurbishmentDetails?.requests?.find(
      req => req?.id === requestId,
    )?.purchase?.items ?? []

  // log('dbPurchasedItems', dbPurchasedItems)

  const leadInputRefurbishmentRequest =
    leadInput?.refurbishmentDetails?.requests?.[0] ?? {}

  let localPurchaseItem: any[] =
    leadInput?.refurbishmentDetails?.requests?.[0]?.purchase?.items?.slice() ??
    []

  const allApprovedItems =
    dbPurchasedItems?.map(item => ({
      id: item?.product?.id,
      key: item?.product?.name,
      value: item?.approvedPriceLimit?.toString() ?? item?.price?.toString(), // Backward compatibility
    })) ?? []

  const transportationCharge =
    leadInput?.refurbishmentDetails?.requests?.[0]?.transportationCharge?.toString()

  function handleUpdateAmount(index: number, value: string, name: string) {
    localPurchaseItem[index] = {
      ...leadInputRefurbishmentRequest?.purchase?.items?.[index],
      id: dbPurchasedItems[index]?.id,
      price: Number(value),
      product: {
        ...leadInputRefurbishmentRequest?.purchase?.items?.[index]?.product,
        id: dbPurchasedItems[index]?.product?.id,
        name,
      },
    }

    setLeadInput({
      ...leadInput,
      refurbishmentDetails: {
        ...leadInput?.refurbishmentDetails,
        requests: [
          {
            ...leadInputRefurbishmentRequest,
            id: requestId,
            purchase: {
              ...leadInputRefurbishmentRequest?.purchase,
              items: localPurchaseItem,
            },
          },
        ],
      },
    })
  }

  function handleUploadBill(index: number, purchaseProofUrl: string) {
    localPurchaseItem[index] = {
      ...leadInputRefurbishmentRequest?.purchase?.items?.[index],
      id: dbPurchasedItems[index]?.id,
      purchaseProofUrl,
    }

    setLeadInput({
      ...leadInput,
      refurbishmentDetails: {
        ...leadInput?.refurbishmentDetails,
        requests: [
          {
            ...leadInputRefurbishmentRequest,
            id: requestId,
            purchase: {
              ...leadInputRefurbishmentRequest?.purchase,
              items: localPurchaseItem,
            },
          },
        ],
      },
    })
  }

  function onChangeTransportationCharge(transportationCharge: string) {
    setLeadInput({
      ...leadInput,
      refurbishmentDetails: {
        ...leadInput?.refurbishmentDetails,
        requests: [
          {
            ...leadInput?.refurbishmentDetails?.requests?.[0],
            id: requestId,
            transportationCharge: Number(transportationCharge),
          },
        ],
      },
    })
  }

  const getPurchaseItemDetails = (index: number) => {
    return leadInputRefurbishmentRequest?.purchase?.items?.[index]
  }

  const checkBillAmount = (
    productName: string,
    index: number,
    price: number,
  ) => {
    const requestedPurchaseItemPrice =
      getPurchaseItems(dbPurchasedItems, productName)?.price ??
      getPurchaseItems(dbPurchasedItems, productName)?.approvedPriceLimit

    const requestedItemPrice =
      refurbishmentDetailsData?.queryLead?.[0]?.refurbishmentDetails?.requests
        ?.find(req => req?.id === requestId)
        ?.items?.find(
          item => item?.product?.name === productName && item?.price === price,
        )?.price ?? requestedPurchaseItemPrice

    const billAmount =
      leadInputRefurbishmentRequest?.purchase?.items?.[index]?.price

    return billAmount && requestedItemPrice && billAmount <= requestedItemPrice
  }

  function toggleTransportationCharge(value: string) {
    setLeadInput({
      ...leadInput,
      refurbishmentDetails: {
        ...leadInput?.refurbishmentDetails,
        requests: [
          {
            ...leadInput?.refurbishmentDetails?.requests?.[0],
            id: requestId,
            hasTransportationCharge: value === 'first',
            transportationCharge: value === 'first' ? 0 : undefined,
          },
        ],
      },
    })
  }

  return (
    <ScrollView style={commonStyle.mainAppContainer}>
      <DealershipDetailCard
        data={allApprovedItems}
        leftCardLabel="Approved Purchase"
        rightCardLabel="Approved Amount"
      />

      {allApprovedItems.map((item, index) => (
        <View
          key={item?.id + index?.toString()}
          style={{paddingVertical: Layout.baseSize * 0.4}}>
          <P1
            style={{
              paddingLeft: Layout.baseSize * 0.5,
            }}>
            {item?.key}
          </P1>
          <Input
            isRequired
            uniqueKey="bill-amount"
            label="Enter Bill Amount  *"
            keyboardType="number-pad"
            onChangeText={text => handleUpdateAmount(index, text, item?.key)}
            value={getPurchaseItemDetails(index)?.price?.toString()}
            checkValidation={checkBillAmount(
              item?.key,
              index,
              Number(item?.value),
            )}
          />
          <View style={{paddingVertical: Layout.baseSize * 0.4}}>
            <RNFileUploader
              isRequired
              variant="docs"
              value={getPurchaseItemDetails(index)?.purchaseProofUrl}
              saveDoc={url => handleUploadBill(index, url)}
            />
          </View>
        </View>
      ))}

      <View>
        <P1
          style={{
            paddingLeft: Layout.baseSize * 0.5,
            paddingTop: Layout.baseSize * 0.5,
          }}>
          Is transportation charges *
        </P1>
        <View
          style={{
            bottom: Layout.baseSize * 1.5,
            left: -Layout.baseSize * 0.7,
          }}>
          <RNRadioButton
            variant={'pickup'}
            value={
              leadInputRefurbishmentRequest?.hasTransportationCharge
                ? 'first'
                : 'second'
            }
            onValueChange={toggleTransportationCharge}
          />
        </View>
      </View>
      {leadInputRefurbishmentRequest?.hasTransportationCharge && (
        <View style={{bottom: Layout.baseSize}}>
          <Input
            autoFocus
            keyboardType="numeric"
            isRequired={leadInputRefurbishmentRequest?.hasTransportationCharge}
            value={transportationCharge}
            label="Enter the Transportation Charges"
            onChangeText={onChangeTransportationCharge}
          />
        </View>
      )}
    </ScrollView>
  )
}

export default RaiseInstallationPayments
