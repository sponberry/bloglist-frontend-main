import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import ErrorMessage from "./components/ErrorMessage"
import Togglable from "./components/Togglable"
import blogService from './services/blogs'
import loginService from './services/login'

import "./styles/app.css"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const userJSONData = window.localStorage.getItem("loggedInUser")
    if (userJSONData) {
      const user = JSON.parse(userJSONData)
      setUser(user)
    }
  }, [])

  const handleLogout = () => {
    setUser(null)
    loginService.logout()
  }

  const newBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      setErrorMessage(`Success! Added new blog: ${newBlog.title} by ${newBlog.author}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage("Error: Unauthorized user token")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const blogFormRef = useRef()

  return (
    <div>
      {errorMessage !== null
        ? <ErrorMessage message={errorMessage} />
        : <div></div>
      }
      {user === null
        ? <LoginForm
            user={user}
            setUser={(user) => setUser(user)}
            errorMessage={errorMessage}
            setErrorMessage={(errorMessage) => setErrorMessage(errorMessage)}
          />
        : <div>
            <h2>blogs</h2>
            <p>{user.name} logged in</p>
            <button onClick={handleLogout}>
              logout
            </button>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
            <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
              <BlogForm newBlog={newBlog} />
            </Togglable>
          </div>
      }
    </div>
  )
}

export default App