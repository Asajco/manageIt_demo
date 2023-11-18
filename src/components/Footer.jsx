import { Box, Flex, Text, Button } from '@chakra-ui/react'
import React from 'react'
import { RiMoneyDollarCircleFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { FaPerson } from 'react-icons/fa6'
import { FaCalendarAlt } from 'react-icons/fa'
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
      position="fixed"
      bottom="0"
      right="0"
      w="100vw"
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
      <Link to="/shifts">
        <FaCalendarAlt size={25} color="white" />
      </Link>
      <Link to="/profile">
        <FaPerson size={25} color="white" />
      </Link>
    </Flex>
  )
}

export default Footer
