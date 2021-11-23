/* eslint-disable quotes */
import React from 'react'

import Notification from './components/Notification'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import UsersView from './components/UsersView'

import { useSelector } from 'react-redux'
import { Route, Routes, useMatch } from 'react-router-dom'

import './App.css'
import UserBlogs from './components/UserBlogs'

const App = () => {
  const loggedUser = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)
  const match = useMatch('/users/:id')
  const userMatch = match ? users.find((user) => user.id === match.params.id) : null

  return (
    <div>
      <Notification />
      {!loggedUser ? (
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
          <Routes>
            <Route path="/users/:id" element={<UserBlogs user={userMatch} />} />
            <Route path="/users" element={<UsersView />} />
            <Route
              path="/"
              element={
                <div className="section">
                  <h3>Create new Blog</h3>
                  <Togglable buttonLabel="new blog">
                    <BlogForm />
                  </Togglable>
                  <BlogList />
                </div>
              }
            />
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
