import React, { useState } from 'react'
import SignUpForShift from '../components/Shifts/SignUpForShift'
import {
  Button,
  Box,
  Text,
  Heading,
  Input,
  Flex,
  InputGroup,
  useToast,
  InputLeftAddon,
} from '@chakra-ui/react'
import { useHook } from '../hooks/useFetch'
import {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'
import { db } from '../firebase/config'
import moment from 'moment'
import { useFetchUser } from '../hooks/useFetchUser'
const Shifts = () => {
  const [toggleForm, setToggleForm] = useState(false)
  const { shiftsSign, shifts, setShifts, setWorkTime } = useHook()
  const [shiftDate, setShiftDate] = useState(null)
  const [timeInput, setTimeInput] = useState(null)
  const { user } = useFetchUser()
  const [selectedNames, setSelectedNames] = useState({})
  const toast = useToast()
  const [inputs, setInputs] = useState([
    { name: '', time: '' }, // Initial input fields
  ])

  const handleAddInput = () => {
    setInputs([...inputs, { name: '', time: '' }])
  }
  const handleNameClick = (name, day) => {
    setSelectedNames((prevSelectedNames) => {
      const isNameSelected = (
        prevSelectedNames[day]?.map((item) => item.name) || []
      ).includes(name)

      if (isNameSelected) {
        // Remove the name from the selected names for the day
        const updatedNames = prevSelectedNames[day]
          .map((item) => item.name)
          .filter((n) => n !== name)

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
  console.log(selectedNames)
  const handleSaveData = () => {
    setDoc(doc(collection(db, 'shifts'), 'shifts'), {
      ...selectedNames, // Include other data in the document
    })
    setShifts(selectedNames)
    setSelectedNames('')
    toast({
      title: `Shifts were succesfully submited`,
      status: 'success',
      position: 'top-right',
      duration: '1000',
      isClosable: true,
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
        toast({
          title: `Time for ${name} was succesfully submited`,
          status: 'success',
          position: 'top-right',
          duration: '1000',
          isClosable: true,
        })
      } else {
        console.error(`Error: Day ${day} not found in the shifts document.`)
      }
    } catch (error) {
      console.error('Error submitting time:', error)
    }
  }

  const handleSubmitShifts = async () => {
    const data = { ...inputs }
    const date = moment().valueOf()
    const shiftDocRef = doc(collection(db, 'shifts'), 'finishedShifts')
    const docSnapshot = await getDoc(shiftDocRef)

    if (docSnapshot.exists()) {
      await updateDoc(shiftDocRef, {
        [date]: data,
      })
    } else {
      await setDoc(shiftDocRef, {
        [date]: data,
      })
    }

    setWorkTime((prevWorkTime) => ({
      ...prevWorkTime,
      [date]: data,
    }))
  }

  const handleDeleteShifts = async () => {
    try {
      const dayDocRef = doc(collection(db, 'shifts'), 'shifts')
      await deleteDoc(dayDocRef)
      setShifts([])
      toast({
        title: 'Shifts succesfully deleted',
        position: 'top-right',
        status: 'info',
        duration: '1000',
        isClosable: true,
      })
    } catch (e) {
      console.log(e)
    }
  }
  // if (!shiftsSign || shiftsSign.length === 0) {
  //   return (
  //     <Box minH="80vh">
  //       <Text>Načítavam..</Text>
  //       {toggleForm && <SignUpForShift />}
  //     </Box>
  //   )
  // }
  return (
    <Box minH="80vh" fontFamily="Roboto">
      <Button onClick={() => setToggleForm(!toggleForm)} mt="1rem">
        {toggleForm ? 'X' : 'Sign up for shifts'}
      </Button>
      {toggleForm && <SignUpForShift />}
      {shiftsSign && user.isSuperAdmin && (
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
                        (
                          selectedNames[day]?.map((item) => item.name) || []
                        ).includes(name)
                          ? 'red'
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
          <Flex
            gap="0.5rem"
            flexDirection="column"
            justifyContent="center"
            p="2rem"
          >
            <Button onClick={() => handleSaveData()} colorScheme="green">
              Confirm shifts
            </Button>
            <Button onClick={() => handleDeleteShifts()} colorScheme="red">
              Delete shifts
            </Button>
          </Flex>
        </Box>
      )}
      <Box
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        m="0.75rem"
        borderRadius="0.5rem"
        p="1rem"
        mb="4rem"
      >
        <Heading>Shifts</Heading>
        {console.log(shifts)}
        {shifts ? (
          <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            {Object.keys(shifts)
              .sort()
              .map((day) => (
                <Box key={day} m="1rem">
                  <Text fontWeight="bold">{day}</Text>

                  <Text>
                    {shifts[day].map((item) => (
                      <Box
                        alignItems="center"
                        justifyContent="center"
                        w="20rem"
                      >
                        <Text key={item.name}>
                          {item.name} {item.time && item.time}
                        </Text>

                        {user.isSuperAdmin && (
                          <Box>
                            <Input
                              type="text"
                              placeholder="Time"
                              onChange={(e) => setTimeInput(e.target.value)}
                              m="0.5rem"
                              w="10rem"
                            />
                            <Button
                              onClick={() =>
                                handleSubmitTime(day, item.name, timeInput)
                              }
                              colorScheme="red"
                            >
                              Add
                            </Button>
                          </Box>
                        )}
                      </Box>
                    ))}
                  </Text>
                </Box>
              ))}
          </Flex>
        ) : (
          <Text>Shifts were not created yet</Text>
        )}
      </Box>
      {user.isSuperAdmin && (
        <Box
          mb={300}
          gap={10}
          p="1rem"
          m="0.75rem"
          borderRadius="0.5rem"
          fontFamily="Poppins"
        >
          <Heading fontFamily="Poppins">Shift that worked this day</Heading>
          {inputs.map((input, index) => (
            <div key={index}>
              <InputGroup mt="0.5rem" mb="0.5rem">
                <InputLeftAddon>Name</InputLeftAddon>
                <Input
                  type="text"
                  placeholder="Meno"
                  value={input.name}
                  onChange={(e) => {
                    const newInputs = [...inputs]
                    newInputs[index].name = e.target.value
                    setInputs(newInputs)
                  }}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon>Time</InputLeftAddon>
                <Input
                  type="number"
                  placeholder="Time"
                  value={input.time}
                  onChange={(e) => {
                    const newInputs = [...inputs]
                    newInputs[index].time = e.target.value
                    setInputs(newInputs)
                  }}
                />
              </InputGroup>
            </div>
          ))}
          <Box mt="1rem" gap="1rem">
            <Button onClick={handleAddInput} mr="1rem">
              Add person
            </Button>

            <Button onClick={() => handleSubmitShifts()}>Save</Button>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default Shifts
