// join.test.tsx
import { render, screen } from "@testing-library/react";
import Join from "../join"; // Adjust the import path if necessary

// Mock the `next/image` component as it's used in this page
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} alt={props.alt} />,
}));

describe("Join Page", () => {
  it("renders the page correctly", () => {
    render(<Join />);

    // Check if the page header is rendered correctly
    expect(
      screen.getByText("Interested in Joining Voices Ignited?")
    ).toBeInTheDocument();

    // Check if the image is rendered correctly with the alt text
    const image = screen.getByAltText("Protestors");
    expect(image).toBeInTheDocument();

    // Check if the 'Join the Telegram' section is rendered correctly
    expect(screen.getByText("Join the Telegram")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Click the button to be redirected to the Linktree in order to join the telegram or reddit chat. This is where we get to know each other, organize, plan, share resources, and more."
      )
    ).toBeInTheDocument();

    // Check if the Telegram and Reddit links are present
    const telegramLink = screen.getByText("Linktree Telegram");
    expect(telegramLink).toBeInTheDocument();
    expect(telegramLink).toHaveAttribute("href", "https://tr.ee/PR3W8XdqH0");

    const redditLink = screen.getByText("Linktree Reddit");
    expect(redditLink).toBeInTheDocument();
    expect(redditLink).toHaveAttribute("href", "https://tr.ee/01X6whegb7");

    // Check if the ContactForm is rendered
    expect(screen.getByTestId("contact-form")).toBeInTheDocument(); // Assuming the ContactForm has a form role
  });

  it("renders ContactForm component without errors", () => {
    render(<Join />);
    // Query by test ID
    const formElement = screen.getByTestId("contact-form");
    expect(formElement).toBeInTheDocument();
  });

  it("ensures that the 'join_link' class is applied correctly to the links", () => {
    render(<Join />);
    const telegramLink = screen.getByText("Linktree Telegram");
    const redditLink = screen.getByText("Linktree Reddit");

    // Check if both links have the 'join_link' class
    expect(telegramLink).toHaveClass("join_link");
    expect(redditLink).toHaveClass("join_link");
  });
});
