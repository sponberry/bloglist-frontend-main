import loginService from "../services/login"
import blogService from "../services/blogs"

const loginReducer = (state=null, action) => {
  switch (action.type) {
  case "LOGIN":
    return action.user
  case "LOGOUT":
    return null
  default:
    return state
  }
}

export const logout = () => {
  return async dispatch => {
    loginService.logout()
    dispatch({
      type: "LOGOUT"
    })
  }
}

export const checkLogin = (user) => {
  return async dispatch => {
    const response = await loginService.checkLoginData({
      username: user.username
    })
    if (response && response === 200) {
      blogService.setToken(user.token)
      dispatch({
        type: "LOGIN",
        user
      })
    } else {
      logout()
    }
  }
}

export const login =(credentialsObject) => {
  return async dispatch => {
    const user = await loginService.login(credentialsObject)
    window.localStorage.setItem(
      "loggedInUser", JSON.stringify(user)
    )
    blogService.setToken(user.token)
    dispatch({
      type: "LOGIN",
      user,
    })
  }
}

export default loginReducer