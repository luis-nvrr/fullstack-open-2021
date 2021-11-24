import React from 'react'
import BlogItem from './BlogItem'
import { useSelector } from 'react-redux'
import { Heading, List, Stack } from '@chakra-ui/react'

const BlogList = () => {
  const orderBlogsDescendant = (blogs) => {
    return blogs.sort((a, b) => b.likes - a.likes)
  }

  const blogs = useSelector((state) => orderBlogsDescendant(state.blogs))

  return (
    <Stack>
      <Heading size="lg">Blogs list</Heading>
      <List>
        {blogs.map((blog) => (
          <BlogItem key={blog.id} blog={blog} />
        ))}
      </List>
    </Stack>
  )
}

export default BlogList
