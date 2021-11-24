import React from 'react'
import { Link } from 'react-router-dom'
import { Link as ChakraLink, ListItem, ListIcon } from '@chakra-ui/react'
import { BiNote } from 'react-icons/bi'

const BlogItem = ({ blog }) => {
  return (
    <ListItem>
      <ChakraLink>
        <Link to={`/blogs/${blog.id}`}>
          <ListIcon as={BiNote} color="green.500" />
          {blog.title} {blog.author}
        </Link>
      </ChakraLink>
    </ListItem>
  )
}

export default BlogItem
