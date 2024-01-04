import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import React, { useState, useRef, useEffect } from 'react'
import { useFetchUser } from '../hooks/useFetchUser'
import { useAuth } from '../store/authContext'
import moment from 'moment'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase/config'

import { useFetchUserWorkTime } from '../hooks/useFetchPersonHours'

const Profile = () => {
  const { currentUser } = useAuth()
  const { user, setUser } = useFetchUser()
  const { userWorkHours } = useFetchUserWorkTime()
  console.log(userWorkHours?.map((item) => item))
  return (
    <Flex justifyContent="center" alignItems="center" fontFamily="Roboto">
      {currentUser ? (
        <Flex flexDirection="column" alignItems="center">
          <Heading as="h1" size="lg" mt="1rem">
            {user.name}
          </Heading>
          <Text>
            {userWorkHours?.map((day) => (
              <Flex
                m="0.5rem"
                borderRadius="0.3rem"
                p="0.5rem"
                textAlign="center"
                justifyContent="center"
                w="100%"
              >
                <Text>{moment(Number(day.date)).format('DD. MM. YYYY')}</Text>
                {day.workHours.map((item) => (
                  <Text>
                    - {item.time} {item.time == 1 ? 'hour' : 'hours'}
                  </Text>
                ))}{' '}
              </Flex>
            ))}
          </Text>
        </Flex>
      ) : (
        <Box>
          <Text>Log in before entering this page</Text>
        </Box>
      )}
    </Flex>
  )
}

export default Profile
