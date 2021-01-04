const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const Schedule = new Schema({

    pet: {
        type: String,
        require: true
    },
    typepet: {
        type: String,
        require: true
    },

    diagnosis: {
        type: String,
        require: true 
    },
    date2: {
        type: Date,
        require: true 
    },
    date: {
        type: Date,
        default: Date.now()
    },
    hour: {
        type: String,
        require: true
    },
    service:{
        type: Schema.Types.ObjectId,
        ref: "services",
        required: true
    }, 
    responsible:{
        type: Schema.Types.ObjectId,
        ref: "customers",
        required: true
    } 
})

// Colection
mongoose.model('schedules', Schedule)