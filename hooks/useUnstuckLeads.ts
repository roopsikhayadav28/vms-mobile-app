import {useEffect} from 'react'
import {
  LeadSource,
  useLeadStatusFlowQuery,
  UserRole,
  useStuckLeadsQuery,
  useUnstuckLeadMutation,
} from '../generated/hooks_and_more'
import {log} from '../utils/helpers'

export default function useUnstuckLeads() {
  const {data: stuckLeadsData} = useStuckLeadsQuery({
    fetchPolicy: 'network-only',
  })
  const [unstuckLead] = useUnstuckLeadMutation({
    onCompleted: ({updateLeadStatusEvent}) => {
      log('unstuck lead', updateLeadStatusEvent)
    },
  })
  const {data: leadStatusFlowDataForBankAuction} = useLeadStatusFlowQuery({
    variables: {source: LeadSource.BankAuction},
    fetchPolicy: 'network-only',
  })
  const {data: leadStatusFlowDataForDealership} = useLeadStatusFlowQuery({
    variables: {source: LeadSource.DealershipSale},
    fetchPolicy: 'network-only',
  })
  useEffect(() => {
    if (
      stuckLeadsData?.queryLeadStatusEvent?.length > 0 &&
      leadStatusFlowDataForBankAuction?.queryLeadStatusFlow?.length > 0 &&
      leadStatusFlowDataForDealership?.queryLeadStatusFlow?.length > 0
    ) {
      for (const stuckLead of stuckLeadsData.queryLeadStatusEvent) {
        if (stuckLead?.lead?.source === LeadSource.BankAuction) {
          unstuckLead({
            variables: {
              lseId: stuckLead?.id,
              assignTaskTo:
                leadStatusFlowDataForBankAuction?.queryLeadStatusFlow?.find(
                  i => i.current === stuckLead.status,
                )?.assignTaskTo as UserRole,
              notifyTo:
                leadStatusFlowDataForBankAuction?.queryLeadStatusFlow?.find(
                  i => i.current === stuckLead.status,
                )?.notifyTo as UserRole[],
              taskTitle:
                leadStatusFlowDataForBankAuction?.queryLeadStatusFlow?.find(
                  i => i.current === stuckLead.status,
                )?.taskTitle,
              taskButtonTitle:
                leadStatusFlowDataForBankAuction?.queryLeadStatusFlow?.find(
                  i => i.current === stuckLead.status,
                )?.taskButtonTitle,
            },
          })
        }
        if (stuckLead?.lead?.source === LeadSource.DealershipSale) {
          unstuckLead({
            variables: {
              lseId: stuckLead?.id,
              assignTaskTo:
                leadStatusFlowDataForDealership?.queryLeadStatusFlow?.find(
                  i => i.current === stuckLead.status,
                )?.assignTaskTo as UserRole,
              notifyTo:
                leadStatusFlowDataForDealership?.queryLeadStatusFlow?.find(
                  i => i.current === stuckLead.status,
                )?.notifyTo as UserRole[],
              taskTitle:
                leadStatusFlowDataForDealership?.queryLeadStatusFlow?.find(
                  i => i.current === stuckLead.status,
                )?.taskTitle,
              taskButtonTitle:
                leadStatusFlowDataForDealership?.queryLeadStatusFlow?.find(
                  i => i.current === stuckLead.status,
                )?.taskButtonTitle,
            },
          })
        }
      }
    }
  }, [
    leadStatusFlowDataForBankAuction?.queryLeadStatusFlow,
    leadStatusFlowDataForDealership?.queryLeadStatusFlow,
    stuckLeadsData?.queryLeadStatusEvent,
  ])
}
