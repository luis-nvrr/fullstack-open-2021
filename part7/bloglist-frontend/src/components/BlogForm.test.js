import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { prettyDOM } from '@testing-library/dom'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('blog create handler is called with the right details', () => {
  const createMockHandler = jest.fn()

  const blog = {
    title: 'JEST blog',
    author: 'JEST',
    url: 'jest.com'
  }

  const component = render(
    <BlogForm
      createBlog={createMockHandler}
    />
  )

  const form = component.container.querySelector('#create-form')
  const titleInput = component.container.querySelector('#title')
  const authorInput = component.container.querySelector('#author')
  const urlInput = component.container.querySelector('#url')

  fireEvent.change(titleInput, {
    target: { value: blog.title }
  })

  fireEvent.change(authorInput, {
    target: { value: blog.author }
  })

  fireEvent.change(urlInput, {
    target: { value: blog.url }
  })

  fireEvent.submit(form)

  const newBlog = createMockHandler.mock.calls[0][0]

  expect(newBlog.title).toEqual(blog.title)
  expect(newBlog.author).toEqual(blog.author)
  expect(newBlog.url).toEqual(blog.url)
})