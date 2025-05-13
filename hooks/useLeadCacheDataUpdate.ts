import {
  useGetLeadDetailsLazyQuery,
  useGetVehicleRefurbishmentDetailsLazyQuery,
} from '../generated/hooks_and_more'
import {stripFields} from '../utils/helpers'
import useUpdateLeadInput from './useUpdateLeadInput'

export default function useLeadCacheDataUpdate({
  leadId,
  regNo,
}: {
  leadId: string
  regNo: string
}) {
  const {setLeadInput} = useUpdateLeadInput(leadId)

  const [rehydrateLeadData] = useGetLeadDetailsLazyQuery({
    variables: {
      regNo,
    },
    fetchPolicy: 'network-only', //Ketan is watching
    onCompleted: ({getLead}) => {
      const cleanedLead = stripFields(getLead, ['__typename', 'id'])
      setLeadInput(cleanedLead)
    },
  })
  return rehydrateLeadData
}

// FIXME: We decided to make a new hook to not disturb the existing flow, adding a kinda patch

export function useRefurbishmentReqCacheData({
  leadId,
  regNo,
  requestId,
}: {
  leadId: string
  regNo: string
  requestId: string
}) {
  const {setLeadInput} = useUpdateLeadInput(leadId)

  const [rehydrateLeadRefurbishmentData] =
    useGetVehicleRefurbishmentDetailsLazyQuery({
      variables: {
        regNo,
        requestId,
      },
      fetchPolicy: 'network-only', //Ketan is watching
      onCompleted: ({getLead}) => {
        const cleanedLead = stripFields(getLead, ['__typename'])
        setLeadInput(cleanedLead)
      },
    })
  return rehydrateLeadRefurbishmentData
}
