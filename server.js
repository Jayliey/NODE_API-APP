require('dotenv').config()
const express = require('express')
const mongoose =require('mongoose')
const bcrypt = require("bcrypt")
const productRoute = require('./routes/productRoute');
const errorMiddleware = require('./middleware/errorMiddleware')
var cors = require('cors')

const app = express()

const PORT = process.env.PORT || 3000
const MONGO_URL = process.env.MONGO_URL

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//Routes

app.use('/api', productRoute);

app.get('/', (req, res) => {
    res.send('Hello Node API')
})

app.get('/blog', (req, res) => {
    res.send('Hello blog, My name is Juliet')
})

app.use(errorMiddleware);

mongoose.set('strictQuery', false)
mongoose.
connect(MONGO_URL)
.then(() => {
    console.log('connected to mongodb')
    app.listen(PORT, ()=> {
        console.log('Node API app is running on port 3000')
    })
    
}).catch((error) => {
    console.log(error)
})