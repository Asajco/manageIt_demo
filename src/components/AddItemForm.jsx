import { collection, setDoc, doc } from 'firebase/firestore'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { db } from '../firebase/config'
import { v4 } from 'uuid'
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  useToast,
} from '@chakra-ui/react'

import { useHook } from '../hooks/useFetch'
import { category } from '../enums/category'
import { colours } from '../store/colors'
const AddItemForm = () => {
  const { items, setItems } = useHook()
  const toast = useToast()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => {
    const count = Number(data.count)
    const itemId = v4() // Generate a custom ID
    setDoc(doc(collection(db, 'items'), itemId), {
      id: itemId, // Save the custom ID as a field in the document
      count,
      ...data, // Include other data in the document
    })
    const newItem = { id: itemId, ...data }
    setItems((prevItems) => [...prevItems, newItem])

    toast({
      title: `Uspešné pridanie ${data.name}`,
      position: 'top-right',
      isClosable: true,
      status: 'success',
      duration: 1000,
    })
  }

  return (
    <Flex mt={10} flexDirection="column" mb={10} p={10}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          gap: '1rem',
          display: 'flex',
          flexDirection: 'column',
          background: 'transparent',
        }}
      >
        <InputGroup>
          <InputLeftAddon backgroundColor={colours.primaryColor} color="white">
            Name
          </InputLeftAddon>
          <Input {...register('name')} />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon backgroundColor={colours.primaryColor} color="white">
            Category
          </InputLeftAddon>
          <Select {...register('category')}>
            <option value="rum">Rum</option>
            <option value="vodka">Vodka</option>
            <option value="likery">Liquor</option>
            <option value="whiskey">Whiskey</option>
            <option value="destilaty">Destilates</option>
            <option value="nealko">Non Alkoholic</option>
            <option value="pivo">Beer</option>
            <option value="vino">Wine</option>
            <option value="other">Another alcohol</option>
          </Select>
        </InputGroup>
        <InputGroup>
          <InputLeftAddon backgroundColor={colours.primaryColor} color="white">
            Count
          </InputLeftAddon>
          <Input {...register('count')} type="number" />
        </InputGroup>
        <Button
          type="submit"
          backgroundColor={colours.primaryColor}
          color="white"
        >
          Save
        </Button>
      </form>
    </Flex>
  )
}

export default AddItemForm
