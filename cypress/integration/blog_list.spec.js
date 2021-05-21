describe("Blog app", function() {
  beforeEach(function() {
    cy.request("POST", "http://localhost:3003/api/testing/reset")
    cy.request("POST", "http://localhost:3003/api/users", {
      "username": "testuser",
      "name": "Anon",
      "password": "pass123"
    })
    cy.request("POST", "http://localhost:3003/api/users", {
      "username": "distinct",
      "name": "Some Guy",
      "password": "passw0rd"
    })

    cy.visit("http://localhost:3000")
  })

  it('Login form is shown', function() {
    cy.get("form").get("button").contains("login")
  })

  describe("Login", function() {
    it("succeeds with correct credentials", function() {
      cy.get("#username").type("testuser")
      cy.get("#password").type("pass123")
      cy.contains("login").click()

      cy.contains("Anon logged in")
    })

    it("fails with incorrect credentials", function() {
      cy.get("#username").type("testuser")
      cy.get("#password").type("wrongPassword")
      cy.contains("login").click()

      cy.contains("Error: wrong credentials")
        .should("have.css", "color", "rgb(255, 0, 0)")
    })
  })

  describe("When logged in", function() {
    beforeEach(function() {
      cy.login({ username: "testuser", password: "pass123"})
    })

    it("a blog can be created", function() {
      cy.contains("Create new blog").click()

      cy.get("#title").type("First test blog")
      cy.get("#author").type("Test Author")
      cy.get("#url").type("https://testblog.com")
      cy.get("#submit").click()

      cy.visit('http://localhost:3000')
      cy.contains("First test blog")
    })

    it("a blog can be liked", function() {
      cy.createBlog({
        title: "A Likeable Blog",
        author: "T. Est",
        url: "http:...."
      })

      cy.contains("A Likeable Blog").contains("view").click()
      cy.contains("A Likeable Blog").parent().contains("like").click()
      cy.get(".likes").contains("1")
    })

    it("a user who creates a blog can delete it", function() {
      cy.createBlog({
        title: "A Deletable Blog",
        author: "Mr Author",
        url: "http:...."
      })

      cy.contains("A Deletable Blog").contains("view").click()
      cy.contains("A Deletable Blog").parent().contains("remove").click()
      
      cy.contains("Blog A Deletable Blog deleted successfully")
      cy.get("html").should("not.contain", "Mr Author")
    })

    it("a user who did not create a blog cannot delete it", function() {
      cy.createBlog({
        title: "A Blog To Remain",
        author: "A Different Author",
        url: "http:...."
      })

      cy.contains("logout").click()
      cy.login({ username: "distinct", password: "passw0rd" })
      
      cy.contains("A Blog To Remain").contains("view").click()
      cy.contains("A Blog To Remain").parent().contains("remove").should("have.css", "display", "none")
      cy.contains("A Different Author")
    })

    it("Blogs are ordered by number of likes", function() {
      cy.createBlog({
        title: "Blog Just Right",
        author: "Prolific Author",
        url: "http:...."
      })
      cy.contains("Blog Just Right").contains("view").click()
      cy.likeBlog({ blogTitle: "Blog Just Right", currentLikes: 0})
      cy.likeBlog({ blogTitle: "Blog Just Right", currentLikes: 1})
      
      cy.createBlog({
        title: "Least Liked Blog",
        author: "Prolific Author",
        url: "http:...."
      })
      cy.contains("Least Liked Blog").contains("view").click()
      cy.likeBlog({ blogTitle: "Least Liked Blog", currentLikes: 0})
    
      cy.createBlog({
        title: "Most Liked Blog",
        author: "Prolific Author",
        url: "http:...."
      })
      cy.contains("Most Liked Blog").contains("view").click()
      cy.likeBlog({ blogTitle: "Most Liked Blog", currentLikes: 0})
      cy.likeBlog({ blogTitle: "Most Liked Blog", currentLikes: 1})
      cy.likeBlog({ blogTitle: "Most Liked Blog", currentLikes: 2})

      cy.visit("http://localhost:3000")

      const clickView = () => {
        cy.contains("view").click()
      }
      clickView()
      clickView()
      clickView()

      cy.get(".blog").first().as("firstBlog")
      cy.get("@firstBlog").contains("Most Liked Blog")

      cy.get("@firstBlog").next().as("secondBlog")
      cy.get("@secondBlog").contains("Blog Just Right")

      cy.get("@secondBlog").next().as("thirdBlog")
      cy.get("@thirdBlog").contains("Least Liked Blog")
    })
  })
})