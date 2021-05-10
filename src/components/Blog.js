import React, { useState } from "react"
import PropTypes from "prop-types"
import "../styles/blog.css"

const Blog = ({ blog, addLike, removeBlog, user }) => {
  const [visible, setVisible] = useState(false)

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    removeBlog: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const buttonVisibility = (blogCreatorId) => (
    blogCreatorId === user.id
      ? { display: "" }
      : { display: "none" }
  )

  if (visible) {
    return (
      <div className="blog">
        <p>
          {blog.title}
          <button onClick={toggleVisibility}>close</button>
        </p>
        <p>{blog.url}</p>
        <p>
          {blog.likes}
          <button onClick={() => addLike(blog)}>
            like
          </button>
        </p>
        <p>{blog.author}</p>
        <button style={buttonVisibility(blog.user.id)} onClick={() => removeBlog(blog)}>
          remove
        </button>
      </div>
    )
  } else {
    return (
      <div className="blog">
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
    )}
}

export default Blog