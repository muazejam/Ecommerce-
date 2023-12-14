const { DataTypes } = require('sequelize')
const database = require('./database')

const Post = database.define('post', {
    title: DataTypes.STRING,
    caption: DataTypes.TEXT,
    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    age: {
        type: DataTypes.NUMBER,
        allowNull: true
    }
})

module.exports = Post