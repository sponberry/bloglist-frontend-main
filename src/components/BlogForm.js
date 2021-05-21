import React, { useState } from "react"

const BlogForm = ({ newBlog }) => {
  const [newTitle, setNewTitle] = useState("")
  const [newAuthor, setNewAuthor] = useState("")
  const [newUrl, setNewUrl] = useState("")

  const createBlog = event => {
    event.preventDefault()
    newBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })
    setNewTitle("")
    setNewAuthor("")
    setNewUrl("")
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createBlog}>
        <div>
          <label htmlFor="title">title:</label>
          <input
            id="title"
            name="title"
            type="text"
            value={newTitle}
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">author:</label>
          <input
            id="author"
            name="author"
            type="text"
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>
        <div>
          <label htmlFor="url">url:</label>
          <input
            id="url"
            name="url"
            type="text"
            value={newUrl}
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </div>
        <button id="submit" type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm