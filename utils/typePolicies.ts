import {offsetLimitPagination} from '@apollo/client/utilities'
import {TypedTypePolicies} from '../generated/hooks_and_more'

// TODO :correct merge logic  for statusEvents
const typePolicies: TypedTypePolicies = {
  Lead: {
    merge: true,
    fields: {
      statusEvents: {
        keyArgs: ['first', 'filter'],
        merge(existing = [], incoming = [], {readField}) {
          const merged = existing.slice()
          if (incoming.length > 0) {
            for (const ir of incoming) {
              if (
                !merged.some(mr => readField('id', mr) === readField('id', ir))
              ) {
                merged.push(ir)
              }
            }
          }
          return merged
        },
      },
    },
  },
  LeadStatusEvent: {
    merge: true,
  },
  Vehicle: {
    merge: true,
    fields: {
      images: {
        merge(existing = [], incoming = [], {readField}) {
          const merged = existing.slice()
          if (incoming.length > 0) {
            for (const ir of incoming) {
              if (
                !merged.some(mr => readField('id', mr) === readField('id', ir))
              ) {
                merged.push(ir)
              }
            }
          }
          return merged
        },
      },
    },
  },
  VehicleImages: {
    merge: true,
  },
  User: {
    merge: true,
  },
  Query: {
    fields: {
      queryMessage: offsetLimitPagination(),
      queryLeadStatusEvent: offsetLimitPagination(),
      queryLead: {
        keyArgs: ['filter'],
        merge: offsetLimitPagination().merge,
        read: offsetLimitPagination().read,
      },
      myPendingTasks: offsetLimitPagination(),
    },
  },
  Subscription: {
    fields: {
      queryLeadStatusEvent: {
        merge(existing = [], incoming = [], {readField}) {
          const merged = existing.slice()
          if (incoming.length > 0) {
            for (const ir of incoming) {
              if (
                !merged.some(mr => readField('id', mr) === readField('id', ir))
              ) {
                merged.push(ir)
              }
            }
          }
          return merged
        },
      },
    },
  },
  /* Query: {
    fields: {
      queryLeadStatusEvent: {
        merge(existing = [], incoming, {readField}) {
          // if incoming already exists in existing
          if (existing?.length <= 0) return incoming
          if (incoming?.length <= 0) return existing
          for (const ir of incoming) {
            if (
              existing?.some(e => readField('id', e) === readField('id', ir))
            ) {
              return existing
            } else {
              return [ir, ...existing]
            }
          }
        },
      },
    },
  },
  Lead: {
    fields: {
      statusEvents: {
        merge(existing = [], incoming, {readField}) {
          // if incoming already exists in existing
          if (existing?.length <= 0) return incoming
          if (incoming?.length <= 0) return existing
          for (const ir of incoming) {
            if (
              existing?.some(e => readField('id', e) === readField('id', ir))
            ) {
              return existing
            } else {
              return [ir, ...existing]
            }
          }
        },
      },
    },
  }, */
}

export default typePolicies
