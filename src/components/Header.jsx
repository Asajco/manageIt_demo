import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../store/authContext'
import { useHook } from '../hooks/useFetch'
import { changedItems } from '../functions/changedItems'
import { Link } from 'react-router-dom'
import { useFetchUser } from '../hooks/useFetchUser'

const Header = () => {
  const image = require('../assets/break.jpeg')
  const { lowItems, items, lowItemsCount } = useHook()
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
      justifyContent="space-evenly"
      alignItems="center"
      position="relative"
    >
      <Image src={image} w="100px" h="100px" scale={1.4} />
      {!currentUser ? (
        <Link to="/login">
          <Button colorScheme="white">Prihlásiť sa </Button>
        </Link>
      ) : (
        <Button onClick={() => logout()}>Odhlásiť sa</Button>
      )}
      <Link to="/shifts">
        <Button colorScheme="white">Shifts </Button>
      </Link>
      {currentUser ? <Text>{user.name}</Text> : null}
    </Flex>
  )
}

export default Header
