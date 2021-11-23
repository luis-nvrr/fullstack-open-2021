import React from 'react'
import BlogItem from './BlogItem'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { initialize } from '../reducers/blogReducer'

const BlogList = ({ likeBlog, deleteBlog, user }) => {
  const orderBlogsDescendant = (blogs) => {
    return blogs.sort((a, b) => b.likes - a.likes)
  }

  const blogs = useSelector((state) => (state.blogs ? orderBlogsDescendant(state.blogs) : state.blogs))
  console.log(blogs)

  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(initialize())
  }, [])

  return (
    <div id="blog-list">
      <h3>Blogs list</h3>
      {blogs.map((blog) => (
        <BlogItem key={blog.id} blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog} user={user} />
      ))}
    </div>
  )
}

export default BlogList
