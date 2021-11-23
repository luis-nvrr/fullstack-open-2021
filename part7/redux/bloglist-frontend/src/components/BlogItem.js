import React, { useState } from 'react'
import BlogDetails from './BlogDetails'

const BlogItem = ({ blog, likeBlog, user }) => {
  const [visible, setVisible] = useState(false)
  const buttonLabel = visible ? 'hide' : 'view'

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleDetailsClick = () => {
    setVisible(!visible)
  }

  return (
    <div className="blogListItem" style={blogStyle}>
      <label>
        <label className="blogItem">
          {blog.title} {blog.author}
        </label>
        <button className="showDetailsButton" onClick={handleDetailsClick}>
          {buttonLabel}
        </button>
      </label>

      {visible && <BlogDetails blog={blog} likeBlog={likeBlog} user={user} />}
    </div>
  )
}

export default BlogItem
