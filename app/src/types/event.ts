/**
 * Interface representing an event in the Voices Ignited calendar
 */
export interface EventType {
  id: number | string;
  title: string;
  description: string;
  date: Date;
  startTime: string; // Format: "HH:MM" in 24-hour format
  endTime: string;   // Format: "HH:MM" in 24-hour format
  type: 'meeting' | 'workshop' | 'action' | 'fundraiser' | 'social';
  locationType: 'online' | 'in-person';
  location?: string; // Physical location or URL for online events
  organizer?: string;
  contactEmail?: string;
  imageUrl?: string;
  approved?: boolean; // Whether the event has been approved by an admin
  approvedBy?: string; // Admin who approved the event
  approvedAt?: Date; // Date when the event was approved
  _id?: string; // MongoDB ID
}
