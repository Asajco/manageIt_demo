import { Box, Button, Flex, Image, Text, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../store/authContext'
import { useHook } from '../hooks/useFetch'
import { changedItems } from '../functions/changedItems'
import { Link } from 'react-router-dom'
import { useFetchUser } from '../hooks/useFetchUser'
import { CiLogout } from 'react-icons/ci'
import { IoLogIn } from 'react-icons/io5'
import Sidebar from './Sidebar'
import { colours } from '../store/colors'
const Header = () => {
  const image = require('../assets/break.jpeg')
  const { isOpen, onOpen, onClose } = useDisclosure() // Use useDisclosure
  const { currentUser, logout } = useAuth()
  const { user, setUser } = useFetchUser()

  // Update lowItemsCount whenever lowItems or items change

  //   let lowItemsCount =
  //     lowItems.length + items.filter((item) => item.hasBeenChanged).length
  const handleLogout = () => {
    logout()
    setUser(null)
  }
  return (
    <Flex
      bgColor={`${colours.primaryColor}`}
      flexDirection="row"
      justifyContent={currentUser ? 'space-between' : 'space-around'}
      gap={10}
      h="5rem"
      alignItems="center"
      position="relative"
    >
      <Link to="/">
        <Text fontFamily="Poppins" fontWeight="bold" ml="1rem">
          ManageIT
        </Text>
      </Link>
      {currentUser ? (
        <Text
          color="white"
          position="absolute"
          left="0"
          right="0"
          fontWeight="bold"
          fontSize="18"
        >
          Hello {user && user.name}!
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
        //I6LVAe20MMUNE9YmR88IG2E4yuJ3
        //I6LVAe20MMUNE9YmR88IG2E4yuJ3
        //I6LVAe20MMUNE9YmR88IG2E4yuJ3
        // <Button onClick={() => logout()} >Odhlásiť sa</Button>
        // <Button
        //   onClick={() => handleLogout()}
        //   position="relative"
        //   mr="1rem"
        //   w="2.5rem"
        //   h="2.5rem"
        //   p="-1rem"
        //   borderRadius="50px"
        // >
        //   <CiLogout
        //     size={25}
        //     style={{ position: 'absolute', fontWeight: 'bold' }}
        //   />
        // </Button>
        <Sidebar isOpen={isOpen} />
      )}
    </Flex>
  )
}

export default Header
