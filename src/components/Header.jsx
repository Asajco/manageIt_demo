import { Box, Button, Flex, Image } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { WarningIcon } from '@chakra-ui/icons'
import { AiFillHome } from 'react-icons/ai'
import { PiWarningCircleFill } from 'react-icons/pi'
const Header = (items) => {
  const image = require('../assets/break.jpeg')
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
      </Link>
    </Flex>
  )
}

export default Header
