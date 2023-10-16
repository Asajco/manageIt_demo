import React from 'react'
import { changedItems } from '../functions/changedItems'
import { useHook } from '../hooks/useFetch'
import { Box, Button, Flex, Text, useToast } from '@chakra-ui/react'
import { db } from '../firebase/config'
import { CheckIcon } from '@chakra-ui/icons'
import { doc, updateDoc } from 'firebase/firestore'
import { PiFileXDuotone } from 'react-icons/pi'
import OutOfItems from './OutOfItems'
const ChangedItems = () => {
  const { setItems, items, setLowItemsCount } = useHook()
  const toast = useToast()

  const updateItem = (itemId) => {
    const docRef = doc(db, 'items', itemId)
    updateDoc(docRef, { hasBeenChanged: false })
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId))
    toast({
      title: 'Zmenený status',
      status: 'success',
      position: 'top-right',
      isClosable: true,
      duration: 1000,
    })
  }
  let filteredItems = changedItems(items).filter((item) => item.hasBeenChanged)
  console.log(filteredItems.length)
  return (
    <Box minH="70vh" fontFamily="Roboto">
      {filteredItems.length > 0 ? (
        filteredItems.map((item) => (
          <Flex
            flexDirection="row"
            backgroundColor="white"
            m={2}
            alignItems="center"
            h="2rem"
            p={5}
            borderRadius="0.2rem"
          >
            <Text>{item.name}</Text>
            <Text m={4}>Zostatok: {item.count}</Text>

            <CheckIcon
              boxSize={5}
              onClick={() => updateItem(item.id)}
              justifySelf="flex-start"
            />
          </Flex>
        ))
      ) : (
        <Flex alignItems="center" flexDirection="column">
          <Text fontFamily="Roboto" mt="3rem">
            Žiadne položky neboli zmenené
          </Text>
        </Flex>
      )}
      <OutOfItems />
    </Box>
  )
}

export default ChangedItems
