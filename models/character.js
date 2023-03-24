const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Character extends Model {};

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
        homeland: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'location',
                key: 'name',
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
        user_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'user',
              key: 'id',
            },
        }
    }
)

module.exports = Character;