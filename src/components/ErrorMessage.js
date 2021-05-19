import React from "react"
import PropTypes from "prop-types"

const ErrorMessage = ({ message }) => {
  ErrorMessage.propTypes = {
    message: PropTypes.string.isRequired
  }

  const toCheck = message.substring(0, 5)
  const redClass = {
    "color": "red"
  }
  const greenClass = {
    "color" : "green"
  }

  return(
    <div style={toCheck === "Error" ? redClass : greenClass} className="notification">
      {message}
    </div>
  )
}

export default ErrorMessage