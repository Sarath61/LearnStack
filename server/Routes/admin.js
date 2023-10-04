const mongoose = require('mongoose')
const courseSchema = mongoose.Schema({
    title:{
        type: String,
        required: [true,'A Course must have Title']
    },
    Description:{
        type: String,
        required: [true,'A Course must have Decription']
    }
})