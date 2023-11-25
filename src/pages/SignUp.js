import React, { useRef, useState } from 'react'
import { useAuth } from '../store/authContext'
import {
  Box,
  Button,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  useToast,
} from '@chakra-ui/react'
import { useNavigate as navigate } from 'react-router'
import { Link } from 'react-router-dom'
import { colors } from '../store/colors'
const SignUp = () => {
  const emailRef = useRef(null)
  const { signup } = useAuth()
  const passwordRef = useRef(null)
  const nameRef = useRef(null)
  const [error, setError] = useState('')
  const toast = useToast()
  const passwordConfirmRef = useRef(null)
  const onSubmit = async (e) => {
    e.preventDefault()
    if (passwordRef.current?.value !== passwordConfirmRef.current?.value) {
      return setError('Passwords do not match')
    }
    try {
      setError('')

      await signup(
        emailRef.current?.value,
        passwordRef.current?.value,
        nameRef.current?.value,
      )
      navigate('/')
      toast({
        title: 'Nice',
        status: 'success',
        position: 'top-right',
      })
    } catch (err) {
      console.log(err)
      setError('Failed to create an account')
    }
  }
  return (
    <Box>
      <Heading>Registrácia</Heading>
      {error && <div>{error}</div>}
      <form
        onSubmit={onSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          padding: '0.5rem',
        }}
      >
        <InputGroup>
          <InputLeftAddon bg={colors.primaryBreak} color="white">
            Email
          </InputLeftAddon>
          <Input type="email" ref={emailRef} />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon bg={colors.primaryBreak} color="white">
            Meno
          </InputLeftAddon>
          <Input type="text" ref={nameRef} />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon bg={colors.primaryBreak} color="white">
            Heslo
          </InputLeftAddon>
          <Input type="password" ref={passwordRef} />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon bg={colors.primaryBreak} color="white">
            Potvrdenie hesla
          </InputLeftAddon>
          <Input type="password" ref={passwordConfirmRef} />
        </InputGroup>

        <Button colorScheme="red" mt="1rem" type="submit">
          Vytvor účet
        </Button>
      </form>
    </Box>
  )
}

export default SignUp
