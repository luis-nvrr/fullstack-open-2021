import React from 'react'

const BlogDetails = ({ blog, likeBlog, deleteBlog, user }) => {
  const deleteButtonStyle = {
    backgroundColor: '#008CBA'
  }

  const handleLikeBlog = (event) => {
    event.preventDefault()
    likeBlog(blog)
  }

  const handleDeleteBlog = (event) => {
    event.preventDefault()
    deleteBlog(blog)
  }

  return (
    <div>
      <div>title: {blog.title}</div>
      <div className='urlLabel'>url: {blog.url}</div>
      <div>
        <label className='likesCountLabel'>likes: <span className='likesBadge'>{blog.likes}</span></label> <button className='likeButton' onClick={handleLikeBlog}>like</button>
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
export default BlogDetails
