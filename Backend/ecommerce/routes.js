const routes = require('express').Router()
const {register, login, addProduct, viewProducts, myProducts} = require('./handlers')
const Product = require('./models/product')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const SECRET = '123456@#$%^'

routes.post('/register', register)
routes.post('/login', login)
routes.get('/products', viewProducts)

routes.use(async function(req, res, next){
    const Authorization = req.headers['authorization']
    if(Authorization){
        console.log(Authorization)
        let token = Authorization.split(' ')[1]
        const id = jwt.verify(token, SECRET)
        let user
        try {
            user = await User.findByPk(id.toString(), {include: Product})  
        } catch(e){
            user = await User.findByPk(id.toString())
        }
        
        if(user){
            console.log('user found', user)
            req.loggedUser = user
            return next()
        } 
    }
    res.sendStatus(403)
    
})
routes.get('/my-products', myProducts)
routes.post('/add-product', addProduct)

module.exports = routes
