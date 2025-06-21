const validateAlumni = (req, res, next) => {
    const { name, email, graduationYear, degree } = req.body;
    const errors = [];

    // Required field validation
    if (!name || name.trim() === '') {
        errors.push('Name is required');
    }

    if (!email || email.trim() === '') {
        errors.push('Email is required');
    } else {
        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errors.push('Invalid email format');
        }
    }

    if (!graduationYear) {
        errors.push('Graduation year is required');
    } else {
        // Graduation year validation (2000 to current year + 5)
        const currentYear = new Date().getFullYear();
        if (graduationYear < 2000 || graduationYear > currentYear + 5) {
            errors.push(`Graduation year must be between 2000 and ${currentYear + 5}`);
        }
    }

    if (!degree || degree.trim() === '') {
        errors.push('Degree is required');
    }

    // If there are validation errors, return 400 Bad Request
    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors
        });
    }

    // If validation passes, continue to next middleware
    next();
};

const validateAlumniUpdate = (req, res, next) => {
    const { email, graduationYear } = req.body;
    const errors = [];

    // Email format validation (if provided)
    if (email && email.trim() !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errors.push('Invalid email format');
        }
    }

    // Graduation year validation (if provided)
    if (graduationYear) {
        const currentYear = new Date().getFullYear();
        if (graduationYear < 2000 || graduationYear > currentYear + 5) {
            errors.push(`Graduation year must be between 2000 and ${currentYear + 5}`);
        }
    }

    // If there are validation errors, return 400 Bad Request
    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors
        });
    }

    // If validation passes, continue to next middleware
    next();
};

const validateId = (req, res, next) => {
    const id = parseInt(req.params.id);
    
    if (isNaN(id) || id <= 0) {
        return res.status(400).json({
            success: false,
            message: 'Invalid ID format. ID must be a positive number.'
        });
    }
    
    next();
};

const validateJob = (req, res, next) => {
    const { title, company, description, location, salary } = req.body;
    const errors = [];

    // Required field validation
    if (!title || title.trim() === '') {
        errors.push('Job title is required');
    }

    if (!company || company.trim() === '') {
        errors.push('Company name is required');
    }

    if (!description || description.trim() === '') {
        errors.push('Job description is required');
    }

    if (!location || location.trim() === '') {
        errors.push('Job location is required');
    }

    // Optional salary validation
    if (salary && (isNaN(salary) || salary < 0)) {
        errors.push('Salary must be a valid positive number');
    }

    // If there are validation errors, return 400 Bad Request
    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors
        });
    }

    // If validation passes, continue to next middleware
    next();
};

module.exports = {
    validateAlumni,
    validateAlumniUpdate,
    validateId,
    validateJob
};