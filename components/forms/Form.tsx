import React, {useEffect, useMemo, useRef, useState} from 'react'
import {
  Platform,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native'
import {ActivityIndicator, Chip} from 'react-native-paper'
import {
  AddDealershipProcurementPayment,
  AddPickupAssignmentDetails,
  AddPickupParkingPaymentDetailsEstimation,
  AddPickupParkingPaymentFinalDetails,
  AddPickupYardDetails,
  ApproveDeal,
  ApproveDeliveryExpense,
  ApproveHoldBackAmount,
  ApproveParkingPayment,
  ApprovePurchaseOrderRequest,
  CheckVehicleDocuments,
  CompleteRTOVerification,
  ConfirmDealPayment,
  ConfirmDocumentAvailability,
  DealershipUpdateConfirmDeal,
  GenerateLead,
  HoldBackConfirmation,
  ProposeBidAmountLimit,
  RaisePurchaseOrderRequest,
  RequestDealPayment,
  StepAction,
  UpdateVehicleDetails,
  UploadDeliveryExpenses,
  UploadDeliveryExpensesPaymentReceipts,
  UploadDeliverySelfie,
  UploadDeliveryVehicleImages,
  UploadLeadVehicleImages,
  UploadPickupDocuments,
  UploadPickupParkingPaymentReceipts,
  UploadPickupVehicleImages,
} from '.'
import Colors from '../../constants/Colors'
import {MOBILE_NUMBER_LENGTH} from '../../constants/constants'
import Layout from '../../constants/Layout'

import {commonStyle} from '../../constants/style'
import {
  AllLeadsDocument,
  BookingType,
  GetLeadDetailsDocument,
  LeadSource,
  LeadStatus,
  LeadStatusEventDetailsFragmentDoc,
  MyPendingTasksDocument,
  NumberOfPendingTasksDocument,
  PaymentFor,
  PaymentMethod,
  PaymentStatus,
  RefurbishmentStatus,
  useAllCentresQuery,
  useGetLeadDetailsQuery,
  useGetStocksDetailsLazyQuery,
  useProcurementCostQuery,
  UserRole,
} from '../../generated/hooks_and_more'
import useLeadCacheDataUpdate, {
  useRefurbishmentReqCacheData,
} from '../../hooks/useLeadCacheDataUpdate'
import useLoggedInUser from '../../hooks/useLoggedInUser'
import useUpdateLeadInput, {
  useUpdateRemarksInput,
} from '../../hooks/useUpdateLeadInput'
import useUserToken from '../../hooks/useUserToken'
import {isCheckSpace, isPhoneValid} from '../../utils/formHelper'
import {
  compareDate,
  containsSameProductNames,
  getBalanceAmountForBooking,
  log,
  titleCaseToReadable,
} from '../../utils/helpers'
import Button from '../basic/Button'
import Icon from '../basic/Icon'

import {H3} from '../basic/StyledText'
import {Row} from '../basic/StyledView'
import ConfirmationModal from '../composite/ConfirmationModal'
import AcceptPickup from './AcceptPickup'
import BidWonOrLost from './BidWonOrLost'
import DealershipConfirmDeal from './DealershipConfirmDeal'
import {FormProps} from './formTypes'

import {captureSentryException} from '../../sentry_telemetry/SentryLogger'
import AddCustomerDetail from './Booking/AddCustomerDetail'
import ApproveDeliveryOrder from './Booking/ApproveDeliveryOrder'
import BookVehicle from './Booking/BookVehicle'
import ConfirmFI from './Booking/ConfirmFI'
import ConfirmLogin from './Booking/ConfirmLogin'
import ReviewBookingPayment from './Booking/ReviewBookingPayment'
import UpdateFI from './Booking/UpdateFI'
import UploadBookingPayment from './Booking/UploadBookingPayment'
import UploadDeliveryPhoto from './Booking/UploadDeliveryPhoto'
import {
  AddListingPrice,
  InspectVehicle,
  MakeReadyForSale,
  UploadListingImages,
} from './RefurbishmentForms'
import PaymentApproval from './RefurbishmentForms/PaymentApproval'
import PaymentDetails from './RefurbishmentForms/PaymentDetails'
import RaiseInstallationPayments from './RefurbishmentForms/RaiseInstallationPayments'
import UploadPayment from './RefurbishmentForms/UploadPayment'
import RequestPickup from './RequestPickup'
import TripMap from './TripMap'
import UploadInstallationConfirmImages from './UploadInstallationConfirmImages'
import UploadPurchaseOrderPaymentReceipts from './UploadPurchaseOrderPaymentReceipts'
import VehicleInStock from './VehicleInStock'

import RequestOrApproveBookingDelivery from './Booking/RequestOrApproveBookingDelivery'

type LeadStatusBarProps = {
  currentStatus?: LeadStatus
  desiredStatus: LeadStatus
  preTimeline: string
  postTimeline: string
}
const LeadStatusBar = ({
  currentStatus,
  desiredStatus,
  preTimeline,
  postTimeline,
}: LeadStatusBarProps) => {
  console.log('LeadStatusBar', {
    currentStatus,
    desiredStatus,
    preTimeline,
    postTimeline,
  })

  function getDesiredStatus() {
    if (desiredStatus === LeadStatus.LeadUpdated) {
      return 'Update Lead'
    } else if (desiredStatus === LeadStatus.LeadGenerated) {
      return 'Create New Lead'
    } else {
      return preTimeline
    }
  }

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal
      style={styles.scrollViewStyle}
      contentContainerStyle={styles.contentContainerStyle}>
      {(!!postTimeline || !!currentStatus) && (
        <Chip mode="outlined" selected>
          {/* {titleCaseToReadable(currentStatus)} */}
          {postTimeline ?? titleCaseToReadable(currentStatus)}
        </Chip>
      )}
      {(!!getDesiredStatus() || !!desiredStatus) && (
        <>
          <Icon iconName="chevron-right" style={commonStyle.alginCenter} />
          <Chip mode="outlined">
            {/* {'... ' + titleCaseToReadable(desiredStatus)} */}
            {`... ${getDesiredStatus() ?? titleCaseToReadable(desiredStatus)}`}
          </Chip>
        </>
      )}
    </ScrollView>
  )
}

