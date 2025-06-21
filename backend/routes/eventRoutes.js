const express = require('express');
const router = express.Router();

// GET all events
router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Events retrieved successfully',
        data: [
            {
                id: 1,
                title: 'Alumni Meetup 2025',
                description: 'Annual alumni gathering',
                date: '2025-07-15',
                location: 'Main Campus',
                capacity: 100
            },
            {
                id: 2,
                title: 'Career Fair',
                description: 'Job opportunities for alumni',
                date: '2025-08-20',
                location: 'Convention Center',
                capacity: 200
            }
        ]
    });
});

// GET single event by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.status(200).json({
        success: true,
        message: `Event ${id} retrieved successfully`,
        data: {
            id: parseInt(id),
            title: 'Sample Event',
            description: 'This is a sample event description',
            date: '2025-07-15',
            location: 'Sample Location',
            capacity: 50
        }
    });
});

// POST create new event
router.post('/', (req, res) => {
    const { title, description, date, location, capacity } = req.body;
    
    res.status(201).json({
        success: true,
        message: 'Event created successfully',
        data: {
            id: Date.now(),
            title: title || 'New Event',
            description: description || 'Event description',
            date: date || new Date().toISOString(),
            location: location || 'TBD',
            capacity: capacity || 50,
            createdAt: new Date().toISOString()
        }
    });
});

// PUT update event
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, date, location, capacity } = req.body;
    
    res.status(200).json({
        success: true,
        message: `Event ${id} updated successfully`,
        data: {
            id: parseInt(id),
            title: title || 'Updated Event',
            description: description || 'Updated description',
            date: date || new Date().toISOString(),
            location: location || 'Updated Location',
            capacity: capacity || 50,
            updatedAt: new Date().toISOString()
        }
    });
});

// DELETE event
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.status(200).json({
        success: true,
        message: `Event ${id} deleted successfully`,
        deletedId: parseInt(id)
    });
});

module.exports = router;