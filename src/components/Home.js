import React, { useRef } from "react"
import { useSelector } from "react-redux"
import Togglable from "./Togglable"
import BlogForm from "./BlogForm"
import Blog from "./Blog"

const Home = () => {
  let user = useSelector(state => state.user)
  let blogs = useSelector(state => state.blogs)

  const blogFormRef = useRef()

  return (
    <div>
      <h2 className="page-header">Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} />
      )}
      <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
        <BlogForm blogFormRef={blogFormRef} />
      </Togglable>
    </div>
  )
}

export default Home