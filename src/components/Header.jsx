import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

import { useHook } from '../hooks/useFetch'
import { changedItems } from '../functions/changedItems'

const Header = () => {
  const image = require('../assets/break.jpeg')
  const { lowItems, items, lowItemsCount } = useHook()

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
    </Flex>
  )
}

export default Header
