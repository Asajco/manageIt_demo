import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
  Button,
  ModalCloseButton,
  useToast,
  Box,
  InputGroup,
  InputLeftAddon,
  Input,
} from '@chakra-ui/react'
import { v4 } from 'uuid'
import { collection, doc, setDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { useHook } from '../../hooks/useFetch'
import ErrorMessage from './ErrorMessage'
const UzavierkaModal = () => {
  const { uzavierky, setUzavierky } = useHook()
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const onSubmit = (data) => {
    const itemId = v4() // Generate a custom ID
    setDoc(doc(collection(db, 'uzavierky'), itemId), {
      id: itemId, // Save the custom ID as a field in the document
      ...data, // Include other data in the document
    }).then(() => {
      // The state update will only be visible after a re-render.
      const newItem = { id: itemId, ...data }
      setUzavierky(uzavierky.push(newItem))
    })

    toast({
      title: 'Úspešné vytvorenie uzávierky',
      status: 'success',
      duration: 5000,
      position: 'top-right',
      isClosable: true,
    })

    reset()
    onClose()
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }

  return (
    <Box>
      <Button onClick={onOpen} colorScheme="red" size="lg" m={3} w="10rem">
        Pridať
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader alignSelf="center">Uzavierka</ModalHeader>
          <ModalCloseButton colorScheme="red" />
          <ModalBody gap={2}>
            <form onSubmit={handleSubmit(onSubmit)} style={{ gap: '1.5rem' }}>
              <InputGroup>
                <InputLeftAddon backgroundColor="red.300">Dátum</InputLeftAddon>
                <Input
                  {...register('date', { required: true })}
                  type="date"
                  defaultValue={new Date()}
                  mb="0.5rem"
                />
              </InputGroup>
              {errors.date && <ErrorMessage text={'Vyplň dátum'} />}
              <InputGroup>
                <InputLeftAddon backgroundColor="red.300">
                  Terminál
                </InputLeftAddon>
                <Input
                  {...register('terminal', { required: true })}
                  mb="0.5rem"
                />
              </InputGroup>
              {errors.terminal && <ErrorMessage text={'Vyplň terminál'} />}
              <InputGroup mb="0.5rem">
                <InputLeftAddon backgroundColor="red.300">Hry</InputLeftAddon>
                <Input {...register('games', { required: true })} />
              </InputGroup>
              {errors.games && <ErrorMessage text={'Vyplň hry'} />}
              <InputGroup>
                <InputLeftAddon backgroundColor="red.300">
                  Hotovosť
                </InputLeftAddon>
                <Input {...register('cash', { required: true })} mb="0.5rem" />
              </InputGroup>
              {errors.cash && <ErrorMessage text={'Vyplň hotovosť'} />}
              <InputGroup>
                <InputLeftAddon backgroundColor="red.300">
                  Tržba spolu
                </InputLeftAddon>
                <Input
                  {...register('totalInCash', { required: true })}
                  mb="0.5rem"
                />
              </InputGroup>
              {errors.totalInCash && (
                <ErrorMessage text={'Vyplň tržbu spolu'} />
              )}
              <InputGroup>
                <InputLeftAddon backgroundColor="red.300">
                  Spolu v kasičke
                </InputLeftAddon>
                <Input
                  {...register('totalInCashier', { required: true })}
                  mb="0.5rem"
                />
              </InputGroup>
              {errors.totalInCashier && (
                <ErrorMessage text={'Vyplň Spolu v kasičke'} />
              )}
              <Input type="submit" />
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Zatvoriť
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default UzavierkaModal
