import {LeadSource, LeadStatus} from '../generated/hooks_and_more'
import {FieldId} from './FieldValidator'
import {log} from './helpers'

type FormProps = {
  source: LeadSource
  status: LeadStatus
}

type validateFormFieldProps = {
  fields: Partial<FieldId>[]
}

function formFields({fields}: validateFormFieldProps) {
  for (const fieldId in fields) {
    log('logging the fields for specific forms', fieldId)
    return
  }
}
export function areFormValuesValid({source, status}: FormProps) {
  switch (status) {
    case LeadStatus.LeadGenerated:
      // log('logged in user role role', loggedInUser)
      return
    case LeadStatus.LeadUpdated:
      return
    case LeadStatus.VehicleDetailsUpdated:
      return
    case LeadStatus.LeadVehicleImagesUploaded:
      return
    case LeadStatus.DealAmountConfirmed:
      return
    case LeadStatus.DealAmountUpdated:
      return
    case LeadStatus.VehicleDocumentsChecked:
      return
    case LeadStatus.RtoVerificationCompleted:
      return
    case LeadStatus.RtoConfirmed:
      return
    case LeadStatus.RtoVerificationRejected:
      return
    // return view for RTO Verification rejected
    case LeadStatus.BidAmountLimitProposed:
      return
    case LeadStatus.BidWon:
      return
    case LeadStatus.BidLost:
      return
    case LeadStatus.DealApproved:
      return
    case LeadStatus.DealRejected:
    // return view to archive?
    case LeadStatus.PaymentRequestSent:
      return
    case LeadStatus.PaymentConfirmed:
      return
    case LeadStatus.PaymentRequestRejected:
      // when the finance team is to reject the payment
      return
    case LeadStatus.PickupYardDetailsAdded:
      return
    case LeadStatus.PickupAssignmentDetailsAdded:
      return
    case LeadStatus.PickupParkingPaymentDetailsEstimationAdded:
      return
    case LeadStatus.PickupRequested:
      return
    case LeadStatus.PickupAccepted:
      return
    case LeadStatus.PickupRejected:
      return
    case LeadStatus.PickupInitiated:
      return
    case LeadStatus.PickupDocumentsUploaded:
      return
    case LeadStatus.PickupVehicleImagesUploaded:
      return
    case LeadStatus.PickupParkingPaymentFinalDetailsAdded:
      return
    case LeadStatus.PickupParkingPaymentApproved:
      return
    case LeadStatus.PickupParkingPaymentReceiptsUploaded:
      return
    case LeadStatus.DeliveryStarted:
      return
    case LeadStatus.DeliveryCompleted:
      return
    case LeadStatus.DeliveryVehicleImagesUploaded:
      return
    case LeadStatus.DeliverySelfieUploaded:
      return
    case LeadStatus.DeliveryExpensesUploaded:
      return
    case LeadStatus.DeliveryExpensesApproved:
      return
    case LeadStatus.DeliveryExpensesPaymentReceiptsUploaded:
      return
    case LeadStatus.VehicleInStock:
      return
    default:
      return
  }
}
