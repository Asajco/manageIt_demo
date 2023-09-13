import React, { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/config'

export const useHook = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true)
        const querySnapshot = await getDocs(collection(db, 'items'))

        const itemData = querySnapshot.docs.map((doc) => {
          const data = doc.data()
          // Parse the count property to ensure it's a number
          data.count = Number(data.count)
          return data
        })
        console.log(itemData)
        setItems(itemData)
        setLoading(false)
        console.log(items)
      } catch (error) {
        console.log(error)
      }
    }
    getData()

    console.log(items)
  }, [])
  return { items, setItems, loading }
}
