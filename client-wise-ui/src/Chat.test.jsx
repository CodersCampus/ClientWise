import { render, screen } from "@testing-library/react";
import Chat from "./Chat";

test("should render `Chat` component", () => {
  render(<Chat />);
  const inputTextPlaceholder = screen.getByPlaceholderText(
    "Enter your message here..."
  );
  expect(inputTextPlaceholder).toBeInTheDocument();
});
