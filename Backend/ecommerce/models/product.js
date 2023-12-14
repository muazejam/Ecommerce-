const { DataTypes } = require('sequelize')
const database = require('../database')

const Product = database.define('product', {
    name: DataTypes.STRING,
    price: DataTypes.NUMBER,
    image: DataTypes.STRING
})

module.exports = Product