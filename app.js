// Carregando módulos
    const express = require('express')
    const handlebars = require('express-handlebars')
    const bodyParser = require('body-parser')
    const app = express()
    const path = require('path')
    const mongoose = require('mongoose')
    const session = require('express-session')
    const flash = require('connect-flash')
    const customers = require("./routes/customer")
    const admin = require('./routes/admin')
    const passport = require('passport')
    require("./config/auth")(passport)
    const db = require("./config/db")
//Configurações
    //Sessão
    app.use(session({
        secret: "6230303Gm201722840033",
        resave: true,
        saveUninitialized: true
    }))
    app.use(passport.initialize())
    app.use(passport.session())
    app.use(flash())
    //Flash
    app.use(flash())
    //Middlewares
    app.use((req, res, next) => {
        res.locals.success_msg = req.flash('success_msg')
        res.locals.error_msg = req.flash('error_msg')
        res.locals.error = req.flash("error")
        res.locals.user = req.user || null;
        next()
    })
    //Body Parser
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())
    //Handlebars
        app.engine('handlebars', handlebars({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars');
    //Mongoose
    mongoose.connect(db.mongoURI, {useUnifiedTopology: true, 
        useNewUrlParser: true, useCreateIndex: true });
    //Public
        app.use(express.static(path.join(__dirname, 'public')))
        app.use((req, res, next) => {
            console.log("Oi eu sou um Middlewares!")
            next()
        })
//Rotas
    
    app.use('/admin', admin)
    app.use("/customers", customers)
//Outros

const PORT = process.env.PORT || 3000
app.listen(PORT,() =>{
console.log("Servidor rodando!")
})