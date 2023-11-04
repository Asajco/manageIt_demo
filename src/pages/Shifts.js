import React, { useState } from 'react'
import SignUpForShift from '../components/Shifts/SignUpForShift'
import { Button, Box } from '@chakra-ui/react'

const Shifts = () => {
  const [toggleForm, setToggleForm] = useState(false)
  return (
    <Box minH="80vh">
      <Button onClick={() => setToggleForm(!toggleForm)} mt="1rem">
        {toggleForm ? 'X' : 'Prihlásiť sa na smenu'}
      </Button>
      {toggleForm && <SignUpForShift />}
    </Box>
  )
}

export default Shifts
