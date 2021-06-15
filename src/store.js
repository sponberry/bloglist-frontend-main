import {
  createStore,
  applyMiddleware,
  combineReducers
} from "redux"
import notificationReducer from "./reducers/notificationReducer"
import blogReducer from "./reducers/blogReducer"
import loginReducer from "./reducers/loginReducer"
import usersReducer from "./reducers/usersReducer"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  user: loginReducer,
  usersView: usersReducer
})

const store = createStore(
  reducer, composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store