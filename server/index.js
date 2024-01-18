require('dotenv').config({path : './.env'})
const express = require('express');
const { Authentication } = require('./routes');
const { connectDB } = require('./config/db');
const morgan = require('morgan');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');
const httpStatus = require('http-status');
const path = require('path');

const app = express()
const port = process.env.PORT || 3000
connectDB()

// middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended : true}))

// routes
console.log(__dirname)
app.use('/static',express.static(path.join(__dirname,'./uploads')))
app.use('/api/v1',Authentication)

app.get('/',(req,res)=>{
    res.send('hello server')
})

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  });
  
  // convert error to ApiError, if needed
  app.use(errorConverter);
  
  // handle error
  app.use(errorHandler);
  

app.listen(port,(er)=>{
    console.log(er ? er : 'server started at port',port)
})