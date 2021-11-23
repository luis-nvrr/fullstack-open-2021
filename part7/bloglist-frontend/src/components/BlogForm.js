import React, { useState, useImperativeHandle } from 'react'

const BlogForm = React.forwardRef((props, ref) => {
  const createBlog = props.createBlog
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleBlogFormSubmit = (event) => {
    event.preventDefault()
    const blog = {
      title: title,
      author: author,
      url: url
    }

    createBlog(blog)
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

  useImperativeHandle(ref, () => {
    return {
      clearBlogInfo
    }
  })

  const clearBlogInfo = () => {
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <div >
      <form id='create-form' onSubmit={handleBlogFormSubmit}>
        <div>
          <label>title</label> <input id='title' value={title} onChange={handleTitleChange} />
        </div>
        <div>
          <label>author</label> <input id='author' value={author} onChange={handleAuthorChange} />
        </div>
        <div>
          <label>url</label> <input id='url' value={url} onChange={handleUrlChange} />
        </div>
        <button id='submit-button' type="submit">save</button>
      </form>
    </div>
  )
})

BlogForm.displayName = 'BlogForm'

export default BlogForm
