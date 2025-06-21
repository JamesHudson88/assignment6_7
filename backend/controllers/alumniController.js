// controllers/alumniController.js
// Alumni business logic and data operations

// In-memory storage for alumni data
let alumni = [
    {
        id: 1,
        name: "Ali Ahmad",
        email: "ali.ahmad@namal.edu.pk",
        graduationYear: 2022,
        degree: "Computer Science",
        currentPosition: "Software Engineer",
        company: "TechCorp",
        location: "Islamabad, Pakistan",
        profileImage: "https://via.placeholder.com/150",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 2,
        name: "Fatima Sheikh",
        email: "fatima.sheikh@namal.edu.pk",
        graduationYear: 2021,
        degree: "Business Administration",
        currentPosition: "Marketing Manager",
        company: "Global Solutions",
        location: "Lahore, Pakistan",
        profileImage: "https://via.placeholder.com/150",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 3,
        name: "Hassan Khan",
        email: "hassan.khan@namal.edu.pk",
        graduationYear: 2023,
        degree: "Electrical Engineering",
        currentPosition: "Project Engineer",
        company: "PowerTech",
        location: "Karachi, Pakistan",
        profileImage: "https://via.placeholder.com/150",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];

let nextId = 4;

// GET /api/alumni - Get all alumni
const getAllAlumni = (req, res) => {
    try {
        const { graduationYear, degree, location } = req.query;
        let filteredAlumni = [...alumni];

        // Apply filters if provided
        if (graduationYear) {
            filteredAlumni = filteredAlumni.filter(alum => 
                alum.graduationYear === parseInt(graduationYear)
            );
        }

        if (degree) {
            filteredAlumni = filteredAlumni.filter(alum => 
                alum.degree.toLowerCase().includes(degree.toLowerCase())
            );
        }

        if (location) {
            filteredAlumni = filteredAlumni.filter(alum => 
                alum.location.toLowerCase().includes(location.toLowerCase())
            );
        }

        res.status(200).json({
            success: true,
            count: filteredAlumni.length,
            data: filteredAlumni
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving alumni',
            error: error.message
        });
    }
};

// GET /api/alumni/:id - Get alumni by ID
const getAlumniById = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const alumnus = alumni.find(alum => alum.id === id);

        if (!alumnus) {
            return res.status(404).json({
                success: false,
                message: 'Alumni not found'
            });
        }

        res.status(200).json({
            success: true,
            data: alumnus
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving alumni',
            error: error.message
        });
    }
};

// POST /api/alumni - Create new alumni
const createAlumni = (req, res) => {
    try {
        const {
            name,
            email,
            graduationYear,
            degree,
            currentPosition,
            company,
            location,
            profileImage
        } = req.body;

        // Check if email already exists
        const existingAlumni = alumni.find(alum => alum.email === email);
        if (existingAlumni) {
            return res.status(400).json({
                success: false,
                message: 'Alumni with this email already exists'
            });
        }

        const newAlumni = {
            id: nextId++,
            name,
            email,
            graduationYear: parseInt(graduationYear),
            degree,
            currentPosition: currentPosition || '',
            company: company || '',
            location: location || '',
            profileImage: profileImage || 'https://via.placeholder.com/150',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        alumni.push(newAlumni);

        res.status(201).json({
            success: true,
            message: 'Alumni created successfully',
            data: newAlumni
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating alumni',
            error: error.message
        });
    }
};

// PUT /api/alumni/:id - Update alumni
const updateAlumni = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const alumniIndex = alumni.findIndex(alum => alum.id === id);

        if (alumniIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Alumni not found'
            });
        }

        // Check if email is being updated and if it already exists
        if (req.body.email && req.body.email !== alumni[alumniIndex].email) {
            const existingAlumni = alumni.find(alum => alum.email === req.body.email);
            if (existingAlumni) {
                return res.status(400).json({
                    success: false,
                    message: 'Alumni with this email already exists'
                });
            }
        }

        // Update alumni data
        const updatedAlumni = {
            ...alumni[alumniIndex],
            ...req.body,
            graduationYear: req.body.graduationYear ? parseInt(req.body.graduationYear) : alumni[alumniIndex].graduationYear,
            updatedAt: new Date().toISOString()
        };

        alumni[alumniIndex] = updatedAlumni;

        res.status(200).json({
            success: true,
            message: 'Alumni updated successfully',
            data: updatedAlumni
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating alumni',
            error: error.message
        });
    }
};

// DELETE /api/alumni/:id - Delete alumni
const deleteAlumni = (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const alumniIndex = alumni.findIndex(alum => alum.id === id);

        if (alumniIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Alumni not found'
            });
        }

        alumni.splice(alumniIndex, 1);

        res.status(204).send(); // No content response for successful deletion
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting alumni',
            error: error.message
        });
    }
};

module.exports = {
    getAllAlumni,
    getAlumniById,
    createAlumni,
    updateAlumni,
    deleteAlumni
};