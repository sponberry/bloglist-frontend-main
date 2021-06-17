import { useState } from "react"

export const useField = () => {
  const [value, setValue] = useState("")

  const onChange = event => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue("")
  }

  return [
    reset,
    {
      value,
      onChange
    }
  ]
}