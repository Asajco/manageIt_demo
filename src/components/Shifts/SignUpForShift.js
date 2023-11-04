import { Box, Button, Text, Flex } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useFetchUser } from '../../hooks/useFetchUser'
import { setDoc, doc, getDoc, deleteDoc } from 'firebase/firestore'

import { db } from '../../firebase/config'

const days = ['Nedeľa', 'Pondelok', 'Utorok', 'Streda', 'Stvrtok']

const SignUpForShift = () => {
  const [selectedDays, setSelectedDays] = useState([])

  const { user } = useFetchUser()

  const toggleDay = (item) => {
    if (selectedDays.includes(item)) {
      // Day is already selected, remove it
      setSelectedDays((prevSelectedDays) =>
        prevSelectedDays.filter((day) => day !== item),
      )
    } else {
      // Day is not selected, add it
      setSelectedDays([...selectedDays, item])
    }
  }
  const isDaySelected = (day) => selectedDays.includes(day)

  const handleSendData = async () => {
    for (const day of selectedDays) {
      const dayDocRef = doc(db, 'shiftsSign', day)

      // Get the current names array
      const dayDoc = await getDoc(dayDocRef)
      const currentNames = dayDoc.exists() ? dayDoc.data().names : []

      // Add the new name to the names array (if it's not already in the array)
      const newName = user.name

      if (!currentNames.includes(newName)) {
        currentNames.push(newName)

        // Update the document with the new names array
        await setDoc(dayDocRef, {
          names: currentNames,
        })
      }
    }
  }
  const handleDeleteData = async () => {
    for (const day of days) {
      const dayDocRef = doc(db, 'shiftsSign', day)

      try {
        await deleteDoc(dayDocRef)
        console.log(`Deleted data for ${day}`)
      } catch (error) {
        console.error(`Error deleting data for ${day}:`, error)
      }
    }
  }

  return (
    <Flex minH="80vh" flexDirection="column" alignItems="center">
      <Box>
        {days.map((item, index) => (
          <Button
            onClick={() => toggleDay(item, index)}
            colorScheme={isDaySelected(item) ? 'green' : 'red'}
            key={index}
            m="0.2rem"
          >
            {item}
          </Button>
        ))}
      </Box>
      {/* {selectedDays &&
        selectedDays.map((item, id) => (
          <Flex alignItems="center">
            <Text key={id}>{item}</Text>{' '}
            <Button
              onClick={() => removeItemFromSelected(item)}
              colorScheme="red"
            >
              X
            </Button>{' '}
          </Flex>
        ))} */}

      <Button onClick={() => handleSendData()}>Potvrdiť</Button>
      {user.email === 'petergacj@gmail.com' && (
        <Button onClick={() => handleDeleteData()}>Clear db</Button>
      )}
    </Flex>
  )
}

export default SignUpForShift
