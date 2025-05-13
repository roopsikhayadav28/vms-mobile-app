import {useNavigation} from '@react-navigation/native'
import {format} from 'date-fns'
import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {List, Surface} from 'react-native-paper'
import Colors from '../../../constants/Colors'
import Layout from '../../../constants/Layout'
import {
  LeadSource,
  LeadStatus,
  LeadStatusEventRef,
  Payment,
  PaymentFor,
  PaymentStatus,
  useGetLeadDetailsQuery,
  UserRole,
  useVehicleDetailsQuery,
} from '../../../generated/hooks_and_more'
import useLoggedInUser from '../../../hooks/useLoggedInUser'
import useUserToken from '../../../hooks/useUserToken'
import {RootStackScreenProps} from '../../../navigation/navigationTypes'
import {log, titleCaseToReadable} from '../../../utils/helpers'
import Button from '../../basic/Button'
import DataRowItem from '../../basic/DataRowItem'
import {P2} from '../../basic/StyledText'

type PurchaseOrderDetailProps = {
  openBottomSheet: (variant?, paymentfor?) => void
  setBottomSheetVariant?: React.Dispatch<
    React.SetStateAction<'Payment' | 'DeliveryExpense' | 'PurchaseOrder'>
  >
  setPaymentSheetFor?: React.Dispatch<React.SetStateAction<PaymentFor>>
  //   prStatus?: LeadStatus
  statusEvents: Partial<LeadStatusEventRef>[]
  payments: Partial<Payment>[]
  leadId: string
  regNo: string
  currentStatus: LeadStatus
}

type BottomSheetVariableProps = {
  variant?: 'Payment' | 'DeliveryExpense' | 'PurchaseOrder'
  payFor?: PaymentFor
}

