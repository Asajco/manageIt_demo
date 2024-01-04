// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import 'firebase/compat/auth'

const app = firebase.initializeApp({
  apiKey: 'AIzaSyD29twrG-RIyomi5eg6EUCVYNxjlokIo8Q',
  authDomain: 'manageit-demo.firebaseapp.com',
  projectId: 'manageit-demo',
  storageBucket: 'manageit-demo.appspot.com',
  messagingSenderId: '1042223311185',
  appId: '1:1042223311185:web:925a6362444e08f4a80b70',
})

// Initialize Firebase

const analytics = getAnalytics(app)
export const auth = app.auth()
export const db = getFirestore(app)
export default app
