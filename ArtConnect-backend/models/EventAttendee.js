const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./User');
const Event = require('./Event');

const EventAttendee = sequelize.define('EventAttendee', {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  event_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Event,
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
  status: {
    type: DataTypes.ENUM('registered', 'attended', 'cancelled'),
    defaultValue: 'registered',
  },
  registered_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'event_registrations',
  timestamps: false,
});

EventAttendee.belongsTo(Event, { foreignKey: 'event_id', as: 'event' });
EventAttendee.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

module.exports = EventAttendee;
