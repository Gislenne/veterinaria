const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Customer = new Schema({
    name: {
        type: String,
        require: true
    }, 
    email: {
        type: String,
        require: true
    },
    cpf: {
        type: String,
        require: true
    },  
    telCel: {
        type: String,
        require: true
    }, 
    address: {
        type: String,
        require: true
    },
    num: {
        type: Number,
        require: true
    },
    neighborhood:{
        type: String,
        require: true
    },
    city:{
        type: String,
        require: true
    },  
    cep:{
        type: Number,
        require: true
    },
    senha:{
        type: String,
        require: true
    },
    data: {
        type: Date,
        default: Date.now()
    }, 
    eAdmin: {
        type: Number,
        default: 0
    } 
})

// Colection
mongoose.model('customers', Customer)