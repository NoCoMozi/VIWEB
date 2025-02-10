import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

const mockOnClick = jest.fn();

import "@testing-library/jest-dom";

describe("Button Component", () => {
  it("renders text on button", () => {
    render(<Button text={"Submit"} />);

    const button = screen.getByRole("button", { name: "Submit" });

    expect(button).toBeInTheDocument();
  });
});
