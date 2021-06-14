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
import { initializeBlogs, sortBlogs } from "./reducers/blogReducer"

import "./styles/app.css"

const App = () => {
  const [user, setUser] = useState(null)

  let notification = useSelector(state => state.notification)
  let blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(sortBlogs())
  }, [])

  const handleLogout = () => {
    setUser(null)
    loginService.logout()
    dispatch(messageChange("You have been logged out", 5))
  }

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
        handleLogout()
      }
    } else {
      handleLogout()
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
            <Blog key={blog.id} blog={blog} user={user} />
          )}
          <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
            <BlogForm blogFormRef={blogFormRef} />
          </Togglable>
        </div>
      }
    </div>
  )
}

export default App