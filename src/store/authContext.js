import React, { useContext, useState, useEffect } from 'react'
import { auth, db, firestore } from '../firebase/config'
import { collection, addDoc, setDoc, doc } from 'firebase/firestore'
import { useFetchUser } from '../hooks/useFetchUser'
const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  async function signup(email, password, name) {
    const userCredential = await auth.createUserWithEmailAndPassword(
      email,
      password,
    )
    // Get the user's UID
    const uid = userCredential.user.uid
    return setDoc(doc(db, 'users', uid), {
      id: uid,
      email: email,
      password: password,
      name: name,
    })
  }
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  async function logout() {
    try {
      await auth.signOut()
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }
  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }
  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  }
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
