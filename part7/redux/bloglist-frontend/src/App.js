/* eslint-disable quotes */
import React from 'react'

import Notification from './components/Notification'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import UsersView from './components/UsersView'
import IndividualBlogView from './components/IndividualBlogView'

import { useSelector, useDispatch } from 'react-redux'
import { Route, Routes, useMatch } from 'react-router-dom'
import { initialize } from './reducers/userReducer'

import './App.css'
import UserBlogs from './components/UserBlogs'

const App = () => {
  const loggedUser = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)
  const blogs = useSelector((state) => state.blogs)
  const dispatch = useDispatch()

  const userMatch = useMatch('/users/:id')
  const userMatched = userMatch ? users.find((user) => user.id === userMatch.params.id) : null

  const blogMatch = useMatch('/blogs/:id')
  const blogMatched = blogMatch ? blogs.find((blog) => blog.id === blogMatch.params.id) : null

  React.useEffect(() => {
    dispatch(initialize())
  }, [])

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
            <Route path="/users/:id" element={<UserBlogs user={userMatched} />} />
            <Route path="/blogs/:id" element={<IndividualBlogView blog={blogMatched} />} />
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
