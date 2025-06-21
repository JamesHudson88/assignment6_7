const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import routes
const alumniRoutes = require('./routes/alumniRoutes');
const jobRoutes = require('./routes/jobRoutes');
const eventRoutes = require('./routes/eventRoutes');

// Import middleware
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'], // React dev servers
    credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger); // Custom request logger

// Routes
app.use('/api/alumni', alumniRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/events', eventRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Namal Nexus API is running successfully',
        timestamp: new Date().toISOString(),
        endpoints: {
            alumni: '/api/alumni',
            jobs: '/api/jobs',
            events: '/api/events'
        }
    });
});

// Root route
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to Namal Nexus Alumni Portal API',
        version: '1.0.0',
        documentation: 'Check /api/health for available endpoints'
    });
});

// 404 Handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint not found',
        message: `The requested resource ${req.originalUrl} was not found on this server`
    });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
    console.log(' Namal Nexus API Server Started Successfully!');
    console.log(` Server running on: http://localhost:${PORT}`);
    console.log(` Health check: http://localhost:${PORT}/api/health`);
    console.log('\n Available API Endpoints:');
    console.log(`    Alumni: http://localhost:${PORT}/api/alumni`);
    console.log(`    Jobs: http://localhost:${PORT}/api/jobs`);
    console.log(`    Events: http://localhost:${PORT}/api/events`);
    console.log('\n  Ready for testing with Postman!\n');
});

module.exports = app;