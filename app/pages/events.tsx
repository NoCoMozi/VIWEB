import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import Calendar from "@/components/Calendar/Calendar";
import UpcomingEvents from "@/components/Events/UpcomingEvents";
import { EventType } from "@/types/event";
import "@/styles/pages/events.styles.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faExclamationTriangle, faCalendarCheck, faLock } from '@fortawesome/free-solid-svg-icons';

/**
 * Events page component for Voices Ignited
 * Displays upcoming and past events
 */
const Events = () => {
  const [isClient, setIsClient] = useState(false);
  const [events, setEvents] = useState<EventType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fix for hydration issues - only render dynamic content after client-side hydration
  useEffect(() => {
    setIsClient(true);

    // Fetch events from API after client-side hydration
    if (isClient) {
      fetchEvents();
    }
  }, [isClient]);

  // Function to fetch events from the API
  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.get('/api/events');

      if (response.data.success) {
        // Format dates from API response
        const formattedEvents = response.data.data.map((event: any) => ({
          ...event,
          id: event._id, // Use MongoDB _id as our id
          date: new Date(event.date), // Convert date string to Date object
        }));

        // Only show approved events
        const approvedEvents = formattedEvents.filter((event) => event.approved);

        setEvents(approvedEvents);
      } else {
        setError('Failed to load events');
        console.error('API returned error:', response.data);
      }
    } catch (err) {
      setError('Failed to load events. Please try again later.');
      console.error('Error fetching events:', err);

      // Fallback to sample data if API fails in development
      if (process.env.NODE_ENV === 'development') {
        console.log('Using sample data as fallback in development mode');
        setEvents(sampleEvents);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle adding a new event
  const handleAddEvent = async (newEvent: Omit<EventType, 'id'>) => {
    try {
      setError(null);

      // Send new event to the API
      const response = await axios.post('/api/events', newEvent);

      if (response.data.success) {
        // Add the new event to state with proper formatting
        const createdEvent = {
          ...response.data.data,
          id: response.data.data._id,
          date: new Date(response.data.data.date),
        };

        setEvents(prevEvents => [...prevEvents, createdEvent]);

        // Show success message (could be improved with a toast notification)
        console.log('Event created successfully!');
      } else {
        setError('Failed to create event');
        console.error('API returned error:', response.data);
      }
    } catch (err) {
      setError('Failed to create event. Please try again.');
      console.error('Error creating event:', err);

      // Here we could return specific validation errors to show in the form
      if (axios.isAxiosError(err) && err.response?.data?.error) {
        console.error('Validation errors:', err.response.data.error);
      }

      return false; // Indicate failure to the form
    }

    return true; // Indicate success to the form
  };

  // Function to handle "Submit an Event" button click
  const handleSubmitEventClick = () => {
    // This would now be handled directly by the Calendar component's button
    document.querySelector('.btn-add-event')?.dispatchEvent(
      new Event('click', { bubbles: true })
    );
  };

  // Sample event data (used as fallback if API fails)
  const sampleEvents: EventType[] = [
    {
      id: 1,
      title: "Monthly Planning Meeting",
      description: "Join us for our monthly planning meeting where we'll discuss upcoming initiatives and events.",
      date: new Date(2023, new Date().getMonth(), 15), // Current month, day 15
      startTime: "18:30",
      endTime: "20:00",
      type: "meeting",
      locationType: "online",
      location: "Zoom (link will be sent after registration)",
      organizer: "Voices Ignited Core Team",
      contactEmail: "info@voicesignited.org",
      approved: true,
    },
    {
      id: 2,
      title: "Community Outreach Workshop",
      description: "Learn effective strategies for community outreach and engagement.",
      date: new Date(2023, new Date().getMonth(), 22), // Current month, day 22
      startTime: "14:00",
      endTime: "16:30",
      type: "workshop",
      locationType: "in-person",
      location: "Community Center, 123 Main St.",
      organizer: "Education Committee",
      contactEmail: "education@voicesignited.org",
      approved: true,
    },
    {
      id: 3,
      title: "Climate Justice Rally",
      description: "Stand with us as we rally for climate justice and environmental protection policies.",
      date: new Date(2023, new Date().getMonth() + 1, 5), // Next month, day 5
      startTime: "10:00",
      endTime: "13:00",
      type: "action",
      locationType: "in-person",
      location: "City Hall Plaza",
      organizer: "Direct Action Committee",
      contactEmail: "action@voicesignited.org",
      imageUrl: "/images/events/climate-rally.jpg",
      approved: true,
    },
    {
      id: 4,
      title: "Annual Fundraising Gala",
      description: "Our biggest fundraising event of the year with dinner, speakers, and entertainment.",
      date: new Date(2023, new Date().getMonth() + 1, 18), // Next month, day 18
      startTime: "18:00",
      endTime: "22:00",
      type: "fundraiser",
      locationType: "in-person",
      location: "Grand Hotel Ballroom, 500 Park Ave",
      organizer: "Fundraising Committee",
      contactEmail: "fundraising@voicesignited.org",
      imageUrl: "/images/events/gala.jpg",
      approved: true,
    },
    {
      id: 5,
      title: "Community Potluck",
      description: "Bring your favorite dish and meet fellow activists in a casual setting.",
      date: new Date(2023, new Date().getMonth(), 28), // Current month, day 28
      startTime: "17:00",
      endTime: "20:00",
      type: "social",
      locationType: "in-person",
      location: "Riverside Park Pavilion",
      organizer: "Community Building Committee",
      contactEmail: "community@voicesignited.org",
      approved: true,
    },
    {
      id: 6,
      title: "Digital Activism Training",
      description: "Learn how to effectively use social media and digital tools for activism.",
      date: new Date(2023, new Date().getMonth(), 10), // Current month, day 10
      startTime: "19:00",
      endTime: "21:00",
      type: "workshop",
      locationType: "online",
      location: "Virtual (link sent after registration)",
      organizer: "Tech Team",
      contactEmail: "tech@voicesignited.org",
      approved: true,
    },
  ];

  return (
    <>
      <Head>
        <title>Events | Voices Ignited</title>
        <meta name="description" content="Join Voices Ignited events and help us make a difference." />
      </Head>

      <main className="events-container">
        <div className="events-hero">
          <h1>Events</h1>
          <p>Join us at our upcoming events and help make a difference.</p>
        </div>

        <div className="events-content">
          {isClient && (
            <>
              {isLoading ? (
                <div className="calendar-loading">
                  <p>Loading events calendar...</p>
                </div>
              ) : error ? (
                <div className="calendar-error-container">
                  <p className="calendar-error-message">{error}</p>
                  <button
                    onClick={fetchEvents}
                    className="btn-retry"
                  >
                    Retry
                  </button>
                </div>
              ) : (
                <Calendar
                  events={events}
                  onAddEvent={handleAddEvent}
                />
              )}
            </>
          )}

          {/* Upcoming Events Section */}
          {isClient && !isLoading && !error && (
            <UpcomingEvents events={events} maxEvents={3} />
          )}

          <div className="events-info">
            <h2>Get Involved</h2>
            <p>
              Our events are open to everyone who shares our vision for a more just and equitable society.
              Whether you're a seasoned activist or just beginning your journey, we welcome your participation.
            </p>
            <div className="event-cta">
              <button
                onClick={handleSubmitEventClick}
                className="btn-primary"
              >
                Submit an Event
              </button>
              <Link
                href="/admin/events"
                className="btn-admin-events"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Events;
