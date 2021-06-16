import React from "react"
import { Button } from "@material-ui/core"
import { Link } from "react-router-dom"

const User = ({ userToView }) => {
  if (!userToView)
  {
    return null
  }
  return (
    <div>
      <h2>{userToView.name}</h2>
      <h4>added blogs</h4>
      <ul>
        {userToView.blogs.map(blog => (
          <li key={blog.id}>
            <Button color="inherit" component={Link} to={`/blogs/${blog.id}`}>
              {blog.title}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default User