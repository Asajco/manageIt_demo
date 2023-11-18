import { collection, setDoc, doc } from 'firebase/firestore'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { db } from '../firebase/config'
import { v4 } from 'uuid'
import { Flex, useToast } from '@chakra-ui/react'

import { useHook } from '../hooks/useFetch'
import { category } from '../enums/category'
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
    <Flex mt={20} backgroundColor="lightgrey" flexDirection="column" mb={10}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('name')} />
        <select {...register('category')}>
          <option value="rum">Rum</option>
          <option value="vodka">Vodka</option>
          <option value="likery">Likéry</option>
          <option value="whiskey">Whiskey</option>
          <option value="destilaty">Destiláty</option>
          <option value="nealko">Nealko</option>
          <option value="pivo">Pivo</option>
          <option value="vino">Víno</option>
          <option value="other">Ostatný alkohol</option>
        </select>

        <input {...register('count')} type="number" />
        <input type="submit" />
      </form>
    </Flex>
  )
}

export default AddItemForm
