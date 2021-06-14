const notificationReducer = (state=null, action) => {
  switch (action.type) {
  case "NEW_MESSAGE":
    return action.message
  case "CLEAR_MESSAGE":
    return null
  default:
    return state
  }
}

let time
export const messageChange = ( message, seconds ) => {
  clearTimeout(time)
  return async dispatch => {
    dispatch({
      type: "NEW_MESSAGE",
      message,
    })
    time = setTimeout(() => {
      dispatch({ type: "CLEAR_MESSAGE" })
    }, 1000 * seconds)
  }
}

export const messageClear = () => {
  return async dispatch => {
    dispatch({
      type: "CLEAR_MESSAGE"
    })
  }
}

export default notificationReducer