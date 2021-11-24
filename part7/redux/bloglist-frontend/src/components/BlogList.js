import React from 'react'
import BlogItem from './BlogItem'
import { useSelector } from 'react-redux'

const BlogList = () => {
  const orderBlogsDescendant = (blogs) => {
    return blogs.sort((a, b) => b.likes - a.likes)
  }

  const blogs = useSelector((state) => orderBlogsDescendant(state.blogs))

  return (
    <div id="blog-list">
      <h3>Blogs list</h3>
      {blogs.map((blog) => (
        <BlogItem key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default BlogList
