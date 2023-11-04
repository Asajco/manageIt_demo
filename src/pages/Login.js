import React, { useState, useRef, FormEvent } from 'react'
import { useAuth } from '../store/authContext'
import { Link, useNavigate } from 'react-router-dom'
import { useMergeRefs, useToast } from '@chakra-ui/react'
const Login = () => {
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, currentUser } = useAuth()
  const navigate = useNavigate()
  const toast = useToast()

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      setError('')
      setLoading(true)
      const loginResult = await login(
        emailRef?.current?.value,
        passwordRef?.current?.value,
      )
      if (loginResult) {
        toast({
          title: 'Úspešné prihlásenie',
          status: 'success',
          position: 'top-right',
          isClosable: true,
          duration: 1000,
        })
        navigate('/')
      } else {
        setError('Failed to sign in')
      }
    } catch (err) {
      console.log(err)
      setError('Failed to sign in')
    }
    setLoading(false)
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
      >
        <label>Email</label>
        <input type="email" ref={emailRef} />
        <label>Password</label>
        <input type="password" ref={passwordRef} />
        <button disabled={loading}>Log In</button>
        <div>
          {/* <div>
            <Link to="/forgot-password">Forgot your password?</Link>
          </div> */}
          <div>
            Need an account? <Link to="/sign-up">Sign Up</Link>
          </div>
          {error}
        </div>
      </form>
    </div>
  )
}

export default Login
