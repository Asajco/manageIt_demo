import { Text } from '@chakra-ui/react'
import React from 'react'

const ErrorMessage = (props) => {
  return (
    <Text mt={0.5} mb="0.5rem" ml="0.5rem" color="red">
      {props.text}
    </Text>
  )
}

export default ErrorMessage
