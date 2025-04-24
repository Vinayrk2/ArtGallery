const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./User');
const LearningResource = require('./LearningResource');

const ResourceProgress = sequelize.define('ResourceProgress', {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  resource_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: LearningResource,
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
  progress_percentage: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  last_accessed_timestamp: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'resource_progress',
  timestamps: false,
});

ResourceProgress.belongsTo(LearningResource, { foreignKey: 'resource_id', as: 'resource' });
ResourceProgress.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

module.exports = ResourceProgress;
