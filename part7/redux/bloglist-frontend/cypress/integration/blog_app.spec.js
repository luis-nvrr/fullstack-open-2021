describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'Luis Navarro',
      username: 'luis',
      password: 'navarro'
    }
    cy.createUser(user)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('luis')
      cy.get('#password').type('navarro')
      cy.get('#login-button').click()

      cy.get('.success')
        .should('contain', 'Logged in')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('luis')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Luis Navarro logged in')

    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username:'luis', password:'navarro' })
    })

    it('A blog can be created', function() {
      cy.get('#show-togglable-button').click()
      cy.get('#title').type('cypress test')
      cy.get('#author').type('cypress')
      cy.get('#url').type('example.com')

      cy.get('#submit-button').click()
      cy.get('#blog-list').contains('cypress test cypress')
    })


    describe('a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'cypress existing blog',
          author: 'cypress',
          url: 'cypress.io'
        })

        cy.contains('cypress existing blog cypress').parent().parent().as('blog')
        cy.get('@blog').find('button').as('showDetailsButton')
        cy.get('@showDetailsButton').click()
      })

      it('it can be liked', function () {
        cy.get('@blog').find('button').eq(1).as('likeButton')
        cy.get('@likeButton').click()
        cy.get('@likeButton').should('contain','like')

        cy.get('@blog').contains('likes: 1')
        cy.get('html').should('contain', 'Blog liked successfully')
      })

      it('it can be deleted', function (){
        cy.get('@blog').find('button').eq(2).as('deleteButton')
        cy.get('@deleteButton').should('contain','remove')
        cy.get('@deleteButton').click()

        cy.get('html').should('contain', 'Blog deleted successfully')
        cy.get('html').should('not.contain', 'cypress existing blog')
      })
    })

    describe('and several blogs exists', function(){
      beforeEach(function () {
        cy.createBlog({
          title: 'cypress 1',
          author: 'cypress',
          url: 'cypress.io',
          likes: 1
        })

        cy.createBlog({
          title: 'jest 2',
          author: 'jest',
          url: 'jest.io',
          likes:2
        })

        cy.createBlog({
          title: 'react testing library',
          author: 'react',
          url: 'testing-library.com',
          likes:3
        })
      })

      it('a user cannot delete other user\'s notes', function(){
        cy.get('#logout-button').click()
        cy.createUser({ name: 'root', username: 'admin', password: 'admin' })
        cy.login({ username:'admin', password:'admin' })

        cy.contains('cypress 1 cypress').parent().parent().as('blog')
        cy.get('@blog').find('button').as('showDetailsButton')
        cy.get('@showDetailsButton').click()

        cy.get('@blog').should('not.contain','remove')
      })

      it('the blogs are ordered in descendant order', function (){

        cy.get('.showDetailsButton')
          .then(buttons => {
            for(let i = 0; i < buttons.length; i++ ){
              cy.wrap(buttons[i]).click()
            } })
          .get('.likesBadge')
          .then(badges => {
            let values = [3,2,1]

            badges.map((i, el) => {
              cy.wrap(el).contains(values[i])
            })

          })
      })
    })
  })
})