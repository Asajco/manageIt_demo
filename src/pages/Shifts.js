import React, { useState } from 'react'
import SignUpForShift from '../components/Shifts/SignUpForShift'
import { Button, Box, Text, Heading, Input } from '@chakra-ui/react'
import { useHook } from '../hooks/useFetch'
import { collection, doc, setDoc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
import { useFetchUser } from '../hooks/useFetchUser'
const Shifts = () => {
  const [toggleForm, setToggleForm] = useState(false)
  const { shiftsSign, shifts } = useHook()
  const [timeInput, setTimeInput] = useState(null)
  const { user } = useFetchUser()
  const [selectedNames, setSelectedNames] = useState({})
  const handleNameClick = (name, day) => {
    setSelectedNames((prevSelectedNames) => {
      const isNameSelected = (prevSelectedNames[day] || []).includes(name)

      if (isNameSelected) {
        // Remove the name from the selected names for the day
        const updatedNames = prevSelectedNames[day].filter((n) => n !== name)
        return {
          ...prevSelectedNames,
          [day]: updatedNames,
        }
      } else {
        // Add the name to the selected names for the day
        return {
          ...prevSelectedNames,
          [day]: [
            ...(prevSelectedNames[day] || []),
            { name: name, time: null },
          ],
        }
      }
    })
  }

  const handleSaveData = () => {
    setDoc(doc(collection(db, 'shifts'), 'shifts'), {
      ...selectedNames, // Include other data in the document
    })
  }
  const handleSubmitTime = async (day, name, time) => {
    try {
      // Assuming you have a 'shifts' collection with a 'shifts' document
      const shiftDocRef = doc(collection(db, 'shifts'), 'shifts')

      // Get the existing data for the shifts document
      const shiftsData = (await getDoc(shiftDocRef)).data()

      // Update the specific item in the dayData array with the input value
      if (shiftsData && shiftsData[day]) {
        const dayData = shiftsData[day]
        const index = dayData.findIndex((item) => item.name === name)
        dayData[index].time = time
        await setDoc(shiftDocRef, {
          ...shiftsData,
          [day]: dayData,
        })

        console.log(`Time for ${name} on ${day} submitted successfully.`)
      } else {
        console.error(`Error: Day ${day} not found in the shifts document.`)
      }
    } catch (error) {
      console.error('Error submitting time:', error)
    }
  }

  if (!shiftsSign || shiftsSign.length === 0) {
    return (
      <Box minH="80vh">
        <Text>Načítavam..</Text>
        {toggleForm && <SignUpForShift />}
      </Box>
    )
  }
  return (
    <Box minH="80vh" fontFamily="Roboto">
      <Button onClick={() => setToggleForm(!toggleForm)} mt="1rem">
        {toggleForm ? 'X' : 'Prihlásiť sa na smenu'}
      </Button>
      {toggleForm && <SignUpForShift />}
      {shiftsSign && user.email === 'petergacj@gmail.com' && (
        <Box>
          {Object.keys(shiftsSign)
            .sort()
            .map((day) => (
              <Box key={day} m="1rem">
                <Text>{day}</Text>

                <Text>
                  {shiftsSign[day].map((name) => (
                    <Text
                      key={name}
                      onClick={() => handleNameClick(name, day)}
                      cursor="pointer"
                      _hover={{ color: 'blue.500' }}
                      color={
                        (selectedNames[day] || []).includes(name)
                          ? 'blue.500'
                          : 'inherit'
                      }
                    >
                      {name}
                    </Text>
                  ))}
                </Text>
                {/*  */}
              </Box>
            ))}
          <Button onClick={() => handleSaveData()} colorScheme="red">
            Potvrdiť smeny
          </Button>
        </Box>
      )}
      <Box bg="white" m="0.75rem" borderRadius="0.5rem" p="1rem" mb="4rem">
        <Heading>Smeny</Heading>
        {console.log(shifts)}
        {shifts ? (
          <Box>
            {Object.keys(shifts)
              .sort()
              .map((day) => (
                <Box key={day} m="1rem">
                  <Text fontWeight="bold">{day}</Text>

                  <Text>
                    {shifts[day].map((item) => (
                      <Box>
                        <Text key={item.name}>
                          {item.name} {item.time && item.time}
                        </Text>

                        {user.email === 'petergacj@gmail.com' && (
                          <Box>
                            <Input
                              type="text"
                              placeholder="Čas"
                              onChange={(e) => setTimeInput(e.target.value)}
                              m="0.5rem"
                              w="50%"
                            />
                            <Button
                              onClick={() =>
                                handleSubmitTime(day, item.name, timeInput)
                              }
                              colorScheme="red"
                            >
                              Pridať
                            </Button>
                          </Box>
                        )}
                      </Box>
                    ))}
                  </Text>
                </Box>
              ))}
          </Box>
        ) : (
          <Text>Smeny ešte neboli vytvorené</Text>
        )}
      </Box>
    </Box>
  )
}

export default Shifts
