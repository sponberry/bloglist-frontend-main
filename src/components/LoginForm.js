import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { messageChange, messageClear } from "../reducers/notificationReducer"
import { login } from "../reducers/loginReducer"
import { TextField, Button } from "@material-ui/core"

const LoginForm = ({ idleTimeout }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()

  const handleLogin = async event => {
    event.preventDefault()
    try {
      dispatch(login({ username, password }))
      setPassword("")
      setUsername("")

      dispatch(messageClear())
      idleTimeout()
    } catch (exception) {
      dispatch(messageChange("Error: wrong credentials", 5))
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>Log in to application</h2>
      <div>
        <TextField
          label="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <TextField
          type="password"
          label="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <Button color="default" type="submit" style={{ marginTop: 10 }}>login</Button>
    </form>
  )
}

export default LoginForm