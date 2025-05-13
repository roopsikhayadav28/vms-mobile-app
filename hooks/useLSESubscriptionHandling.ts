import {
  LeadStatusEventWithVehicleInfoFragmentDoc,
  useUpdatesOnLeadsSubscription
} from '../generated/hooks_and_more'
import useLoggedInUser from './useLoggedInUser'
import useUserToken from './useUserToken'

const afterTime = new Date()
export default function useLSESubscriptionHandling() {
  const {userToken} = useUserToken()
  const {loggedInUser} = useLoggedInUser(userToken)
  const {loading, data: newLeadEventsData} = useUpdatesOnLeadsSubscription({
    skip: !loggedInUser || !loggedInUser?.role,
    variables: {
      afterTime,
      myRole: loggedInUser?.role,
    },
    onData: ({client, data}) => {
      // check in the respective lead if the status event exists
      // check in the queryLeadStatusEvent and add it if doesn't exist
      // log('data from subscription', data?.data)
      for (const lse of data?.data?.queryLeadStatusEvent) {
        client.cache.modify({
          fields: {
            queryLeadStatusEvent(existingRefs = [], {readField}) {
              if (!existingRefs.some(ref => readField('id', ref) === lse?.id)) {
                const newLSERef = client.writeFragment({
                  id: `LeadStatusEvent:${lse.id}`,
                  data: lse,
                  fragment: LeadStatusEventWithVehicleInfoFragmentDoc,
                  fragmentName: 'LeadStatusEventWithVehicleInfo',
                })
                return [newLSERef, ...existingRefs]
              } else {
                existingRefs
              }
            },
          },
        })
      }
    },
  })
}
