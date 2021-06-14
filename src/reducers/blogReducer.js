import blogService from "../services/blogs"

const blogReducer = (state=[], action) => {
  switch (action.type) {
  case "ALL_BLOGS":
    return action.data
  case "SORT":
    var sorted_blogs = state
    sorted_blogs.sort((a, b) => b.likes - a.likes)
    return sorted_blogs
  case "ADD_NEW":
    return state.concat(action.data)
  case "DELETE":
    return state.filter(blog => blog.id !== action.id)
  case "LIKE":
    return state.map(blog => blog.id !== action.id ? blog : action.updatedObject)
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const response = await blogService.getAll()
    dispatch({
      type: "ALL_BLOGS",
      data: response,
    })
  }
}

export const sortBlogs = () => {
  return {
    type: "SORT",
  }
}

export const addNew = (content) => {
  return async dispatch => {
    const response = await blogService.create(content)
    dispatch({
      type: "ADD_NEW",
      data: response
    })
  }
}

export const remove = (objectToDelete) => {
  return async dispatch => {
    await blogService.deleteBlog(objectToDelete.id)
    dispatch({
      type: "DELETE",
      id: objectToDelete.id,
    })
  }
}

export const addLike = (object) => {
  const updatedObject = { ...object, likes: object.likes + 1 }
  return async dispatch => {
    await blogService.updateLikes(updatedObject)
    dispatch({
      type: "LIKE",
      id: updatedObject.id,
      updatedObject,
    })
  }
}

export default blogReducer