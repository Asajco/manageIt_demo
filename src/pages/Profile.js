import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import React, { useState, useRef } from 'react'
import { useFetchUser } from '../hooks/useFetchUser'
import { useAuth } from '../store/authContext'
import moment from 'moment'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
const Profile = () => {
  const { currentUser } = useAuth()
  const { user, setUser } = useFetchUser()

  const [isRunning, setIsRunning] = useState(false)
  const [startDate, setStartDate] = useState(null)
  const [elapsedTime, setElapsedTime] = useState(0)
  const intervalRef = useRef()

  const startStopwatch = () => {
    if (isRunning) {
      clearInterval(intervalRef.current)
    } else {
      const startTime = Date.now() - elapsedTime
      intervalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTime)
      }, 100)
    }
    setStartDate(moment().valueOf())
    setIsRunning(!isRunning)
  }

  const resetStopwatch = () => {
    clearInterval(intervalRef.current)
    setIsRunning(false)
    setElapsedTime(0)
  }

  const formatTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000)
    const minutes = Math.floor(seconds / 60)
    const formattedSeconds = seconds % 60
    return `${minutes}:${formattedSeconds < 10 ? '0' : ''}${formattedSeconds}`
  }
  const handleSaveShift = async () => {
    // Fetch the existing user document
    const userDocRef = doc(collection(db, 'users'), user.id)
    const userDoc = await getDoc(userDocRef)

    // Get the existing shifts or create an empty object if it doesn't exist
    const existingShifts = userDoc.exists() ? userDoc.data().shifts || {} : {}

    // Update the shifts with the new shift
    const updatedShifts = {
      ...existingShifts,
      [startDate]: formatTime(elapsedTime),
    }
    setUser((prevUser) => ({
      ...prevUser,
      shifts: updatedShifts,
    }))

    // Update the user document with the updated shifts
    await setDoc(userDocRef, {
      ...userDoc.data(),
      shifts: updatedShifts,
    })

    console.log('Shift saved successfully!')
  }

  return (
    <Flex justifyContent="center" alignItems="center" fontFamily="Roboto">
      {currentUser ? (
        <Flex flexDirection="column" alignItems="center">
          <Flex flexDirection="column" alignItems="center" gap={2}>
            <Flex
              w="10rem"
              h="5rem"
              mt="1rem"
              bgColor="#b31b22"
              color="white"
              flexDirection="column"
              alignItems="center"
              borderRadius="30px"
              fontSize="20px"
              justifyContent="center"
            >
              {formatTime(elapsedTime)}
            </Flex>
            <Flex gap={1}>
              <Button onClick={startStopwatch} colorScheme="red">
                {isRunning ? 'Skončiť smenu' : 'Začať smenu'}
              </Button>
              <Button onClick={resetStopwatch} colorScheme="blue">
                Reset
              </Button>
              <Button onClick={() => handleSaveShift()} colorScheme="green">
                Uložiť smenu
              </Button>
            </Flex>
          </Flex>
          <Text fontSize={24} m="1.25rem" fontWeight="bold">
            Moje smeny
          </Text>
          <Flex
            flexDirection="column"
            p="1rem"
            bg="white"
            borderRadius="0.5rem"
            justifyContent="center"
            mt="0.5rem"
            w="50%"
          >
            {user.shifts &&
              Object.entries(user.shifts)
                .sort()
                .map(([day, time]) => (
                  <Text key={day}>
                    <b>{moment(Number(day)).format('DD. MM. YYYY')}</b> - {time}
                  </Text>
                ))}
          </Flex>
        </Flex>
      ) : (
        <Box>
          <Text>Pre pračovanie sa prihlás</Text>
        </Box>
      )}
    </Flex>
  )
}

export default Profile
