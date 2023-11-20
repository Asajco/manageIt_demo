import { Box, Flex, Text, Button } from '@chakra-ui/react'
import React from 'react'
import { RiMoneyDollarCircleFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { FaPerson } from 'react-icons/fa6'
import { FaCalendarAlt } from 'react-icons/fa'
import { AiFillHome } from 'react-icons/ai'
import { useAuth } from '../store/authContext'
import { PiWarningCircleFill } from 'react-icons/pi'

const Footer = () => {
  const { currentUser } = useAuth()

  return (
    <Flex
      backgroundColor="#b31b22"
      h="4rem"
      mt={4}
      alignItems="center"
      justifyContent="space-evenly"
      position="fixed"
      bottom="0"
      right="0"
      w="100vw"
    >
      {currentUser ? (
        <>
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
        </>
      ) : (
        <Text color="white">Created by Break Bar</Text>
      )}
    </Flex>
  )
}

export default Footer
