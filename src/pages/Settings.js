import React, { useState } from 'react'
import ToggleColorButton from '../components/ToggleColorButton'
import {
  Box,
  Button,
  Heading,
  AccordionIcon,
  AccordionPanel,
  AccordionItem,
  Accordion,
  AccordionButton,
} from '@chakra-ui/react'
import SignUp from './SignUp'
import AddItemForm from '../components/AddItemForm'
import { useHook } from '../hooks/useFetch'
import moment from 'moment'
const Settings = () => {
  const [toggleRegistration, setToggleRegistration] = useState(false)
  const [toggleAddNewItem, setToggleAddNewItem] = useState(false)
  const { workTime } = useHook()

  return (
    <Box mt="2rem">
      {/* <ToggleColorButton /> */}
      <Button
        onClick={() => setToggleRegistration(!toggleRegistration)}
        mr="1rem"
      >
        {toggleRegistration ? 'X' : 'Add user'}
      </Button>
      <Button onClick={() => setToggleAddNewItem(!toggleAddNewItem)}>
        {toggleAddNewItem ? 'X' : 'Add item to storage'}
      </Button>

      {toggleRegistration && <SignUp />}
      {toggleAddNewItem && <AddItemForm />}
      <Heading
        fontFamily="Poppins"
        fontWeight="bold"
        mt="3rem"
        fontSize="1.5rem"
      >
        Hours worked
      </Heading>
      <Accordion allowMultiple defaultIndex={[0]} mb="1rem">
        {workTime &&
          Object.entries(workTime)
            .sort()
            .map(([date, nestedArray]) => (
              <AccordionItem
                display="flex"
                key={date}
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                fontFamily="Poppins"
                m="1rem"
              >
                <AccordionButton
                  fontWeight="bold"
                  m="0.5rem"
                  textDecoration="underline"
                  textAlign="center"
                  textUnderlineOffset="0.3rem"
                >
                  {moment(Number(date)).format('DD. MM. YYYY')}
                  <AccordionIcon />
                </AccordionButton>

                {nestedArray &&
                  Object.values(nestedArray).map((item, index) => (
                    <AccordionPanel key={index}>
                      {item.name} {item.time}
                    </AccordionPanel>
                  ))}
              </AccordionItem>
            ))}
      </Accordion>
    </Box>
  )
}

export default Settings
