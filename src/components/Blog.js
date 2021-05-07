import React, { useState } from 'react'
import "../styles/blog.css"

const Blog = ({ blog, addLike }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

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