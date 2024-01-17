const express = require('express');
const { Authentication } = require('./routes');
const { connectDB } = require('./config/db');
const morgan = require('morgan');

const app = express()
const port = 8000
connectDB()

// middleware
app.use(morgan('dev'))

// routes
app.use('/api/v1',Authentication)

app.get('/',(req,res)=>{
    res.send('hello server')
})

app.listen(port,(er)=>{
    console.log(er ? er : 'server started at port 8000',)
})