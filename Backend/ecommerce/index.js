const express = require('express')
const app = express()
const PORT = process.env.PORT || 4000
const routes = require('./routes')
const cors = require('cors')
const path = require('path')

app.use(cors())
app.use('/uploads', express.static(path.join(__dirname , '../', './uploads')))

const database = require('./database')
const relations = require('./relations')
relations()
database.sync()

app.use(express.json())

app.use('/api', routes)

app.listen(PORT, () => console.log('server is running on port', PORT))