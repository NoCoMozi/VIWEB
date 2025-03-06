import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../utils/db';
import Event from '../../../models/Event';
import mongoose from 'mongoose';
import { isAuthenticated } from '../../../utils/auth';

/**
 * API endpoint for individual event operations
 * 
 * GET: Retrieve a specific event by ID
 * PUT: Update an event by ID (includes approval)
 * DELETE: Remove an event by ID
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectToDatabase();
    
    // Check authentication for all operations on this endpoint
    if (!isAuthenticated(req)) {
      return res.status(401).json({ 
        success: false, 
        message: 'Unauthorized. Admin authentication required.' 
      });
    }

    const { id } = req.query;
    
    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id as string)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid event ID format' 
      });
    }
    
    // Handle different HTTP methods
    switch (req.method) {
      case 'GET':
        return await getEvent(req, res, id as string);
      case 'PUT':
        return await updateEvent(req, res, id as string);
      case 'DELETE':
        return await deleteEvent(req, res, id as string);
      default:
        return res.status(405).json({ 
          success: false, 
          message: `Method ${req.method} not allowed` 
        });
    }
  } catch (error) {
    console.error('Error in event API:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error', 
      error: (error as Error).message 
    });
  }
}

/**
 * GET handler to retrieve a specific event
 */
async function getEvent(
  req: NextApiRequest, 
  res: NextApiResponse, 
  id: string
) {
  try {
    const event = await Event.findById(id);
    
    if (!event) {
      return res.status(404).json({ 
        success: false, 
        message: 'Event not found' 
      });
    }
    
    // For non-admin requests, only return approved events
    const { adminRequest = 'false' } = req.query;
    if (adminRequest !== 'true' && !event.approved) {
      return res.status(404).json({ 
        success: false, 
        message: 'Event not found or not yet approved' 
      });
    }
    
    return res.status(200).json({ 
      success: true, 
      data: event 
    });
  } catch (error) {
    console.error('Error fetching event:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error fetching event', 
      error: (error as Error).message 
    });
  }
}

/**
 * PUT handler to update an event
 * Includes special handling for approval operations
 */
async function updateEvent(
  req: NextApiRequest, 
  res: NextApiResponse, 
  id: string
) {
  try {
    const { action, adminName } = req.body;
    
    // Check if this is an approval action
    if (action === 'approve' || action === 'reject') {
      const updateData: any = {};
      
      if (action === 'approve') {
        updateData.approved = true;
        updateData.approvedBy = adminName || 'Admin';
        updateData.approvedAt = new Date();
      } else if (action === 'reject') {
        // For rejection, we could either delete the event or mark it specially
        // For now, let's just delete rejected events
        await Event.findByIdAndDelete(id);
        return res.status(200).json({ 
          success: true, 
          message: 'Event rejected and removed' 
        });
      }
      
      const event = await Event.findByIdAndUpdate(
        id, 
        updateData, 
        { new: true, runValidators: true }
      );
      
      if (!event) {
        return res.status(404).json({ 
          success: false, 
          message: 'Event not found' 
        });
      }
      
      return res.status(200).json({ 
        success: true, 
        message: `Event ${action === 'approve' ? 'approved' : 'rejected'}`,
        data: event 
      });
    }
    
    // Regular update operation (not approval-related)
    const updatedEvent = await Event.findByIdAndUpdate(
      id, 
      req.body, 
      { new: true, runValidators: true }
    );
    
    if (!updatedEvent) {
      return res.status(404).json({ 
        success: false, 
        message: 'Event not found' 
      });
    }
    
    return res.status(200).json({ 
      success: true, 
      data: updatedEvent 
    });
  } catch (error) {
    console.error('Error updating event:', error);
    
    // Handle validation errors
    if ((error as any).name === 'ValidationError') {
      const validationErrors = Object.values((error as any).errors).map((err: any) => err.message);
      return res.status(400).json({ 
        success: false, 
        message: 'Validation error', 
        errors: validationErrors 
      });
    }
    
    return res.status(500).json({ 
      success: false, 
      message: 'Error updating event', 
      error: (error as Error).message 
    });
  }
}

/**
 * DELETE handler to remove an event
 */
async function deleteEvent(
  req: NextApiRequest, 
  res: NextApiResponse, 
  id: string
) {
  try {
    const deletedEvent = await Event.findByIdAndDelete(id);
    
    if (!deletedEvent) {
      return res.status(404).json({ 
        success: false, 
        message: 'Event not found' 
      });
    }
    
    return res.status(200).json({ 
      success: true, 
      message: 'Event deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting event:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error deleting event', 
      error: (error as Error).message 
    });
  }
}
