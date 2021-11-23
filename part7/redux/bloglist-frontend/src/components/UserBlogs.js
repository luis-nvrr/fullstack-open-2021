import React from 'react'
import { Navigate } from 'react-router-dom'

const UserBlogs = ({ user }) => {
  if (!user) {
    return <Navigate to="/users" />
  }

  return (
    <div>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserBlogs
