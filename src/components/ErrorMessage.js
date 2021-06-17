import React from "react"
import PropTypes from "prop-types"
import { Alert } from "@material-ui/lab"

const ErrorMessage = ({ message }) => {
  ErrorMessage.propTypes = {
    message: PropTypes.string.isRequired
  }

  // any message that begins with Error will be styled red
  const toCheck = message.substring(0, 5)

  return(
    <Alert severity={toCheck === "Error" ? "error" : "success"}>
      {message}
    </Alert>
  )
}

export default ErrorMessage