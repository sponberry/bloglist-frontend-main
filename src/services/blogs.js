import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const checkTokenStatus = () => {
  console.log("checking token status")
  if (!token) {
    window.localStorage.clear()
    console.log("token is null")
    return false
  }
}

const create = async newObject => {
  if (!checkTokenStatus) { return }
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const deleteBlog = async blogId => {
  checkTokenStatus()
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

export default { getAll, create, setToken, updateLikes, deleteBlog } // eslint-disable-line import/no-anonymous-default-export