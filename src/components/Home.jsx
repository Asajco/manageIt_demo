import React, { useState } from 'react'
import { useHook } from '../hooks/useFetch'

import { useForm } from 'react-hook-form'
import { filteredData } from '../functions/filterData'
import { db } from '../firebase/config'
import { doc, updateDoc } from 'firebase/firestore'
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Input,
  Select,
  Text,
} from '@chakra-ui/react'
const Home = () => {
  const { loading, items, setItems } = useHook()
  const [category, setCategory] = useState('')
  const [name, setName] = useState('')
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = (category) => {
    setCategory(category)
  }

  const updateItemCount = (itemId, newCount) => {
    // Update the count in the state first
    const updatedItems = items.map((item) =>
      item.id === itemId ? { ...item, count: Number(newCount) } : item,
    )
    setItems(updatedItems)

    // Update the count in Firebase
    const docRef = doc(db, 'items', itemId)
    updateDoc(docRef, { count: Number(newCount), hasBeenChanged: true })
  }

  return (
    <Box p={3} minHeight="70.5vh" color="black">
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          padding: '0.5rem',
        }}
      >
        <Select
          {...register('category')}
          onChange={(e) => setCategory(e.target.value)}
          mb={2}
          outline="none"
          value={category}
        >
          <option value="" disabled>
            Vyber kategóriu
          </option>
          <option value="rum">Rum</option>
          <option value="vodka">Vodka</option>
          <option value="likery">Likéry</option>
          <option value="whiskey">Whiskey</option>
          <option value="destilaty">Destiláty</option>
          <option value="nealko">Nealko</option>
          <option value="other">Ostatný alkohol</option>
          <option value="snacks">Snacky</option>
        </Select>
        <Input
          {...register('name')}
          onChange={(e) => setName(e.target.value)}
          placeholder="Názov produktu..."
        />
        <Button onClick={() => setCategory('')} mt={3} colorScheme="red">
          Vymaž filter
        </Button>
      </form>
      <Grid
        gap={6}
        templateColumns="repeat(2, 1fr)"
        mt={2}
        backgroundColor="white"
        borderRadius="0.4rem"
        p={3}
      >
        {filteredData(items, category, name).map((item, index) => (
          <GridItem key={index}>
            <Flex alignItems="center" flexDirection="column">
              <Text>{item.name}</Text>
              <Flex gap={2}>
                <Button
                  onClick={() => {
                    const newCount = item.count != 0 && item.count - 1
                    updateItemCount(item.id, newCount)
                  }}
                  size="xs"
                >
                  -
                </Button>
                <Text>{item.count}</Text>

                <Button
                  onClick={() => {
                    const newCount = item.count + 1
                    updateItemCount(item.id, newCount)
                  }}
                  size="xs"
                >
                  +
                </Button>
              </Flex>
            </Flex>
          </GridItem>
        ))}
      </Grid>
    </Box>
  )
}

export default Home
