import {
  ApolloClient,
  from,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
// import {GraphQLWsLink} from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { CachePersistor, MMKVWrapper } from 'apollo3-cache-persist'
// import {createClient} from 'graphql-ws'
import { setContext } from '@apollo/client/link/context'
import { WebSocketLink } from '@apollo/client/link/ws'
import { Platform, ToastAndroid } from 'react-native'
import { MMKV } from 'react-native-mmkv'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { token } from '../utils/auth'
import getEnvVars from './environment'
import { log } from './helpers'
import typePolicies from './typePolicies'
const {apiUrl} = getEnvVars()

// console.log('token in client file', token)
export const MMKV_STORAGE = new MMKV()

const HTTP_SERVER = apiUrl
const WS_SERVER = apiUrl.replace('http', 'ws')
// "https://green-feather-41151049.ap-south-1.aws.cloud.dgraph.io/graphql";

const errorLink = onError(
  ({graphQLErrors, networkError, operation: {operationName, variables}}) => {
    if (graphQLErrors)
      graphQLErrors.map(({message, path}) => {
        log('GraphQL error', {
          operationName,
          variables,
          message,
          path,
        })
      })

    if (networkError) {
      log(`[Network error]:`, networkError)
      if (Platform.OS === 'android') {
        ToastAndroid.showWithGravity(
          'Network Error',
          (ToastAndroid.SHORT = 10),
          ToastAndroid.CENTER,
        )
      }
    }
  },
)

const httpLink = new HttpLink({
  uri: HTTP_SERVER,
})

const authLink = setContext((_, { headers }) => {  
  // return the headers to the context so httpLink can read them
  // console.log(token)
  return {
    headers: {
      ...headers,
      "X-VMS-AUTH-KEY": token ? `Bearer ${token}` : "",
    }
  }
});
const authenticatedHttpLink = authLink.concat(httpLink)
const wsLink = new WebSocketLink(new SubscriptionClient(WS_SERVER, {
  connectionParams: {
    headers: {
      "X-VMS-AUTH-KEY": token ? `Bearer ${token}` : ""
    }
  }
}))

const requestLink = split(
  ({query}) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  authenticatedHttpLink,
)

const cache = new InMemoryCache({
  typePolicies,
})

export const persistor = new CachePersistor({
  cache,
  // MMKVWrapper
  storage: new MMKVWrapper(MMKV_STORAGE),
  maxSize: false,
  trigger: 'background',
})

persistor.restore()

export const client = new ApolloClient({
  // uri: 'https://' + HTTP_SERVER,
  cache,
  link: from([errorLink, requestLink]),
})

export const purgeCache = async () => {
  await client.clearStore()
  await persistor.pause()
  await persistor.purge()
}
