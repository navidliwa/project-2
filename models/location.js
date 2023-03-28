const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Location extends Model {}

Location.init(
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
        biome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        places_of_interest: {
            type: DataTypes.TEXT('long')
        },
        history: {
            type: DataTypes.TEXT('long')
        },
        // story: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        //     references: {
        //         model: 'plot',
        //         key: 'name',
        //     },
        // },
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
        modelName: 'location',
    }
)

module.exports = Location;