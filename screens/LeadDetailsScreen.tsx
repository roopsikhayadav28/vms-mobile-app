import {CompositeScreenProps} from '@react-navigation/native'
import React, {useEffect, useMemo, useRef, useState} from 'react'
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native'
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet'
import NewStatusTimeLine from '../components/NewStatusTimeLine'
import Button from '../components/basic/Button'
import Separator from '../components/basic/Separator'
import {
  PaymentBottomSheet,
  RefurbishmentBottomSheet,
} from '../components/composite/BottomSheet'
import BookingBottomSheet from '../components/composite/BottomSheet/BookingBottomSheet'
import ApplicationDetails from '../components/composite/CollapsibleCard/ApplicationDetails'
import BookingDetails from '../components/composite/CollapsibleCard/BookingDetails'
import DealDetails from '../components/composite/CollapsibleCard/DealDetails'
import DealershipDealDetails from '../components/composite/CollapsibleCard/DealershipDealDetails'
import DocumentDetails from '../components/composite/CollapsibleCard/DocumentDetails'
import LoanApplicationDetails from '../components/composite/CollapsibleCard/LoanApplicationDetails'
import LogisticsDetail from '../components/composite/CollapsibleCard/LogisticsDetail'
import PaymentDetails from '../components/composite/CollapsibleCard/PaymentDetails'
import PurchaseOrderDetail from '../components/composite/CollapsibleCard/PurchaseOrderDetail'
import RefurbishmentNotRequired from '../components/composite/CollapsibleCard/RefurbishmentNotRequired'
import RefurbishmentRequests from '../components/composite/CollapsibleCard/RefurbishmentRequests'
import RtoVerificationDetails from '../components/composite/CollapsibleCard/RtoVerificationDetails'
import VehicleDetails from '../components/composite/CollapsibleCard/VehicleDetails'
import LeadSummaryDetailCard from '../components/composite/LeadSummaryDetailCard'
import Colors from '../constants/Colors'
import {DEFAULT_TRACTOR_IMAGE, RTO_CHARGES} from '../constants/constants'
import Layout from '../constants/Layout'
import {
  BankName,
  BookingType,
  LeadRef,
  LeadSource,
  LeadStatus,
  LoanRejectionReason,
  LoanStatus,
  LoanToBeClosedBy,
  PaymentFor,
  PaymentStatus,
  RefurbishmentStatus,
  useGetLeadDetailsQuery,
  UserRole,
} from '../generated/hooks_and_more'
import useLoggedInUser from '../hooks/useLoggedInUser'
import useUserToken from '../hooks/useUserToken'
import {
  LeadStackScreenProps,
  RootStackScreenProps,
} from '../navigation/navigationTypes'
import {getRolesArray, log, titleCaseToReadable} from '../utils/helpers'

type LeadDetailsScreenNavProps = CompositeScreenProps<
  LeadStackScreenProps<'LeadDetailsScreen'>,
  RootStackScreenProps<'LeadProcessScreen'>
