const { DataTypes } = require('sequelize')
const database = require('../database')

const User = database.define('user', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'normal'
    }
})

module.exports = User