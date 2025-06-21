let jobs = [
    {
        id: 1,
        title: 'Full Stack Developer',
        company: 'Tech Innovations',
        location: 'Lahore, Pakistan',
        description: 'Looking for experienced full stack developer with React and Node.js skills.',
        requirements: ['React.js', 'Node.js', 'MongoDB', '2+ years experience'],
        salary: 'PKR 80,000 - 120,000',
        type: 'Full-time',
        postedBy: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 2,
        title: 'Marketing Specialist',
        company: 'Digital Solutions',
        location: 'Islamabad, Pakistan',
        description: 'Seeking creative marketing specialist for digital campaigns.',
        requirements: ['Digital Marketing', 'SEO/SEM', 'Content Creation', '1+ years experience'],
        salary: 'PKR 60,000 - 90,000',
        type: 'Full-time',
        postedBy: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];

let nextJobId = 3;

const jobController = {
    getAllJobs: (req, res) => {
        try {
            res.status(200).json({
                success: true,
                count: jobs.length,
                data: jobs
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Internal server error'
            });
        }
    },

    getJobById: (req, res) => {
        try {
            const { id } = req.params;
            const job = jobs.find(j => j.id == id);

            if (!job) {
                return res.status(404).json({
                    success: false,
                    error: 'Job not found'
                });
            }

            res.status(200).json({
                success: true,
                data: job
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Internal server error'
            });
        }
    },

    createJob: (req, res) => {
        try {
            const newJob = {
                id: nextJobId++,
                ...req.body,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            jobs.push(newJob);

            res.status(201).json({
                success: true,
                message: 'Job created successfully',
                data: newJob
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Internal server error'
            });
        }
    },

    updateJob: (req, res) => {
        try {
            const { id } = req.params;
            const index = jobs.findIndex(j => j.id == id);

            if (index === -1) {
                return res.status(404).json({
                    success: false,
                    error: 'Job not found'
                });
            }

            jobs[index] = {
                ...jobs[index],
                ...req.body,
                updatedAt: new Date().toISOString()
            };

            res.status(200).json({
                success: true,
                message: 'Job updated successfully',
                data: jobs[index]
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Internal server error'
            });
        }
    },

    deleteJob: (req, res) => {
        try {
            const { id } = req.params;
            const index = jobs.findIndex(j => j.id == id);

            if (index === -1) {
                return res.status(404).json({
                    success: false,
                    error: 'Job not found'
                });
            }

            jobs.splice(index, 1);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Internal server error'
            });
        }
    }
};

module.exports = jobController;