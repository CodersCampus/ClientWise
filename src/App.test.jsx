import { render, screen } from "@testing-library/react";
import App from "./App";

test("should render app component", () => {
  render(<App />);
  const btn = screen.getByText("Login");
  expect(btn).toBeInTheDocument();
});
