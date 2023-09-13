// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyA3lDtgtfAHqw1F82hztrjvN0ZgvuBMt7E',
  authDomain: 'break-inventory.firebaseapp.com',
  projectId: 'break-inventory',
  storageBucket: 'break-inventory.appspot.com',
  messagingSenderId: '136598683822',
  appId: '1:136598683822:web:94e2b9b4f2da819a586d3f',
  measurementId: 'G-V7WTVL4KT0',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
export const db = getFirestore(app)
