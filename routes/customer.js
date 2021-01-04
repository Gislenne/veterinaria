const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require("../models/Customer")
const Customer = mongoose.model('customers')
const bcrypt = require('bcryptjs')
const passport = require("passport")
const {eAdmin} = require("../helpers/eAdmin")

router.get('/register', (req, res) => {
    res.render("customers/register")
})
router.post('/register', (req, res) => {
                const newCustomer = new Customer({
                    name: req.body.nome,
                    email: req.body.email,
                    telCel: req.body.telCel,
                    cpf: req.body.cpf,
                    address: req.body.endereco,
                    num: req.body.numero,
                    neighborhood: req.body.bairro,
                    city: req.body.cidade,
                    cep: req.body.cep,
                    senha: req.body.senha
               })
               bcrypt.genSalt(10, (erro, salt) => {
                    bcrypt.hash(newCustomer.senha, salt, (erro, hash) => {
                        if(erro){
                            req.flash("error_msg", "Houve um erro durante o salvamento do usuário")
                            res.redirect("/admin/")
                        }

                        newCustomer.senha = hash

                        newCustomer.save().then(() => {
                            req.flash("success_msg", "Usuário criado com sucesso!")
                            res.redirect("/admin/")
                        }).catch((err) => {
                            req.flash("error_msg", "Houve um erro ao criar o usuário, tente novavemnte!")
                            res.redirect("/customers/register")
                        })
                    })
               })
})

router.get('/login', (req, res) => {
    res.render("customers/login")
})

router.post("/login", (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/admin",
        failureRedirect:"/customers/login",
        failureFlash: true
    })(req, res, next)
})

router.get("/logout", (req, res) => {
    req.logout()
    req.flash("success_msg", "Deslogado com sucesso!")
    res.redirect("/admin")

})

module.exports = router