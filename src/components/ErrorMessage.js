import React from "react"

const ErrorMessage = ({ message }) => {
const toCheck = message.substring(0, 5)
const redClass = {
  "color": "red"
}
const greenClass = {
  "color" : "green"
}
// check the first few chars of message for formatting
  return(
    <div style={toCheck === "Error" ? redClass : greenClass} className="notification">
      {message}
    </div>
  )
}

export default ErrorMessage