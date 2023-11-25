import React, { useState } from 'react'
import ToggleColorButton from '../components/ToggleColorButton'
import { Box, Button } from '@chakra-ui/react'
import SignUp from './SignUp'
import AddItemForm from '../components/AddItemForm'
const Settings = () => {
  const [toggleRegistration, setToggleRegistration] = useState(false)
  const [toggleAddNewItem, setToggleAddNewItem] = useState(false)
  return (
    <Box>
      <ToggleColorButton />
      <Button onClick={() => setToggleRegistration(!toggleRegistration)}>
        {toggleRegistration ? 'X' : 'Pridať používateľa'}
      </Button>
      <Button onClick={() => setToggleAddNewItem(!toggleAddNewItem)}>
        {toggleAddNewItem ? 'X' : 'Pridať položku menu'}
      </Button>
      {toggleRegistration && <SignUp />}
      {toggleAddNewItem && <AddItemForm />}
    </Box>
  )
}

export default Settings
