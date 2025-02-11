import { render, screen } from "@testing-library/react";
import Header from "./Header";
import "@testing-library/jest-dom";
import { useRouter } from "next/router";

// Mock Next.js Link and Image components
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe("Header Component", () => {
  test("renders the header correctly", () => {
    render(<Header />);

    // Check if the logo is rendered
    expect(screen.getByAltText("Logo")).toBeInTheDocument();

    // Check if all the links are rendered
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Join")).toBeInTheDocument();
    expect(screen.getByText("Break The Ice")).toBeInTheDocument();
    expect(screen.getByText("Support")).toBeInTheDocument();
  });

  test("should contain all navigation links", () => {
    render(<Header />);

    // Test that the correct links are present
    const links = screen.getAllByRole("link");

    expect(links).toHaveLength(5); // We are rendering 5 links in total
    expect(links[0]).toHaveAttribute("href", "/");
    expect(links[1]).toHaveAttribute("href", "/about");
    expect(links[2]).toHaveAttribute("href", "/join");
    expect(links[3]).toHaveAttribute("href", "/breaktheice");
    expect(links[4]).toHaveAttribute("href", "/support");
  });

  test("renders the links with correct text content", () => {
    render(<Header />);

    // Ensure each link has the correct text content
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Join")).toBeInTheDocument();
    expect(screen.getByText("Break The Ice")).toBeInTheDocument();
    expect(screen.getByText("Support")).toBeInTheDocument();
  });

  test("link navigates to the correct URL", () => {
    render(<Header />);

    // Check if clicking on the "Home" link navigates to the right URL
    const homeLink = screen.getByText("Home");
    expect(homeLink).toHaveAttribute("href", "/");
    
    // Check other links as well
    const aboutLink = screen.getByText("About");
    expect(aboutLink).toHaveAttribute("href", "/about");

    const joinLink = screen.getByText("Join");
    expect(joinLink).toHaveAttribute("href", "/join");

    const breakTheIceLink = screen.getByText("Break The Ice");
    expect(breakTheIceLink).toHaveAttribute("href", "/breaktheice");

    const supportLink = screen.getByText("Support");
    expect(supportLink).toHaveAttribute("href", "/support");
  });
});
