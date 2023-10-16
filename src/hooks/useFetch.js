import React, { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/config'

export const useHook = () => {
  const [items, setItems] = useState([])
  const [lowItems, setLowItems] = useState([])
  const [lowItemsCount, setLowItemsCount] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true)
        const querySnapshot = await getDocs(collection(db, 'items'))
        const lowItemsSnapshot = await getDocs(collection(db, 'low-items'))
        const itemData = querySnapshot.docs.map((doc) => {
          const data = doc.data()
          // Parse the count property to ensure it's a number
          data.count = Number(data.count)
          return data
        })
        const lowItemsData = lowItemsSnapshot.docs.map((doc) => doc.data())
        setLowItems(lowItemsData)
        setItems(itemData)
        const changedItems = itemData.filter((item) => item.hasBeenChanged)
        setLowItemsCount([...lowItemsData, ...changedItems])
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    getData()

    console.log(items)
  }, [])
  return {
    items,
    setItems,
    loading,
    lowItems,
    setLowItems,
    setLowItemsCount,
    lowItemsCount,
  }
}
