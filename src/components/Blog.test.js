import React from "react"
import { render } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import Blog from "./Blog"

describe("<Blog />", () => {
  test("title and author rendered as default but url and likes hidden", () => {
    const blog = {
      title: "Test blog",
      author: "Nobody",
      url: "http",
      likes: 5
    }

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
})