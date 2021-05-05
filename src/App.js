import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import ErrorMessage from "./components/ErrorMessage"
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
            <BlogForm 
              blogs={blogs}
              setBlogs={(blogs) => setBlogs(blogs)}
              errorMessage={errorMessage}
              setErrorMessage={(errorMessage) => setErrorMessage(errorMessage)}
            />
          </div>
      }
    </div>
  )
}

export default App