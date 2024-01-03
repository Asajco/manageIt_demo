import {
  RadioGroup,
  useDisclosure,
  Stack,
  Radio,
  Button,
  Box,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Text,
  DrawerFooter,
} from '@chakra-ui/react'
import React from 'react'
import { FaBars } from 'react-icons/fa6'

import { Link } from 'react-router-dom'

import { useFetchUser } from '../hooks/useFetchUser'
import { CiLogout } from 'react-icons/ci'
import { useAuth } from '../store/authContext'

const Sidebar = () => {
  // Destructure props here
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user, setUser } = useFetchUser()
  const { logout } = useAuth()
  const handleLogout = () => {
    logout()
    setUser(null)
  }
  return (
    <Box position="absolute" right="0">
      {user && (
        <Button
          onClick={onOpen}
          size="lg"
          mr="1rem"
          bg="transparent"
          _hover={{ color: 'transparent' }}
        >
          <FaBars color="white" />
        </Button>
      )}
      <Drawer onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Zatvoriť
            </Button>
          </DrawerHeader>
          <DrawerBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            fontFamily="Poppins"
            fontWeight="bold"
            gap="1.5rem"
            mt="3rem"
          >
            <Link onClick={onClose} to="/">
              Domov
            </Link>
            <Link onClick={onClose} to="/changed">
              Zmené položky
            </Link>
            <Link onClick={onClose} to="/facturation">
              Uzávierky
            </Link>
            <Link onClick={onClose} to="/shifts">
              Smeny
            </Link>
            <Link onClick={onClose} to="/profile">
              Profil
            </Link>
            {user && user.isSuperAdmin && (
              <Link onClick={onClose} to="/settings">
                Nastavenia
              </Link>
            )}
            <Button
              onClick={() => handleLogout()}
              position="relative"
              mr="1rem"
              mt="3rem"
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
          </DrawerBody>
        </DrawerContent>
        <DrawerFooter></DrawerFooter>
      </Drawer>
    </Box>
  )
}

export default Sidebar
