import React, { useState, useEffect, useRef } from 'react'

import blogService from './services/blogs'
import loginService from './services/login'

import Notification from './components/Notification'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [notificationType, setNotificationType] = useState('')

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

      showMessage('Logged in', 'success')
      clearLoginInfo()
    } catch (exception) {
      showMessage('Wrong credentials', 'error')
      clearLoginInfo()
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBloglistAppUser')

    blogService.removeToken(user)
    showMessage('Logged out', 'success')
    setUser(null)
  }

  const createBlog = async (blog) => {
    try {
      const newBlog = await blogService.create(blog)
      setBlogs(blogs.concat(newBlog))

      blogFormRef.current.toggleVisibility()
      blogRef.current.clearBlogInfo()
      showMessage('Blog created successfully', 'success')
    } catch (exception) {
      showMessage('Blog couldn\'t be created', 'error')
    }
  }

  const deleteBlog = async (deletedBlog) => {
    try {
      if (!window.confirm(`Are you sure you want to remove ${deletedBlog.title}`)) return
      await blogService.remove(deletedBlog)
      setBlogs(blogs.filter((blog) => blog.id !== deletedBlog.id))
      showMessage('Blog deleted successfully', 'success')
    } catch (exception) {
      showMessage('Blog couldn\'t be deleted', 'error')
    }
  }

  const likeBlog = async (blog) => {
    try {
      const likedBlog = { likes: blog.likes++, ...blog }
      const updatedBlog = await blogService.update(likedBlog)
      const orderedBlogs = orderBlogsDescendant(blogs.map((blog) => (blog.id === likedBlog.id ? updatedBlog : blog)))
      setBlogs(orderedBlogs)
      showMessage('Blog liked successfully', 'success')
    } catch (exception) {
      console.log(exception)
      showMessage('Blog couldn\'t be liked', 'error')
    }
  }

  const showMessage = (message, type) => {
    setMessage(message)
    setNotificationType(type)
    setTimeout(() => {
      setMessage(null)
      setNotificationType('')
    }, 5000)
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
      {message && <Notification message={message} notificationType={notificationType} />}
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
