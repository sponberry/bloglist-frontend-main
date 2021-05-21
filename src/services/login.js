import axios from "axios"
import blogService from "./blogs"
const baseUrl = "/api/login"

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const checkLoginData = async credentials => {
  const response = await axios
    .post(`${baseUrl}/reload`, credentials)
    .catch(err => {
      console.log(err)
      return false
    })
  return response.status
}

const logout = () => {
  window.localStorage.clear()
  blogService.setToken(null)
}

export default { login, logout, checkLoginData }