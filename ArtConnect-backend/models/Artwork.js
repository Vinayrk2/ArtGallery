const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./User');

const Artwork = sequelize.define('Artwork', {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  additional_images: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  artist_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'uuid',
    },
  },
  categories: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  medium: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dimensions: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  creation_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: true,
  },
  creation_timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'artworks',
  timestamps: false,
});

Artwork.belongsTo(User, { foreignKey: 'artist_id', as: 'artist' });

module.exports = Artwork;
