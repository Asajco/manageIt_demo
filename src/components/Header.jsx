import { Box, Flex, Image } from '@chakra-ui/react'
import React from 'react'

const Header = () => {
  const image = require('../assets/break.jpeg')
  return (
    <Flex backgroundColor="#b31b22" flexDirection="row" justifyContent="center">
      <Image src={image} w="100px" h="100px" />
    </Flex>
  )
}

export default Header
