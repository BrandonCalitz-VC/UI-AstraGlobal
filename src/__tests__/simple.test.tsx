import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // Ensure this is imported

test("checks if element is in the document", () => {
  render(<div>Hello, world!</div>);
  expect(screen.getByText("Hello, world!")).toBeInTheDocument();
});
