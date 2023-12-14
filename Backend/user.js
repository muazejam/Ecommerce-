const { DataTypes } = require('sequelize')
const database = require('./database')

const User = database.define('user', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    profile: DataTypes.STRING
})

module.exports = User