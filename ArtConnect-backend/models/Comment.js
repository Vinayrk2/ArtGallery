const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./User');
const Artwork = require('./Artwork');

const Comment = sequelize.define('Comment', {
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
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'uuid',
    },
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  creation_timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'comments',
  timestamps: false,
});

Comment.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
Comment.belongsTo(Artwork, { foreignKey: 'artwork_id', as: 'artwork' });

module.exports = Comment;
