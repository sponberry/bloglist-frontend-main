import React, { useEffect, useRef } from "react"
import Blog from "./components/Blog"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import ErrorMessage from "./components/ErrorMessage"
import Togglable from "./components/Togglable"
import { useDispatch, useSelector } from "react-redux"
import { messageChange } from "./reducers/notificationReducer"
import { initializeBlogs, sortBlogs } from "./reducers/blogReducer"
import { checkLogin, logout } from "./reducers/userReducer"

import "./styles/app.css"

const App = () => {
  let notification = useSelector(state => state.notification)
  let blogs = useSelector(state => state.blogs)
  let user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(sortBlogs())
  }, [])

  const handleLogout = () => {
    dispatch(logout())
    dispatch(messageChange("You have been logged out", 5))
  }

  useEffect(async () => {
    let mounted = true
    const userJSONData = window.localStorage.getItem("loggedInUser")
    if (userJSONData && mounted) {
      const user = JSON.parse(userJSONData)
      dispatch(checkLogin(user))
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