import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

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
      
      {user === null
        ? <LoginForm
            user={user}
            setUser={(user) => setUser(user)}
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
            />
          </div>
      }
    </div>
  )
}

export default App