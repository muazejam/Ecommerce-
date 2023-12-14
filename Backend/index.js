const express = require('express')
const path = require('path')
const app = express()


const database = require('./database')
const User = require('./models/User')
const Product = require('./models/Product')

const relation = require('./relations')
// relation()
database.sync()
const { formidable } = require('formidable')
const fs = require('fs');
const cors = require('cors')

const jwt = require('jsonwebtoken')

function success(){
    console.log('server is runnung...')
}


app.set('view engine', 'ejs')
app.use(express.urlencoded())
app.use(express.json())
app.use(cors({origin: '*'}))




app.use(async function(req, res, next){
    let headers = req.headers
    console.log(headers)
    if(!headers.cookie) return next()
    let id = headers.cookie.split('=')[1]
    let decrypted = jwt.verify(id, '1234-secret')
    console.log('decrypted', decrypted)
    let user = await User.findByPk(decrypted)
    if(user){
        req.loggedInUser = user
        req.loggedIn = true
    }
    next()
})

app.get('/upload', function(req, res){
    res.render('upload')
})

app.post('/upload', function(req, res){
    let form = formidable({uploadDir: './uploads'})
    form.parse(req, function(err, fields, files){
        console.log(files.image[0].mimetype)
        let file = files.image[0]
        let mime = file.mimetype // image/png
        // ['image', 'png']
        let file_type = mime.split('/').pop()
        fs.rename(file.filepath, file.filepath + '.' + file_type, function(){})
        res.end('successfully uploaded')
    })
})

app.post('/login1', async function(req, res){

    const form = formidable({uploadDir: './uploads'})
    form.parse(req, (err, fields, files) => {
        if (err) {
          next(err);
          return;
        }
        const file = files.image[0]
        fs.rename( file.filepath, file.filepath + '.' + file.mimetype.split('/').pop(), () => '' )
        res.json({ fields, files });
      });
})

app.all('/register1', async function(req, res){
    let x = 2 + 6
    if(req.method == 'GET'){
        res.render('register')
    } else {
        const {firstName, lastName} = req.body
        let user = await User.create({
            firstName: firstName,
            lastName: lastName
        })
        res.redirect('/users')
    }
})

app.get('/users', async function(req, res){
   let users  = await User.findAll({
   })
   console.log(users)
   return res.json({success: true, userList: users})
})

app.get('/get-user/:id', async function(req, res){
    let userId = req.params.id
    let user = await User.findOne({
        where: {
            firstName: 'john'
        }
    })
    if(user){
        res.json({success: true, user: user})
    } else {
        return res.json({success: false, message: 'user not found'})
    } 
    // findAll() ->returns array of objects
    // findOne() -> returns one object
    // findByPK() -> returns one object
    
})

app.get('/get-products/:userId', async function(req, res){
    let userId = req.params.userId
    let user = await User.findOne({
        where: {
            id: userId
        },
        include: [Product]
    })
    return res.json({products: user.Products})
})

app.get('/profile/:firstName/:lastName', function(req, res){
    console.log(req.query)
    let firstName = req.params.firstName
    let lastName = req.params.lastName
    return res.render('profile', {
        firstName: firstName,
        lastName: lastName
    })
})

app.get('/add-product', function(req, res){
    return res.render('add-product')
})

app.post('/add-product', async function(req, res){
    let form = formidable({uploadDir: './uploads'})
    form.parse(req, async function(err, fields, files){
        let image = files.product_image[0]
        let name = fields.name[0]
        let price = fields.price[0]
        let file_type = image.mimetype.split('/').pop() // image/png ['image', 'png]

        fs.rename(image.filepath, image.filepath + '.' + file_type, function(){})

        await Product.create({
            name: name,
            price: price,
            image: '/uploads/' + image.newFilename + '.' + file_type
        })

       
        res.redirect('/view-products')
        // return res.redirect('/users')
    })
    // let userId = req.params.userId
    
})
// const path = require('path')

app.get('/view-products', async function(req, res){
    let products = await Product.findAll()
    return res.render('products', {products: products})
})

app.use('/assets', express.static(path.join(__dirname + '/assets')))
app.use('/uploads', express.static(path.join(__dirname + '/uploads')))

// first: npm i ejs


app.get('/home', function(req, res){
    return res.json({success: true, products: ['bag', 'shoes']})
})

// app.get('/add-product', async function(req, res){
//     res.render('add-product')
// })

// app.post('/add-product', function(req, res){
//     let form = formidable({uploadDir: './uploads'})
//     form.parse(req, function(err, fields, files){
//         console.log(err)
//     })
//     res.end('success')
// })

app.get('/edit-product/:id', async function(req, res){
    let product = await Product.findOne({ where: {
        id: req.params.id
    }})
    return res.render('edit-product', {product: product})
})

app.post('/edit-product/:id', async function(req, res){
    const {name, price} = req.body
    let product = await Product.findByPk(req.params.id)
    product.name = name
    product.price = price

    await product.save()
    res.redirect('/view-products')
})

app.get('/delete-product', async function(req, res){
    let product = await Product.findByPk(req.query.id)
    await product.destroy()
    res.redirect('/view-products')
})


{
    loggedIn: true
}
app.get('/homepage', function(req, res){
    let user = req.loggedInUser
    if(req.loggedIn){
        return res.render('home', {
            loggedIn: true,
            firstName: user ? user.firstName : ''
        })
    } else {
        return res.render('home' , {
            loggedIn: false
        })
    }
    
})


app.get('/logout', function(req, res){
    res.setHeader('Set-Cookie', 'mellaid=deleted; expires=Thu, 01 Jan 1970 00:00:00 GMT')
    return res.redirect('/homepage')
})

app.post('/login', async function(req, res){
    const {username, password} = req.body
    let findedUser = await User.findOne({
        where: {
            username: username
        }
    })
    if(findedUser){
        if(findedUser.password == password){
            let encrypted = jwt.sign(findedUser.id, '1234-secret')
            console.log(encrypted)
            res.setHeader('Set-Cookie', 'mellaid='+encrypted)
            return res.redirect('/homepage')
        }
    }
    res.render('login', {error: true})

   
        
    
})

app.get('/login', function(req, res){
    return res.render('login', {error: false})
})

app.get('/register', function(req, res){
    return res.render('register')
})

app.post('/register', async function(req, res){

    const {firstName, lastName, username, password} = req.body
    await User.create({
        firstName, lastName, username, password
    })
    return res.redirect('/login')
})

app.get('/api', function(req, res){
    res.json({success: true, data: 'John'})
})

app.listen(4000, success)

// getting user input to create a table row
// get all table data

// returning the table data as a json response
// returning the table data as an html response
// get specific table data
// image upload
// table relations
// authentication

// CRUD
// update and delete


