const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./User');

const Event = sequelize.define('Event', {
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
    allowNull: true,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  is_virtual: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  virtual_link: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  creation_timestamp: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'uuid',
    },
  },
  start_datetime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'events',
  timestamps: false,
});

Event.belongsTo(User, {
  foreignKey: 'organizer_id', // Ensure this matches the column in the database
  as: 'organizer', // Alias used in the include option
});

module.exports = Event;
