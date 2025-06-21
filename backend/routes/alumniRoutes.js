const express = require('express');
const router = express.Router();

// ✅ Correct - Destructure the validation functions
const { validateAlumni, validateAlumniUpdate, validateId } = require('../middleware/validator');

// GET all alumni
router.get('/', (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: 'Alumni retrieved successfully',
            data: [] // Your alumni data here
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve alumni'
        });
    }
});

// GET single alumni by ID
router.get('/:id', validateId, (req, res) => {
    try {
        const { id } = req.params;
        res.status(200).json({
            success: true,
            message: `Alumni ${id} retrieved successfully`,
            data: {} // Your alumni data here
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve alumni'
        });
    }
});

// POST create new alumni
router.post('/', validateAlumni, (req, res) => {
    try {
        res.status(201).json({
            success: true,
            message: 'Alumni created successfully',
            data: req.body
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to create alumni'
        });
    }
});

// PUT update alumni
router.put('/:id', validateId, validateAlumniUpdate, (req, res) => {
    try {
        const { id } = req.params;
        res.status(200).json({
            success: true,
            message: `Alumni ${id} updated successfully`,
            data: req.body
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to update alumni'
        });
    }
});

// DELETE alumni
router.delete('/:id', validateId, (req, res) => {
    try {
        const { id } = req.params;
        res.status(200).json({
            success: true,
            message: `Alumni ${id} deleted successfully`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to delete alumni'
        });
    }
});

module.exports = router;