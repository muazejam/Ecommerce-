function callback(resolve, reject){
    setTimeout(() => reject(3), 3000)
}


async function myFunc(){
    (new Promise(callback)).then(function(value){
        console.log(value)
        console.log('hello')
    }).catch(function(error){
        console.log('error occured', error)
    })
}



function callback(resovle, reject){
    setTimeout(resovle, 2000)
}

async function func(){
    console.log('hi')
    (new Promise(callback)).then(function(value){
        console.log('hello')
    })
   
}
// func()
let interval = setInterval(() => console.log('hello'), 1000)
setTimeout(() => clearInterval(interval), 5000 )
// sequelize