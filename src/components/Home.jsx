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
import { colours } from '../store/colors'
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
    <Box p={13} maxHeight="70.5vh" mb="4rem">
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          borderRadius: '0.5rem',
          padding: '0.5rem',
          // borderWidth: '2px',
          // borderColor: '#34cb91',
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
            Select category
          </option>
          <option value="rum">Rum</option>
          <option value="vodka">Vodka</option>
          <option value="likery">Liquor</option>
          <option value="whiskey">Whiskey</option>
          <option value="destilaty">Destilates</option>
          <option value="nealko">Non alcoholic</option>
          <option value="other">Other alcohol</option>
          <option value="pivo">Beer</option>
          <option value="vino">Wine</option>
          <option value="snacks">Snack</option>
        </Select>
        <Input
          {...register('name')}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name of item..."
        />
        <Button onClick={() => setCategory('')} mt={3} colorScheme="green">
          Delete filter
        </Button>
      </form>
      <Grid
        gap={6}
        templateColumns="repeat(2, 1fr)"
        mt={2}
        borderColor={colours.primaryColor}
        borderWidth="2px"
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
