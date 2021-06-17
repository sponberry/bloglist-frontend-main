import React from "react"
import { Link } from "react-router-dom"
import { AppBar, Toolbar, IconButton, Button } from "@material-ui/core"
import { useSelector } from "react-redux"

const Navbar = ({ handleLogout }) => {
  let user = useSelector(state => state.user)

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
        </IconButton>
        <Button color="inherit" component={Link} to="/">
                    Home
        </Button>
        <Button color="inherit" component={Link} to="/users">
                    Users
        </Button>
        <Button variant="contained" color="secondary" onClick={handleLogout} style={{ "marginRight": 20 }}>
                    LOGOUT
        </Button>
        {user
          ? <p>{user.name} logged in</p>
          : <p></p>
        }
      </Toolbar>
    </AppBar>
  )
}

export default Navbar