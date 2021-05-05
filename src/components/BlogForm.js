import React, { useState } from "react"
import blogService from "../services/blogs"

const BlogForm = ({ blogs, setBlogs, errorMessage, setErrorMessage }) => {
  const [newTitle, setNewTitle] = useState("")
  const [newAuthor, setNewAuthor] = useState("")
  const [newUrl, setNewUrl] = useState("")

  const createBlog = async event => {
    event.preventDefault()
    try {
      const newBlog = {
        title: newTitle,
        author: newAuthor,
        url: newUrl
      }
      const response = blogService.create(newBlog)
      setBlogs(blogs.concat(newBlog))
      setNewTitle("")
      setNewAuthor("")
      setNewUrl("")
      setErrorMessage(`Success! Added new blog: ${newBlog.title} by ${newBlog.author}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      return response.data
    } catch (exception) {
      setErrorMessage("Error: Unauthorized user token")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createBlog}>
        <div>
          <label id="title">title:</label>
          <input
            id="title"
            name="title"
            type="text"
            value={newTitle}
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </div>
        <div>
          <label id="author">author:</label>
          <input
            id="author"
            name="author"
            type="text"
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>
        <div>
          <label id="url">url:</label>
          <input
            id="url"
            name="url"
            type="text"
            value={newUrl}
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm