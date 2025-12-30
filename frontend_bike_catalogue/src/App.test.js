import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the Bikers Heaven header", () => {
  render(<App />);
  const headerElement = screen.getByRole("banner");
  expect(headerElement).toHaveTextContent(/Bikers Heaven/i);
});

test("renders at least one bike card", async () => {
  render(<App />);
  const card = await screen.findByRole("article");
  expect(card).toBeInTheDocument();
});
