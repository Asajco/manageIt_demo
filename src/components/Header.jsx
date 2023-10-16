import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { WarningIcon } from '@chakra-ui/icons'
import { AiFillHome } from 'react-icons/ai'
import { PiWarningCircleFill } from 'react-icons/pi'
import { useHook } from '../hooks/useFetch'
import { changedItems } from '../functions/changedItems'
const Header = () => {
  const image = require('../assets/break.jpeg')
  const { lowItems, items, lowItemsCount } = useHook()

  // Update lowItemsCount whenever lowItems or items change

  //   let lowItemsCount =
  //     lowItems.length + items.filter((item) => item.hasBeenChanged).length
  console.log(lowItemsCount)
  console.log(lowItems.length)
  return (
    <Flex
      backgroundColor="#b31b22"
      flexDirection="row"
      justifyContent="space-evenly"
      alignItems="center"
      position="relative"
    >
      <Link to="/">
        <AiFillHome size={25} color="white" />
      </Link>
      <Image src={image} w="100px" h="100px" scale={2.4} />
      <Link to="/changed">
        <PiWarningCircleFill size={25} color="white" />
        <Text>{lowItemsCount.length}</Text>
      </Link>
    </Flex>
  )
}

export default Header
