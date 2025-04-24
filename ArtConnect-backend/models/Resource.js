const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

class Resource extends Model {}

Resource.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM('article', 'video', 'tutorial'),
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'Resource',
    tableName: 'resources',
    timestamps: true,
});

module.exports = Resource;