import React, { useRef, useState } from 'react'
import { useAuth } from '../store/authContext'
import { useToast } from '@chakra-ui/react'
import { useNavigate as navigate } from 'react-router'
import { Link } from 'react-router-dom'
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
    <div>
      <h2>SignUp</h2>
      {error && <div>{error}</div>}
      <form
        onSubmit={onSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
      >
        <label>Email</label>
        <input type="email" ref={emailRef} />
        <label>First name</label>
        <input type="text" ref={nameRef} />
        <label>Password</label>
        <input type="password" ref={passwordRef} />
        <label>Confirm Password</label>
        <input type="password" ref={passwordConfirmRef} />
        <div>
          Already have an account? <Link to="/signin">Sign In</Link>
        </div>
        <button>SignUp</button>
      </form>
    </div>
  )
}

export default SignUp
