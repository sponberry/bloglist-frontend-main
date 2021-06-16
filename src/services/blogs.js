import axios from "axios"
const baseUrl = "/api/blogs"

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const deleteBlog = async blogId => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.delete(`${baseUrl}/${blogId}`, config)
  return response.data
}

const updateLikes = async blogObject => {
  const response = await axios.put(`${baseUrl}/${blogObject.id}`, blogObject)
  return response.data
}

const addComment = async blogObject => {
  const response = await axios.post(`${baseUrl}/${blogObject.id}/comments`, blogObject)
  return response.data
}

export default {
  getAll,
  create,
  setToken,
  updateLikes,
  deleteBlog,
  addComment
}