/* eslint-disable quotes */
import React, { useState, useEffect, useRef } from 'react'

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
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(orderBlogsDescendant(blogs)))
  }, [])

  const orderBlogsDescendant = (blogs) => {
    return blogs.sort((a, b) => b.likes - a.likes)
  }

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

  const createBlog = async (blog) => {
    try {
      const newBlog = await blogService.create(blog)
      setBlogs(blogs.concat(newBlog))

      blogFormRef.current.toggleVisibility()
      blogRef.current.clearBlogInfo()
      dispatch(setNotification('Blog created successfully', 'success', 5))
    } catch (exception) {
      dispatch(setNotification("Blog couldn't be created", 'error', 5))
    }
  }

  const deleteBlog = async (deletedBlog) => {
    try {
      if (!window.confirm(`Are you sure you want to remove ${deletedBlog.title}`)) return
      await blogService.remove(deletedBlog)
      setBlogs(blogs.filter((blog) => blog.id !== deletedBlog.id))
      dispatch(setNotification('Blog deleted successfully', 'success', 5))
    } catch (exception) {
      dispatch(setNotification("Blog couldn't be deleted", 'error', 5))
    }
  }

  const likeBlog = async (blog) => {
    try {
      const likedBlog = { likes: blog.likes++, ...blog }
      const updatedBlog = await blogService.update(likedBlog)
      const orderedBlogs = orderBlogsDescendant(blogs.map((blog) => (blog.id === likedBlog.id ? updatedBlog : blog)))
      setBlogs(orderedBlogs)
      dispatch(setNotification('Blog liked successfully', 'success', 5))
    } catch (exception) {
      console.log(exception)
      dispatch(setNotification("Blog couldn't be liked", 'error', 5))
    }
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

  const blogFormRef = useRef()
  const blogRef = useRef()

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
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
              <BlogForm createBlog={createBlog} ref={blogRef} />
            </Togglable>
          </div>
          <div className="section"></div>
          <BlogList blogs={blogs} likeBlog={likeBlog} deleteBlog={deleteBlog} user={user} />
        </div>
      )}
    </div>
  )
}

export default App
