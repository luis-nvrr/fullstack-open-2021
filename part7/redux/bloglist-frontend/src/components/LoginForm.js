import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser, initializeUser } from '../reducers/userReducer'

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
    <form onSubmit={handleLogin}>
      <div>
        username
        <input id="username" type="text" value={username} onChange={handleUsernameChange} />
      </div>
      <div>
        password
        <input id="password" type="password" value={password} name="Password" onChange={handlePasswordChange} />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  )
}

export default LoginForm
