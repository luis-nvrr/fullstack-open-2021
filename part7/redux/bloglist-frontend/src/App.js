/* eslint-disable quotes */
import React from 'react'

import Notification from './components/Notification'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import { useSelector } from 'react-redux'

import './App.css'

const App = () => {
  const user = useSelector((state) => state.user)

  return (
    <div>
      <Notification />
      {!user ? (
        <div>
          <h2>login</h2>
          <LoginForm />
        </div>
      ) : (
        <div>
          <h2>Blogs App</h2>
          <div className="section">
            <Logout />
          </div>
          <div className="section">
            <h3>Create new Blog</h3>
            <Togglable buttonLabel="new blog">
              <BlogForm />
            </Togglable>
          </div>
          <BlogList />
        </div>
      )}
    </div>
  )
}

export default App
