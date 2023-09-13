import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

const Footer = () => {
  return (
    <Flex
      backgroundColor="#b31b22"
      h="4rem"
      mt={2}
      alignItems="center"
      justifyContent="center"
    >
      <Text color="white" fontFamily="Poppins">
        Designed by Break Bar{' '}
      </Text>
    </Flex>
  )
}

export default Footer
