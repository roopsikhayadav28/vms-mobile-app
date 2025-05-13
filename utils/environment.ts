const ENV = {
  development: {
    apiUrl: 'http://35.154.33.195:8080/graphql',
    showRoleDropdown: true,
    keyPrefix: 'dev/',
  },
  localhost: {
    apiUrl: 'http://localhost:8080/graphql',
    showRoleDropdown: true,
    keyPrefix: 'dev/',
  },
  staging: {
    apiUrl: 'http://3.110.182.77:8080/graphql',
    showRoleDropdown: true,
    keyPrefix: 'staging/',
  },
  production: {
    apiUrl: 'http://13.126.22.115:8080/graphql',
    showRoleDropdown: false,
    keyPrefix: 'production/',
  },
}
type Env = 'development' | 'localhost' | 'staging' | 'production'

// NOTE: Change the default parameter to change the build type
const getEnvVars = (env: Env = 'staging') => {
  // What is __DEV__ ?
  // This variable is set to true when react-native is running in Dev mode.
  // __DEV__ is true when run locally, but false when published.
  if (__DEV__) {
    return ENV.development
  }
  switch (env) {
    case 'development':
      return ENV.development
    case 'localhost':
      return ENV.localhost
    case 'staging':
      return ENV.staging
    case 'production':
      return ENV.production
  }
}

export default getEnvVars
