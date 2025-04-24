const Resource = require('../models/Resource');

// Upload a new educational resource
exports.uploadResource = async (req, res) => {
    try {
        const { title, description, category, resourceType, content } = req.body;
        const newResource = await Resource.create({
            title,
            description,
            category,
            resourceType,
            content,
            userId: req.user.id // Assuming user ID is available in req.user
        });
        res.status(201).json({ message: 'Resource uploaded successfully', resource: newResource });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading resource', error: error.message });
    }
};

// Get all resources or filter by category
exports.getResources = async (req, res) => {
    try {
        const { category } = req.query;
        const resources = category 
            ? await Resource.findAll({ where: { category } }) 
            : await Resource.findAll();
        res.status(200).json(resources);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving resources', error: error.message });
    }
};

// Get a resource by ID
exports.getResourceById = async (req, res) => {
    try {
        const resource = await Resource.findByPk(req.params.id);
        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }
        res.status(200).json(resource);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving resource', error: error.message });
    }
};

// Delete a resource by ID
exports.deleteResource = async (req, res) => {
    try {
        const resource = await Resource.findByPk(req.params.id);
        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }
        await resource.destroy();
        res.status(200).json({ message: 'Resource deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting resource', error: error.message });
    }
};