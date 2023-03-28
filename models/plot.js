const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Plot extends Model {};

Plot.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true,
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
        location_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'location',
                key: 'id',
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
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'plot',
    }
)

module.exports = Plot;