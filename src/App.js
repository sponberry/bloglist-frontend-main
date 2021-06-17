import React, { useEffect } from "react"
import LoginForm from "./components/LoginForm"
import ErrorMessage from "./components/ErrorMessage"
import Users from "./components/Users"
import User from "./components/User"
import BlogView from "./components/BlogView"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import { useDispatch, useSelector } from "react-redux"
import { messageChange } from "./reducers/notificationReducer"
import { initializeBlogs, sortBlogs } from "./reducers/blogReducer"
import { initializeUsers } from "./reducers/usersReducer"
import { checkLogin, logout } from "./reducers/loginReducer"
import { Route, Switch, useRouteMatch } from "react-router-dom"
import { Container, ThemeProvider } from "@material-ui/core"

import "./styles/app.css"
import theme from "./styles/theme"

const App = () => {
  let notification = useSelector(state => state.notification)
  let blogs = useSelector(state => state.blogs)
  let user = useSelector(state => state.user)
  let users = useSelector(state => state.usersView)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(sortBlogs())
    dispatch(initializeUsers())
  }, [blogs.length])

  const clickedUser = useRouteMatch("/users/:id")
  const userToView = clickedUser
    ? users.find(user => user.id === clickedUser.params.id)
    : null

  const clickedBlog = useRouteMatch("/blogs/:id")
  const blogToView = clickedBlog
    ? blogs.find(blog => blog.id === clickedBlog.params.id)
    : null
  const author = blogToView
    ? users.find(user => user.id === blogToView.user.id)
    : null

  const handleLogout = () => {
    dispatch(logout())
    dispatch(messageChange("You have been logged out", 5))
  }

  useEffect(async () => {
    let mounted = true
    const userJSONData = window.localStorage.getItem("loggedInUser")
    const userLoginTime = window.localStorage.getItem("loginTime")
    const now = new Date()
    if (userJSONData && mounted && userLoginTime && Number(userLoginTime) === now.getHours()) {
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

  return (
    <ThemeProvider theme={theme} >
      <Container>
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
              <Navbar handleLogout={handleLogout} />

              <Switch>
                <Route path="/blogs/:id">
                  <BlogView blog={blogToView} user={author} />
                </Route>
                <Route path="/users/:id">
                  <User userToView={userToView} />
                </Route>
                <Route path="/users">
                  <Users />
                </Route>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </div>
          }
        </div>
      </Container>
    </ThemeProvider>
  )
}

export default App