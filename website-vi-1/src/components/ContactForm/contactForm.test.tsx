import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Contact from "./ContactForm";
import "@testing-library/jest-dom";

describe("Contact Form", () => {
  test("renders the form correctly", () => {
    render(<Contact />);

    expect(screen.getByPlaceholderText("Enter your name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your email")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter your message")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });
});
