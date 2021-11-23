import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { prettyDOM } from '@testing-library/dom'
import { render, fireEvent } from '@testing-library/react'
import BlogItem from './BlogItem'

test('renders blog\'s title & author', () => {
  const blog = {
    title : 'Component testing is done with react-testing-library',
    url: 'example.com',
    likes: '12',
    author : 'admin',
  }

  const component = render(
    <BlogItem
      blog={blog}
    />
  )

  const label = component.container.querySelector('.blogItem')

  expect(label.textContent).toEqual(`${blog.title} ${blog.author}`)
})

test('clicking the like button twice calls event handler two times', () => {
  const user = {
    username : 'admin'
  }

  const blog = {
    title : 'Component testing is done with react-testing-library',
    url: 'example.com',
    likes: '12',
    author : 'admin',
    user : user
  }

  const likeMockHandler = jest.fn()
  const deleteMockHandler = jest.fn()

  const component = render(
    <BlogItem blog={blog} likeBlog={likeMockHandler} deleteBlog={deleteMockHandler} user={user}/>
  )

  const showDetailsButton = component.container.querySelector('.showDetailsButton')
  fireEvent.click(showDetailsButton)

  const likeButton = component.container.querySelector('.likeButton')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(likeMockHandler.mock.calls).toHaveLength(2)
})

test('details are showed when the view button is clicked', () => {
  const user = {
    username : 'admin'
  }

  const blog = {
    title : 'Component testing is done with react-testing-library',
    url: 'example.com',
    likes: '12',
    author : 'admin',
    user : user
  }

  const likeMockHandler = jest.fn()
  const deleteMockHandler = jest.fn()

  const component = render(
    <BlogItem blog={blog} likeBlog={likeMockHandler} deleteBlog={deleteMockHandler} user={user}/>
  )

  const showDetailsButton = component.container.querySelector('.showDetailsButton')
  fireEvent.click(showDetailsButton)

  const likesCountLabel = component.container.querySelector('.likesCountLabel')
  const urlLabel = component.container.querySelector('.urlLabel')

  expect(likesCountLabel.textContent).toEqual(`likes: ${blog.likes}`)
  expect(urlLabel.textContent).toEqual(`url: ${blog.url}`)
})

