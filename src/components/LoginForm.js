import React, { useState } from "react"
import loginService from '../services/login'

const LoginForm = ({ user, setUser }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      setUser(user)
      setPassword("")
      setUsername("")
    } catch (exception) {
      console.log("wrong credentials")
    }
  }

  return (
  <form onSubmit={handleLogin}>
    <h2>Log in to application</h2>
    <div>
      <label id="username">Username</label>
      <input
        type="text"
        id="username"
        name="username"
        value={username}
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      <label id="password">Password</label>
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