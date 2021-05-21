import React, { useState } from "react"
import loginService from "../services/login"
import blogService from "../services/blogs"

const LoginForm = ({ setUser, setErrorMessage, idleTimeout }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        "loggedInUser", JSON.stringify(user)
      )
      setPassword("")
      setUsername("")
      blogService.setToken(user.token)
      setUser(user)

      setErrorMessage(null)
      idleTimeout()
    } catch (exception) {
      setErrorMessage("Error: wrong credentials")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>Log in to application</h2>
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm