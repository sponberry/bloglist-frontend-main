import React, { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import ErrorMessage from "./components/ErrorMessage"
import Togglable from "./components/Togglable"
import blogService from "./services/blogs"
import loginService from "./services/login"
import { useDispatch, useSelector } from "react-redux"
import { messageChange } from "./reducers/notificationReducer"

import "./styles/app.css"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  let notification = useSelector(state => state)
  const dispatch = useDispatch()

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
        dispatch(messageChange("Error: you have been logged out", 5))
      }
    } else {
      setUser(null)
      loginService.logout()
      dispatch(messageChange("Error: you have been logged out", 5))
    }

    return () => mounted = false
  }, [])

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
      dispatch(
        messageChange(`Success! Added new blog: ${newBlog.title} by ${newBlog.author}`, 5)
      )
    } catch (exception) {
      dispatch(messageChange("Error: Unauthorized user token", 5))
    }
  }

  const addLike = async (blog) => {
    const blogToUpdate = { ...blog, likes: blog.likes + 1 }
    const updatedBlog = await blogService.updateLikes(blogToUpdate)
    try {
      setBlogs(blogs.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog))
    } catch (exception) {
      dispatch(
        messageChange(`${blogToUpdate.title} was already removed from server`, 5)
      )
    }
  }

  const removeBlog = async blogToDelete => {
    if (window.confirm(`Delete ${blogToDelete.title} forever?`)) {
      try {
        await blogService.deleteBlog(blogToDelete.id)
        const newBlogList = blogs.filter(blog => blog.id !== blogToDelete.id)
        setBlogs(newBlogList)
        dispatch(
          messageChange(`Blog ${blogToDelete.title} deleted successfully!`, 5)
        )
      } catch (exception) {
        dispatch(
          messageChange(`Error: unable to remove blog due to ${exception}`, 5)
        )
      }
    }
  }

  const blogFormRef = useRef()

  return (
    <div>
      {notification !== null
        ? <ErrorMessage message={notification} />
        : <div></div>
      }
      {user === null
        ? <LoginForm
          user={user}
          setUser={(user) => setUser(user)}
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