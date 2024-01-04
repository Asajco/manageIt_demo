import React from 'react'
import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Th,
  Tr,
  Thead,
  Button,
  forwardRef,
} from '@chakra-ui/react'
import moment from 'moment'
import { useDisclosure } from '@chakra-ui/react' // Import useDisclosure
import { useHook } from '../hooks/useFetch'
import UzavierkaModal from '../components/Facturation/UzavierkaModal'

const Facturation = () => {
  const { isOpen, onOpen, onClose } = useDisclosure() // Use useDisclosure
  const { uzavierky } = useHook()

  const StyledTh = forwardRef((props, ref) => (
    <Th
      ref={ref}
      textAlign="center"
      fontWeight="bold"
      fontSize={15}
      {...props}
    ></Th>
  ))
  StyledTh.displayName = 'StyledTh'
  const sortedUzavierky = [...uzavierky].sort((a, b) =>
    moment(a.date).diff(moment(b.date)),
  )
  console.log(uzavierky)
  return (
    <Box w="100vw" minH="100vh">
      <UzavierkaModal isOpen={isOpen} />{' '}
      <TableContainer w="100vw">
        <Table variant="simple" colorScheme="green">
          <Thead>
            <StyledTh ml="2rem">Date</StyledTh>
            <StyledTh>Terminal</StyledTh>
            <StyledTh>Games</StyledTh>
            <StyledTh>Cash</StyledTh>
            <StyledTh>Total</StyledTh>
            <StyledTh>Total in cashier</StyledTh>
          </Thead>
          <Tbody w="100%">
            {sortedUzavierky.reverse().map((uzavierka, index) => (
              <Tr key={index} placeItems="center">
                <StyledTh>
                  {moment(uzavierka.date).format('DD MM YYYY')}
                </StyledTh>
                <StyledTh>{uzavierka.terminal} €</StyledTh>
                <StyledTh>{uzavierka.games} €</StyledTh>
                <StyledTh>{uzavierka.cash} €</StyledTh>
                <StyledTh>{uzavierka.totalInCash} €</StyledTh>
                <StyledTh>{uzavierka.totalInCashier} €</StyledTh>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {/* Pass isOpen and onClose directly */}
    </Box>
  )
}

export default Facturation
