import React, { useState, useEffect, useCallback } from 'react'
import { collection, getDocs, getDoc, doc } from 'firebase/firestore'
import { db } from '../firebase/config'

export const useHook = () => {
  const [items, setItems] = useState([])
  const [lowItems, setLowItems] = useState([])
  const [lowItemsCount, setLowItemsCount] = useState([])
  const [uzavierky, setUzavierky] = useState([])
  const [shifts, setShifts] = useState([])
  const [shiftsSign, setShiftsSign] = useState([])
  const [loading, setLoading] = useState(false)
  const [workTime, setWorkTime] = useState()

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true)
        const querySnapshot = await getDocs(collection(db, 'items'))
        const lowItemsSnapshot = await getDocs(collection(db, 'low-items'))
        const uzavierkySnapshot = await getDocs(collection(db, 'uzavierky'))
        const shiftsSignSnapshot = await getDoc(doc(db, 'shifts', 'shiftsSign'))
        const shiftsSnapshot = await getDoc(doc(db, 'shifts', 'shifts'))
        const workTimeSnapshot = await getDoc(
          doc(db, 'shifts', 'finishedShifts'),
        )

        const itemData = querySnapshot.docs.map((doc) => {
          const data = doc.data()
          // Parse the count property to ensure it's a number
          data.count = Number(data.count)
          return data
        })
        if (shiftsSignSnapshot.exists()) {
          const shiftsSignData = shiftsSignSnapshot.data()
          setShiftsSign(shiftsSignData)
        } else {
          console.log('Collection does not exist')
        }
        if (shiftsSnapshot.exists()) {
          const shiftsData = shiftsSnapshot.data()
          setShifts(shiftsData)
        }
        if (workTimeSnapshot.exists()) {
          const workTimeData = workTimeSnapshot.data()
          setWorkTime(workTimeData)
        } else {
          console.log('Collection does not exist')
        }
        const uzavierkyData = uzavierkySnapshot.docs.map((doc) => doc.data())
        const lowItemsData = lowItemsSnapshot.docs.map((doc) => doc.data())

        setLowItems(lowItemsData)
        setItems(itemData)
        setUzavierky(uzavierkyData)

        const changedItems = itemData.filter((item) => item.hasBeenChanged)
        setLowItemsCount([...lowItemsData, ...changedItems])
        setLoading(false)
        console.log(workTime)
        console.log('fetch')
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])
  return {
    items,
    setItems,
    loading,
    lowItems,
    setLowItems,
    setLowItemsCount,
    uzavierky,
    setUzavierky,
    shiftsSign,
    shifts,
    setShifts,
    workTime,
    setWorkTime,
    setShiftsSign,
    lowItemsCount,
  }
}
