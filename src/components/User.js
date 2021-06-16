import React from "react"

const User = ({ userToView }) => {
  if (!userToView)
  {
    return null
  }
  return (
    <div>
      <h2>{userToView.name}</h2>
      <h4>added blogs</h4>
      <ul>
        {userToView.blogs.map(blog => (
          <li key={blog.id}>
            {blog.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default User