const Artwork = require('../models/Artwork');
const Comment = require('../models/Comment');
const Feedback = require('../models/Feedback');
const Like = require('../models/Like');
const User = require('../models/User');
const { Op } = require('sequelize');

// Upload artwork
exports.uploadArtwork = async (req, res) => {
  try {
    const {
      title,
      description,
      image_url,
      additional_images,
      artist_id,
      categories,
      tags,
      medium,
      dimensions,
      creation_date,
      is_featured,
      is_for_sale,
      price,
    } = req.body;

    const newArtwork = await Artwork.create({
      title,
      description,
      image_url,
      additional_images,
      artist_id,
      categories,
      tags,
      medium,
      dimensions,
      creation_date,
      is_featured,
      is_for_sale,
      price,
    });

    res.status(201).json(newArtwork);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all artworks
exports.getArtworks = async (req, res) => {
  try {
    const artworks = await Artwork.findAll(
      {
        include: [
          {
            model: User,
            as: 'artist', // Alias defined in the association
            attributes: ['name', 'profile_image_url'], // Fetch only specific fields
          },
        ],
        order: [['creation_timestamp', 'DESC']],
      }
    );
    res.json(artworks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get artwork by id
exports.getArtworkById = async (req, res) => {
  try {
    const artwork = await Artwork.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'artist', // Alias defined in the association
          attributes: ['name', 'profile_image_url'], // Fetch only specific fields
        },
      ],
      limit: 12,
    });

    if (!artwork) {
      return res.status(404).json({ message: 'Artwork not found' });
    }

    // Use Sequelize's count method to get the number of likes
    const likes = await Like.count({
      where: { artwork_id: req.params.id },
    });

    artwork.dataValues.likes = likes || 0; // Add likes count to the artwork object
    res.json(artwork);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get recent artworks
exports.getRecentArtworks = async (req, res) => {
  try {
    const recentArtworks = await Artwork.findAll({
      order: [['creation_timestamp', 'DESC']],
      include: [
        {
          model: User,
          as: 'artist', // Alias defined in the association
          attributes: ['name', 'profile_image_url'], // Fetch only specific fields
        },
      ],
      where: {
        creation_timestamp: {
          [Op.gte]: new Date(new Date() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
        },
      },
      limit: 10,
    });
    res.json(recentArtworks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get comments for artwork
exports.getCommentsForArtwork = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { artwork_id: req.params.id },
      order: [['creation_timestamp', 'ASC']],
      include: [
        {
          model: User,
          as: 'user', // Alias defined in the association
          attributes: ['name', 'profile_image_url'], // Fetch specific fields from the User model
        },
      ],
    });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get feedback for artwork
exports.getFeedbackForArtwork = async (req, res) => {
  try {
    const feedbacks = await Feedback.findAll({
      where: { artwork_id: req.params.id },
      order: [['creation_timestamp', 'DESC']],
    });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
