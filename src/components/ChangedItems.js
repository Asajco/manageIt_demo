import React from 'react'
import { changedItems } from '../functions/changedItems'
import { useHook } from '../hooks/useFetch'
import { Box, Heading, Flex, Text, useToast } from '@chakra-ui/react'
import { db } from '../firebase/config'
import { CheckIcon } from '@chakra-ui/icons'
import { doc, updateDoc } from 'firebase/firestore'
import { PiFileXDuotone } from 'react-icons/pi'
import OutOfItems from './OutOfItems'
import { colours } from '../store/colors'
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

  return (
    <Box
      minH="70vh"
      fontFamily="Roboto"
      border={colours.primaryColor}
      borderWidth="2px"
    >
      {filteredItems.length > 0 ? (
        filteredItems.map((item) => (
          <Flex
            flexDirection="row"
            m={2}
            alignItems="center"
            h="2rem"
            p={5}
            borderRadius="0.2rem"
          >
            <Text>{item.name}</Text>
            <Text m={4}>Left: {item.count}</Text>

            <CheckIcon
              boxSize={5}
              onClick={() => updateItem(item.id)}
              justifySelf="flex-start"
            />
          </Flex>
        ))
      ) : (
        <Flex alignItems="center" flexDirection="column">
          <Heading
            fontFamily="Roboto"
            fontSize="1.4rem"
            mt="2rem"
            textDecoration="underline"
            textDecorationColor={colours.primaryColor}
          >
            No items has been changed
          </Heading>
        </Flex>
      )}
      <OutOfItems />
    </Box>
  )
}

export default ChangedItems
