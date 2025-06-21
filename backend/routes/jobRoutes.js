
const express = require('express');
const router = express.Router();

// ✅ Correct - Destructure the validation functions
const { validateJob, validateId } = require('../middleware/validator');

// GET all jobs
router.get('/', (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: 'Jobs retrieved successfully',
            data: [] // Your jobs data here
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve jobs'
        });
    }
});

// GET single job by ID
router.get('/:id', validateId, (req, res) => {
    try {
        const { id } = req.params;
        res.status(200).json({
            success: true,
            message: `Job ${id} retrieved successfully`,
            data: {} // Your job data here
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve job'
        });
    }
});

// POST create new job
router.post('/', validateJob, (req, res) => {
    try {
        res.status(201).json({
            success: true,
            message: 'Job created successfully',
            data: req.body
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to create job'
        });
    }
});

// PUT update job
router.put('/:id', validateId, validateJob, (req, res) => {
    try {
        const { id } = req.params;
        res.status(200).json({
            success: true,
            message: `Job ${id} updated successfully`,
            data: req.body
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to update job'
        });
    }
});

// DELETE job
router.delete('/:id', validateId, (req, res) => {
    try {
        const { id } = req.params;
        res.status(200).json({
            success: true,
            message: `Job ${id} deleted successfully`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to delete job'
        });
    }
});

module.exports = router;