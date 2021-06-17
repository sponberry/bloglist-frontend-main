import React from "react"
import { useDispatch } from "react-redux"
import { remove, addLike, addComment } from "../reducers/blogReducer"
import { messageChange } from "../reducers/notificationReducer"
import { Button, TextField } from "@material-ui/core"
import { useField } from "../hooks"
import { useHistory } from "react-router-dom"

const BlogView = ({ blog, user }) => {
  const [ resetComment, comment] = useField()
  const dispatch = useDispatch()
  const history = useHistory()

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
        history.push("/")
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
      dispatch(addComment(comment.value, blog))
    } catch (exception) {
      dispatch(
        messageChange(`${blog.title} was already removed from server`, 5)
      )}
    resetComment()
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
        {blog.likes} likes
        <Button color="default" onClick={() => likePost(blog)}>
          like
        </Button>
      </p>
      <p>added by {blog.author}</p>
      <Button color="secondary" style={buttonVisibility(blog.user.id)} onClick={() => removeBlog(blog)}>
        remove
      </Button>
      <h3>comments</h3>
      {blog.comments && blog.comments.length > 0
        ? <ul>
          {blog.comments.map(comment => (
            <li key={comment}>{comment}</li>
          ))}
        </ul>
        : <p>no comments yet</p>
      }
      <h3>add a new comment</h3>
      <form onSubmit={(e) => makeComment(e)}>
        <TextField label="write comment" {...comment} />
        <Button color="secondary" type="submit" style={{ margin: 10 }}>
          submit comment
        </Button>
      </form>
    </div>
  )
}

export default BlogView