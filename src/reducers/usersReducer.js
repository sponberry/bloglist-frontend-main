import userService from "../services/users"

const usersReducer = (state=[], action) => {
  switch (action.type) {
  case "ALL_USERS":
    return action.data
  case "CURRENT":
    return state
  default:
    return state
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const response = await userService.getAll()
    dispatch({
      type: "ALL_USERS",
      data: response
    })
  }
}

export default usersReducer