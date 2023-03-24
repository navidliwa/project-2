const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Plot extends Model {};

Plot.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'location',
                key: 'name',
              },
        },
        characters: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        conflict: {
            type: DataTypes.TEXT('long')
        },
        payoff: {
            type: DataTypes.TEXT('long')
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'user',
              key: 'id',
            },
        }
    }
)

module.exports = Plot;