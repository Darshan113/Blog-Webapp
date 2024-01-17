const express = require('express');

const app = express()

app.route('/').get((req,res)=>{
    res.send('hello get')
}).post((req,res)=>{
    res.send('hello post')
}).put((req,res)=>{
    res.send('hello put')
}).delete((req,res)=>{
    res.send('hello delete')
})

app.listen(8000,(er)=>{
    console.log(er ? er : 'server started at port 8000',)
})