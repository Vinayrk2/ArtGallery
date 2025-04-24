const User = require('../models/User');
const Collection = require('../models/Collection');

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const {
      username,
      email,
      name,
      profile_image_url,
      bio,
      location,
      website,
      social,
    } = req.body;

    await user.update({
      username,
      email,
      name,
      profile_image_url,
      bio,
      location,
      website,
      social,
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get user collections
exports.getUserCollections = async (req, res) => {
  try {
    const collections = await Collection.findAll({
      where: { artist_id: req.params.id },
      include: [
        {
          model: User,
          as: 'artist', // Alias defined in the association
          attributes: ['name', 'profile_image_url'], // Include artist's name and profile image
        },
      ],
    });
    res.json(collections);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
