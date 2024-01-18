const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = new mongoose.Schema({
    
},{
    timestamps : true
})

const model  = mongoose.model('',Schema)

module.exports = model