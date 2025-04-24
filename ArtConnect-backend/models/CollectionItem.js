const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Collection = require('./Collection');
const Artwork = require('./Artwork');

const CollectionItem = sequelize.define('CollectionItem', {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  collection_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Collection,
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
  added_timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'collection_items',
  timestamps: false,
});

CollectionItem.belongsTo(Collection, { foreignKey: 'collection_id', as: 'collection' });
CollectionItem.belongsTo(Artwork, { foreignKey: 'artwork_id', as: 'artwork' });

module.exports = CollectionItem;
