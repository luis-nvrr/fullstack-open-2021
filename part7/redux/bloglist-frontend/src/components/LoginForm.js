/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  Stack,
  Box,
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Text,
  Button,
  Input,
  Center
} from '@chakra-ui/react'
import { loginUser, initializeUser } from '../reducers/loginReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const loginData = { username, password }

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUser())
  }, [0])

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(loginUser(loginData))
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  return (
    <Box maxWidth="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" padding={4} boxShadow="md">
      <Stack spacing={6}>
        <Heading size="lg">Login</Heading>
        <form onSubmit={handleLogin}>
          <FormControl isRequired>
            <FormLabel>Username</FormLabel>
            <Input type="text" value={username} placeholder="username" onChange={handleUsernameChange} />
          </FormControl>
          <FormControl isRequired marginTop={3}>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} placeholder="password" onChange={handlePasswordChange} />
          </FormControl>
          <Center>
            <Button colorScheme="teal" marginTop={3} type="submit">
              Login
            </Button>
          </Center>
        </form>
      </Stack>
    </Box>
  )
}

export default LoginForm
