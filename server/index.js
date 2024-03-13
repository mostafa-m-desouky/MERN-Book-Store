
const express = require('express')
// const config = require("./config")
const config = require('dotenv').config()
const app = express()
const mongoose = require('mongoose');
const bookModel = require('./models/bookModel')
const bookRoute = require("./routes/bookRoute")
const cors = require('cors')

app.use(express.json());


// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
// app.use(cors());

// Option 2: Allow Custom Origins
app.use(cors({
    origin: ['http://localhost:3000', 'https://book-store-clinet.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true
}))

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to MERN Stack')
})

app.use('/books', bookRoute)
// config.PORT || process.env.PORT
mongoose
    .connect(process.env.mongoDB_URL, {dbName: "demo-db"})
    // .connect(config.mongoDB_URL)
    .then(() => {
        console.log("App Connected")
        app.listen(5000, () => {
            console.log(`App is listing on port`)
        })
    })
    .catch((error) => {
        console.log(error)
    })