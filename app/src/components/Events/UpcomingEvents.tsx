import React from 'react';
import { EventType } from '@/types/event';
import EventCard from './EventCard';

interface UpcomingEventsProps {
  events: EventType[];
  maxEvents?: number;
}

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ events, maxEvents = 3 }) => {
  // Sort events by date (ascending)
  const sortedEvents = [...events].sort((a, b) => a.date.getTime() - b.date.getTime());
  
  // Filter to only include future events
  const now = new Date();
  const upcomingEvents = sortedEvents.filter(event => event.date >= now);
  
  // Limit to specified number of events
  const displayEvents = upcomingEvents.slice(0, maxEvents);

  return (
    <div className="upcoming-events-section">
      <h2>Upcoming Events</h2>
      
      {displayEvents.length === 0 ? (
        <div className="no-events-message">
          <p>No upcoming events at this time. Check back soon or submit your own event!</p>
        </div>
      ) : (
        <div className="upcoming-events-grid">
          {displayEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
      
      {upcomingEvents.length > maxEvents && (
        <div className="view-more-container">
          <button className="btn-view-more">View More Events</button>
        </div>
      )}
    </div>
  );
};

export default UpcomingEvents;
