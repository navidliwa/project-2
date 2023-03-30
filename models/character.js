const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Character extends Model { };

Character.init(
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
        location_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'location',
                key: 'id',
            },
        },
        profession: {
            type: DataTypes.STRING,
        },
        philosophy: {
            type: DataTypes.STRING,
        },
        motivation: {
            type: DataTypes.TEXT('long'),
        },
        notes: {
            type: DataTypes.TEXT('long'),
        },
        // Cloudinary
        image: {
            type: DataTypes.STRING
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'character',
    }
)

module.exports = Character;