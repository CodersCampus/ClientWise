import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Register from "./Register";

test("should update input field on change", () => {
  render(<Register />);
  const inputEL = screen.getByRole("textbox");
  fireEvent.change(inputEL, { target: { value: "Hello" } });
  //   console.log(inputEL.value);
  expect(inputEL.value).toBe("Hello");
});

test("should update password field on change", () => {
  render(<Register />);
  const passwordInputEL = screen.getByPlaceholderText("Password");
  fireEvent.change(passwordInputEL, { target: { value: "1234" } });
  //   console.log(inputEL.value);
  expect(passwordInputEL.value).toBe("1234");
});

test("should clear all input fields on submit", () => {
  render(<Register />);
  const allInputEL = screen.getByRole("textbox");
  //   console.log(allInputEL);
  fireEvent.change(allInputEL, { target: { value: "Hello" } });
  const registerBtn = screen.getAllByRole("button");
  //   console.log(registerBtn);
  fireEvent.click(registerBtn[0]);
  //   console.log(allInputEL.value);
  expect(allInputEL.value).toBe("Hello");
});
