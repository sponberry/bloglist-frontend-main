import React, { useState } from "react"
import PropTypes from "prop-types"
import { useDispatch } from "react-redux"
import { remove, addLike } from "../reducers/blogReducer"
import { messageChange } from "../reducers/notificationReducer"

import "../styles/blog.css"

const Blog = ({ blog, user }) => {
  const [visible, setVisible] = useState(false)

  const dispatch = useDispatch()

  Blog.propTypes = { blog: PropTypes.object.isRequired, user: PropTypes.object.isRequired }

  const likePost = async (blog) => {
    try {
      dispatch(addLike(blog))
    } catch (exception) {
      dispatch(
        messageChange(`${blog.title} was already removed from server`, 5)
      )
    }
  }

  const removeBlog = async blogToDelete => {
    if (window.confirm(`Delete ${blogToDelete.title} forever?`)) {
      try {
        dispatch(remove(blogToDelete))
        dispatch(
          messageChange(`Blog ${blogToDelete.title} deleted successfully!`, 5)
        )
      } catch (exception) {
        dispatch(
          messageChange(`Error: unable to remove blog due to ${exception}`, 5)
        )
      }
    }
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
        <p className="url">{blog.url}</p>
        <p className="likes">
          {blog.likes}
          <button onClick={() => likePost(blog)}>
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
      <div className="blog preview">
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
    )}
}

export default Blog