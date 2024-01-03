import { useState, useEffect } from 'react'
import { collection, getDocs, getDoc, doc } from 'firebase/firestore'
import { db } from '../firebase/config'
import { useAuth } from '../store/authContext'
import { useFetchUser } from './useFetchUser'
export const useFetchUserWorkTime = () => {
  const [userWorkHours, setUserWorkHours] = useState()
  const { user } = useFetchUser()
  const { currentUser } = useAuth()
  console.log(user.name)
  useEffect(() => {
    const getData = async () => {
      try {
        const workTimeSnapshot = await getDoc(
          doc(db, 'shifts', 'finishedShifts'),
        )
        if (workTimeSnapshot.exists()) {
          const workTimeData = workTimeSnapshot.data()

          const userName = user ? user.name : ''

          const filteredData = Object.entries(workTimeData)
            .map(([date, items]) => ({
              date,
              workHours: Object.values(items).filter(
                (subItem) => subItem.name === userName,
              ),
            }))
            .filter(({ workHours }) => workHours.length > 0)

          console.log(filteredData)
          setUserWorkHours(filteredData)
        } else {
          console.log('Collection does not exist')
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    getData()
  }, [user])
  return {
    userWorkHours,
    setUserWorkHours,
  }
}
