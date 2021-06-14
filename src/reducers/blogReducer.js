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

export default blogReducer