const Form = ({
  leadId,
  regNo,
  currentStatus,
  desiredButtonText,
  desiredStatus,
  undesiredButtonText,
  undesiredStatus,
  backStatus,
  navigation,
  createLeadStatusEvent,
  assignTo,
  loading,
  hasPopup,
  isPopupWithRemark,
  positivePopupTitle,
  negativePopupTitle,
  isPopupWithFields,
  positivePopupDescription,
  negativePopupDescription,
  addingEvent,
  canGoForward,
  source,
  hideUndesiredButton,
  onGoBack,
  lseId,
}: FormProps & {loading: boolean; addingEvent: boolean; lseId: string}) => {
  const newLeadId = useRef<string>()
  const [buttonEnable, setButtonEnable] = useState(false)
  const {userToken: myId} = useUserToken()
  const {loggedInUser} = useLoggedInUser(myId)
  const {leadInput, setLeadInput} = useUpdateLeadInput(leadId ?? 'new')
  const registrationNumber = regNo ?? leadInput?.regNo
  const [pickerVisible, setPickerVisible] = useState<boolean>(false)
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false)
  const [btnActionType, setBtnActionType] = useState<actionType>()
  const {remarks, setRemarks} = useUpdateRemarksInput(registrationNumber)
  const rehydrateLeadInput = useLeadCacheDataUpdate({leadId, regNo})
  const [isRequired, setIsRequired] = useState(false)
  const [expenseCount, setExpenseCount] = useState<number>()
  // const [removeFinalBidAmount] = useRemovePreviousFinalBidAmountMutation({
  //   onCompleted: ({updateLead}) => {
  //     console.log('updateLead after removing final bid amount= ', updateLead)
  //   },
  // })

  // const {loggedInUser} = useLoggedInUser()

  /* const {data} = useGetDocumentsCheckListFromLeadQuery({
        variables: {leadId},
        // fetchPolicy: 'network-only',
        onCompleted: ({queryLead}) => {
          log('data.................', queryLead)
        },
      }) */
  // console.log("remarks at form", remarks);

  useEffect(() => {
    checkLeadInputVars()
    // isFormValid.length > 0 && !isFormValid.some(valid => !valid)
    //   ? setButtonEnable(true)
    //   : setButtonEnable(false)
  }, [leadInput])
  //TODO : we can check the stale form rendering by adding current status in dependency array of useEffect, so that it'll check/rerender in case of status change. @AGRIT
  const {data: leadDetailsData, refetch} = useGetLeadDetailsQuery({
    fetchPolicy: 'cache-and-network',
    skip: !currentStatus,
    variables: {
      regNo: regNo,
    },
    onCompleted: ({getLead}) => {
      // log('fetched documents at driver stage', getLead?.documents?.releaseOrder)
    },
  })
  const centerId = leadDetailsData?.getLead?.centre?.id
  const [
    getStockData,
    {data: stockDetailData, called: stockDetailQueryCalled},
  ] = useGetStocksDetailsLazyQuery({
    variables: {
      centreId: centerId,
    },
    fetchPolicy: 'network-only',
  })

  function getScopedEventMetadata(lseId: string) {
    if (
      !leadDetailsData?.getLead?.statusEvents ||
      desiredStatus === LeadStatus.VehicleInspected
    ) {
      return
    } else {
      return leadDetailsData?.getLead?.statusEvents?.find(
        lse => lse?.id === lseId,
      )?.metadata
    }
  }

  const requestId = getScopedEventMetadata(lseId)?.split(':')?.[1]

  const rehydrateLeadRefurbishmentInput = useRefurbishmentReqCacheData({
    leadId,
    regNo,
    requestId,
  })
  // log('It ran')
  const {data: costData} = useProcurementCostQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      regNo: regNo,
    },
  })
  const sellingPrice = leadInput?.sellingPrice
  const dealAmount = costData?.getLead?.payments?.find(
    p => p?.for === PaymentFor.DealPayment && p?.status === PaymentStatus.Done,
  )?.amount

  const expenses = costData?.getLead?.payments?.find(
    p =>
      p?.for === PaymentFor.DeliveryExpense && p?.status === PaymentStatus.Done,
  )?.amount

  const parking = costData?.getLead?.payments?.find(
    p =>
      p?.for === PaymentFor.ParkingExpense && p?.status === PaymentStatus.Done,
  )?.amount

  const dealDelivery = costData?.getLead?.payments?.find(
    p => p?.for === PaymentFor.DealDelivery && p?.status === PaymentStatus.Done,
  )?.amount

  const holdbackAmount = costData?.getLead?.payments?.find(
    p =>
      p?.for === PaymentFor.HoldbackRepayment &&
      p?.status === PaymentStatus.Done,
  )?.amount

  const loanAmount = costData?.getLead?.payments?.find(
    p =>
      p?.for === PaymentFor.LoanRepayment && p?.status === PaymentStatus.Done,
  )?.amount

  const tokenAmount = costData?.getLead?.payments?.find(
    p => p?.for === PaymentFor.DealToken && p?.status === PaymentStatus.Done,
  )?.amount
  const refCost = 0
  const totalBankAuction = Number(
    (!!dealAmount ? dealAmount : 0) +
      (!!expenses ? expenses : 0) +
      (!!parking ? parking : 0) +
      (!!refCost ? refCost : 0),
  )
  const totalDealership =
    (!!dealDelivery ? dealDelivery : 0) +
    (!!tokenAmount ? tokenAmount : 0) +
    (!!expenses ? expenses : 0) +
    (!!holdbackAmount ? holdbackAmount : 0) +
    (!!loanAmount ? loanAmount : 0) +
    (!!refCost ? refCost : 0)

  const isSellingPriceValid =
    costData?.getLead?.source === LeadSource.BankAuction
      ? sellingPrice > totalBankAuction
      : costData?.getLead?.source === LeadSource.DealershipSale
      ? sellingPrice > totalDealership
      : false

  const getDealAmount =
    leadDetailsData?.getLead?.finalBidAmount ?? leadInput?.finalBidAmount
  const {data: allCentersData} = useAllCentresQuery({
    skip:
      desiredStatus !==
      (LeadStatus.DeliveryStarted ||
        desiredStatus !== LeadStatus.DeliveryCompleted),
    onCompleted: ({queryCentre}) => {
      // log('allCenters Data at Form', queryCentre[0])
    },
  })

  const getApprovedParkingPayment =
    leadDetailsData?.getLead?.finalParkingCharges
  const locationsData = useMemo(
    () => allCentersData?.queryCentre?.map(c => c?.location),
    [allCentersData?.queryCentre],
  )

  function onRemarksChange(value: string) {
    setRemarks(value)
  }

  function getDesiredbuttonVariant() {
    if (
      desiredButtonText === 'Won' ||
      desiredButtonText === 'Bid Won' ||
      desiredButtonText === 'Approved'
    ) {
      return 'green'
    }
    return 'action'
  }

  const saleAmount =
    leadDetailsData?.getLead?.activeBooking?.bookingPayment?.saleAmount
  const bookingPayment = leadDetailsData?.getLead?.activeBooking?.payments
  const isRcTransferRequired =
    leadDetailsData?.getLead?.activeBooking?.isRCTransferReq
  const isInsuranceRequired =
    leadDetailsData?.getLead?.activeBooking?.isInsuranceReq
  const isLoanRequired =
    leadDetailsData?.getLead?.activeBooking?.bookingPayment?.bookingType ===
    BookingType.Finance

  const appliedLoanAmount =
    leadDetailsData?.getLead?.activeBooking?.activeLoan?.appliedLoanAmount
  const sanctionedLoanAmount =
    leadDetailsData?.getLead?.activeBooking?.activeLoan?.sanctionedLoanAmount

  function documentCheckListValidation() {
    leadInput?.documentChecklist?.form28 !== null &&
    leadInput?.documentChecklist?.form28 !== undefined &&
    leadInput?.documentChecklist?.form29 !== null &&
    leadInput?.documentChecklist?.form29 !== undefined &&
    leadInput?.documentChecklist?.form30 !== null &&
    leadInput?.documentChecklist?.form30 !== undefined &&
    leadInput?.documentChecklist?.sellerAadharCard !== null &&
    leadInput?.documentChecklist?.sellerAadharCard !== undefined &&
    leadInput?.documentChecklist?.ownerAddressProof !== null &&
    leadInput?.documentChecklist?.ownerAddressProof !== undefined &&
    leadInput?.documentChecklist?.sellerPAN !== null &&
    leadInput?.documentChecklist?.sellerPAN !== undefined &&
    leadInput?.documentChecklist?.registrationCertificate !== null &&
    leadInput?.documentChecklist?.registrationCertificate !== undefined &&
    leadInput?.documentChecklist?.loanForeclosure !== null &&
    leadInput?.documentChecklist?.loanForeclosure !== undefined &&
    leadInput?.documentChecklist?.bankNOC !== null &&
    leadInput?.documentChecklist?.bankNOC !== undefined &&
    leadInput?.documentChecklist?.form35 !== null &&
    leadInput?.documentChecklist?.form35 !== undefined &&
    leadInput?.documentChecklist?.form36 !== undefined &&
    leadInput?.documentChecklist?.form36 !== null &&
    leadInput?.documentChecklist?.insuranceCertificate !== null &&
    leadInput?.documentChecklist?.insuranceCertificate !== undefined
      ? setButtonEnable(true)
      : setButtonEnable(false)
  }

  function getvalue() {
    switch (desiredStatus) {
      case LeadStatus.DealTokenPaymentConfirmed:
        const getTokenAmount = leadDetailsData?.getLead?.payments?.find(
          i =>
            i?.for === PaymentFor.DealToken &&
            i?.status === PaymentStatus.Requested,
        )?.amount
        return getTokenAmount
      case LeadStatus.DealDeliveryPaymentConfirmed:
        const getDealDeliveryAmount = leadDetailsData?.getLead?.payments?.find(
          i =>
            i?.for === PaymentFor.DealDelivery &&
            i?.status === PaymentStatus.Requested,
        )?.amount
        return getDealDeliveryAmount
      case LeadStatus.LoanRepaymentConfirmed:
        const getLoanAmount = leadDetailsData?.getLead?.payments?.find(
          i =>
            i?.for === PaymentFor.LoanRepayment &&
            i?.status === PaymentStatus.Requested,
        )?.amount
        return getLoanAmount
      case LeadStatus.HoldbackRepaymentConfirmed:
        const getHoldBackAmount = leadDetailsData?.getLead?.payments?.find(
          i =>
            i?.for === PaymentFor.HoldbackRepayment &&
            i?.status === PaymentStatus.Requested,
        )?.amount
        return getHoldBackAmount
      case LeadStatus.DealerPaymentConfirmed:
        const getDealPaymentAmount = leadDetailsData?.getLead?.payments?.find(
          i =>
            i?.for === PaymentFor.DealPayment &&
            i?.status === PaymentStatus.Requested,
        )?.amount
        return getDealPaymentAmount

      default:
        break
    }
  }

  const amount = getvalue()

  const isDealershipPaymentValid =
    !!leadInput?.payments?.[0]?.mode &&
    !!leadInput?.payments?.[0]?.amount &&
    leadInput?.payments?.[0]?.amount === amount &&
    !!leadInput?.payments?.[0]?.createdAt &&
    !!leadInput?.payments?.[0]?.receiptUrl

  /*
   * NOTE: All Vehicle images will be optional for testing environment and
   * All vehicle images field will be mandatory for build
   * */
  function leadVehicleImagesValidation() {
    let trueCount = 0

    if (!!leadInput?.vehicle?.images?.[0]?.inspectionVideoUrl) {
      trueCount++
    }
    if (!!leadInput?.vehicle?.images?.[0]?.frontBodySide) {
      trueCount++
    }
    if (!!leadInput?.vehicle?.images?.[0]?.leftBodySide) {
      trueCount++
    }
    if (!!leadInput?.vehicle?.images?.[0]?.backBodySide) {
      trueCount++
    }
    if (!!leadInput?.vehicle?.images?.[0]?.rightBodySide) {
      trueCount++
    }
    if (!!leadInput?.vehicle?.images?.[0]?.backLeftTyre) {
      trueCount++
    }
    if (!!leadInput?.vehicle?.images?.[0]?.backRightTyre) {
      trueCount++
    }
    if (!!leadInput?.vehicle?.images?.[0]?.frontLeftTyre) {
      trueCount++
    }
    if (!!leadInput?.vehicle?.images?.[0]?.frontRightTyre) {
      trueCount++
    }
    if (!!leadInput?.vehicle?.images?.[0]?.fuelInjectionPumpPlate) {
      trueCount++
    }
    if (!!leadInput?.vehicle?.images?.[0]?.odometer) {
      trueCount++
    }
    if (!!leadInput?.vehicle?.images?.[0]?.chassisNumber) {
      trueCount++
    }
    if (!!leadInput?.vehicle?.images?.[0]?.engineNumber) {
      trueCount++
    }
    if (trueCount >= 4) {
      setButtonEnable(true)
    } else {
      setButtonEnable(false)
    }
  }

  function isGenerateLeadFormValidAtBA() {
    if (
      !!leadInput?.regNo &&
      !!leadInput?.auctionByBank &&
      !!leadInput?.vehicle?.make &&
      !!leadInput?.vehicle?.model &&
      !!leadInput?.vehicle?.manufacturingDate &&
      isCheckSpace(leadInput?.regNo) &&
      leadInput?.source === LeadSource.BankAuction &&
      !!leadInput?.vehicle?.chassisNumber &&
      !!leadInput?.vehicle?.engineNumber &&
      isCheckSpace(leadInput?.vehicle?.engineNumber) &&
      isCheckSpace(leadInput?.vehicle?.chassisNumber)
    ) {
      setButtonEnable(true)
    } else {
      setButtonEnable(false)
    }
  }

  function isGenerateLeadFormValidAtD() {
    if (
      !!leadInput?.regNo &&
      !!leadInput?.vehicle?.make &&
      !!leadInput?.vehicle?.model &&
      !!leadInput?.vehicle?.manufacturingDate &&
      isCheckSpace(leadInput?.regNo) &&
      leadInput?.source === LeadSource.DealershipSale &&
      !!leadInput?.ownershipType &&
      !!leadInput?.vehicle?.hoursMeter &&
      !!leadInput?.demandAmount
    ) {
      setButtonEnable(true)
    } else {
      setButtonEnable(false)
    }
  }

  function checkRTOVerificationDocuments() {
    const isDocumentUpload =
      !!leadInput?.vehicle?.documents?.rtoVerificationProofUrl &&
      !!leadInput?.vehicle?.tempMake &&
      !!leadInput?.vehicle?.tempModel &&
      !!leadInput?.vehicle?.tempEngineNumber &&
      !!leadInput?.vehicle?.tempChassisNumber &&
      ((leadInput?.vehicle?.isHypo &&
        !!leadInput?.vehicle?.financingDetails?.tempFinancerName) ||
        !leadInput?.vehicle?.isHypo) &&
      !!leadInput?.vehicle?.documents?.hypothecationProofUrl &&
      (!!leadInput?.vehicle?.isHSRPAvailable ||
        !leadInput?.vehicle?.isHSRPAvailable) &&
      !!leadInput?.vehicle?.documents?.hsrbProofUrl &&
      ((leadInput?.vehicle?.isChallanAvailable &&
        !!leadInput?.vehicle?.challanAmount) ||
        !leadInput?.vehicle?.isChallanAvailable) &&
      !!leadInput?.vehicle?.documents?.challanUrl &&
      (leadInput?.vehicle?.isBlacklisted ||
        !leadInput?.vehicle?.isBlacklisted) &&
      !!leadInput?.vehicle?.documents?.blacklistProofUrl

    // TODO: Add document of blackListed in vehicle.documents
    /*  log(
              `rtoVerificationProofUrl ${!!leadInput?.vehicle?.documents
                ?.rtoVerificationProofUrl},
                hypothecationProofUrl ${!!leadInput?.vehicle?.documents
                  ?.hypothecationProofUrl},
                challanUrl ${!!leadInput?.vehicle?.documents?.challanUrl}
                `,
              {},
            ) */

    // log('isDocumentUpload', isDocumentUpload)
    if (isDocumentUpload) {
      setButtonEnable(true)
    } else {
      setButtonEnable(false)
    }
  }

  function checkVehicleDocumentConfirmed() {
    const isRegAvailableDoc = leadInput?.dealershipDocuments
      ?.registrationCertificate?.isAvailable
      ? leadInput?.dealershipDocuments?.registrationCertificate?.expectedDate
      : true
    const isForm26AvailableDoc = leadInput?.dealershipDocuments?.form26
      ?.isAvailable
      ? leadInput?.dealershipDocuments?.form26?.expectedDate
      : true
    const isLoanForeclosureAvailableDoc = leadInput?.dealershipDocuments
      ?.loanForeclosure?.isAvailable
      ? leadInput?.dealershipDocuments?.loanForeclosure?.expectedDate
      : true
    const isBankNocAvailableDoc = leadInput?.dealershipDocuments?.bankNOC
      ?.isAvailable
      ? leadInput?.dealershipDocuments?.bankNOC?.expectedDate
      : true
    const isForm35AvailableDoc = leadInput?.dealershipDocuments?.form35
      ?.isAvailable
      ? leadInput?.dealershipDocuments?.form35?.expectedDate
      : true
    const isInsuranceCertificateAvaibleDoc = leadInput?.dealershipDocuments
      ?.insuranceCertificate?.isAvailable
      ? leadInput?.dealershipDocuments?.insuranceCertificate?.expectedDate
      : true
    const isForm28AvailableDoc = leadInput?.dealershipDocuments?.form28
      ?.isAvailable
      ? leadInput?.dealershipDocuments?.form28?.expectedDate
      : true
    const isForm29AvailableDoc = leadInput?.dealershipDocuments?.form29
      ?.isAvailable
      ? leadInput?.dealershipDocuments?.form29?.expectedDate
      : true
    const isForm30AvailableDoc = leadInput?.dealershipDocuments?.form30
      ?.isAvailable
      ? leadInput?.dealershipDocuments?.form30?.expectedDate
      : true
    const isSellerAadharCardAvailableDoc = leadInput?.dealershipDocuments
      ?.sellerAadharCard?.isAvailable
      ? leadInput?.dealershipDocuments?.sellerAadharCard?.expectedDate
      : true
    const isOwnerAddressProofAvailableDoc = leadInput?.dealershipDocuments
      ?.ownerAddressProof?.isAvailable
      ? leadInput?.dealershipDocuments?.ownerAddressProof?.expectedDate
      : true
    const isForm36AvailableDoc = leadInput?.dealershipDocuments?.form36
      ?.isAvailable
      ? leadInput?.dealershipDocuments?.form36?.expectedDate
      : true

    const isAvailableDoc =
      isRegAvailableDoc &&
      isForm26AvailableDoc &&
      isLoanForeclosureAvailableDoc &&
      isBankNocAvailableDoc &&
      isForm35AvailableDoc &&
      isInsuranceCertificateAvaibleDoc &&
      isForm28AvailableDoc &&
      isForm29AvailableDoc &&
      isForm30AvailableDoc &&
      isSellerAadharCardAvailableDoc &&
      isOwnerAddressProofAvailableDoc &&
      isForm36AvailableDoc

    if (isAvailableDoc) {
      setButtonEnable(true)
    } else {
      setButtonEnable(false)
    }
  }

  function handleVehicleDetailsUpdated() {
    if (
      leadInput?.vehicle?.registrationDate &&
      leadInput?.auctioningAgency?.name &&
      leadInput?.auctioningAgency?.spocNo?.length === MOBILE_NUMBER_LENGTH &&
      leadInput?.vehicle?.repossessionDate &&
      ((leadInput?.vehicle?.isRcAvailable &&
        leadInput?.vehicle?.fitnessValidUpto) ||
        !leadInput?.vehicle?.isRcAvailable) &&
      ((leadInput?.vehicle?.isVehicleInsured &&
        leadInput?.vehicle?.insuranceDetails?.insurerName &&
        leadInput?.vehicle?.insuranceDetails?.insuranceType &&
        leadInput?.vehicle?.insuranceDetails?.policyNumber &&
        isCheckSpace(leadInput?.vehicle?.insuranceDetails?.policyNumber) &&
        leadInput?.vehicle?.insuranceDetails?.policyExpiryDate) ||
        !leadInput?.vehicle?.isVehicleInsured)
    ) {
      setButtonEnable(true)
    } else {
      setButtonEnable(false)
    }
  }

  function isVehicleDetailsFormValidAtD() {
    const allNonConditionalMandatoryFields =
      leadInput?.dealer?.name &&
      leadInput?.dealer?.phoneNo &&
      leadInput?.dealer?.phoneNo?.length === 10 &&
      isPhoneValid(leadInput?.dealer?.phoneNo) &&
      leadInput?.vehicle?.engineNumber &&
      leadInput?.vehicle?.chassisNumber &&
      leadInput?.vehicle?.registrationDate

    const isVehicleFinanced =
      leadInput?.vehicle?.isVehicleFinanced &&
      !!leadInput?.vehicle?.financingDetails?.financerName

    const isLoanClosed = leadInput?.vehicle?.financingDetails?.isLoanClosed

    const isVehicleFinancedWithoutLoan = isVehicleFinanced && isLoanClosed
    const isVehicleFinanceWithLoan =
      isVehicleFinanced &&
      !isLoanClosed &&
      !!leadInput?.vehicle?.financingDetails?.pendingLoanAmount &&
      !!leadInput?.vehicle?.financingDetails?.tempLoanToBeClosedBy

    if (
      allNonConditionalMandatoryFields &&
      ((leadInput?.vehicle?.isRcAvailable &&
        leadInput?.vehicle?.fitnessValidUpto) ||
        !leadInput?.vehicle?.isRcAvailable) &&
      (isVehicleFinanceWithLoan ||
        isVehicleFinancedWithoutLoan ||
        !leadInput?.vehicle?.isVehicleFinanced) &&
      ((leadInput?.vehicle?.isVehicleInsured &&
        leadInput?.vehicle?.insuranceDetails?.insurerName &&
        leadInput?.vehicle?.insuranceDetails?.insuranceType &&
        leadInput?.vehicle?.insuranceDetails?.policyNumber &&
        isCheckSpace(leadInput?.vehicle?.insuranceDetails?.policyNumber) &&
        leadInput?.vehicle?.insuranceDetails?.policyExpiryDate) ||
        !leadInput?.vehicle?.isVehicleInsured)
    ) {
      setButtonEnable(true)
    } else {
      setButtonEnable(false)
    }
  }

  function handleInstallationBillsUploadedButton() {
    const totalPurchaseItems =
      leadDetailsData?.getLead?.refurbishmentDetails?.requests?.find(
        req => req?.id === requestId,
      )?.purchase?.items?.length ?? 0

    const totalInstallationItems =
      leadInput?.refurbishmentDetails?.requests?.[0]?.purchase?.items?.length ??
      0
    const totalIssueItems =
      leadDetailsData?.getLead?.refurbishmentDetails?.requests?.find(
        req => req?.id === requestId,
      )?.issue?.items?.length ?? 0
    const leadDetailsPurchaseItems =
      leadDetailsData?.getLead?.refurbishmentDetails?.requests?.find(
        req => req?.id === requestId,
      )?.purchase?.items

    // log('leadDetailsPurchaseItems', leadDetailsPurchaseItems)

    const leadInputPurchaseItems =
      leadInput?.refurbishmentDetails?.requests?.[0]?.purchase?.items

    // log('leadInputPurchaseItems', leadInputPurchaseItems)

    function checkPrices() {
      const leadDetailsTotalPrice =
        leadDetailsPurchaseItems?.reduce(
          (acc, item) => acc + item?.approvedPriceLimit,
          0,
        ) ?? 0
      const leadInputTotalPrice =
        leadInputPurchaseItems?.reduce((acc, item) => acc + item?.price, 0) ?? 0

      // log('leadDetailsTotalPrice', leadDetailsTotalPrice)
      // log('leadInputTotalPrice', leadInputTotalPrice)

      return leadDetailsTotalPrice >= leadInputTotalPrice
    }

    const condition1 =
      totalPurchaseItems === totalInstallationItems &&
      leadInput?.refurbishmentDetails?.requests?.[0]?.purchase?.items?.every(
        it => !!it?.price,
      ) &&
      checkPrices() &&
      leadInput?.refurbishmentDetails?.requests?.[0]?.purchase?.items?.every(
        it => !!it?.purchaseProofUrl,
      ) &&
      !leadInput?.refurbishmentDetails?.requests?.[0]?.hasTransportationCharge

    const condition2 =
      totalPurchaseItems === totalInstallationItems &&
      leadInput?.refurbishmentDetails?.requests?.[0]?.purchase?.items?.every(
        it => !!it?.price,
      ) &&
      checkPrices() &&
      leadInput?.refurbishmentDetails?.requests?.[0]?.purchase?.items?.every(
        it => !!it?.purchaseProofUrl,
      ) &&
      leadInput?.refurbishmentDetails?.requests?.[0]?.hasTransportationCharge &&
      !!leadInput?.refurbishmentDetails?.requests?.[0]?.transportationCharge

    // console.log({totalPurchaseItems, totalIssueItems})

    if (totalPurchaseItems === 0 && totalIssueItems > totalPurchaseItems) {
      setButtonEnable(true)
    } else if (condition1) {
      setButtonEnable(true)
    } else if (condition2) {
      setButtonEnable(true)
    } else {
      setButtonEnable(false)
    }
  }

  function handleInstallationPaymentRequestRaisedButton() {
    const refurbishmentBeneficiary =
      leadInput?.refurbishmentDetails?.requests?.[0]?.refurbishmentBeneficiary

    const isUpi =
      leadInput?.refurbishmentDetails?.requests?.[0]?.purchase?.payment
        ?.mode === PaymentMethod.Upi
    const upiId =
      leadInput?.refurbishmentDetails?.requests?.[0]?.purchase?.payment?.upiId
    const upiIdProof =
      leadInput?.refurbishmentDetails?.requests?.[0]?.purchase?.payment
        ?.proofUrl

    const accHolderName = refurbishmentBeneficiary?.accountHolderName
    const accountNumber = refurbishmentBeneficiary?.accountNumber
    const ifscCode = refurbishmentBeneficiary?.ifscCode
    const bankName = refurbishmentBeneficiary?.bankName
    const beneficiaryAccountProof = refurbishmentBeneficiary?.proofUrl

    if (isUpi && upiId && upiIdProof) {
      setButtonEnable(true)
    } else if (
      !isUpi &&
      accHolderName &&
      accountNumber &&
      ifscCode &&
      bankName &&
      beneficiaryAccountProof
    ) {
      setButtonEnable(true)
    } else {
      setButtonEnable(false)
    }
  }

  function handleInstallationPaymentConfirmedButton() {
    const paymentAmount = leadInput?.payments?.[0]?.amount?.toString()
    const paymentModeFM = leadInput?.payments?.[0]?.modeFM
    const paymentDate = leadInput?.payments?.[0]?.paymentProcessedAt
    const receiptUrl = leadInput?.payments?.[0]?.receiptUrl

    const totalRefurbishmentAmount =
      leadDetailsData?.getLead?.refurbishmentDetails?.requests
        ?.find(req => req?.id === requestId)
        ?.purchase?.items?.reduce((acc, item) => acc + item?.price, 0)
    const transportationCost =
      leadDetailsData?.getLead?.refurbishmentDetails?.requests?.find(
        req => req?.id === requestId,
      )?.transportationCharge ?? 0

    const totalPaymentAmount = totalRefurbishmentAmount + transportationCost

    if (
      paymentAmount &&
      paymentModeFM &&
      paymentDate &&
      receiptUrl &&
      totalPaymentAmount === Number(paymentAmount)
    ) {
      setButtonEnable(true)
    } else {
      setButtonEnable(false)
    }
  }

  function handleCustomerDetailButton() {
    const customerName = leadInput?.activeBooking?.customer?.name
    const mobileNumber = leadInput?.activeBooking?.customer?.phoneNo
    const state = leadInput?.activeBooking?.customer?.customerState?.state // TODO: need to change the name of customerState to state
    const district = leadInput?.activeBooking?.customer?.customerDistrict?.name // TODO: need to change name of customerDistrict --> district
    const indentificationProof = leadInput?.activeBooking?.customer?.customerId
    const idNumber = leadInput?.activeBooking?.customer?.idNumber
    // const isRcRequired = leadInput?.activeBooking?.isRCTransferReq
    // const isInsuranceRequired = leadInput?.activeBooking?.isInsuranceReq
    const vehicleTransferFormUrl =
      leadInput?.activeBooking?.vehicleTransferFormUrl
    const cancelledChequeUrl = leadInput?.activeBooking?.cancelledChequeUrl

    if (
      !!customerName &&
      !!mobileNumber &&
      !!state &&
      !!district &&
      !!indentificationProof &&
      !!idNumber &&
      mobileNumber?.length === 10 &&
      !!vehicleTransferFormUrl &&
      !!cancelledChequeUrl
    ) {
      setButtonEnable(true)
    } else {
      setButtonEnable(false)
    }
  }

  function handleBookingVehicleButton() {
    const saleAmount = leadInput?.activeBooking?.bookingPayment?.saleAmount
    const paymentMode = leadInput?.activeBooking?.bookingPayment?.bookingType
    const requestedLoanAmount =
      leadInput?.activeBooking?.bookingPayment?.appliedLoanAmount
    if (
      !!saleAmount &&
      !!paymentMode &&
      (paymentMode === BookingType.Finance ? !!requestedLoanAmount : true)
    ) {
      setButtonEnable(true)
    } else {
      setButtonEnable(false)
    }
  }

  function handleBookingPaymentButton(paymentFor: PaymentFor) {
    const paymentMode = leadInput?.activeBooking?.payments?.[0]?.mode
    const amount = leadInput?.activeBooking?.payments?.[0]?.amount
    const proofUrl = leadInput?.activeBooking?.payments?.[0]?.proofUrl
    const date = leadInput?.activeBooking?.payments?.[0]?.createdAt
    if (
      !!paymentMode &&
      !!amount &&
      !!date &&
      (paymentMode !== PaymentMethod.Cash ? !!proofUrl : true) &&
      (paymentFor === PaymentFor.BookingDelivery
        ? amount ===
          getBalanceAmountForBooking(
            bookingPayment,
            saleAmount,
            isRcTransferRequired,
            isInsuranceRequired,
            isLoanRequired,
            appliedLoanAmount,
            sanctionedLoanAmount,
          )
        : true)
    ) {
      setButtonEnable(true)
    } else {
      setButtonEnable(false)
    }
  }

  function handleDOApprovedButton() {
    const fiConfirmedDate =
      leadDetailsData?.getLead?.activeBooking?.activeLoan
        ?.fieldInspectionConfirmedDate

    const doDate = leadInput?.activeBooking?.activeLoan?.deliveryOrderDate
    const validityDays =
      leadInput?.activeBooking?.activeLoan?.deliveryOrderValidity
    const approvedLoanAmount =
      leadInput?.activeBooking?.activeLoan?.sanctionedLoanAmount
    const deliveryOrderProof =
      leadInput?.activeBooking?.activeLoan?.deliveryOrderDocUrl

    const checkDateValidation = compareDate(doDate, fiConfirmedDate)

    setButtonEnable(
      !!doDate &&
        !!fiConfirmedDate &&
        checkDateValidation &&
        !!validityDays &&
        !!approvedLoanAmount &&
        !!deliveryOrderProof,
    )
  }

  function handleBookingLoanFileLoggedInButton() {
    const bankName = leadInput?.activeBooking?.activeLoan?.bankName
    const loginDate = leadInput?.activeBooking?.activeLoan?.loginDate
    const loginApplicationFormUrl =
      leadInput?.activeBooking?.activeLoan?.loginApplicationFormUrl

    setButtonEnable(!!bankName && !!loginDate && !!loginApplicationFormUrl)
  }

  function handleBookingLoanFIAddedButton() {
    const loginDate =
      leadDetailsData?.getLead?.activeBooking?.activeLoan?.loginDate

    const fieldInspectionDate =
      leadInput?.activeBooking?.activeLoan?.fieldInspectionDate

    const checkDateValidation = compareDate(fieldInspectionDate, loginDate)

    setButtonEnable(!!loginDate && !!fieldInspectionDate && checkDateValidation)
  }
  function handleBookingLoanFIPassedButton() {
    const loginDate =
      leadDetailsData?.getLead?.activeBooking?.activeLoan?.loginDate
    const fiConfirmedDate =
      leadInput?.activeBooking?.activeLoan?.fieldInspectionConfirmedDate

    const checkDateValidation = compareDate(fiConfirmedDate, loginDate)

    setButtonEnable(!!loginDate && !!fiConfirmedDate && checkDateValidation)
  }
  function handleParkingPaymentDetailsEstimationValidation() {
    const isUpi = leadInput?.payments?.[0]?.mode === PaymentMethod.Upi
    const accHolderName = leadInput?.parkingBeneficiary?.accountHolderName
    const accountNumber = leadInput?.parkingBeneficiary?.accountNumber
    const ifscCode = leadInput?.parkingBeneficiary?.ifscCode
    const upiId = leadInput?.payments?.[0]?.upiId
    const beneficiaryId = leadInput?.parkingBeneficiary?.id
    const bankName = leadInput?.parkingBeneficiary?.bankName
    // if payment mode is UPI then account proof should be from payment else from parking beneficiary

    const beneficiaryAccountProof = isUpi
      ? leadInput?.payments?.[0]?.proofUrl
      : leadInput?.parkingBeneficiary?.proofUrl

    if (isUpi) {
      setButtonEnable(!!upiId && !!beneficiaryAccountProof)
    } else {
      setButtonEnable(
        (!!accHolderName &&
          !!accountNumber &&
          !!ifscCode &&
          !!bankName &&
          !!beneficiaryAccountProof) ||
          !!beneficiaryId,
      )
    }
  }

  function handlePickupParkingPaymentFinalDetailsAddedValidation() {
    const isUpi = leadInput?.payments?.[0]?.mode === PaymentMethod.Upi

    const accountNumber = leadInput?.parkingBeneficiary?.accountNumber
    const ifscCode = leadInput?.parkingBeneficiary?.ifscCode
    const bankName = leadInput?.parkingBeneficiary?.bankName
    const accHolderBeneficiaryName =
      leadInput?.parkingBeneficiary?.accountHolderName
    const upiId = leadInput?.payments?.[0]?.upiId
    const beneficiaryId = leadInput?.parkingBeneficiary?.id
    // if payment mode is UPI then account proof should be from payment else from parking beneficiary
    const beneficiaryAccountProof = isUpi
      ? leadInput?.payments?.[0]?.proofUrl
      : leadInput?.parkingBeneficiary?.proofUrl
    const repossessionDate = leadInput?.vehicle?.tempRepossessionDate
    const perDayParkingCharge = leadInput?.yard?.tempPerDayParkingCharge

    if (isUpi) {
      setButtonEnable(
        !!upiId &&
          !!beneficiaryAccountProof &&
          !!repossessionDate &&
          !!perDayParkingCharge,
      )
    } else {
      setButtonEnable(
        (!!accountNumber &&
          !!ifscCode &&
          !!bankName &&
          !!accHolderBeneficiaryName &&
          !!beneficiaryAccountProof &&
          !!repossessionDate &&
          !!perDayParkingCharge) ||
          !!beneficiaryId,
      )
    }
  }

  function checkLeadInputVars() {
    switch (desiredStatus) {
      case LeadStatus.LeadGenerated:
        if (source === LeadSource.BankAuction) {
          return isGenerateLeadFormValidAtBA()
        } else if (source === LeadSource.DealershipSale) {
          return isGenerateLeadFormValidAtD()
        }

      case LeadStatus.VehicleDetailsUpdated:
        if (source === LeadSource.BankAuction) {
          return handleVehicleDetailsUpdated()
        } else if (source === LeadSource.DealershipSale) {
          return isVehicleDetailsFormValidAtD()
        }

      case LeadStatus.LeadVehicleImagesUploaded:
        return leadVehicleImagesValidation()
      case LeadStatus.DealAmountConfirmed:
        return <>{setButtonEnable(true)}</>
      case LeadStatus.DealAmountUpdated:
        return <>{setButtonEnable(true)}</>

      case LeadStatus.VehicleDocumentsChecked:
        return <>{setButtonEnable(true)}</>
      case LeadStatus.VehicleDocumentsConfirmed:
        return <> {checkVehicleDocumentConfirmed()}</>
      case LeadStatus.RtoVerificationCompleted:
        return <>{checkRTOVerificationDocuments()}</>
      case LeadStatus.BidAmountLimitProposed:
        return (
          <>
            {leadInput?.proposedBidLimitAmount
              ? setButtonEnable(true)
              : setButtonEnable(false)}
          </>
        )
      case LeadStatus.BidWon:
        return (
          <>
            {leadInput?.finalBidAmount
              ? setButtonEnable(true)
              : setButtonEnable(false)}
          </>
        )
      case LeadStatus.BidLost:
        return (
          <>
            {leadInput?.finalBidAmount
              ? setButtonEnable(true)
              : setButtonEnable(false)}
          </>
        )
      case LeadStatus.DealApproved:
        return <>{setButtonEnable(true)}</>
      case LeadStatus.PaymentRequestSent:
        return (
          <>
            {/* {leadInput?.payments?.[0].bankName && */}
            {leadInput?.payments?.[0]?.accountHolderName &&
            leadInput?.payments?.[0]?.accountNo &&
            isCheckSpace(leadInput?.payments?.[0]?.accountNo) &&
            leadInput?.payments?.[0]?.ifsc &&
            leadInput?.payments?.[0]?.ifsc.length === 11 &&
            !!leadInput?.payments?.[0]?.proofUrl
              ? setButtonEnable(true)
              : setButtonEnable(false)}
          </>
        )
      case LeadStatus.PaymentConfirmed:
        return (
          <>
            {leadInput?.payments?.[0]?.amount === getDealAmount &&
            !!leadInput?.payments?.[0]?.mode &&
            !!leadInput?.payments?.[0]?.createdAt &&
            !!leadInput?.payments?.[0]?.receiptUrl
              ? setButtonEnable(true)
              : setButtonEnable(false)}
          </>
        )
      case LeadStatus.PaymentRequestRejected:
        return <>{setButtonEnable(true)}</>
      case LeadStatus.DealTokenPaymentConfirmed:
        return (
          <>
            {isDealershipPaymentValid
              ? setButtonEnable(true)
              : setButtonEnable(false)}
          </>
        )
      case LeadStatus.DealDeliveryPaymentConfirmed:
        return (
          <>
            {isDealershipPaymentValid
              ? setButtonEnable(true)
              : setButtonEnable(false)}
          </>
        )
      case LeadStatus.HoldbackRepaymentConfirmed:
        return (
          <>
            {isDealershipPaymentValid
              ? setButtonEnable(true)
              : setButtonEnable(false)}
          </>
        )
      case LeadStatus.LoanRepaymentConfirmed:
        return (
          <>
            {isDealershipPaymentValid
              ? setButtonEnable(true)
              : setButtonEnable(false)}
          </>
        )
      case LeadStatus.DealerPaymentConfirmed:
        return (
          <>
            {isDealershipPaymentValid
              ? setButtonEnable(true)
              : setButtonEnable(false)}
          </>
        )
      case LeadStatus.PickupYardDetailsAdded:
        return (
          <>
            {!!leadInput?.expectedPickupDate &&
            !!leadInput?.yard?.name &&
            !!leadInput?.yard?.city &&
            !!leadInput?.yard?.address &&
            !!leadInput?.yard?.spocName &&
            !!leadInput?.yard?.spocNo &&
            !!leadInput?.yard?.locationUrl
              ? setButtonEnable(true)
              : setButtonEnable(false)}
          </>
        )
      case LeadStatus.PickupAssignmentDetailsAdded:
        return (
          <>
            {leadInput?.centre?.name && leadInput?.pickup?.by
              ? setButtonEnable(true)
              : setButtonEnable(false)}
          </>
        )
      case LeadStatus.PickupParkingPaymentDetailsEstimationAdded:
        return handleParkingPaymentDetailsEstimationValidation()
      case LeadStatus.PickupRequested:
        return <>{setButtonEnable(true)}</>
      case LeadStatus.PickupAccepted:
        return <>{setButtonEnable(true)}</>
      case LeadStatus.PickupRejected:
        return <>{setButtonEnable(true)}</>
      case LeadStatus.PickupInitiated:
        return <>{setButtonEnable(true)}</>
      case LeadStatus.PickupDocumentsUploaded:
        return (
          <>
            {(leadDetailsData?.getLead?.documents?.releaseOrder
              ? !leadInput?.documents?.releaseOrder
              : leadInput?.documents?.releaseOrder) &&
            (leadDetailsData?.getLead?.documents?.indemnityBond
              ? !leadInput?.documents?.indemnityBond
              : leadInput?.documents?.indemnityBond)
              ? setButtonEnable(true)
              : setButtonEnable(false)}
          </>
        )
      case LeadStatus.PickupVehicleImagesUploaded:
        return (
          <>
            {leadVehicleImagesValidation()}
            {/* {setButtonEnable(true)} */}
          </>
        )
      case LeadStatus.PickupParkingPaymentFinalDetailsAdded:
        return handlePickupParkingPaymentFinalDetailsAddedValidation()
      case LeadStatus.PickupParkingPaymentApproved:
        return <>{setButtonEnable(true)}</>
      case LeadStatus.PickupParkingPaymentReceiptsUploaded:
        return (
          <>
            {leadInput?.payments?.[0]?.amount === getApprovedParkingPayment && //TODO: show error for unequal amount
            !!leadInput?.payments?.[0]?.mode &&
            !!leadInput?.payments?.[0]?.paymentProcessedAt &&
            !!leadInput?.payments?.[0]?.receiptUrl
              ? setButtonEnable(true)
              : setButtonEnable(false)}
          </>
        )
      case LeadStatus.DeliveryStarted:
        return <>{setButtonEnable(true)}</>
      case LeadStatus.DeliveryCompleted:
        return <>{setButtonEnable(true)}</>
      case LeadStatus.DeliveryVehicleImagesUploaded:
        return leadVehicleImagesValidation()
      case LeadStatus.DeliverySelfieUploaded:
        return (
          <>
            {leadInput?.deliveredSelfieUrl && remarks
              ? setButtonEnable(true)
              : setButtonEnable(false)}
          </>
        )

      case LeadStatus.DeliveryExpensesUploaded:
        log(' expense count', leadInput?.expenses?.length)
        // log(' expense count', expenseCount)

        return (
          <>
            {!!leadInput &&
            !!leadInput?.expenses &&
            leadInput?.expenses?.length > 0 &&
            !leadInput?.expenses?.some(expense => !expense?.category) &&
            !leadInput?.expenses?.some(expense => !expense?.spentAmount) &&
            !leadInput?.expenses?.some(expense => !expense?.receiptUrl)
              ? setButtonEnable(true)
              : setButtonEnable(false)}
          </>
        )

      case LeadStatus.DeliveryExpensesPaymentReceiptsUploaded:
        const expensesAmount = leadDetailsData?.getLead?.expenses?.reduce(
          (acc, {spentAmount, paymentStatus}) => {
            if (paymentStatus !== PaymentStatus.Rejected) {
              return acc + spentAmount
            } else {
              return acc
            }
          },
          0,
        )
        return (
          <>
            {!!leadInput?.payments?.[0]?.mode &&
            // leadInput?.payments?.[0]?.mode !== 'UPI' && ---commenting this line because this is not a feature
            !!leadInput?.payments?.[0]?.amount &&
            !!leadInput?.payments?.[0]?.paymentProcessedAt &&
            !!leadInput?.payments?.[0]?.receiptUrl &&
            expensesAmount === leadInput?.payments?.[0]?.amount
              ? setButtonEnable(true)
              : setButtonEnable(false)}
          </>
        )

      case LeadStatus.DeliveryExpensesApproved:
        return <>{setButtonEnable(true)}</>

      case LeadStatus.ReadyForSale:
        return (
          <>
            {isSellingPriceValid
              ? setButtonEnable(true)
              : setButtonEnable(false)}
          </>
        )
      case LeadStatus.ListingPriceUpdated:
        return (
          <>
            {leadInput?.listingPrice > costData?.getLead?.sellingPrice
              ? setButtonEnable(true)
              : setButtonEnable(false)}
          </>
        )
      case LeadStatus.RefurbishmentApproved:
        return leadInput?.refurbishmentDetails?.requests?.[0]?.issue?.items
          ?.length > 0
          ? setButtonEnable(true)
          : setButtonEnable(false)

      case LeadStatus.VehicleInspected:
        const itemsInRequest =
          leadInput?.refurbishmentDetails?.requests?.[0]?.items
        if (!stockDetailQueryCalled) getStockData()
        return !!itemsInRequest && itemsInRequest?.length > 0
          ? itemsInRequest?.every(i => !!i?.product?.name) &&
            itemsInRequest?.every(i =>
              stockDetailData?.inventoryDetails?.items?.find(
                e =>
                  e?.product?.name?.toUpperCase() ===
                  titleCaseToReadable(i?.product?.name)?.toUpperCase(),
              )?.availableInStock > 0
                ? true
                : !!i?.price,
            ) &&
            itemsInRequest?.every(e => !!e?.refurbishmentProofUrl) &&
            itemsInRequest?.every(i =>
              i?.product?.name === 'Others' ? !!i?.product?.description : true,
            )
            ? setButtonEnable(true)
            : setButtonEnable(false)
          : setButtonEnable(false)
      case LeadStatus.InstallationConfirmedImagesUploaded:
        const filteredItems =
          leadInput?.refurbishmentDetails?.requests?.[0]?.items?.some(obj => {
            if (obj?.status === RefurbishmentStatus.Approved)
              return (
                !obj?.installationProofUrl || obj?.installationProofUrl === ''
              )
          })

        return filteredItems ? setButtonEnable(false) : setButtonEnable(true)

      case LeadStatus.InstallationBillsUploaded:
        return handleInstallationBillsUploadedButton()

      case LeadStatus.InstallationPaymentRequestRaised:
        return handleInstallationPaymentRequestRaisedButton()

      case LeadStatus.InstallationPaymentConfirmed:
        return handleInstallationPaymentConfirmedButton()
      case LeadStatus.ListingImagesUploaded:
        return leadVehicleImagesValidation()

      // -----------------  Booking Loan Forms validations -----------------
      case LeadStatus.BookingDetailsAdded:
        return handleCustomerDetailButton()
      case LeadStatus.BookingLoanFileLoggedIn:
        return handleBookingLoanFileLoggedInButton()
      case LeadStatus.BookingLoanFIAdded:
        return handleBookingLoanFIAddedButton()
      case LeadStatus.PaymentStructureAdded:
        return handleBookingVehicleButton()
      case LeadStatus.BookingTokenAmountAdded:
        return handleBookingPaymentButton(PaymentFor.BookingToken)
      case LeadStatus.BookingLoanFIPassed:
        return handleBookingLoanFIPassedButton()
      case LeadStatus.BookingPartPaymentAdded:
        return handleBookingPaymentButton(PaymentFor.BookingPart)
      case LeadStatus.BookingDeliveryAmountAdded:
        return handleBookingPaymentButton(PaymentFor.BookingDelivery)
      case LeadStatus.DeliveryPhotoUploaded:
        return leadInput?.activeBooking?.deliveryPhotoUrl
          ? setButtonEnable(true)
          : setButtonEnable(false)
      case LeadStatus.BookingLoanDOApproved:
        return handleDOApprovedButton()
      default:
        return setButtonEnable(true)
    }
  }

  function onPressBack() {
    log('this should take the form one step back to', {
      backStatus,
      leadId,
      regNo,
    })
    navigation.setParams({
      leadId,
      regNo,
      currentStatus:
        currentStatus === LeadStatus.LeadGenerated ? null : backStatus,
    })
    currentStatus === LeadStatus?.InstallationBillsUploaded
      ? rehydrateLeadRefurbishmentInput()
      : rehydrateLeadInput()
  }

  // Desired button function

  function onPressDesiredButton() {
    log('pressed desired button should take to status:', desiredStatus)
    if (buttonEnable) {
      const searchString = [
        leadInput?.regNo,
        titleCaseToReadable(leadInput?.vehicle?.make ?? ''),
        leadInput?.vehicle?.model,
        leadInput?.vehicle?.manufacturingDate,
      ].join(',')

      createLeadStatusEvent({
        refetchQueries: [
          {query: GetLeadDetailsDocument, variables: {regNo}},
          {query: AllLeadsDocument},
          {
            query: MyPendingTasksDocument,
            variables: {myId, role: loggedInUser?.role},
          },
          {
            query: NumberOfPendingTasksDocument,
            variables: {myId, role: loggedInUser?.role},
          },
        ],
        variables: {
          createdAt: new Date(),
          myId: myId as string,
          //TODO: Typecasting patch
          status: desiredStatus,
          //TODO: add remarks from reactive var
          remarks: remarks?.remarks?.trim(),
          metadata: getScopedEventMetadata(lseId) ?? null,
          lead:
            desiredStatus === LeadStatus.LeadGenerated
              ? {
                  ...leadInput,
                  regNo: leadInput?.regNo?.toUpperCase(),
                  vehicle: {
                    ...leadInput?.vehicle,
                    regNo: leadInput?.regNo?.toUpperCase(),
                  },
                  searchString,
                  id: leadId,
                  createdBy: {id: myId},
                  createdAt: new Date(),
                }
              : {
                  ...leadInput,
                  // Always pass lead Id except when generating a new lead
                  id: leadId,
                  regNo: regNo,
                  // createdBy: {id: myId},
                  updatedAt: new Date(),
                },
        },
        onError: error => {
          captureSentryException('error creating lead status event', error)
          ToastAndroid.showWithGravity(error.message, ToastAndroid.BOTTOM, 300)
        },
        update: (cache, {data}) => {
          // add this lead status event at the beginning
          if (data?.addLeadStatusEvent?.leadStatusEvent) {
            const newLSERef = cache.writeFragment({
              id: `LeadStatusEvent:${data?.addLeadStatusEvent?.leadStatusEvent[0].id}`,
              data: data?.addLeadStatusEvent?.leadStatusEvent[0],
              fragment: LeadStatusEventDetailsFragmentDoc,
              fragmentName: 'LeadStatusEventDetails',
            })
            cache.modify({
              id: `Lead:${data?.addLeadStatusEvent?.leadStatusEvent[0]?.lead?.id}`,
              fields: {
                statusEvents(existingRefs = []) {
                  return [...existingRefs, newLSERef]
                },
              },
            })
          }
        },
        onCompleted: ({addLeadStatusEvent}) => {
          log(
            'event fired metadata',
            addLeadStatusEvent?.leadStatusEvent?.[0]?.metadata,
          )
          // const requestMetadata = getScopedEventMetadata(
          //   addLeadStatusEvent?.leadStatusEvent[0]?.id ?? '',
          // )
          // const metaData = requestMetadata.split(':')?.[1]

          // setRequestId(metaData)

          if (
            addLeadStatusEvent?.leadStatusEvent?.[0].status ===
              LeadStatus.Archive ||
            addLeadStatusEvent?.leadStatusEvent?.[0]?.assignTaskTo ===
              loggedInUser?.role
          ) {
            if (
              Platform.OS === 'android' &&
              addLeadStatusEvent?.leadStatusEvent?.[0].status
            ) {
              const message =
                titleCaseToReadable(
                  addLeadStatusEvent.leadStatusEvent[0].status,
                ) + ' successfully'
              ToastAndroid.show(message, 3000)
            }
            if (navigation.canGoBack()) navigation.goBack()
          } else if (!!addLeadStatusEvent?.leadStatusEvent) {
            newLeadId.current = addLeadStatusEvent.leadStatusEvent[0].lead.id
            // log('new lead id', newLeadId.current)
            if (Platform.OS === 'android') {
              const message =
                titleCaseToReadable(
                  addLeadStatusEvent.leadStatusEvent[0].status,
                ) + ' successfully'
              ToastAndroid.show(message, 3000)
            }
            navigation.setParams({
              leadId: addLeadStatusEvent.leadStatusEvent[0].lead.id,
              regNo: addLeadStatusEvent.leadStatusEvent[0].lead.regNo,
              currentStatus: addLeadStatusEvent.leadStatusEvent[0].status,
            })
            // TODO : It's throwing bugs in some cases saying navigation can't handle it
            // navigation.navigate('LeadDetailsScreen', {
            //   leadId: addLeadStatusEvent.leadStatusEvent[0].lead.id,
            //   regNo: addLeadStatusEvent.leadStatusEvent[0].lead.regNo,
            //   currentStatus: addLeadStatusEvent.leadStatusEvent[0].status,
            // })
            // setLeadInput({id: addLeadStatusEvent.leadStatusEvent[0].lead.id})
            // setVisible(true);
            // console.log(
            //   `setParams => ${JSON.stringify(
            //     addLeadStatusEvent.leadStatusEvent[0],
            //   )}`,
            // )
          }
          setLeadInput({})
          setRemarks(null)
          if (!canGoForward) {
            const currentStatus = addLeadStatusEvent.leadStatusEvent[0].status
            const lse = addLeadStatusEvent.leadStatusEvent[0].id

            !!onGoBack && onGoBack(lse, currentStatus)
            requestAnimationFrame(() => {
              navigation.goBack()
              // navigation.navigate('ViewNotificationsDetails', {
              //   screen: 'LeadDetailsScreen',
              //   params: {
              //     leadId: addLeadStatusEvent.leadStatusEvent[0].lead.id,
              //     regNo: addLeadStatusEvent.leadStatusEvent[0].lead.regNo,
              //     currentStatus: addLeadStatusEvent.leadStatusEvent[0].status,
              //     lseId: addLeadStatusEvent.leadStatusEvent[0].id,
              //   },
              // })
              // navigation.navigate('Drawer', {
              //   screen: 'Leads',
              //   params: {
              //     screen: 'LeadDetailsScreen',
              //     params: {
              //       leadId: addLeadStatusEvent.leadStatusEvent[0].lead.id,
              //       regNo: addLeadStatusEvent.leadStatusEvent[0].lead.regNo,
              //       currentStatus: addLeadStatusEvent.leadStatusEvent[0].status,
              //       lseId: addLeadStatusEvent.leadStatusEvent[0].id,
              //     },
              //   },
              // })
            })
          } else {
            navigation.setParams({
              leadId: addLeadStatusEvent.leadStatusEvent[0].lead.id,
              regNo: addLeadStatusEvent.leadStatusEvent[0].lead.regNo,
              currentStatus: addLeadStatusEvent.leadStatusEvent[0].status,
              lseId: addLeadStatusEvent.leadStatusEvent[0].id,
            })
          }
        },
      })
    } else {
      log('validation not passed should take to respective validation field')
    }
  }

  function onPressUndesiredButton() {
    log('pressed undesired button. should take to status', {
      undesiredStatus,
      leadInput,
    })
    createLeadStatusEvent({
      refetchQueries: [
        // {query: GetLeadDetailsDocument},
        {query: AllLeadsDocument},
        {
          query: MyPendingTasksDocument,
          variables: {myId, role: loggedInUser?.role},
        },
        {
          query: NumberOfPendingTasksDocument,
          variables: {myId, role: loggedInUser?.role},
        },
      ],
      variables: {
        createdAt: new Date(),
        myId: myId as string,
        //TODO: Typecasting patch
        status: undesiredStatus,
        remarks: remarks?.remarks?.trim(),
        metadata: getScopedEventMetadata(lseId) ?? null,
        lead: {
          ...leadInput,
          // Always pass lead Id except when generating a new lead
          id: leadId,
          regNo: regNo,
          // createdBy: {id: myId},
          updatedAt: new Date(),
        },
      },
      onError: error => {
        captureSentryException('error creating lead status event', error)
        ToastAndroid.showWithGravity(error.message, ToastAndroid.BOTTOM, 300)
      },
      update: (cache, {data}) => {
        // add this lead status event at the beginning
        if (data?.addLeadStatusEvent?.leadStatusEvent) {
          const newLSERef = cache.writeFragment({
            id: `LeadStatusEvent:${data?.addLeadStatusEvent?.leadStatusEvent[0].id}`,
            data: data?.addLeadStatusEvent?.leadStatusEvent[0],
            fragment: LeadStatusEventDetailsFragmentDoc,
            fragmentName: 'LeadStatusEventDetails',
          })
          cache.modify({
            id: `Lead:${data?.addLeadStatusEvent?.leadStatusEvent[0]?.lead?.id}`,
            fields: {
              statusEvents(existingRefs = []) {
                return [...existingRefs, newLSERef]
              },
            },
          })
        }
      },
      onCompleted: ({addLeadStatusEvent}) => {
        // log('event fired', addLeadStatusEvent)
        // const requestMetadata = getScopedEventMetadata(
        //   addLeadStatusEvent?.leadStatusEvent[0]?.id ?? '',
        // )
        // const metaData = requestMetadata.split(':')?.[1]

        // setRequestId(metaData)

        if (
          addLeadStatusEvent?.leadStatusEvent?.[0].status ===
            LeadStatus.Archive ||
          addLeadStatusEvent?.leadStatusEvent?.[0]?.assignTaskTo ===
            loggedInUser?.role
        ) {
          const currentStatus = addLeadStatusEvent.leadStatusEvent[0].status
          const lse = addLeadStatusEvent.leadStatusEvent[0].id
          !!onGoBack && onGoBack(lse, currentStatus)

          requestAnimationFrame(() => {
            navigation.goBack()
            // navigation.navigate('ViewNotificationsDetails', {
            //   screen: 'LeadDetailsScreen',
            //   params: {
            //     leadId: addLeadStatusEvent.leadStatusEvent[0].lead.id,
            //     regNo: addLeadStatusEvent.leadStatusEvent[0].lead.regNo,
            //     currentStatus: addLeadStatusEvent.leadStatusEvent[0].status,
            //     lseId: addLeadStatusEvent.leadStatusEvent[0].id,
            //   },
            // })
            // navigation.navigate('Drawer', {
            //   screen: 'Leads',
            //   params: {
            //     screen: 'LeadDetailsScreen',
            //     params: {
            //       leadId: addLeadStatusEvent.leadStatusEvent[0].lead.id,
            //       regNo: addLeadStatusEvent.leadStatusEvent[0].lead.regNo,
            //       currentStatus: addLeadStatusEvent.leadStatusEvent[0].status,
            //       lseId: addLeadStatusEvent.leadStatusEvent[0].id,
            //     },
            //   },
            // })
          })
        } else if (!!addLeadStatusEvent?.leadStatusEvent) {
          newLeadId.current = addLeadStatusEvent.leadStatusEvent[0].lead.id
          // log('new lead id', newLeadId.current)

          rehydrateLeadInput()
          navigation.setParams({
            leadId: addLeadStatusEvent.leadStatusEvent[0].lead.id,
            regNo: addLeadStatusEvent.leadStatusEvent[0].lead.regNo,
            currentStatus: addLeadStatusEvent.leadStatusEvent[0].status,
            // lseId: addLeadStatusEvent.leadStatusEvent[0].id,
          })

          // TODO : It's throwing bugs in some cases saying navigation can't handle it
          // navigation.navigate('LeadDetailsScreen', {
          //   leadId: addLeadStatusEvent.leadStatusEvent[0].lead.id,
          //   regNo: addLeadStatusEvent.leadStatusEvent[0].lead.regNo,
          //   currentStatus: addLeadStatusEvent.leadStatusEvent[0].status,
          // })
          // setLeadInput({id: addLeadStatusEvent.leadStatusEvent[0].lead.id})
          // setVisible(true);
          console.log(
            `currentStatus => ${JSON.stringify(
              addLeadStatusEvent.leadStatusEvent[0],
            )}`,
          )
        }
        setLeadInput({})
        setRemarks(null)
        setPickerVisible(false)
        const currentStatus = addLeadStatusEvent.leadStatusEvent[0].status
        const lse = addLeadStatusEvent.leadStatusEvent[0].id
        !!onGoBack && onGoBack(lse, currentStatus)
        navigation.goBack()
        // navigation.navigate('Drawer', {
        //   screen: 'Leads',
        //   params: {
        //     screen: 'LeadDetailsScreen',
        //     params: {
        //       leadId: addLeadStatusEvent.leadStatusEvent[0].lead.id,
        //       regNo: addLeadStatusEvent.leadStatusEvent[0].lead.regNo,
        //       currentStatus: addLeadStatusEvent.leadStatusEvent[0].status,
        //       lseId: addLeadStatusEvent.leadStatusEvent[0].id,
        //     },
        //   },
        // })
      },
    })
    return
  }

  function renderRelevantForm() {
    // console.log(
    //   'This is the desired status in the render relevant form',
    //   desiredStatus,
    //   assignTo,
    // )

    // if (desiredStatus === LeadStatus.ReadyForSale) {
    //   return (
    //     <VehicleInStock
    //       leadId={leadId}
    //       source={source}
    //       registrationNo={regNo}
    //     />
    //   )
    // }
    if (
      assignTo !== loggedInUser?.role &&
      desiredStatus !== LeadStatus.LeadGenerated
    ) {
      return (
        <View style={commonStyle.fullFlexWithCenterView}>
          <H3>{`Task pending on ${titleCaseToReadable(
            assignTo ?? 'someone else',
          )}`}</H3>
        </View>
      )
    }

    switch (desiredStatus) {
      case LeadStatus.LeadGenerated:
        // log('logged in user role role', loggedInUser)
        return loggedInUser?.role === UserRole.ProcurementExecutive ? (
          <GenerateLead leadId={leadId} />
        ) : (
          <View style={commonStyle.fullFlexWithCenterView}>
            <H3>{`Task pending on ${titleCaseToReadable(
              assignTo ?? 'someone else',
            )}`}</H3>
          </View>
        )
      case LeadStatus.LeadUpdated:
        return <GenerateLead leadId={leadId} registrationNo={regNo} />
      case LeadStatus.VehicleDetailsUpdated:
        return <UpdateVehicleDetails leadId={leadId} source={source} />
      case LeadStatus.LeadVehicleImagesUploaded:
        return <UploadLeadVehicleImages leadId={leadId} regNo={regNo} />
      case LeadStatus.DealAmountConfirmed:
        return <DealershipConfirmDeal leadId={leadId} />
      case LeadStatus.DealAmountUpdated:
        return <DealershipUpdateConfirmDeal leadId={leadId} />
      case LeadStatus.VehicleDocumentsChecked:
        // log('should render vehicle check documents', {regNo})
        return <CheckVehicleDocuments leadId={leadId} />
      case LeadStatus.RtoVerificationCompleted:
        return <CompleteRTOVerification leadId={leadId} />
      // case LeadStatus.RtoConfirmed:
      //   return <ConfirmedRto leadId={leadId} />
      // Dealership related changes
      case LeadStatus.VehicleDocumentsConfirmed:
        return <ConfirmDocumentAvailability leadId={leadId} regNo={regNo} />
      case LeadStatus.HoldbackConfirmedByOm:
        return <HoldBackConfirmation leadId={leadId} regNo={regNo} />
      case LeadStatus.HoldbackConfirmedByPm:
        return <ApproveHoldBackAmount leadId={leadId} regNo={regNo} />
      case LeadStatus.HoldbackRejectedByPm:
        return
      case LeadStatus.HoldbackConfirmedByOh:
        return <ApproveHoldBackAmount leadId={leadId} regNo={regNo} />
      case LeadStatus.HoldbackRejectedByOh:
        return
      case LeadStatus.PurchaseRequestRaised:
        return (
          <RaisePurchaseOrderRequest leadId={leadId} registrationNo={regNo} />
        )
      case LeadStatus.PurchaseRequestApproved:
        return (
          <ApprovePurchaseOrderRequest leadId={leadId} registrationNo={regNo} />
        )
      case LeadStatus.PurchaseRequestRaised:
        return (
          <RaisePurchaseOrderRequest leadId={leadId} registrationNo={regNo} />
        )
      case LeadStatus.PurchaseRequestApproved:
        return (
          <ApprovePurchaseOrderRequest leadId={leadId} registrationNo={regNo} />
        )
      case LeadStatus.DealTokenPaymentRequested:
        return (
          <AddDealershipProcurementPayment
            leadId={leadId}
            payFor={PaymentFor.DealToken}
            regNo={regNo}
          />
        )
      case LeadStatus.DealDeliveryPaymentRequested:
        return (
          <AddDealershipProcurementPayment
            leadId={leadId}
            payFor={PaymentFor.DealDelivery}
            regNo={regNo}
          />
        )
      case LeadStatus.HoldbackRepaymentRequested:
        return (
          <AddDealershipProcurementPayment
            leadId={leadId}
            payFor={PaymentFor.HoldbackRepayment}
            regNo={regNo}
          />
        )
      case LeadStatus.LoanRepaymentRequested:
        return (
          <AddDealershipProcurementPayment
            leadId={leadId}
            payFor={PaymentFor.LoanRepayment}
            regNo={regNo}
          />
        )
      case LeadStatus.DealerPaymentRequested:
        return (
          <AddDealershipProcurementPayment
            leadId={leadId}
            payFor={PaymentFor.DealPayment}
            regNo={regNo}
          />
        )
      case LeadStatus.DealTokenPaymentConfirmed:
        return (
          <UploadPurchaseOrderPaymentReceipts
            leadId={leadId}
            paymentFor={PaymentFor.DealToken}
          />
        )
      case LeadStatus.DealDeliveryPaymentConfirmed:
        return (
          <UploadPurchaseOrderPaymentReceipts
            leadId={leadId}
            paymentFor={PaymentFor.DealDelivery}
          />
        )
      case LeadStatus.HoldbackRepaymentConfirmed:
        return (
          <UploadPurchaseOrderPaymentReceipts
            leadId={leadId}
            paymentFor={PaymentFor.HoldbackRepayment}
          />
        )
      case LeadStatus.LoanRepaymentConfirmed:
        return (
          <UploadPurchaseOrderPaymentReceipts
            leadId={leadId}
            paymentFor={PaymentFor.LoanRepayment}
          />
        )
      case LeadStatus.DealerPaymentConfirmed:
        return (
          <UploadPurchaseOrderPaymentReceipts
            leadId={leadId}
            paymentFor={PaymentFor.DealPayment}
          />
        )
      case LeadStatus.PurchaseRequestRejected:
        return
      case LeadStatus.RtoVerificationRejected:
        return <StepAction leadId={leadId} />
      // return view for RTO Verification rejected
      case LeadStatus.BidAmountLimitProposed:
        return <ProposeBidAmountLimit leadId={leadId} />
      case LeadStatus.BidWon:
        return <BidWonOrLost leadId={leadId} />
      case LeadStatus.BidLost:
        return <StepAction leadId={leadId} />
      case LeadStatus.DealApproved:
        return <ApproveDeal leadId={leadId} />
      case LeadStatus.DealRejected:
      // return view to archive?
      case LeadStatus.PaymentRequestSent:
        return <RequestDealPayment leadId={leadId} />
      case LeadStatus.PaymentConfirmed:
        return <ConfirmDealPayment leadId={leadId} />
      case LeadStatus.PaymentRequestRejected:
        // when the finance team is to reject the payment
        return <StepAction leadId={leadId} />
      case LeadStatus.PickupYardDetailsAdded:
        return <AddPickupYardDetails leadId={leadId} regNo={regNo} />
      case LeadStatus.PickupAssignmentDetailsAdded:
        return <AddPickupAssignmentDetails leadId={leadId} regNo={regNo} />
      case LeadStatus.PickupParkingPaymentDetailsEstimationAdded:
        return (
          <AddPickupParkingPaymentDetailsEstimation
            leadId={leadId}
            regNo={regNo}
          />
        )
      case LeadStatus.PickupRequested:
        return <RequestPickup leadId={leadId} regNo={regNo} />
      case LeadStatus.PickupAccepted:
        return <AcceptPickup leadId={leadId} regNo={regNo} />
      case LeadStatus.PickupRejected:
        return <StepAction leadId={leadId} />
      case LeadStatus.PickupInitiated:
        return <AcceptPickup leadId={leadId} regNo={regNo} />
      case LeadStatus.PickupDocumentsUploaded:
        return <UploadPickupDocuments leadId={leadId} regNo={regNo} />
      case LeadStatus.PickupVehicleImagesUploaded:
        return <UploadPickupVehicleImages leadId={leadId} regNo={regNo} />
      case LeadStatus.PickupParkingPaymentFinalDetailsAdded:
        return (
          <AddPickupParkingPaymentFinalDetails leadId={leadId} regNo={regNo} />
        )
      case LeadStatus.PickupParkingPaymentApproved:
        return <ApproveParkingPayment leadId={leadId} regNo={regNo} />
      case LeadStatus.PickupParkingPaymentReceiptsUploaded:
        return <UploadPickupParkingPaymentReceipts leadId={leadId} />
      case LeadStatus.DeliveryStarted:
        return <TripMap locations={locationsData} regNo={regNo} />
      case LeadStatus.DeliveryCompleted:
        return <TripMap locations={locationsData} regNo={regNo} />
      case LeadStatus.DeliveryVehicleImagesUploaded:
        return <UploadDeliveryVehicleImages leadId={leadId} regNo={regNo} />
      case LeadStatus.DeliverySelfieUploaded:
        return <UploadDeliverySelfie leadId={leadId} />
      case LeadStatus.DeliveryExpensesUploaded:
        return (
          <UploadDeliveryExpenses leadId={leadId} expenseCount={expenseCount} />
        )
      case LeadStatus.DeliveryExpensesApproved:
        return <ApproveDeliveryExpense leadId={leadId} />
      case LeadStatus.DeliveryExpensesPaymentReceiptsUploaded:
        return <UploadDeliveryExpensesPaymentReceipts leadId={leadId} />
      case LeadStatus.VehicleInStock:
        return (
          <VehicleInStock
            leadId={leadId}
            source={source}
            registrationNo={regNo}
          />
        )

      case LeadStatus.InstallationConfirmedImagesUploaded:
        return (
          <UploadInstallationConfirmImages
            leadId={leadId}
            registrationNo={regNo}
            requestId={requestId}
          />
        )

      case LeadStatus.VehicleInspected:
        return <InspectVehicle leadId={leadId} regNo={regNo} />
      case LeadStatus.ReadyForSale:
        return (
          <MakeReadyForSale
            leadId={leadId}
            regNo={regNo}
            requestId={requestId}
          />
        )
      case LeadStatus.ListingImagesUploaded:
        return <UploadListingImages leadId={leadId} regNo={regNo} />
      case LeadStatus.ListingPriceUpdated:
        return <AddListingPrice leadId={leadId} regNo={regNo} />
      case LeadStatus.RefurbishmentApproved:
        return (
          <PaymentApproval
            leadId={leadId}
            regNo={regNo}
            requestId={requestId}
          />
        )
      case LeadStatus.InstallationBillsUploaded:
        return (
          <RaiseInstallationPayments
            leadId={leadId}
            regNo={regNo}
            requestId={requestId}
          />
        )
      case LeadStatus.InstallationPaymentRequestRaised:
        return (
          <PaymentDetails leadId={leadId} regNo={regNo} requestId={requestId} />
        )
      case LeadStatus.InstallationPaymentConfirmed:
        return (
          <UploadPayment leadId={leadId} regNo={regNo} requestId={requestId} />
        )
      case LeadStatus.BookingLoanDOApproved:
        return (
          <ApproveDeliveryOrder
            leadId={leadId}
            registrationNo={regNo}
            fiDate={
              leadDetailsData?.getLead?.activeBooking?.activeLoan
                ?.fieldInspectionConfirmedDate
            }
          />
        )

      // ---- Booking Forms ----
      case LeadStatus.BookingLoanFileLoggedIn:
        return <ConfirmLogin leadId={leadId} regNo={regNo} />
      case LeadStatus.BookingLoanFIAdded:
        return (
          <UpdateFI
            leadId={leadId}
            regNo={regNo}
            loginDate={
              leadDetailsData?.getLead?.activeBooking?.activeLoan?.loginDate
            }
          />
        )
      case LeadStatus.BookingLoanFIPassed:
        return (
          <ConfirmFI
            leadId={leadId}
            regNo={regNo}
            loginDate={
              leadDetailsData?.getLead?.activeBooking?.activeLoan?.loginDate
            }
          />
        )
      case LeadStatus.BookingDetailsAdded:
        return <AddCustomerDetail leadId={leadId} />
      case LeadStatus.PaymentStructureAdded:
        return <BookVehicle leadId={leadId} regNo={regNo} />
      case LeadStatus.BookingTokenAmountAdded:
        return (
          <UploadBookingPayment
            leadId={leadId}
            registrationNo={regNo}
            paymentFor={PaymentFor.BookingToken}
          />
        )
      case LeadStatus.BookingPartPaymentAdded:
        return (
          <UploadBookingPayment
            leadId={leadId}
            registrationNo={regNo}
            paymentFor={PaymentFor.BookingPart}
          />
        )
      case LeadStatus.BookingDeliveryAmountAdded:
        return (
          <UploadBookingPayment
            leadId={leadId}
            registrationNo={regNo}
            paymentFor={PaymentFor.BookingDelivery}
          />
        )
      case LeadStatus.BookingTokenPaymentReviewApproved:
        return (
          <ReviewBookingPayment
            leadId={leadId}
            registrationNo={regNo}
            paymentFor={PaymentFor.BookingToken}
          />
        )

      case LeadStatus.BookingDeliveryPaymentReviewApproved:
        return (
          <ReviewBookingPayment
            leadId={leadId}
            registrationNo={regNo}
            paymentFor={PaymentFor.BookingDelivery}
          />
        )
      case LeadStatus.BookingPartPaymentReviewApproved:
        return (
          <ReviewBookingPayment
            leadId={leadId}
            registrationNo={regNo}
            paymentFor={PaymentFor.BookingPart}
            paymentId={requestId} //replace with payment id from metadata
          />
        )
      case LeadStatus.BookingDeliveryRequested:
        return <RequestOrApproveBookingDelivery leadId={leadId} regNo={regNo} />
      // return <ReviewBookingPayment leadId={leadId} registrationNo={regNo} />
      case LeadStatus.BookingTotalPaymentReviewApproved:
        return <RequestOrApproveBookingDelivery leadId={leadId} regNo={regNo} />
      // return <ReviewBookingPayment leadId={leadId} registrationNo={regNo} />
      case LeadStatus.BookingLoanPaymentReviewed:
        return (
          <ReviewBookingPayment
            leadId={leadId}
            registrationNo={regNo}
            paymentFor={PaymentFor.BookingLoan}
          />
        )
      case LeadStatus.DeliveryPhotoUploaded:
        return <UploadDeliveryPhoto leadId={leadId} registrationNo={regNo} />
      default:
        return <StepAction leadId={leadId} />
    }
  }

  function openPicker() {
    setPickerVisible(true)
  }

  function closePicker() {
    setIsRequired(false)
    setPickerVisible(false)
  }

  type actionType = 'positive' | 'negative'

  function showConfirmationPopup(type: actionType) {
    setBtnActionType(type)
    setIsPopupVisible(true)
  }

  function hideConfirmationPopup() {
    setIsPopupVisible(false)
  }

  function renderBottomButtonRow() {
    return (
      <Row style={commonStyle.buttonView}>
        {!!backStatus && (
          <Button
            variant={'back_action'}
            title={'Back'} // Button text approved by ketan sir
            type={'enable'}
            onPress={() => {
              //navigation.goBack();
              // onPressButton(false)
              // onPressUndesiredButton()
              // log('this should take back to previous status', backStatus)
              onPressBack()
            }}
          />
        )}
        {!!undesiredButtonText && undesiredStatus && !hideUndesiredButton && (
          <>
            <Button
              variant={'danger'}
              disabled={!buttonEnable && desiredStatus === LeadStatus.BidWon}
              title={undesiredButtonText}
              type={buttonEnable ? 'enable' : 'disable'}
              onPress={() => {
                showConfirmationPopup('negative')
              }}
            />
            {/* <Portal>
              <Modal
                visible={pickerVisible}
                onDismiss={closePicker}
                dismissable={true}
                contentContainerStyle={styles.rejectModal}>
                <P1 style={styles.rejectHeading}>Remarks for rejection</P1>
                <Input
                  label="Enter Remarks"
                  isRequired={isRequired}
                  multiline
                  // value={remarks?.remarks ?? ''}
                  onChangeText={onRemarksChange}
                />
                <Row>
                  <Button
                    variant={'danger'}
                    title={'No'}
                    type={'enable'}
                    onPress={() => {
                      closePicker()
                      setRemarks(null)
                    }}
                  />
                  <Button
                    variant={'action'}
                    title={'Yes'}
                    //TODO: Add loading to this button
                    type={undesiredStatus ? 'enable' : 'disable'}
                    onPress={() => {
                      setIsRequired(true)
                      if (remarks?.remarks) {
                        onPressUndesiredButton()
                      }
                    }}
                  />
                </Row>
              </Modal>
            </Portal> */}
          </>
        )}
        {/* TODO: Add Request Payment as a desired text */}
        <Button
          variant={buttonEnable ? getDesiredbuttonVariant() : 'action'}
          title={desiredButtonText}
          loading={addingEvent}
          type={buttonEnable ? 'enable' : 'disable'}
          onPress={() => {
            if (buttonEnable && hasPopup) {
              showConfirmationPopup('positive')
            } else {
              log('logging popup status', hasPopup)
              buttonEnable && onPressDesiredButton()
            }
          }}
        />
        {isPopupVisible && hasPopup && (
          <ConfirmationModal
            hidePopup={hideConfirmationPopup}
            type={btnActionType === 'negative' ? 'negative' : 'positive'}
            isVisble={isPopupVisible}
            desiredStatus={desiredStatus}
            undesiredStatus={undesiredStatus}
            title={
              btnActionType === 'negative'
                ? negativePopupTitle
                : positivePopupTitle
            }
            description={
              btnActionType === 'negative'
                ? negativePopupDescription
                : positivePopupDescription
            }
            isRejectionWithRemarks={
              btnActionType === 'negative' && isPopupWithRemark
            }
            isActionloading={addingEvent}
            isPopupWithFields={isPopupWithFields}
            onPositiveConfirmation={onPressDesiredButton}
            onNegativeConfirmation={onPressUndesiredButton}
            regNo={regNo}
            leadId={leadId ?? 'new'}
            refurbishmentRequestId={requestId}
            paymentId={requestId}
          />
        )}
      </Row>
    )
  }

  return loading ? (
    <View style={commonStyle.centeredAlignItem}>
      <ActivityIndicator />
    </View>
  ) : (
    <View style={styles.container}>
      {/* Commenting the code as per the new requirement */}
      {/* <LeadStatusBar
        currentStatus={currentStatus}
        desiredStatus={desiredStatus}
        preTimeline={preTimeline}
        postTimeline={postTimeline}
      /> */}
      {renderRelevantForm()}
      {(assignTo === loggedInUser?.role ||
        (!assignTo &&
          loggedInUser?.role === UserRole.ProcurementExecutive &&
          desiredStatus === LeadStatus.LeadGenerated)) && (
        <View style={styles.btnDesireContainer}>{renderBottomButtonRow()}</View>
      )}
    </View>
  )
}

