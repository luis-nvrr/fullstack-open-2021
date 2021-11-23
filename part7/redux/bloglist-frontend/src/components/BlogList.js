import React from 'react'
import BlogItem from './BlogItem'

const BlogList = ({ blogs, likeBlog, deleteBlog, user }) => {
  return (
    <div id='blog-list'>
      <h3>Blogs list</h3>
      {blogs.map((blog) => (
        <BlogItem key={blog.id} blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog} user={user} />
      ))}
    </div>
  )
}

export default BlogList