>
type LeadScreenProps = {} & LeadDetailsScreenNavProps
enum PaymentBottomSheetVariant {
  PURCHASE_ORDER = 'PURCHASE_ORDER',
  HOLDBACK_REPAYMENT = 'HOLDBACK_REPAYMENT',
  DELIVERY_PAYMENT = 'DELIVERY_PAYMENT',
  LOAN_REPAYMENT = 'LOAN_REPAYMENT',
  DEAL_TOKEN_PAYMENT = 'DEAL_TOKEN_PAYMENT',
  DELIVERY_EXPENSES = 'DELIVERY_EXPENSES',
}
export default function LeadDetailsScreen({
  navigation,
  route,
}: LeadScreenProps) {
  const {userToken} = useUserToken()
  const {loggedInUser} = useLoggedInUser(userToken)
  const actionSheetRef = useRef<ActionSheetRef>(null)
  const paymentSheetRef = useRef<ActionSheetRef>(null)
  const refurbishmentSheetRef = useRef<ActionSheetRef>(null)
  const bookingSheetRef = useRef<ActionSheetRef>(null)

  log('params at lead details screen', route?.params)
  const lseId = route?.params?.lseId
  const {
    data: leadDetailsData,
    refetch,
    loading,
  } = useGetLeadDetailsQuery({
    fetchPolicy: 'network-only',
    skip: !route?.params?.regNo,
    variables: {
      regNo: route?.params?.regNo,
    },
  })

  useEffect(() => {
    const handleNavigation = () => {
      // Call your function here
      // console.log('Navigated to another screen')
    }
    const unsubscribe = navigation.addListener('focus', closeBottomSheet)
    // Clean up the listener when the component unmounts
    return () => unsubscribe()
  }, [navigation])
  const onGoBack = (lse: string, currentStatus: string) => {
    console.log('go back in detail screen addd !!!!!!!!!!!!!!!!!!!!!!!!!!')
    navigation.setParams({
      leadId: leadId,
      regNo: regNo,
      lseId: lse,
      currentStatus: currentStatus as LeadStatus,
    })

    refetch()
  }
  /* const {data: leadWithStatusEventsData} = useStatusEventsForTimelineQuery({
    skip: !route?.params?.regNo,
    fetchPolicy: 'cache-and-network',
    variables: {regNo: route?.params?.regNo},
  }) */

  const [bottomSheetVariant, setBottomSheetVariant] = useState<
    'Payment' | 'DeliveryExpense' | 'PurchaseOrder'
  >()
  const [paymentSheetFor, setPaymentSheetFor] = useState<PaymentFor>()
  const [refurbishmentSerialNoSheet, setRefurbishmentSerialNoSheet] =
    useState<number>(null) //this would be index of Refurbishment Request

  const [bookingPaymentSheetId, setBookingPaymentSheet] = useState<string>()

  function openBottomSheet() {
    // log('variant and payFor', {paymentSheetFor, bottomSheetVariant})
    setTimeout(() => {
      paymentSheetRef?.current?.show()
    }, 100)
  }
  function showRefurbishmentBottomSheet() {
    setTimeout(() => {
      refurbishmentSheetRef?.current?.show()
    }, 100)
  }
  function showBookingPaymentBottomSheet() {
    setTimeout(() => {
      bookingSheetRef?.current?.show()
    }, 100)
  }

  function closeBottomSheet() {
    setBottomSheetVariant(null)
    setPaymentSheetFor(null)
    log('after closing sheet', {bottomSheetVariant, paymentSheetFor})
    paymentSheetRef?.current?.hide()
    bookingSheetRef?.current?.hide()
    refurbishmentSheetRef?.current?.hide()
  }

  function closeRefurbSheet() {
    refurbishmentSheetRef?.current?.hide()
  }
  // console.log('Current reg no at LeadDetailsScreen', {
  //   paramsRegNo: route?.params?.regNo,
  // })

  /* let timeLineStatusData =
    leadWithStatusEventsData?.getLead?.statusEvents &&
    leadWithStatusEventsData?.getLead?.statusEvents.length
      ? leadWithStatusEventsData?.getLead?.statusEvents
      : []

  let reversetimeLineStatusData = JSON.parse(
    JSON.stringify(leadWithStatusEventsData?.getLead?.statusEvents ?? []),
  ).reverse() */

  function onPullToRefresh() {
    // log('should refetch lead details the List', {leadDetailsData})
    refetch()
  }
  const leadData = leadDetailsData?.getLead

  function findActualPickupDate() {
    const date =
      leadData?.source === LeadSource.DealershipSale
        ? leadData?.statusEvents?.find(
            e => e?.status === LeadStatus.PickupVehicleImagesUploaded,
          )?.createdAt
        : leadData?.statusEvents?.find(
            e => e?.status === LeadStatus.PickupInitiated,
          )?.createdAt
    return date
  }
  const actualPickupDate = findActualPickupDate()

  const deliveryDate =
    leadData?.source === LeadSource.DealershipSale
      ? leadData?.statusEvents?.find(
          event => event?.status === LeadStatus.DeliverySelfieUploaded,
        )?.createdAt
      : leadData?.statusEvents?.find(
          event => event?.status === LeadStatus.DeliveryCompleted,
        )?.createdAt

  const requestedDate = leadDetailsData?.getLead?.payments?.find(
    p => p?.for === paymentSheetFor,
  )?.createdAt
  const accountHolderName = leadDetailsData?.getLead?.payments?.find(
    p => p?.for === paymentSheetFor,
  )?.accountHolderName
  const paymentMode = leadDetailsData?.getLead?.payments?.find(
    p => p?.for === paymentSheetFor,
  )?.mode
  const paymentProcessedAt = leadDetailsData?.getLead?.payments?.find(
    p => p?.for === paymentSheetFor,
  )?.paymentProcessedAt
  const accountNo = leadDetailsData?.getLead?.payments?.find(
    p => p?.for === paymentSheetFor,
  )?.accountNo
  const accountProof = leadDetailsData?.getLead?.payments?.find(
    p => p?.for === paymentSheetFor,
  )?.proofUrl

  const receiptUrl = leadDetailsData?.getLead?.payments?.find(
    p => p?.for === paymentSheetFor,
  )?.receiptUrl
  const bankName = leadDetailsData?.getLead?.payments?.find(
    p => p?.for === paymentSheetFor,
  )?.bankName
  const expenses = leadDetailsData?.getLead?.expenses
  const ifscCode = leadDetailsData?.getLead?.payments?.find(
    p => p?.for === paymentSheetFor,
  )?.ifsc

  const typeOfPaymnet = leadDetailsData?.getLead?.payments?.find(
    p => p?.for === paymentSheetFor,
  )?.for
  const typeSpecificPaymentAmount = leadDetailsData?.getLead?.payments?.find(
    p => p?.for === paymentSheetFor,
  )?.amount
  const loanCloserforPO =
    leadDetailsData?.getLead?.vehicle?.financingDetails?.loanToBeClosedBy ??
    leadDetailsData?.getLead?.vehicle?.financingDetails?.tempLoanToBeClosedBy

  const holdbackAmountforPO = leadDetailsData?.getLead?.payments?.find(
    p => p?.for === PaymentFor.HoldbackRepayment,
  )?.amount
  const dealAmountforPO = leadDetailsData?.getLead?.approvedDealAmount
  const loanAmountforPO =
    leadDetailsData?.getLead?.vehicle?.financingDetails?.pendingLoanAmount
  const documentChargesforPO = leadDetailsData?.getLead?.documentCharges
  const tokenAmountforPO = leadDetailsData?.getLead?.payments?.find(
    p =>
      p?.status !== PaymentStatus?.Rejected && p?.for === PaymentFor.DealToken,
  )?.amount
  const deliveryAmountforPO = leadDetailsData?.getLead?.payments?.find(
    p =>
      p?.status !== PaymentStatus?.Rejected &&
      p?.for === PaymentFor.DealDelivery,
  )?.amount

  const paymentAmountforPO = !!documentChargesforPO
    ? dealAmountforPO - documentChargesforPO
    : dealAmountforPO
  const payToDealerforPO =
    loanCloserforPO === LoanToBeClosedBy.TractorJunction
      ? dealAmountforPO - loanAmountforPO - documentChargesforPO
      : dealAmountforPO - documentChargesforPO
  const payToBankforPO = leadDetailsData?.getLead?.payments?.find(
    p =>
      p?.status !== PaymentStatus?.Rejected &&
      p?.for === PaymentFor.LoanRepayment,
  )?.amount
  const remarksforPO = leadDetailsData?.getLead?.statusEvents?.find(
    s => s?.status === LeadStatus?.PurchaseRequestRaised,
  )?.remarks
  const paymentTypeforPO = leadDetailsData?.getLead?.payments?.[0]?.type
  log('following data for actionsheet on LeadDetailScreen', {
    requestedDate,
    accountHolderName,
    accountNo,
  })
  // documentChargesforPO,
  // remarksforPO,
  // tokenAmountforPO,

  //TODO: Handle showing images in some way
  // const vehicleImages = leadDetailsData?.getLead?.vehicle?.images
  // log('vehicle imgaes', vehicleImages)

  // const rtoVerificationDetails = leadDetailsData?.getLead?.vehicle?.
  // function onPressActionButton() {
  //   log('route params before navigation', route.params)
  //   navigation.navigate('LeadProcessScreen', {
  //     currentStatus: lastEvent?.status,
  //     leadId: leadDetailsData?.getLead?.id,
  //     regNo: leadDetailsData?.getLead?.regNo,
  //     source: leadDetailsData?.getLead?.source,
  //   })
  // }

  // const item = leadDetailsData?.getLead

  const leadStatusEvents = leadData?.statusEvents ?? []
  /*   log('params at lead details screen', route?.params)
  log(
    'leadStatusEvents',
    leadStatusEvents?.map(lse => ({
      status: lse?.status,
      isTaskCompleted: lse?.isTaskCompleted,
      preTimeline: lse?.preTimeline,
      postTimeline: lse?.postTimeline,
      assignTaskTo: lse?.assignTaskTo,
    })),
  ) */

  // Memoized last event for timeline status to get the accurate data
  /* const lastEvent = useMemo(() => {
    return leadStatusEvents?.length > 0
      ? leadStatusEvents[leadStatusEvents?.length - 1]
      : undefined
  }, [leadStatusEvents]) */
  const scopedEvent = !lseId
    ? leadStatusEvents?.[0]
    : leadStatusEvents?.find(lse => lse.id === lseId)

  // log(
  //   `Last event preTimeline = ${lastEvent?.preTimeline}, preTimeline= ${lastEvent?.postTimeline}`,
  // )

  const currentStatus = scopedEvent?.status
  const leadId = leadDetailsData?.getLead?.id
  const regNo = leadDetailsData?.getLead?.regNo
  // const postTimeline = lastEvent?.postTimeline
  // const preTimeline = lastEvent?.preTimeline
  const source = leadDetailsData?.getLead?.source
  const dealerName = leadDetailsData?.getLead?.dealer?.name

  type OnPressActionArguments = {
    currentStatusParam?: LeadStatus
    leadIdParam?: string
    regNoParam?: string
  }

  function onPressActionButton({
    currentStatusParam = currentStatus,
    leadIdParam = leadId,
    regNoParam = regNo,
  }: OnPressActionArguments) {
    log('route params before navigation', route.params)
    log('route params before navigation......', leadId)
    console.log('check current status', currentStatusParam)

    if ((!!currentStatusParam && !!leadIdParam && !!regNoParam) || !!source) {
      navigation.navigate('LeadProcessScreen', {
        currentStatus: currentStatusParam,
        leadId,
        regNo,
        source: leadDetailsData?.getLead?.source,
        onGoBack: onGoBack,
        lseId: scopedEvent?.id,
      })
    } else {
      if (__DEV__) {
        ToastAndroid.showWithGravity(
          'All the mandatory params are not present',
          (ToastAndroid.SHORT = 10),
          ToastAndroid.CENTER,
        )
      } else {
        ToastAndroid.showWithGravity(
          'Something went wrong, please try again later',
          (ToastAndroid.SHORT = 10),
          ToastAndroid.CENTER,
        )
      }
    }
  }

  // Check is the task is assigned to the current user or not based on the role
  function checkTaskAssignedToRole() {
    return scopedEvent?.assignTaskTo === loggedInUser?.role
  }

  const memoizedData = useMemo(() => {
    const documentDetails: Pick<
      LeadRef,
      'documentChecklist' | 'documents' | 'regNo'
    > = {
      regNo: leadDetailsData?.getLead?.regNo,
      documentChecklist: leadDetailsData?.getLead?.documentChecklist,
      documents: leadDetailsData?.getLead?.documents,
    }
    //stores last event
    const currentStatus =
      leadData?.statusEvents && leadData?.statusEvents.length > 0
        ? leadData?.statusEvents[leadData?.statusEvents.length - 1]?.status
        : undefined

    const leadSubtitle = leadData?.vehicle?.price
      ? `₹ ${leadData?.vehicle?.price}`
      : undefined

    const leadTitle = `${leadData?.vehicle?.make} ${
      leadData?.vehicle?.model
    } | ${new Date(leadData?.vehicle?.manufacturingDate).getFullYear() ?? '-'}`

    const imageUri = leadData?.vehicle?.images?.[0]?.frontBodySide
      ? leadData?.vehicle?.images?.[0]?.frontBodySide
      : DEFAULT_TRACTOR_IMAGE

    const leadOwnerName = leadData?.createdBy?.name

    const location = leadData?.vehicle?.owner?.district
    const spocNo = leadData?.auctioningAgency?.spocNo
    const regNo = leadData?.regNo

    return {
      documentDetails,
      currentStatus,
      spocNo,
      leadSubtitle,
      leadTitle,
      imageUri,
      leadOwnerName,
      location,
      regNo,
    }
  }, [
    leadData?.regNo,
    leadData?.statusEvents,
    leadData?.vehicle?.make,
    leadData?.vehicle?.model,
    leadData?.vehicle?.price,
    leadData?.createdBy?.name,
    leadData?.vehicle?.owner?.district,
    leadDetailsData?.getLead?.regNo,
    leadData?.vehicle?.manufacturingDate,
    leadDetailsData?.getLead?.documents,
    leadData?.vehicle?.images?.[0]?.frontBodySide,
    leadDetailsData?.getLead?.documentChecklist,
  ])
  // variable to reference everywhere, reduces redundancy
  // log('last event status', lastEvent.status)

  // Refurbishment card
  const dealAmountRefurb = leadDetailsData?.getLead?.payments?.find(
    p => p?.for === PaymentFor.DealPayment && p?.status === PaymentStatus.Done,
  )?.amount

  const expensesRefurb = leadDetailsData?.getLead?.payments?.find(
    p =>
      p?.for === PaymentFor.DeliveryExpense && p?.status === PaymentStatus.Done,
  )?.amount

  const parkingRefurb = leadDetailsData?.getLead?.payments?.find(
    p =>
      p?.for === PaymentFor.ParkingExpense && p?.status === PaymentStatus.Done,
  )?.amount

  const dealDeliveryRefurb = leadDetailsData?.getLead?.payments?.find(
    p => p?.for === PaymentFor.DealDelivery && p?.status === PaymentStatus.Done,
  )?.amount

  const holdbackAmountRefurb = leadDetailsData?.getLead?.payments?.find(
    p =>
      p?.for === PaymentFor.HoldbackRepayment &&
      p?.status === PaymentStatus.Done,
  )?.amount

  const loanAmountRefurb = leadDetailsData?.getLead?.payments?.find(
    p =>
      p?.for === PaymentFor.LoanRepayment && p?.status === PaymentStatus.Done,
  )?.amount

  const tokenAmountRefurb = leadDetailsData?.getLead?.payments?.find(
    p => p?.for === PaymentFor.DealToken && p?.status === PaymentStatus.Done,
  )?.amount
  const refCost = leadDetailsData?.getLead?.refurbishmentDetails?.requests
    ?.map(req =>
      req?.issue?.items
        ?.filter(item => item?.isApproved)
        ?.reduce((initialPrice, i) => i?.price + initialPrice, 0),
    )
    ?.filter(item => item)
    ?.reduce((initialCost, eachRefurbReq) => eachRefurbReq + initialCost, 0)

  log('refurbCost', refCost)
  // Refurbishment Required Collapsible Card
  const transportationChargesOnLeadrefurbishment =
    leadDetailsData?.getLead?.refurbishmentDetails?.requests
      ?.filter(
        req =>
          req?.requestStatus === RefurbishmentStatus.Approved &&
          !!req?.transportationCharge,
      )
      ?.reduce(
        (initialValue, req) => req?.transportationCharge + initialValue,
        0,
      )
  const refurbishmentRequestsData = leadData?.refurbishmentDetails?.requests
  const refurbishmentRequestDetail =
    leadData?.refurbishmentDetails?.requests[refurbishmentSerialNoSheet]

  const onActionSheetHandler = () => {
    actionSheetRef?.current?.show()
  }

  const onActionSheethide = () => {
    actionSheetRef?.current?.hide()
  }

  console.log(`Dealer no ${leadData?.dealer?.phoneNo}`)

  // Booking PaymentSheet and collapsible Card

  const bookingDetails = leadData?.activeBooking

  const bookingPaymentObj = leadData?.activeBooking?.payments?.find(
    p => p?.id === bookingPaymentSheetId,
  )

  const loanStatusEvent = leadStatusEvents
    ?.filter(
      i =>
        i?.status === LeadStatus.BookingLoanFileLoggedIn ||
        i?.status === LeadStatus.BookingFinanceCaseDropped ||
        i?.status === LeadStatus.BookingLoanFIAdded ||
        i?.status === LeadStatus.BookingLoanFIPassed ||
        i?.status === LeadStatus.BookingLoanDOApproved ||
        i?.status === LeadStatus.PaymentStructureAdded,
    )
    ?.sort(
      (a, b) =>
        new Date(b?.createdAt)?.getTime() - new Date(a?.createdAt)?.getTime(),
    )

  // console.log('loanStatus event', JSON.stringify(loanStatusEvent, null, 2))

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onPullToRefresh} />
        }>
        {/* <View>
          {timeLineStatusData && timeLineStatusData?.length > 0 && (
            <View style={styles.timelineContainer}>
              <StatusTimeline
                horizontal
                data={timeLineStatusData as [LeadStatusEvent]}
                source={source}
              />
            </View>
          )}
        </View> */}

        {/* <Icon iconName="file-upload" onPress={pickDocument} /> */}
        <ActionSheet containerStyle={{height: '80%'}} ref={actionSheetRef}>
          <NewStatusTimeLine
            data={leadStatusEvents}
            source={source}
            onActionSheethide={onActionSheethide}
          />
        </ActionSheet>
        {/* <Separator /> */}
        {!!leadData && (
          <LeadSummaryDetailCard
            // isImageNavigate
            // hideButton
            // hideChips
            // leadId={route.params.leadId as string}            isImageNavigate
            // hideButton
            // hideChips
            // leadId={route.params.leadId as string}
            imageUri={memoizedData.imageUri}
            leadTitle={memoizedData.leadTitle}
            leadOwnerName={memoizedData.leadOwnerName}
            auctioningAgency={leadData?.source}
            spocNo={leadData?.auctioningAgency?.spocNo}
            onActionSheetHandler={onActionSheetHandler}
            // leadSubtitle={memoizedData.leadSubtitle}
            // labelTitle={"Verified"}
            // location={memoizedData.location}
            // currentStatus={memoizedData.currentStatus}
            regNo={memoizedData.regNo}
            dealerNo={leadData?.dealer?.phoneNo}
            source={source}
          />
        )}
        <Separator />

        {/* <Separator /> */}
        {getRolesArray([
          UserRole.ProcurementExecutive,
          UserRole.ProcurementManager,
          UserRole.ProcurementHead,
          UserRole.FinanceManager,
          UserRole.OperationsManager,
          UserRole.LogisticsManager,
          UserRole.OperationsHead,
          UserRole.Driver,
          UserRole.CentreManager,
          UserRole.SalesHead,
          UserRole.RetailFinanceManager,
        ])?.some(r => r === loggedInUser.role) && (
          <>
            <ApplicationDetails
              regNo={memoizedData.regNo}
              auctionByBankName={leadData?.auctionByBank}
              auctioningAgency={leadData?.auctioningAgency?.name}
              purchaseType={leadData?.source}
              status={scopedEvent?.status}
              vehicle={'Tractor'}
              dealerName={dealerName}
              source={source}
            />
            {/* <Separator /> */}
            <VehicleDetails
              regNo={memoizedData.regNo}
              chassisNo={leadData?.vehicle?.chassisNumber}
              engineNo={leadData?.vehicle?.engineNumber}
              // financerName={leadData?.vehicle?.financingDetails?.financerName}
              fitnessValidUpto={leadData?.vehicle?.fitnessValidUpto}
              insuranceType={leadData?.vehicle?.insuranceDetails?.insuranceType}
              insurerName={leadData?.vehicle?.insuranceDetails?.insurerName}
              // isLoanClosed={leadData?.vehicle?.financingDetails?.isLoanClosed}
              isRCAvailable={leadData?.vehicle?.isRcAvailable}
              // isVehicleFinanced={leadData?.vehicle?.isVehicleFinanced}
              isVehicleInsured={leadData?.vehicle?.isVehicleInsured}
              isLoanClosed={leadData?.vehicle?.financingDetails?.isLoanClosed}
              pendingLoanAmount={
                leadData?.vehicle?.financingDetails?.pendingLoanAmount
              }
              loanToBeClosedBy={
                leadData?.vehicle?.financingDetails?.tempLoanToBeClosedBy ??
                leadData?.vehicle?.financingDetails?.loanToBeClosedBy
              }
              make={leadData?.vehicle?.make}
              model={leadData?.vehicle?.model}
              manufacturingYear={leadData?.vehicle?.manufacturingDate}
              financerName={leadData?.vehicle?.financingDetails?.financerName}
              isVehicleFinanced={leadData?.vehicle?.isVehicleFinanced}
              policyExpiryDate={
                leadData?.vehicle?.insuranceDetails?.policyExpiryDate
              }
              policyNumber={leadData?.vehicle?.insuranceDetails?.policyNumber}
              registrationDate={leadData?.vehicle?.registrationDate}
              repossessionDate={leadData?.vehicle?.repossessionDate}
            />
            <DocumentDetails
              regNo={regNo}
              documentsData={memoizedData.documentDetails}
              leadId={leadData?.id}
              bankNoc={leadData?.documents?.bankNOC}
              form26={leadData?.documents?.form26}
              form28={leadData?.documents?.form28}
              form29={leadData?.documents?.form29}
              form30={leadData?.documents?.form30}
              form35={leadData?.documents?.form35}
              form36={leadData?.documents?.form36}
              form60={leadData?.documents?.form60}
              indemnityBond={leadData?.documents?.indemnityBond}
              insuranceCertificate={leadData?.documents?.insuranceCertificate}
              loanForeclosure={leadData?.documents?.loanForeclosure}
              registrationCertificate={
                leadData?.documents?.registrationCertificate
              }
              releaseOrder={leadData?.documents?.releaseOrder}
              sellerAadharCard={leadData?.documents?.sellerAadharCard}
              sellerPan={leadData?.documents?.sellerPAN}
            />
            <LogisticsDetail
              regNo={memoizedData.regNo}
              currentStatus={leadData?.statusEvents?.[0]?.status}
              centre={leadData?.centre?.name}
              driver={leadData?.pickup?.by?.name}
              driverPhone={leadData?.pickup?.by?.phoneNo}
              expectedPickUpDate={leadData?.expectedPickupDate}
              actualPickupDate={actualPickupDate}
              deliveryDate={deliveryDate}
              yardName={leadData?.yard?.name}
              yardAddress={leadData?.yard?.address}
              yardLocationUrl={leadData?.yard?.locationUrl}
              yardLat={leadData?.yard?.location?.latitude}
              yardLong={leadData?.yard?.location?.longitude}
              centreLat={leadData?.centre?.location?.latitude}
              centreLong={leadData?.centre?.location?.longitude}
              yardSpocName={leadData?.yard?.spocName}
              yardSpocNo={leadData?.yard?.spocNo}
            />
            <RtoVerificationDetails
              approveMailUrl={leadData?.vehicle?.documents?.approvalMailUrl}
              challanUrl={leadData?.vehicle?.documents?.challanUrl}
              currentStatus={scopedEvent?.status}
              hsrpUrl={leadData?.vehicle?.documents?.hsrbProofUrl}
              hypothecationUrl={
                leadData?.vehicle?.documents?.hypothecationProofUrl
              }
              rtoVerificationUrl={
                leadData?.vehicle?.documents?.rtoVerificationProofUrl
              }
              statusEvents={leadData?.statusEvents}
              dueChallanAmount={leadData?.vehicle?.challanAmount}
              financerName={
                leadData?.vehicle?.financingDetails?.tempFinancerName
              }
              blackListedConfirmation={
                leadData?.vehicle?.documents?.blacklistProofUrl
              }
              make={leadData?.vehicle?.make}
              model={leadData?.vehicle?.model}
              chassis={leadData?.vehicle?.chassisNumber}
              mfg={leadData?.vehicle?.manufacturingDate}
              engine={leadData?.vehicle?.engineNumber}
              tempChassis={leadData?.vehicle?.tempChassisNumber}
              tempEngine={leadData?.vehicle?.tempEngineNumber}
              tempMake={leadData?.vehicle?.tempMake}
              tempMfg={leadData?.vehicle?.tempManufacturingDate}
              tempModel={leadData?.vehicle?.tempModel}
              hypoStatus={leadData?.vehicle?.isHypo}
              hsrpStatus={leadData?.vehicle?.isHSRPAvailable}
              challanStatus={leadData?.vehicle?.isChallanAvailable}
              blackListedStatus={leadData?.vehicle?.isBlacklisted}
            />
          </>
        )}

        {getRolesArray([
          UserRole.Driver,
          UserRole.FinanceManager,
          UserRole.LogisticsManager,
          UserRole.OperationsHead,
          UserRole.ProcurementExecutive,
          UserRole.ProcurementManager,
          UserRole.ProcurementHead,
          UserRole.SalesHead,
          UserRole.RetailFinanceManager,
        ])?.some(r => r === loggedInUser.role) &&
          (source === LeadSource.BankAuction ? (
            <DealDetails
              regNo={memoizedData.regNo}
              currentStatus={scopedEvent?.status}
              finalBidAmount={leadData?.finalBidAmount}
              initialBidAmount={leadData?.proposedBidLimitAmount}
              statusEvents={leadData?.statusEvents}
              payments={leadData?.payments}
              perDayParkingCharge={leadData?.yard?.perDayParkingCharge}
              calculatedParkingCharges={leadData?.estimatedParkingCharges}
              repossessionDate={leadData?.vehicle?.repossessionDate}
              finalParkingCharges={leadData?.finalParkingCharges}
              expenses={leadData?.expenses}
              openBottomSheet={openBottomSheet}
              setPaymentSheetFor={setPaymentSheetFor}
              setBottomSheetVariant={setBottomSheetVariant}
            />
          ) : (
            <DealershipDealDetails
              approvedDeal={leadData?.approvedDealAmount}
              demandAmount={leadData?.demandAmount}
              proposedDealAmount={leadData?.proposedDealAmount}
              statusEvents={leadData?.statusEvents}
              expenses={leadData?.expenses}
              openBottomSheet={openBottomSheet}
              paymentType={paymentTypeforPO}
              payments={leadData?.payments}
              setBottomSheetVariant={setBottomSheetVariant}
              setPaymentSheetFor={setPaymentSheetFor}
              documentCharges={documentChargesforPO}
            />
          ))}

        {source === LeadSource.DealershipSale &&
          getRolesArray([
            UserRole.FinanceManager,
            UserRole.LogisticsManager,
            UserRole.OperationsHead,
            UserRole.OperationsManager,
            UserRole.ProcurementExecutive,
            UserRole.ProcurementManager,
            UserRole.ProcurementHead,
            UserRole.SalesHead,
            UserRole.RetailFinanceManager,
          ]).some(r => r === loggedInUser.role) && (
            <PurchaseOrderDetail
              currentStatus={scopedEvent?.status}
              leadId={leadId}
              openBottomSheet={openBottomSheet}
              payments={leadData?.payments}
              regNo={regNo}
              statusEvents={leadData?.statusEvents}
              setBottomSheetVariant={setBottomSheetVariant}
              setPaymentSheetFor={setPaymentSheetFor}
            />
          )}

        {getRolesArray([
          UserRole.CentreManager,
          UserRole.SalesHead,
          UserRole.FinanceManager,
          UserRole.RetailFinanceManager,
        ])?.some(r => r === loggedInUser.role) && (
          <RefurbishmentNotRequired
            isPurchaseOrderRequestApproved={leadData?.statusEvents?.some(
              s => s?.status === LeadStatus.PurchaseRequestApproved,
            )}
            documentCharges={documentChargesforPO}
            dealAmount={dealAmountRefurb}
            expenses={expensesRefurb}
            parking={parkingRefurb}
            dealDelivery={dealDeliveryRefurb}
            holdbackAmount={holdbackAmountRefurb}
            loanAmount={loanAmountRefurb}
            tokenAmount={tokenAmountRefurb}
            source={leadDetailsData?.getLead?.source}
            refCost={refCost}
            transportationCharges={transportationChargesOnLeadrefurbishment}
            listingPrice={leadDetailsData?.getLead?.listingPrice}
            sellingPrice={leadDetailsData?.getLead?.sellingPrice}
          />
        )}

        {leadData?.statusEvents?.some(
          s => s?.status === LeadStatus.VehicleInspected,
        ) &&
          getRolesArray([
            UserRole.CentreManager,
            UserRole.SalesHead,
            UserRole.FinanceManager,
            UserRole.RetailFinanceManager,
          ])?.some(r => r === loggedInUser.role) && (
            <RefurbishmentRequests
              refurbishmentRequests={refurbishmentRequestsData}
              raiseAnotherRequest={() =>
                onPressActionButton({
                  currentStatusParam: LeadStatus.VehicleInStock,
                })
              }
              setRefurbishmentSerialNoSheet={setRefurbishmentSerialNoSheet}
              showRefurbishmentBottomSheet={showRefurbishmentBottomSheet}
            />
          )}
        {leadData?.statusEvents?.some(
          i => i?.status === LeadStatus.BookingDetailsAdded,
        ) &&
          getRolesArray([
            UserRole.CentreManager,
            UserRole.SalesHead,
            UserRole.FinanceManager,
            UserRole.RetailFinanceManager,
          ])?.some(r => r === loggedInUser.role) && (
            <>
              <BookingDetails
                customerName={bookingDetails?.customer?.name}
                idNumber={bookingDetails?.customer?.idNumber}
                district={bookingDetails?.customer?.customerDistrict?.name}
                state={bookingDetails?.customer?.customerState?.state}
                idProof={bookingDetails?.customer?.idProofUrl}
                cancelCheque={bookingDetails?.cancelledChequeUrl}
                idType={bookingDetails?.customer?.customerId}
                isInsuranceRequired={bookingDetails?.isInsuranceReq}
                isRcTransferRequired={bookingDetails?.isRCTransferReq}
                rtoCharges={RTO_CHARGES} //FIXME :replace this with constant
                vehicleTransactionForm={bookingDetails?.vehicleTransferFormUrl}
              />

              <PaymentDetails
                setBookingPaymentId={setBookingPaymentSheet}
                openBookingBottomSheet={showBookingPaymentBottomSheet}
                addAnotherPartPayment={() =>
                  onPressActionButton({
                    currentStatusParam: LeadStatus.BookingPartPaymentInitiator,
                  })
                }
                bookingPayments={bookingDetails?.payments} //FIXME Update the booking Payments with the booking payment array or a filtered array
                isInsuranceRequired={bookingDetails?.isInsuranceReq}
                bookingType={bookingDetails?.bookingPayment?.bookingType}
                isRcTransferRequired={bookingDetails?.isRCTransferReq}
                saleAmount={bookingDetails?.bookingPayment?.saleAmount}
                isLoanRequired={
                  bookingDetails?.bookingPayment?.bookingType ===
                  BookingType.Finance
                }
                appliedLoanAmount={
                  bookingDetails?.activeLoan?.appliedLoanAmount
                }
                sanctionedLoanAmount={
                  bookingDetails?.activeLoan?.sanctionedLoanAmount
                }
              />
              {/* TODO : Replace all the hardcoded values with query response reference  and still need clarity about the logic of conditiona rendering */}
              <LoanApplicationDetails
                bookingType={bookingDetails?.bookingPayment?.bookingType}
                bankName={
                  titleCaseToReadable(
                    bookingDetails?.activeLoan?.bankName,
                  ) as BankName
                }
                deliveryOrderProofUrl={
                  bookingDetails?.activeLoan?.deliveryOrderDocUrl
                }
                doDate={bookingDetails?.activeLoan?.deliveryOrderDate}
                doRejectionReason={
                  !bookingDetails?.activeLoan &&
                  (titleCaseToReadable(
                    bookingDetails?.archivedLoans?.[0]?.rejectionReason,
                  ) as LoanRejectionReason)
                }
                fiDate={
                  bookingDetails?.activeLoan?.fieldInspectionConfirmedDate ??
                  bookingDetails?.activeLoan?.fieldInspectionDate
                }
                fiStatus={bookingDetails?.activeLoan?.fieldInspectionStatus}
                requestedLoanAmount={
                  bookingDetails?.bookingPayment?.appliedLoanAmount
                }
                approvedLoanAmount={
                  bookingDetails?.activeLoan?.sanctionedLoanAmount
                }
                loginDate={bookingDetails?.activeLoan?.loginDate}
                requestDate={
                  leadStatusEvents?.find(
                    i => i?.status === LeadStatus.PaymentStructureAdded,
                  )?.createdAt
                }
                doValidUpto={bookingDetails?.activeLoan?.deliveryOrderValidity}
                fileStatus={
                  bookingDetails?.bookingPayment?.bookingType ===
                    BookingType.Finance &&
                  !bookingDetails?.activeLoan &&
                  bookingDetails?.archivedLoans?.length === 0
                    ? (titleCaseToReadable(LoanStatus.Requested) as LoanStatus)
                    : bookingDetails?.bookingPayment?.bookingType ===
                        BookingType.Finance &&
                      !bookingDetails?.activeLoan &&
                      bookingDetails?.archivedLoans?.length > 0
                    ? (titleCaseToReadable(LoanStatus.Rejected) as LoanStatus)
                    : (titleCaseToReadable(
                        bookingDetails?.activeLoan?.loanStatus,
                      ) as LoanStatus)
                }
                statusDate={loanStatusEvent?.[0]?.createdAt}
              />
            </>
          )}
      </ScrollView>

      {checkTaskAssignedToRole() && (
        <View style={styles.buttonContainer}>
          <Button
            variant="primary"
            loading={loading}
            title={scopedEvent?.taskButtonTitle}
            onPress={() =>
              onPressActionButton({
                currentStatusParam: currentStatus,
                leadIdParam: leadId,
                regNoParam: regNo,
              })
            }
            // disabled={
            //   currentStatus ===
            //     LeadStatus.ReadyForSale &&
            //   leadData?.statusEvents?.some(
            //     s =>
            //       s?.status === LeadStatus.ReadyForSale,
            //   )
            // }
          />
        </View>
      )}
      <ActionSheet
        ref={refurbishmentSheetRef}
        containerStyle={styles.actionSheetContentContainer}>
        <RefurbishmentBottomSheet
          part="Front Tyre"
          paymentAmount={400}
          requestNo={refurbishmentSerialNoSheet + 1}
          refurbishmentRequest={refurbishmentRequestDetail}
          closeBottomSheet={closeRefurbSheet}
        />
      </ActionSheet>

      <ActionSheet
        ref={paymentSheetRef}
        containerStyle={styles.actionSheetContentContainer}>
        <PaymentBottomSheet
          accountHolderName={accountHolderName}
          paymentMode={paymentMode}
          paymentProcessedAt={paymentProcessedAt}
          accountNo={accountNo}
          accountProof={accountProof}
          receiptProof={receiptUrl}
          bankName={bankName}
          ifscCode={ifscCode}
          requestedDate={requestedDate}
          variant={bottomSheetVariant}
          typeOfPayment={paymentSheetFor}
          typeSpecificPaymentAmount={typeSpecificPaymentAmount}
          expenses={expenses}
          closeBottomSheet={closeBottomSheet}
          dealAmountforPO={dealAmountforPO}
          deliveryAmountforPO={deliveryAmountforPO}
          documentChargesforPO={documentChargesforPO}
          holdbackAmountforPO={holdbackAmountforPO}
          loanAmountforPO={loanAmountforPO}
          loanToBeClosedByforPO={loanCloserforPO}
          payToBankforPO={payToBankforPO}
          payToDealerforPO={payToDealerforPO}
          paymentAmountforPO={paymentAmountforPO}
          remarksforPO={remarksforPO}
          paymentTypeforPO={paymentTypeforPO}
          tokenAmountforPO={tokenAmountforPO}
        />
      </ActionSheet>
      <ActionSheet ref={bookingSheetRef}>
        <BookingBottomSheet
          closeBottomSheet={() => bookingSheetRef?.current?.hide()}
          typeOfPayment={bookingPaymentObj?.for}
          paymentAmount={bookingPaymentObj?.amount}
          paymentDate={bookingPaymentObj?.createdAt}
          paymentMode={bookingPaymentObj?.mode}
          paymentReceiptUrl={bookingPaymentObj?.proofUrl}
          paymentStatus={bookingPaymentObj?.status}
          confirmedBy={bookingPaymentObj?.confirmedBy?.name}
          confirmedDate={bookingPaymentObj?.paymentProcessedAt}
        />
      </ActionSheet>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.light.background},
  innerContainer: {flex: 1, paddingHorizontal: Layout.baseSize * 0.5},
  timelineContainer: {
    // height: Layout.baseSize * 5,
    padding: Layout.baseSize * 0.5,
  },
  buttonContainer: {padding: Layout.baseSize * 0.5, elevation: 1},
  actionSheetContentContainer: {height: Layout.baseSize * 24},
})
