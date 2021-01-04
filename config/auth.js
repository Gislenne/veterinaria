const bcrypt = require('bcryptjs');
const localStrategy = require('passport-local').Strategy;
const mongoose = require("mongoose")

//Model de clientes
require("../models/Customer")
const Customer = mongoose.model("customers")

module.exports = function(passport){
    
    passport.use(new localStrategy({usernameField: 'email', passwordField: 'senha'}, (email, senha, done) => {
        Customer.findOne({email: email}).then((customer) => {
            if(!customer){
                return done(null, false, {message: "Esta conta não existe"})
            }
            bcrypt.compare(senha, customer.senha, (erro, batem) => {
                if(batem){
                    return done(null, customer)
                }else{
                    return done(null, false, {message: "Senha incorreta"})
                }
            })
        })  
    }))
    passport.serializeUser((customer, done) => {
        done(null, customer.id)
    })
    passport.deserializeUser((id, done) => {
        Customer.findById(id, (err, customer) => {
            done(err, customer)
        })
    })
}