const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./User');
const Artwork = require('./Artwork');

const Feedback = sequelize.define('Feedback', {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  artwork_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Artwork,
      key: 'uuid',
    },
  },
  reviewer_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'uuid',
    },
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  category: {
    type: DataTypes.ENUM('composition', 'technique', 'concept', 'color', 'general'),
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  is_anonymous: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  creation_timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'feedback',
  timestamps: false,
});

Feedback.belongsTo(Artwork, { foreignKey: 'artwork_id', as: 'artwork' });
Feedback.belongsTo(User, { foreignKey: 'reviewer_id', as: 'reviewer' });

module.exports = Feedback;
