let events = [
    {
        id: 1,
        title: 'Alumni Networking Night',
        description: 'Join us for an evening of networking with fellow Namal alumni.',
        date: '2025-07-15',
        time: '18:00',
        location: 'Namal University Campus',
        category: 'networking',
        maxAttendees: 100,
        currentAttendees: 45,
        organizer: 'Alumni Association',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 2,
        title: 'Career Development Workshop',
        description: 'Professional development workshop focusing on career advancement strategies.',
        date: '2025-07-20',
        time: '14:00',
        location: 'Virtual Event',
        category: 'career',
        maxAttendees: 50,
        currentAttendees: 32,
        organizer: 'Career Services',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];

let nextEventId = 3;

const eventController = {
    getAllEvents: (req, res) => {
        try {
            const { category, upcoming } = req.query;
            let filteredEvents = [...events];

            if (category && category !== 'all') {
                filteredEvents = filteredEvents.filter(e => e.category === category);
            }

            if (upcoming === 'true') {
                const today = new Date().toISOString().split('T')[0];
                filteredEvents = filteredEvents.filter(e => e.date >= today);
            }

            res.status(200).json({
                success: true,
                count: filteredEvents.length,
                data: filteredEvents
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Internal server error'
            });
        }
    },

    getEventById: (req, res) => {
        try {
            const { id } = req.params;
            const event = events.find(e => e.id == id);

            if (!event) {
                return res.status(404).json({
                    success: false,
                    error: 'Event not found'
                });
            }

            res.status(200).json({
                success: true,
                data: event
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Internal server error'
            });
        }
    },

    createEvent: (req, res) => {
        try {
            const newEvent = {
                id: nextEventId++,
                currentAttendees: 0,
                ...req.body,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            events.push(newEvent);

            res.status(201).json({
                success: true,
                message: 'Event created successfully',
                data: newEvent
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Internal server error'
            });
        }
    },

    updateEvent: (req, res) => {
        try {
            const { id } = req.params;
            const index = events.findIndex(e => e.id == id);

            if (index === -1) {
                return res.status(404).json({
                    success: false,
                    error: 'Event not found'
                });
            }

            events[index] = {
                ...events[index],
                ...req.body,
                updatedAt: new Date().toISOString()
            };

            res.status(200).json({
                success: true,
                message: 'Event updated successfully',
                data: events[index]
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Internal server error'
            });
        }
    },

    deleteEvent: (req, res) => {
        try {
            const { id } = req.params;
            const index = events.findIndex(e => e.id == id);

            if (index === -1) {
                return res.status(404).json({
                    success: false,
                    error: 'Event not found'
                });
            }

            events.splice(index, 1);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Internal server error'
            });
        }
    }
};

module.exports = eventController;