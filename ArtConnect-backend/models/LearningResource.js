const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./User');

const LearningResource = sequelize.define('LearningResource', {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content_type: {
    type: DataTypes.ENUM('video', 'article', 'guide'),
    allowNull: false,
  },
  content_url: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  uploaded_by: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'uuid',
    },
  },
  creation_timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'educational_resources',
  timestamps: false,
});

LearningResource.belongsTo(User, { foreignKey: 'uploaded_by', as: 'uploader' });

module.exports = LearningResource;