const PurchaseOrderDetail = ({
  openBottomSheet,
  payments,
  statusEvents,
  currentStatus,
  leadId,
  regNo,
  setBottomSheetVariant,
  setPaymentSheetFor,
}: PurchaseOrderDetailProps) => {
  /* NOTE: The reason behind doing this is to show only the unique payments details
    previously if the PR raised PR> PH rejected then PR again raised by PE then double items created in accordion.
    So to avoid that we are filtering the payments and showing only the unique payments by passing the id of the payment
    and checking if the id is already present in the array or not.
  */
  const paymentsToShow = payments?.filter(
    (item, index, self) =>
      self?.findIndex(arr => arr?.id === item?.id) === index,
  )

  // log('OG payments', payments)
  // log('paymentsToShow', paymentsToShow)

  const {data} = useVehicleDetailsQuery({
    // fetchPolicy: 'network-only',
    variables: {
      regNo: regNo as string,
    },
  })
  const {
    data: leadDetailsData,
    refetch,
    loading,
  } = useGetLeadDetailsQuery({
    fetchPolicy: 'network-only',
    variables: {
      regNo: regNo,
    },
  })
  const item = data?.getLead
  const availableDocumentDetail: {
    isAvailableDoc: boolean
    proofUrl?: string
  }[] = [
    {
      isAvailableDoc: item?.documentChecklist?.registrationCertificate,
      proofUrl: leadDetailsData?.getLead?.documents?.registrationCertificate,
    },
    {
      isAvailableDoc: item?.documentChecklist?.form26,
      proofUrl: leadDetailsData?.getLead?.documents?.form26,
    },
    {
      isAvailableDoc: item?.documentChecklist?.loanForeclosure,
      proofUrl: leadDetailsData?.getLead?.documents?.loanForeclosure,
    },
    {
      isAvailableDoc: item?.documentChecklist?.bankNOC,
      proofUrl: leadDetailsData?.getLead?.documents?.bankNOC,
    },
    {
      isAvailableDoc: item?.documentChecklist?.form35,
      proofUrl: leadDetailsData?.getLead?.documents?.form35,
    },
    {
      isAvailableDoc: item?.documentChecklist?.insuranceCertificate,
      proofUrl: leadDetailsData?.getLead?.documents?.insuranceCertificate,
    },
    {
      isAvailableDoc: item?.documentChecklist?.form28,
      proofUrl: leadDetailsData?.getLead?.documents?.form28,
    },

    {
      isAvailableDoc: item?.documentChecklist?.form29,
      proofUrl: leadDetailsData?.getLead?.documents?.form29,
    },

    {
      isAvailableDoc: item?.documentChecklist?.form30,
      proofUrl: leadDetailsData?.getLead?.documents?.form30,
    },

    // {
    //   isAvailableDoc: item?.documentChecklist?.sellerPAN,
    //   proofUrl: leadDetailsData?.getLead?.documents?.sellerPAN,
    // },

    {
      isAvailableDoc: item?.documentChecklist?.sellerAadharCard,
      proofUrl: leadDetailsData?.getLead?.documents?.sellerAadharCard,
    },

    {
      isAvailableDoc: item?.documentChecklist?.ownerAddressProof,
      proofUrl: leadDetailsData?.getLead?.documents?.ownerAddressProof,
    },
  ]
  const navigation =
    useNavigation<
      RootStackScreenProps<
        'ViewPdfScreen' | 'RaisePaymentRequestScreen'
      >['navigation']
    >()
  const [statusToFire, setStatusToFire] = React.useState<LeadStatus>()
  const {userToken} = useUserToken()

  const {loggedInUser} = useLoggedInUser(userToken)
  function setValueCurrentStatus(payFor: PaymentFor) {
    switch (payFor) {
      case PaymentFor.DealToken:
        return LeadStatus.DealTokenPaymentRequested
      case PaymentFor.DealDelivery:
        return LeadStatus.DealDeliveryPaymentRequested
      case PaymentFor.HoldbackRepayment:
        return LeadStatus.HoldbackRepaymentRequested
      case PaymentFor.LoanRepayment:
        return LeadStatus.LoanRepaymentRequested
      case PaymentFor.DealPayment:
        return LeadStatus.DealerPaymentRequested
    }
  }

  // const purchaseOrderStatus = !!statusEvents?.find(
  //   s => s?.status === LeadStatus.PurchaseRequestApproved,
  // )
  //   ? 'Approved'
  //   : !!statusEvents?.find(
  //       s => s?.status === LeadStatus.PurchaseRequestRejected,
  //     )
  //   ? 'Rejected'
  //   : '-'

  // Get the last status of the lead and check if it is approved or not and show the status accordingly
  const getPurchaseOrderStatus = () => {
    const lastStatus = statusEvents?.[0]?.status

    return lastStatus === LeadStatus.PurchaseRequestApproved
      ? 'Approved'
      : lastStatus === LeadStatus.PurchaseRequestRejected
      ? 'Rejected'
      : lastStatus === LeadStatus.PurchaseRequestRaised
      ? 'Pending'
      : '-'
  }

  const purchaseOrderStatus = getPurchaseOrderStatus()

  const purchaseOrderApprovalDate = statusEvents?.find(
    s => s?.status === LeadStatus.PurchaseRequestApproved,
  )?.createdAt
  function showActionSheet({variant, payFor}: BottomSheetVariableProps) {
    log('variant and payFor', {payFor, variant})
    setBottomSheetVariant(variant)
    setPaymentSheetFor(payFor)
    openBottomSheet()
  }

  //   function onPressRaiseRequestButton(item: PurchaseOrderItemProp) {
  //     // setValueCurrentStatus(item)
  //     const source = LeadSource.DealershipSale
  //     console.log('deallllll', currentStatus)
  //     navigation.navigate('UpdateLeadFromDetailScreen', {
  //       currentStatus,
  //       leadId,
  //       regNo,
  //       title: item?.title,
  //     })
  //   }

  function navigateToRaisePaymentRequest({
    currentStatus,
    leadId,
    regNo,
    title,
    payFor,
  }) {
    const source = LeadSource.DealershipSale
    navigation.navigate('RaisePaymentRequestScreen', {
      currentStatus,
      payFor: payFor,
      leadId,
      regNo,
      title,
      source,
    })
  }
  function isRequiredDocUploaded() {
    const documents = availableDocumentDetail
      .filter(i => i?.isAvailableDoc)
      .map(i => {
        return i?.proofUrl
      })
    //check all the fields have value or not
    return !documents?.some(item => !item)
  }
  function onClickRaiseRequestButton(p) {
    const desiredStatus = setValueCurrentStatus(p?.for)
    navigateToRaisePaymentRequest({
      currentStatus: desiredStatus,
      payFor: p?.for,
      leadId: leadId,
      regNo: regNo,
      title: `${titleCaseToReadable(p?.for)} Details`,
    })
  }

  return (
    <Surface style={styles.container}>
      <List.Accordion
        style={styles.accordianStyle}
        title={'Purchase Order Details'}
        // onPress={onExpand}
        titleStyle={{color: Colors.dark.background}}>
        <View style={styles.innerContainer}>
          <Text style={{color: 'grey'}}>View Request</Text>
          <TouchableOpacity
            onPress={() => {
              showActionSheet({
                payFor: null,
                variant: 'PurchaseOrder',
              })
            }}>
            <P2 style={styles.boldText} numberOfLines={1}>
              View
            </P2>
          </TouchableOpacity>
        </View>
        <DataRowItem label="Purchase Order" value={purchaseOrderStatus} />
        <DataRowItem
          label="PR Approval Date"
          value={
            !!purchaseOrderApprovalDate
              ? format(Date?.parse(purchaseOrderApprovalDate), 'dd MMM yyyy')
              : '-'
          }
        />

        {paymentsToShow?.map(p => (
          <View style={styles.innerContainer} key={`payment-${p.id}`}>
            <Text style={{color: 'grey'}}>{titleCaseToReadable(p?.for)}</Text>
            {p?.status === PaymentStatus.Approved &&
            loggedInUser.role === UserRole.ProcurementExecutive ? (
              <Button
                title="Raise Purchase"
                style={
                  p?.for === PaymentFor.HoldbackRepayment
                    ? isRequiredDocUploaded()
                      ? {backgroundColor: Colors.light.primary, borderRadius: 0}
                      : {
                          backgroundColor: Colors.light.tabIconDefault,
                          borderRadius: 0,
                        }
                    : {backgroundColor: Colors.light.primary, borderRadius: 0}
                }
                onPress={() =>
                  p?.for === PaymentFor.HoldbackRepayment
                    ? isRequiredDocUploaded()
                      ? onClickRaiseRequestButton(p)
                      : () => {}
                    : onClickRaiseRequestButton(p)
                }
              />
            ) : (
              <P2>{titleCaseToReadable(p?.status)}</P2>
            )}
          </View>
        ))}
      </List.Accordion>
    </Surface>
  )
}

export default PurchaseOrderDetail

const styles = StyleSheet.create({
  container: {
    margin: Layout.baseSize * 0.5,
    backgroundColor: Colors.light.background,
    // width: Layout.window.width,
    borderRadius: Layout.baseSize / 5,
    overflow: 'hidden',
  },
  accordianStyle: {
    backgroundColor: Colors.light.inputBg,
    height: Layout.baseSize * 3,
    padding: Layout.baseSize / 5,
  },
  innerContainer: {
    borderBottomRightRadius: Layout.baseSize,
    borderBottomLeftRadius: Layout.baseSize,
    borderTopRightRadius: Layout.baseSize,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Layout.baseSize / 2,
    marginHorizontal: Layout.baseSize,
  },
  boldText: {
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
})
