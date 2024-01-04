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
    })
    const newItem = { id: itemId, ...data }
    setUzavierky((prevUzavierky) => [...prevUzavierky, newItem])
    console.log(uzavierky)
    toast({
      title: 'Successful creation of the shutter',
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
      <Button
        onClick={onOpen}
        colorScheme="green"
        size="lg"
        m={3}
        w="10rem"
        mt="2rem"
      >
        Add
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader alignSelf="center">Shutter</ModalHeader>
          <ModalCloseButton colorScheme="green" />
          <ModalBody gap={2}>
            <form onSubmit={handleSubmit(onSubmit)} style={{ gap: '1.5rem' }}>
              <InputGroup>
                <InputLeftAddon backgroundColor="green.300">
                  Date
                </InputLeftAddon>
                <Input
                  {...register('date', { required: true })}
                  type="date"
                  defaultValue={new Date()}
                  mb="0.5rem"
                />
              </InputGroup>
              {errors.date && <ErrorMessage text={'Fill date'} />}
              <InputGroup>
                <InputLeftAddon backgroundColor="green.300">
                  Terminal
                </InputLeftAddon>
                <Input
                  {...register('terminal', { required: true })}
                  mb="0.5rem"
                />
              </InputGroup>
              {errors.terminal && <ErrorMessage text={'Fill terminal'} />}
              <InputGroup mb="0.5rem">
                <InputLeftAddon backgroundColor="green.300">
                  Games
                </InputLeftAddon>
                <Input {...register('games', { required: true })} />
              </InputGroup>
              {errors.games && <ErrorMessage text={'Fill games'} />}
              <InputGroup>
                <InputLeftAddon backgroundColor="green.300">
                  Cash
                </InputLeftAddon>
                <Input {...register('cash', { required: true })} mb="0.5rem" />
              </InputGroup>
              {errors.cash && <ErrorMessage text={'Fill cash'} />}
              <InputGroup>
                <InputLeftAddon backgroundColor="green.300">
                  Together
                </InputLeftAddon>
                <Input
                  {...register('totalInCash', { required: true })}
                  mb="0.5rem"
                />
              </InputGroup>
              {errors.totalInCash && <ErrorMessage text={'Fill together'} />}
              <InputGroup>
                <InputLeftAddon backgroundColor="green.300">
                  Together in cashier
                </InputLeftAddon>
                <Input
                  {...register('totalInCashier', { required: true })}
                  mb="0.5rem"
                />
              </InputGroup>
              {errors.totalInCashier && (
                <ErrorMessage text={'Fill Together in cashier'} />
              )}
              <Button type="submit" w="100%" colorScheme="green" mt="1em">
                Save
              </Button>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default UzavierkaModal
