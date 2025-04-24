const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./User');
const Artwork = require('./Artwork');

const Like = sequelize.define('Like', {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'uuid',
    },
  },
  artwork_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Artwork,
      key: 'uuid',
    },
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'likes',
  timestamps: false,
});

Like.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Like.belongsTo(Artwork, { foreignKey: 'artwork_id', as: 'artwork' });

module.exports = Like;
