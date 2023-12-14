const User = require('./models/user')
const Product = require('./models/product')

function relations(){
    User.hasMany(Product, {foreignKey: 'userid'})
    Product.belongsTo(User, {foreignKey: 'userid'})
}

module.exports = relations