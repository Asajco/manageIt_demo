import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { RiMoneyDollarCircleFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { WarningIcon } from '@chakra-ui/icons'
import { AiFillHome } from 'react-icons/ai'
import { PiWarningCircleFill } from 'react-icons/pi'
const Footer = () => {
  return (
    <Flex
      backgroundColor="#b31b22"
      h="4rem"
      mt={2}
      alignItems="center"
      justifyContent="space-evenly"
    >
      <Link to="/">
        <AiFillHome size={25} color="white" />
      </Link>
      <Link to="/changed">
        <PiWarningCircleFill size={25} color="white" />
      </Link>
      <Link to="/facturation">
        <RiMoneyDollarCircleFill size={25} color="white" />
      </Link>
    </Flex>
  )
}

export default Footer
