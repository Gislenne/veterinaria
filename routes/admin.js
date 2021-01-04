const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Contact")
const Contact = mongoose.model('contacts')
require("../models/Service")
const Service = mongoose.model('services')
require("../models/Schedule")
const Schedule = mongoose.model('schedules')

const {eAdmin} = require('../helpers/eAdmin')

router.get('/',(req, res) => {
    res.render("admin/index")
}) 

router.get('/about',(req, res) => {
    res.render("admin/about")
}) 

router.get('/service',(req, res) => {
    res.render("admin/service")
}) 

router.get('/schedule',(req, res) => {
    res.render("admin/schedule")
})

router.post('/schedule/sent',(req, res) => {
    var erros = []
    if(req.body.services == "0"){
        erros.push({texto: "Serviço inváido, registre uma categoria"})
    }
    if(erros.length > 0){
        res.render("admin/", {erros: erros})
    }else{
        const newSchedule = {
            pet: req.body.nomepet,
            typepet: req.body.tipoPet,
            diagnosis: req.body.diagnostico,
            date2: req.body.data,
            hour: req.body.hora-cons,
            service: req.body.servico
            //responsible: req.body.
        }
        new Schedule(newSchedule).save().then(() => {
            req.flash("success_msg", "Serviço agendado com sucesso!")
            res.redirect("/admin/schedule")
            console.log("Serviço agendado com sucesso")
        }).catch((err) => {
            req.flash("error_msg", "Falha ao agendar serviço!")   
            res.redirect("/admin/schedule")
         console.log("Erro ao agendar serviço!")
        })
    }
})

router.get('/schedule/toview', eAdmin, (req, res) => {
    Schedule.find().sort({date: 'desc'}).then((schedules) => {
        res.render('admin/viewschedules', {schedules: schedules})
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao listar os agendamentos")
        res.redirect("/admin/")
    })
}) 


router.get('/contact',(req, res) => {
    res.render("admin/contact")
}) 

router.post('/contact/sent', (req, res) => {
    const newMenssage = {
         name: req.body.nome,
         email: req.body.email,
         telCel: req.body.telCel,
         message: req.body.mensagem
    }
 
    new Contact(newMenssage).save().then(() => {
        req.flash("success_msg", "Mensagem enviada com sucesso!")
        res.redirect("/admin/")
        console.log("Mensagem enviada com sucesso")
    }).catch((err) => {
        req.flash("error_msg", "Falha ao enviar mensagem!")   
        res.redirect("/admin/contact")
     console.log("Erro ao enviar mensagem!")
    })
})

router.get('/contact/toview', eAdmin, (req, res) => {
    Contact.find().sort({date: 'desc'}).then((contacts) => {
        res.render('admin/viewcontacts', {contacts: contacts})
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao listar os contatos")
        res.redirect("/admin/")
    })
}) 


router.get('/services', (req, res) => {
    Service.find().sort({date: 'desc'}).then((services) => {
        res.render("admin/services", {services: services})
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao listar os serviços")
        res.redirect("/admin/")
    })  
})
router.get('/services/add', (req, res) => {
    res.render("admin/addservices")
})

router.post('/services/send', (req, res) => {
    const newService = {
        name: req.body.nome,
        price: req.body.valor,
        description: req.body.descricao
   }
    new Service(newService).save().then(() => {
        req.flash("success_msg", "Serviço cadastrado com sucesso!")
        res.redirect("/admin/services")
        console.log("Serviço cadastrado com sucesso")
    }).catch((err) => {
        req.flash("error_msg", "Falha ao cadastrar serviço!")   
        res.redirect("/admin/services")
    console.log("Erro ao cadastrar serviço!")
    })
})

router.get('/services/edit/:id', eAdmin, (req, res) => {
    red.send("Página de edição de serviços")
})

module.exports = router