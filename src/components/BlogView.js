import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { remove, addLike, addComment } from "../reducers/blogReducer"
import { messageChange } from "../reducers/notificationReducer"
//import { Button } from "@material-ui/core"

const BlogView = ({ blog, user }) => {
  const [ comment, setComment ] = useState("")
  const dispatch = useDispatch()

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

  const makeComment = async (e) => {
    e.preventDefault()
    try {
      dispatch(addComment(comment, blog))
    } catch (exception) {
      dispatch(
        messageChange(`${blog.title} was already removed from server`, 5)
      )}
    setComment("")
  }

  const buttonVisibility = (blogCreatorId) => (
    blogCreatorId === user.id
      ? { display: "" }
      : { display: "none" }
  )

  if (!blog || !user) {
    return null
  }

  return (
    <div className="blog">
      <h2>{blog.title}</h2>
      <p className="url">
        <a href={blog.url} target="blank">{blog.url}</a>
      </p>
      <p className="likes">
        {blog.likes}
        <button onClick={() => likePost(blog)}>
          like
        </button>
      </p>
      <p>added by {blog.author}</p>
      <button style={buttonVisibility(blog.user.id)} onClick={() => removeBlog(blog)}>
        remove
      </button>
      <h4>comments</h4>
      {blog.comments
        ? <ul>
          {blog.comments.map(comment => (
            <li key={comment}>{comment}</li>
          ))}
        </ul>
        : <p>no comments yet</p>
      }
      <h4>add a new comment</h4>
      <form onSubmit={(e) => makeComment(e)}>
        <input type="text" value={comment} onChange={({ target }) => setComment(target.value)} />
        <button type="submit">comment</button>
      </form>
    </div>
  )
}

export default BlogView