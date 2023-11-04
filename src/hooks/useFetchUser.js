import { useEffect, useState } from 'react'
import { useAuth } from '../store/authContext'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
export const useFetchUser = () => {
  const [user, setUser] = useState({
    email: '',
    id: '',
  })
  const { currentUser } = useAuth()

  useEffect(() => {
    if (currentUser) {
      const getData = async () => {
        const userRef = doc(db, 'users', currentUser?.uid)
        const userSnapshot = await getDoc(userRef)

        if (userSnapshot.exists()) {
          setUser(userSnapshot.data())
        }
      }

      getData()
    }
  }, [currentUser])

  return { user, setUser }
}
