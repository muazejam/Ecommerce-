const { DataTypes } = require('sequelize')
const database = require('../database')

const User = database.define('user', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
})

module.exports = User