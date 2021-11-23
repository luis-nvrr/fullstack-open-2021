/* eslint-disable quotes */
import React, { useState, useEffect } from 'react'

import blogService from './services/blogs'
import loginService from './services/login'

import Notification from './components/Notification'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import { setNotification } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'

import './App.css'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem('loggedBloglistAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)

      dispatch(setNotification('Logged in', 'success', 5))
      clearLoginInfo()
    } catch (exception) {
      dispatch(setNotification('Wrong credentials', 'error', 5))
      clearLoginInfo()
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBloglistAppUser')

    blogService.removeToken(user)
    dispatch(setNotification('Logged out', 'success', 5))
    setUser(null)
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const clearLoginInfo = () => {
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <Notification />
      {!user ? (
        <div>
          <h2>login</h2>
          <LoginForm
            username={username}
            password={password}
            handleLogin={handleLogin}
            handleUsernameChange={handleUsernameChange}
            handlePasswordChange={handlePasswordChange}
          />
        </div>
      ) : (
        <div>
          <h2>Blogs App</h2>
          <div className="section">
            <Logout user={user} handleLogout={handleLogout} />
          </div>
          <div className="section">
            <h3>Create new Blog</h3>
            <Togglable buttonLabel="new blog">
              <BlogForm />
            </Togglable>
          </div>
          <BlogList user={user} />
        </div>
      )}
    </div>
  )
}

export default App
