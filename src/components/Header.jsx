import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../store/authContext'
import { useHook } from '../hooks/useFetch'
import { changedItems } from '../functions/changedItems'
import { Link } from 'react-router-dom'
import { useFetchUser } from '../hooks/useFetchUser'
import { CiLogout } from 'react-icons/ci'
import { IoLogIn } from 'react-icons/io5'

const Header = () => {
  const image = require('../assets/break.jpeg')

  const { currentUser, logout } = useAuth()
  const { user } = useFetchUser()
  console.log(user)
  // Update lowItemsCount whenever lowItems or items change

  //   let lowItemsCount =
  //     lowItems.length + items.filter((item) => item.hasBeenChanged).length

  return (
    <Flex
      backgroundColor="#b31b22"
      flexDirection="row"
      justifyContent={currentUser ? 'space-between' : 'space-around'}
      gap={10}
      alignItems="center"
      position="relative"
    >
      <Image src={image} w="100px" h="100px" scale={1.4} />
      {currentUser ? (
        <Text
          color="white"
          position="absolute"
          left="0"
          right="0"
          fontWeight="bold"
          fontSize="18"
        >
          Ahoj {user.name}!
        </Text>
      ) : null}
      {!currentUser ? (
        <Link to="/login">
          {/* <Button colorScheme="white">Prihlásiť sa </Button> */}
          <Button
            position="relative"
            mr="1.4rem"
            w="2.5rem"
            h="2.5rem"
            p="-1rem"
            bg="transparent"
            borderRadius="50px"
            _hover={{ color: 'transparent' }}
          >
            <IoLogIn size={35} color="white" style={{ position: 'absolute' }} />
          </Button>
        </Link>
      ) : (
        // <Button onClick={() => logout()} >Odhlásiť sa</Button>
        <Button
          onClick={() => logout()}
          position="relative"
          mr="1rem"
          w="2.5rem"
          h="2.5rem"
          p="-1rem"
          borderRadius="50px"
        >
          <CiLogout
            size={25}
            style={{ position: 'absolute', fontWeight: 'bold' }}
          />
        </Button>
      )}
    </Flex>
  )
}

export default Header
