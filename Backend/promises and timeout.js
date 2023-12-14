// const express = require('express')
// const app = express()
// const fs = require('fs')
// // fs.writeFileSync('note.txt', 'this is my diary')
// // let html = fs.readFileSync('index.html')

// // app.get('/home', function(req, res){
// //     res.end(html)
// // })



// // console.log(html.toString())
// // application/x-www-form-urlencoded
// // username=abe&password=1234&
// app.use(express.urlencoded())
// app.set('view engine', 'ejs')

// app.get('/profile/:username', function(req, res){
//     res.render('index', { firstname: 'sith', lastname: 'mat'})
// })

// app.get('/user', function(req, res){
//     console.log('called.', req.query)
//     // let greeeting = `hello ${req.body.firstname} ${req.body.lastname}`
//     res.end('greeeting')
// })

// app.get('/profile/:username/:version', function(req, res){
//     console.log(req.params.version)
//     res.end('profile page')
// })



// app.listen(4000, function(){
//     console.log('server is running...')
// })


// pending
// resolved
// reject
// fullfield

function callback(resolve, reject){
    
    setTimeout(resolve, 5000)
}

async function called(){
    try {
        let mypromise = await (new Promise(callback))
        console.log(mypromise)
    } catch(e){
        console.log('error occured', e)
    }

    (new Promise(callback)).then(function(value){
        console.log(value)
    }).catch(function(e){

    })
}



// called()

setInterval(function(){
    console.log('hello')
}, 2000)