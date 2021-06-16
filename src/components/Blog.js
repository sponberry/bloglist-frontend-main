import React from "react"

import { Button } from "@material-ui/core"
import { Link } from "react-router-dom"

import "../styles/blog.css"

const Blog = ({ blog }) => {
  return (
    <div className="blog preview">
      {blog.title} {blog.author}
      <Button color="inherit" component={Link} to={`/blogs/${blog.id}`}>
        view
      </Button>
    </div>
  )
}

export default Blog