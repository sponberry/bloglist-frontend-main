import React from "react"
import { render, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import BlogForm from "./BlogForm"

test ("<BlogForm /> updates states and calls OnSubmit", () => {
  const newBlog = jest.fn()

  const component = render(
    <BlogForm newBlog={newBlog} />
  )

  const titleInput = component.container.querySelector("#title")
  const authorInput = component.container.querySelector("#author")
  const urlInput = component.container.querySelector("#url")
  const form = component.container.querySelector("form")

  fireEvent.change(titleInput, { target: { value: "Test blog" } })
  fireEvent.change(authorInput, { target: { value: "Nobody" } })
  fireEvent.change(urlInput, { target: { value: "http" } })

  fireEvent.submit(form)

  expect(newBlog.mock.calls).toHaveLength(1)
  expect(newBlog.mock.calls[0][0].title).toBe("Test blog")
})