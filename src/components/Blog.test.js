import React from "react"
import { render, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import Blog from "./Blog"

describe("<Blog />", () => {
  const user = {
    username: "Test",
    name: "test",
    id: "6086845191271009b65fa077"
  }
  const blog = {
    title: "Test blog",
    author: "Nobody",
    url: "http",
    likes: 5,
    user: "6086845191271009b65fa077"
  }
  const addLike = jest.fn()
  const removeBlog = jest.fn()

  test("title and author rendered as default but url and likes hidden", () => {
    const component = render(
      <Blog blog={blog} />
    )

    expect(component.container).toHaveTextContent(
      "Test blog"
    )

    const url = component.container.querySelector(".url")
    const likes = component.container.querySelector(".likes")

    expect(url && likes).toBeNull()
  })

  test("url and likes shown when button is clicked", () => {
    const component = render(
      <Blog blog={blog} addLike={addLike} removeBlog={removeBlog} user={user} />
    )
    const button = component.getByText("view")
    fireEvent.click(button)

    const url = component.container.querySelector(".url")
    const likes = component.container.querySelector(".likes")

    expect(url && likes).toBeDefined()
  })

  test("likes button responds to every click with function handle", () => {
    const component = render(
      <Blog blog={blog} addLike={addLike} removeBlog={removeBlog} user={user} />
    )
    const button = component.getByText("view")
    fireEvent.click(button)

    const likeButton = component.getByText("like")
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(addLike.mock.calls).toHaveLength(2)
  })
})