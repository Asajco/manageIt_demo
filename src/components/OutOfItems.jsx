import React from 'react'
import { useHook } from '../hooks/useFetch'
import { Flex, Input, Button, Heading, useToast, Text } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { setDoc, doc, collection, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
import { v4 } from 'uuid'
import { BsFillTrash3Fill } from 'react-icons/bs'
import moment from 'moment'
import { colours } from '../store/colors'
const OutOfItems = () => {
  const { lowItems, setLowItems } = useHook()
  const toast = useToast()
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    const itemId = v4()
    if (data.name == '') {
      toast({
        title: `Zadajte tovar`,
        position: 'top-right',
        isClosable: true,
        status: 'error',
        duration: 1000,
      })
    } else {
      setDoc(doc(collection(db, 'low-items'), itemId), {
        id: itemId,
        ...data,
      })
      const newItem = { id: itemId, ...data }
      setLowItems((prevItems) => [...prevItems, newItem])

      toast({
        title: `Uspešné pridanie ${data.name}`,
        position: 'top-right',
        isClosable: true,
        status: 'success',
        duration: 1000,
      })
      reset()
    }
  }
  const handleDeleteItem = (itemId) => {
    const docRef = doc(db, 'low-items', itemId)
    deleteDoc(docRef)
    setLowItems((prevItems) => prevItems.filter((item) => item.id !== itemId))
    toast({
      title: `Uspešné vymazanie`,
      position: 'top-right',
      isClosable: true,
      status: 'success',
      duration: 1000,
    })
  }
  return (
    <Flex flexDirection="column" p={3} mt={4} fontFamily="Roboto">
      <Heading fontFamily="Roboto" fontSize="1.3rem">
        Low state of items
      </Heading>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          borderRadius: '0.2rem',
          padding: '0.5rem',
          marginBottom: '2rem',
        }}
      >
        <Input
          {...register('name')}
          placeholder="Items that will be missing soon"
        />
        <Button type="submit" bg={colours.primaryColor} m={3}>
          Add
        </Button>
      </form>
      <Flex flexDirection="column">
        {lowItems
          ? lowItems.map((item, index) => (
              <Flex
                key={index}
                alignItems="center"
                flexDirection="row"
                w="100%"
                p={2}
                borderRadius="0.2rem"
                mb="0.5rem"
                justifyContent="space-between"
              >
                <Text>{item.name}</Text>

                <BsFillTrash3Fill
                  size={20}
                  cursor="pointer"
                  onClick={() => handleDeleteItem(item.id)}
                />
              </Flex>
            ))
          : null}
      </Flex>
    </Flex>
  )
}

export default OutOfItems
