const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./User');

const Collection = sequelize.define('Collection', {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  artist_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'uuid',
    },
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  is_featured: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  creation_timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'artworks', // Explicitly using artworks table
  timestamps: false,
});

// Association setup
Collection.belongsTo(User, { 
  foreignKey: 'artist_id', // Explicitly define the foreign key
  targetKey: 'uuid',
  as: 'artist'
});

User.hasMany(Collection, {
  foreignKey: 'artist_id', // Explicitly define the foreign key
  sourceKey: 'uuid',
  as: 'collections'
});

module.exports = Collection;