export default Form

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: Colors.light.background,
  },
  contentContainerStyle: {
    alignItems: 'center',
    margin: Layout.baseSize * 0.5,
    maxHeight: Layout.baseSize * 3,
  },
  scrollViewStyle: {maxHeight: Layout.baseSize * 3},
  rejectHeading: {
    alignSelf: 'center',
    // backgroundColor: 'pink',
  },
  rejectModal: {
    backgroundColor: Colors.light.background,
    // height: Layout.window.height * 0.6,
    marginHorizontal: Layout.baseSize * 0.5,
    padding: Layout.baseSize,
    borderRadius: Layout.baseSize,
  },
  btnDesireContainer: {
    borderTopWidth: 1,
    borderTopColor: Colors.light.inputBg,
  },
})

/* function onPressButton(isDesiredStatus: boolean) {
    const searchString = [
      leadInput?.regNo,
      titleCaseToReadable(leadInput?.vehicle?.make ?? ''),
      leadInput?.vehicle?.model,
      leadInput?.vehicle?.manufacturingDate,
    ].join(',')
    // log(`search string for desired status:${desiredStatus}`, searchString)

    if (backStatus && !isDesiredStatus) {
      createLeadStatusEvent({
        variables: {
          createdAt: new Date(),
          myId: myId as string,
          //TODO: Typecasting patch
          status: backStatus as LeadStatus,
          //TODO: add remarks from reactive var
          remarks: remarks?.remarks,
          lead: {
            ...leadInput,
            // Always pass lead Id except when generating a new lead
            id: leadId,
            regNo: regNo,
            // createdBy: {id: myId},
            updatedAt: new Date(),
          },
        },
        onError: error => {
          log('error creating lead status event back action', error)
        },
        update: (cache, {data}) => {
          // add this lead status event at the beginning
          if (data?.addLeadStatusEvent?.leadStatusEvent) {
            const newLSERef = cache.writeFragment({
              id: `LeadStatusEvent:${data?.addLeadStatusEvent?.leadStatusEvent[0].id}`,
              data: data?.addLeadStatusEvent?.leadStatusEvent[0],
              fragment: LeadStatusEventDetailsFragmentDoc,
              fragmentName: 'LeadStatusEventDetails',
            })
            cache.modify({
              id: `Lead:${data?.addLeadStatusEvent?.leadStatusEvent[0]?.lead?.id}`,
              fields: {
                statusEvents(existingRefs = []) {
                  return [newLSERef, ...existingRefs]
                },
              },
            })
          }
        },
        onCompleted: ({addLeadStatusEvent}) => {
          // log('event fired', addLeadStatusEvent)
          if (
            addLeadStatusEvent?.leadStatusEvent?.[0].status ===
              LeadStatus.Archive ||
            addLeadStatusEvent?.leadStatusEvent?.[0]?.assignTaskTo ===
              loggedInUser?.role
          ) {
            if (navigation.canGoBack()) navigation.goBack()
          } else if (!!addLeadStatusEvent?.leadStatusEvent) {
            newLeadId.current = addLeadStatusEvent.leadStatusEvent[0].lead.id
            // log('new lead id', newLeadId.current)

            rehydrateLeadInput()
            navigation.setParams({
              leadId: addLeadStatusEvent.leadStatusEvent[0].lead.id,
              regNo: addLeadStatusEvent.leadStatusEvent[0].lead.regNo,
              currentStatus: addLeadStatusEvent.leadStatusEvent[0].status,
            })

            // TODO : It's throwing bugs in some cases saying navigation can't handle it
            // navigation.navigate('LeadDetailsScreen', {
            //   leadId: addLeadStatusEvent.leadStatusEvent[0].lead.id,
            //   regNo: addLeadStatusEvent.leadStatusEvent[0].lead.regNo,
            //   currentStatus: addLeadStatusEvent.leadStatusEvent[0].status,
            // })
            // setLeadInput({id: addLeadStatusEvent.leadStatusEvent[0].lead.id})
            // setVisible(true);
            console.log(
              `currentStatus => ${JSON.stringify(
                addLeadStatusEvent.leadStatusEvent[0],
              )}`,
            )
          }
          setLeadInput({})
        },
      })
      return
    }

    if ((isDesiredStatus && buttonEnable) || !isDesiredStatus) {
      createLeadStatusEvent({
        variables: {
          createdAt: new Date(),
          myId: myId as string,
          //TODO: Typecasting patch
          status: isDesiredStatus
            ? desiredStatus
            : (undesiredStatus as LeadStatus),
          //TODO: add remarks from reactive var
          remarks: remarks?.remarks,
          lead:
            desiredStatus === LeadStatus.LeadGenerated
              ? {
                  ...leadInput,
                  searchString,
                  id: leadId,
                  createdBy: {id: myId},
                  createdAt: new Date(),
                }
              : {
                  ...leadInput,
                  // Always pass lead Id except when generating a new lead
                  id: leadId,
                  regNo: regNo,
                  // createdBy: {id: myId},
                  updatedAt: new Date(),
                },
        },
        onError: error => {
          log('error creating lead status event', error)
        },
        update: (cache, {data}) => {
          // add this lead status event at the beginning
          if (data?.addLeadStatusEvent?.leadStatusEvent) {
            const newLSERef = cache.writeFragment({
              id: `LeadStatusEvent:${data?.addLeadStatusEvent?.leadStatusEvent[0].id}`,
              data: data?.addLeadStatusEvent?.leadStatusEvent[0],
              fragment: LeadStatusEventDetailsFragmentDoc,
              fragmentName: 'LeadStatusEventDetails',
            })
            cache.modify({
              id: `Lead:${data?.addLeadStatusEvent?.leadStatusEvent[0]?.lead?.id}`,
              fields: {
                statusEvents(existingRefs = []) {
                  return [newLSERef, ...existingRefs]
                },
              },
            })
          }
        },
        onCompleted: ({addLeadStatusEvent}) => {
          // log('event fired', addLeadStatusEvent)
          if (
            addLeadStatusEvent?.leadStatusEvent?.[0].status ===
              LeadStatus.Archive ||
            addLeadStatusEvent?.leadStatusEvent?.[0]?.assignTaskTo ===
              loggedInUser?.role
          ) {
            if (
              Platform.OS === 'android' &&
              addLeadStatusEvent?.leadStatusEvent?.[0].status
            ) {
              const message =
                titleCaseToReadable(
                  addLeadStatusEvent.leadStatusEvent[0].status,
                ) + ' successfully'
              ToastAndroid.show(message, 3000)
            }
            if (navigation.canGoBack()) navigation.goBack()
          } else if (!!addLeadStatusEvent?.leadStatusEvent) {
            newLeadId.current = addLeadStatusEvent.leadStatusEvent[0].lead.id
            // log('new lead id', newLeadId.current)
            if (Platform.OS === 'android') {
              const message =
                titleCaseToReadable(
                  addLeadStatusEvent.leadStatusEvent[0].status,
                ) + ' successfully'
              ToastAndroid.show(message, 3000)
            }
            navigation.setParams({
              leadId: addLeadStatusEvent.leadStatusEvent[0].lead.id,
              regNo: addLeadStatusEvent.leadStatusEvent[0].lead.regNo,
              currentStatus: addLeadStatusEvent.leadStatusEvent[0].status,
            })
            // TODO : It's throwing bugs in some cases saying navigation can't handle it
            // navigation.navigate('LeadDetailsScreen', {
            //   leadId: addLeadStatusEvent.leadStatusEvent[0].lead.id,
            //   regNo: addLeadStatusEvent.leadStatusEvent[0].lead.regNo,
            //   currentStatus: addLeadStatusEvent.leadStatusEvent[0].status,
            // })
            // setLeadInput({id: addLeadStatusEvent.leadStatusEvent[0].lead.id})
            // setVisible(true);
            console.log(
              `currentStatus => ${JSON.stringify(
                addLeadStatusEvent.leadStatusEvent[0],
              )}`,
            )
          }
          setLeadInput({})
        },
      })
    }
  } */
