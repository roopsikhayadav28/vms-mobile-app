import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

export const firebaseConfig = {
  apiKey: 'AIzaSyBSTQtQ5p-3NPHfqBbO8EUZHrXkH_Tyxa4',
  authDomain: 'vehicle-management-syste-e1fe0.firebaseapp.com',
  projectId: 'vehicle-management-syste-e1fe0',
  storageBucket: 'vehicle-management-syste-e1fe0.appspot.com',
  messagingSenderId: '957271575147',
  appId: '1:957271575147:web:91099ec91feb192fdb3f2e',
  measurementId: 'G-VWVKY8BQ03',
}

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

const auth = firebase.auth()
const storage = firebase.storage()
export {firebase, auth, storage}
