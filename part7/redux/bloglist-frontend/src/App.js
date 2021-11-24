/* eslint-disable quotes */
import React from 'react'

import Notification from './components/Notification'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import UsersView from './components/UsersView'
import IndividualBlogView from './components/IndividualBlogView'
import Menu from './components/Menu'

import { useSelector, useDispatch } from 'react-redux'
import { Route, Routes, useMatch, Navigate } from 'react-router-dom'
import { initialize as initializeUser } from './reducers/userReducer'
import { initialize as initializeBlog } from './reducers/blogReducer'

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
    dispatch(initializeUser())
    dispatch(initializeBlog())
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
          <Menu />
          <h2>Blogs App</h2>
          <div className="section"></div>
          <Routes>
            <Route path="/users/:id" element={<UserBlogs user={userMatched} />} />
            <Route path="/blogs/:id" element={<IndividualBlogView blog={blogMatched} />} />
            <Route path="/users" element={<UsersView />} />
            <Route
              path="/blogs"
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
            <Route path="*" element={<Navigate to="/blogs" />} />
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
