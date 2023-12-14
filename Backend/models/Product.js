const sequelize = require('../database')
const {DataTypes} = require('sequelize')

const Product = sequelize.define('Product', {
  name: DataTypes.STRING,
  price: {
    type: DataTypes.STRING,
    allowNull: true
  },
  sold: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  image: DataTypes.STRING
})

module.exports = Product