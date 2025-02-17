import { act, render, screen, waitFor } from "@testing-library/react";
import About from "../about";
import axios from "axios";

// Mock the axios module
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("About Page", () => {
  beforeEach(() => {
    // Reset any mocks before each test
    jest.clearAllMocks();
  });

  it("should render the About page with the loading state initially", () => {
    render(<About />);

    // Check if loading text is displayed before mission data is fetched
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it("should render the mission data after fetching", async () => {
    // Mock the axios response with sample mission data
    const mockMissionData = [
      {
        _id: "1",
        heading: "Mission Heading 1",
        content: ["This is the first mission statement."],
      },
      {
        _id: "2",
        heading: "Mission Heading 2",
        content: ["This is the second mission statement."],
      },
    ];

    mockedAxios.get.mockResolvedValueOnce({ data: mockMissionData });

    render(<About />);

    // Wait for the content to load
    await waitFor(() => screen.getByText(/Voices Ignited Mission Statement/i));

    // Check if mission data is rendered
    expect(
      screen.getByText("This is the second mission statement.")
    ).toBeInTheDocument();
  });

  it("should render an error message if fetching mission data fails", async () => {
    // Mock the axios error
    mockedAxios.get.mockRejectedValueOnce(
      new Error("Error fetching mission data")
    );

    render(<About />);

    // Wait for loading state to end (when loading text disappears)
    await waitFor(() =>
      expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument()
    );

    // Wait for the error message to be rendered after loading
    await act(async () => {
      await waitFor(() => screen.getByText(/Failed to load mission data/i));
    });

    // Check that the error message is displayed
    expect(
      screen.getByText(/Failed to load mission data/i)
    ).toBeInTheDocument();
  });
});
