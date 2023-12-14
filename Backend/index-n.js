const express = require('express')
const fs = require('fs')
const path = require('path')
const Post = require('./post')
// const html = fs.readFileSync('./index.html')

const app = express()
// // urlencoded
// username=fuad&password=1234
// // json
// {
//     username: 'fuad',
//     password: '1234'
// }

app.use(express.urlencoded())
app.use(express.json())
app.set('view engine', 'ejs')

app.use('/assets', express.static(path.join(__dirname + '/assets')))

app.get('/login', function(req, res){
    console.log(req.headers)
    console.log('hello')
    res.render('login')
})

app.post('/login', function(req, res){
    console.log(req.body)
    const {username, password} = req.body
    // res.render('index', {
    //     name: req.body.username
    // })

    res.redirect(`/profile/${username}/${password}`)
})

app.get('/', function(req, res){
    // res.sendStatus(502)
    res.render('index')
})

app.get('/profile/:firstName/:lastName', function(req, res){
    console.log(req.query)
    res.render('profile', {
        firstName: req.params.firstName,
        lastName: req.params.lastName
    })
})

app.get('/me/:username/:action', function(req, res){
    console.log(req.params)
    res.end('success')
})

app.listen(4000, function(){
    console.log('server is running...')
})




// header
 // body

 // path: /login
 // method: GET, POST, PATCH, PUT, DELETE, OPTIONS

 // http status codes

 // 100 - 199 -> information exchange
 // 200 - 299 -> success messages
 // 300 - 399 -> redirections
 // 400 - 499 -> client side errors
 // 500 - 599 -> server side errors