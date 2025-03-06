import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../utils/db';
import Event from '../../../models/Event';
import { isAuthenticated } from '../../../utils/auth';

/**
 * API endpoint for events collection
 * 
 * GET: Retrieve events with optional filtering
 * POST: Create a new event (pending approval)
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectToDatabase();

    // Check authentication for admin requests
    if (req.query.adminRequest === 'true' && !isAuthenticated(req)) {
      return res.status(401).json({ 
        success: false, 
        message: 'Unauthorized. Admin authentication required.' 
      });
    }

    // Handle different HTTP methods
    switch (req.method) {
      case 'GET':
        return await getEvents(req, res);
      case 'POST':
        return await createEvent(req, res);
      default:
        return res.status(405).json({ 
          success: false, 
          message: `Method ${req.method} not allowed` 
        });
    }
  } catch (error) {
    console.error('Error in events API:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error', 
      error: (error as Error).message 
    });
  }
}

/**
 * GET handler to retrieve events
 * Supports filtering by date, type, location, and approval status
 */
async function getEvents(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { 
      month, 
      year, 
      type, 
      locationType, 
      showPending = 'false',
      adminRequest = 'false'
    } = req.query;

    // Build query filters
    const query: any = {};

    // Filter by month and year if provided
    if (month && year) {
      const startDate = new Date(parseInt(year as string), parseInt(month as string) - 1, 1);
      const endDate = new Date(parseInt(year as string), parseInt(month as string), 0);
      query.date = { $gte: startDate, $lte: endDate };
    }

    // Filter by event type if provided
    if (type) {
      query.type = type;
    }

    // Filter by location type if provided
    if (locationType) {
      query.locationType = locationType;
    }

    // Filter by approval status
    // Regular users only see approved events by default
    // Admin users can request to see pending events with showPending=true
    if (adminRequest === 'true') {
      if (showPending === 'true') {
        query.approved = false; // Only show pending events
      }
      // For admin, can show all or filtered by status
    } else {
      query.approved = true; // Non-admin users only see approved events
    }

    // Fetch events from database
    const events = await Event.find(query).sort({ date: 1, startTime: 1 });

    // Return success response
    return res.status(200).json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error fetching events', 
      error: (error as Error).message 
    });
  }
}

/**
 * POST handler to create a new event
 * All new events are set as pending approval by default
 */
async function createEvent(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Create a new event with pending approval status
    const event = await Event.create({
      ...req.body,
      approved: false // Set as unapproved by default
    });

    // Return success response
    return res.status(201).json({
      success: true,
      data: event
    });
  } catch (error) {
    console.error('Error creating event:', error);
    
    // Handle validation errors
    if ((error as any).name === 'ValidationError') {
      const validationErrors = Object.values((error as any).errors).map((err: any) => err.message);
      return res.status(400).json({ 
        success: false, 
        message: 'Validation error', 
        errors: validationErrors 
      });
    }
    
    // Handle other errors
    return res.status(500).json({ 
      success: false, 
      message: 'Error creating event', 
      error: (error as Error).message 
    });
  }
}
