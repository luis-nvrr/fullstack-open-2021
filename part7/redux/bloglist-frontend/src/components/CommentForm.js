import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createComment } from '../reducers/blogReducer'

const CommentForm = ({ blog }) => {
  const [content, setContent] = useState('')
  const dispatch = useDispatch()

  const handleCommentFormSubmit = (event) => {
    event.preventDefault()
    const comment = { content }
    setContent('')
    dispatch(createComment(comment, blog))
  }

  const handleContentChange = (event) => {
    setContent(event.target.value)
  }

  return (
    <div>
      <form onSubmit={handleCommentFormSubmit}>
        <div>
          <label>content</label> <input value={content} onChange={handleContentChange} />
        </div>
        <button type="submit">comment</button>
      </form>
    </div>
  )
}

export default CommentForm
