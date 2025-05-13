/*commonLeadStatus(){

}*/

import {LeadSource, LeadStatus} from '../../../generated/hooks_and_more'
import DealershipConfirmDeal from '../DealershipConfirmDeal'
import UpdateVehicleDetailsDealerShip from './UpdateVehicleDetailDealerShip'

export function DealershipLeadStatus(desiredStatus: string, leadId: string) {
  function dealerShipFlow() {
    switch (desiredStatus) {
      case LeadStatus.VehicleDetailsUpdated:
        return <UpdateVehicleDetailsDealerShip leadId={leadId} />
      // case LeadStatus.DealAmountConfirmed:
      //   return <DealershipConfirmDeal leadId={leadId} />
    }
  }

  return dealerShipFlow()
}
