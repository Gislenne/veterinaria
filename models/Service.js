const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Service = new Schema({
    name: {
        type: String,
        require: true
    }, 
    price: {
        type: Number,
        require: true
    },
    description: {
        type: String,
        require: true 
    },
    date: {
        type: Date,
        default: Date.now()
    } 
})

// Colection
mongoose.model('services', Service)