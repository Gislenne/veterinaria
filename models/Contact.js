const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Contact = new Schema({
    name: {
        type: String,
        require: true
    }, 
    email: {
        type: String,
        require: true
    },
    telCel: {
        type: String,
        require: true
    },
    message: {
        type: String,
        require: true 
    },
    data: {
        type: Date,
        default: Date.now()
    }, 
})

// Colection
mongoose.model('contacts', Contact)