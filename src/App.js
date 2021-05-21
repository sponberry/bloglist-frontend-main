import React, { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import ErrorMessage from "./components/ErrorMessage"
import Togglable from "./components/Togglable"
import blogService from "./services/blogs"
import loginService from "./services/login"

import "./styles/app.css"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    async function fetchAll() {
      let blogs = await blogService.getAll()
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs( blogs )
    }
    fetchAll()
  }, [])

  useEffect(async () => {
    let mounted = true
    const userJSONData = window.localStorage.getItem("loggedInUser")
    if (userJSONData && mounted) {
      const user = JSON.parse(userJSONData)

      const response = await loginService.checkLoginData({ username: user.username })

      if (response && response === 200) {
        setUser(user)
        blogService.setToken(user.token)
      } else {
        setUser(null)
        loginService.logout()
        setErrorMessage("Error: you have been logged out")
        clearErrorMessage()
      }
    } else {
      setUser(null)
      loginService.logout()
      setErrorMessage("Error: you have been logged out")
      clearErrorMessage()
    }

    return () => mounted = false
  }, [])

  const clearErrorMessage = () => {
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const idleTimeout = () => {
    let time
    window.onload = resetTimer

    document.onmousemove = resetTimer
    document.onkeypress = resetTimer

    function resetTimer() {
      clearTimeout(time)
      // 300000 = 5 mins
      time = setTimeout(handleLogout, 600000)
    }
  }

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
      clearErrorMessage()
    } catch (exception) {
      setErrorMessage("Error: Unauthorized user token")
      clearErrorMessage()
    }
  }

  const addLike = async (blog) => {
    const blogToUpdate = { ...blog, likes: blog.likes + 1 }
    const updatedBlog = await blogService.updateLikes(blogToUpdate)
    try {
      setBlogs(blogs.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog))
    } catch (exception) {
      setErrorMessage(`${blogToUpdate.title} was already removed from server`)
      clearErrorMessage()
    }
  }

  const removeBlog = async blogToDelete => {
    if (window.confirm(`Delete ${blogToDelete.title} forever?`)) {
      try {
        await blogService.deleteBlog(blogToDelete.id)
        const newBlogList = blogs.filter(blog => blog.id !== blogToDelete.id)
        setBlogs(newBlogList)
        setErrorMessage(`Blog ${blogToDelete.title} deleted successfully!`)
        clearErrorMessage()
      } catch (exception) {
        setErrorMessage(`Error: unable to remove blog due to ${exception}`)
        clearErrorMessage()
      }
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
          idleTimeout={idleTimeout}
        />
        : <div>
          <h2>blogs</h2>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>
              logout
          </button>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} addLike={addLike} removeBlog={removeBlog} user={user} />
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