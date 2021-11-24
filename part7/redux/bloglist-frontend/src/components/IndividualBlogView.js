import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import { Navigate } from 'react-router'

const IndividualBlogView = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const deleteButtonStyle = {
    backgroundColor: '#008CBA'
  }

  const handleLikeBlog = (event) => {
    event.preventDefault()
    dispatch(likeBlog(blog))
  }

  const handleDeleteBlog = (event) => {
    event.preventDefault()
    if (!window.confirm(`Are you sure you want to remove ${blog.title}`)) return
    dispatch(deleteBlog(blog))
  }

  if (!blog) {
    return <Navigate to="/" />
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <a href={blog.url}>{blog.url}</a>
      <div>
        <label>
          likes: <span>{blog.likes}</span>
        </label>{' '}
        <button onClick={handleLikeBlog}>like</button>
      </div>
      <div>author: {blog.author}</div>
      {user.username === blog.user.username && (
        <button style={deleteButtonStyle} onClick={handleDeleteBlog}>
          remove
        </button>
      )}
    </div>
  )
}

export default IndividualBlogView