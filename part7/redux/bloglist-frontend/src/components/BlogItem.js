import React from 'react'
import { Link } from 'react-router-dom'

const BlogItem = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div className="blogListItem" style={blogStyle}>
      <label>
        <label className="blogItem">
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </label>
      </label>
    </div>
  )
}

export default BlogItem
