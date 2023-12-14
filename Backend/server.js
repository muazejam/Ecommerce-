const express = require('express')
const app = express()
const database = require('./database')
const User = require('./user')
const {formidable} = require('formidable')
const fs = require('fs')
const cors = require('cors')

app.set('view engine', 'ejs')
app.use(express.urlencoded())
app.use(express.json())
const relation = require('./relations')
const Post = require('./post')
const path = require('path')

relation()
database.sync()

app.use(cors({origin: '*'}))

app.get('/register', async function(req, res){
    res.render('register')
})

app.post('/register',  function(req, res){
    let form = formidable({uploadDir: './uploads'})
    console.log('j')
    form.parse(req, async function(err, fields, files){
        const firstName = fields.firstName[0]
        const lastName = fields.lastName[0]
        const file = files.profile[0]
        let ext = file.mimetype.split('/')[1]
        fs.rename(file.filepath, file.filepath + '.' + ext, function(){})
        await User.create({
            firstName,
            lastName,
            profile: '/uploads/' + file.newFilename + '.' + ext
        })
        res.json({success: true})

    })
    
})


app.get('/users', async function(req, res){
    let users = await User.findAll()
    return res.render('users', { userList: users })
})

app.get('/api/users', async function(req, res){
    let users = await User.findAll()
    return res.json({userList: users })
})

app.get('/users/:id', async function(req, res){
    let user = await User.findAll({
        where: {
            firstName: 'abe'
        }
    })
    if(user){
        return res.json({success: true, user: user})
    } else return res.sendStatus(404)
})

app.get('/edit-user/:id', async function(req, res){
    let user = await User.findByPk(req.params.id)
    if(!user) return res.sendStatus(404)
    return res.render('edit-user', {id: req.params.id, user: user})
})

app.post('/edit-user', async function(req, res){
    const {firstName, lastName, id} = req.body
    let user = await User.findByPk(id)
    if(user){
        user.firstName = firstName
        user.lastName = lastName
        await user.save()
        return res.redirect('/users')
    } else return res.sendStatus(404)
})

app.get('/delete-user/:id', async function(req, res){
    let id = req.params.id
    let user = await User.findByPk(id)
    if(user){
        await user.destroy()
        res.redirect('/users')
    } else return res.sendStatus(404)
})

app.get('/create-post/:id', async function(req, res){
    res.render('create-post', {id: req. params.id})
})

app.post('/create-post', async function(req, res){
    const {title, caption, age, id} = req.body
    await Post.create({
        title, caption, age, userid: id
    })
    return res.redirect('/posts')
})
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.get('/posts', async function(req, res){
    let posts = await Post.findAll({
        include: User
    })
    res.json({posts})
})

app.get('/posts/:id', async function(req, res){
    let user = await User.findByPk(req.params.id, {include: Post})
    return res.json({user})
})

// ;(async function(){
//     let mypromise = await new Promise(function(resove, reject){
//         setTimeout(() => resove(5), 3000)
//     })
    
    
    
//     // reject
//     // resolve
//     // pending
    
//     console.log(mypromise)
//     console.log('hi')
// })()





app.listen(3002, () => console.log('server is running'))