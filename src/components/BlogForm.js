import React from "react"
import { useDispatch } from "react-redux"
import { messageChange } from "../reducers/notificationReducer"
import { addNew } from "../reducers/blogReducer"
import { Button, TextField } from "@material-ui/core"
import { useField } from "../hooks"

const BlogForm = ({ blogFormRef }) => {
  const [titleReset, title] = useField()
  const [authorReset, author] = useField()
  const [urlReset, url] = useField()

  const dispatch = useDispatch()

  const newBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      dispatch(addNew(blogObject))
      dispatch(
        messageChange(`Success! Added new blog: ${blogObject.title} by ${blogObject.author}`, 5)
      )
    } catch (exception) {
      dispatch(messageChange("Error: Unauthorized user token", 5))
    }
  }

  const createBlog = event => {
    event.preventDefault()
    newBlog({
      title: title.value,
      author: author.value,
      url: url.value
    })
    titleReset()
    authorReset()
    urlReset()
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createBlog}>
        <div>
          <TextField
            label="title"
            style={{ marginRight: 20 }}
            {...title}
          />

          <TextField
            label="author"
            {...author}
          />
        </div>
        <div>
          <TextField
            label="url"
            {...url}
          />
        </div>
        <Button color="primary" id="submit" type="submit" style={{ marginTop: 10 }}>create</Button>
      </form>
    </div>
  )
}

export default BlogForm