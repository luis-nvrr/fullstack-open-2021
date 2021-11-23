import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = ({ toggleVisibility }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const handleBlogFormSubmit = (event) => {
    event.preventDefault()
    const blog = {
      title: title,
      author: author,
      url: url
    }

    dispatch(createBlog(blog))
    clearBlogInfo()
    toggleVisibility()
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const clearBlogInfo = () => {
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <div>
      <form id="create-form" onSubmit={handleBlogFormSubmit}>
        <div>
          <label>title</label> <input id="title" value={title} onChange={handleTitleChange} />
        </div>
        <div>
          <label>author</label> <input id="author" value={author} onChange={handleAuthorChange} />
        </div>
        <div>
          <label>url</label> <input id="url" value={url} onChange={handleUrlChange} />
        </div>
        <button id="submit-button" type="submit">
          save
        </button>
      </form>
    </div>
  )
}

export default BlogForm
