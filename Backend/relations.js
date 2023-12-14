const User = require('./user')
const Post = require('./post')

function relation(){
    Post.belongsTo(User, {foreignKey: 'userid'})
    User.hasMany(Post, {foreignKey: 'userid'})
}

module.exports = relation