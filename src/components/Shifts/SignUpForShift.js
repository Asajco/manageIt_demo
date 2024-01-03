import { Box, Button, Text, Flex, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useFetchUser } from '../../hooks/useFetchUser'
import { setDoc, doc, getDoc, deleteDoc, collection } from 'firebase/firestore'

import { db } from '../../firebase/config'

const days = ['Nedeľa', 'Pondelok', 'Utorok', 'Streda', 'Stvrtok']

const SignUpForShift = () => {
  const [selectedDays, setSelectedDays] = useState([])
  const toast = useToast()
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

  const handleSendData1 = async () => {
    setDoc(doc(collection(db, 'shifts'), 'shiftSign'), {
      selectedDays, // Include other data in the document
    })
  }
  const handleSendData = async () => {
    for (const day of selectedDays) {
      const shiftsSignDocRef = doc(db, 'shifts', 'shiftsSign')

      try {
        const shiftsSignDocSnapshot = await getDoc(shiftsSignDocRef)

        if (shiftsSignDocSnapshot.exists()) {
          const shiftsSignData = shiftsSignDocSnapshot.data()

          if (!shiftsSignData[day]) {
            shiftsSignData[day] = [] // Initialize the names array for the selected day if it doesn't exist
          }

          // Check if the user's name is already in the array, and add it if not
          if (!shiftsSignData[day].includes(user.name)) {
            shiftsSignData[day].push(user.name)
          }

          // Update the "shiftsSign" document in the database with the modified data
          await setDoc(shiftsSignDocRef, shiftsSignData)
          toast({
            title: `Succesfuly logged to the shifts`,
            status: 'success',
            position: 'top-right',
            duration: '1000',
            isClosable: true,
          })

          console.log(`Added ${user.name} to ${day}`)
        } else {
          // If the document doesn't exist, create it with the selected day and the user's name
          const data = { [day]: [user.name] }
          await setDoc(shiftsSignDocRef, data)
          console.log(`Created and added ${user.name} to ${day}`)
        }
      } catch (error) {
        console.error(`Error updating data for ${day}:`, error)
      }
    }
  }

  const handleDeleteData = async () => {
    for (const day of days) {
      const dayDocRef = doc(collection(db, 'shifts'), 'shiftsSign')

      // const dayDocRef = doc(db, 'shiftsSign', day)

      try {
        await deleteDoc(dayDocRef)
        console.log(`Deleted data for ${day}`)
      } catch (error) {
        console.error(`Error deleting data for ${day}:`, error)
      }
    }
  }

  return (
    <Flex flexDirection="column" alignItems="center">
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
