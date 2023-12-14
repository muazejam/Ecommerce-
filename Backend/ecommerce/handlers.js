const User = require("./models/user")
const jwt = require('jsonwebtoken')
const SECRET = '123456@#$%^'
const {formidable} = require('formidable')
const fs = require('fs')
const Product = require("./models/product")

exports.register = async function(req, res){
    const {
        username, password, firstName, lastName
    } = req.body
    await User.create({
        username, password, firstName, lastName, role: 'seller'
    })
    res.json({success: true, message: 'User created!'})
}

exports.login = async function(req, res){
    const {username, password} = req.body
    let user = await User.findOne({
        where: {
            username
        }
    })
    console.log(user)
    if(user){
        if(user.password == password){
            let token = jwt.sign(user.id, SECRET)
            return res.json({success: true, token: token})
        }
    } return res.json({success: false})
}

exports.addProduct = async function(req, res){
    const form = formidable({uploadDir: './uploads'})
    form.parse(req, async function(error, fields, files){
        const name = fields.name[0]
        const price = fields.price[0]
        if(!name || !price) return res.sendStatus(400)
        const image = files.product_image[0]
        const ext = image.mimetype.split('/')[1]
        let userId = req.loggedUser.id
        const fileName = image.newFilename + '.' + ext
        fs.rename(image.filepath, image.filepath + '.' + ext, function(){})
        await Product.create({
            name, price, image: '/uploads/' + fileName, userid: userId
        })
        res.json({success: true, message: 'Product successfuly created'})

    })
}

exports.viewProducts = async function(req, res){
    let products = await Product.findAll({order: [['createdAt', 'desc']]})
    res.json({success: true, products})
}

exports.myProducts = async function(req, res){
    try {
        let products = req.loggedUser.products || []
        res.json({success: true, products})
    } catch(e){
        res.json({success: false})
    }
}