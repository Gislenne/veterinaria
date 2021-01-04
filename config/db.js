if(process.env.NODE_ENV == "production"){
    module.exports = {mongoURI: "mongodb+srv://dbAdmin:6230303Gm@cluster0.4ehte.mongodb.net/Veterinaria?retryWrites=true&w=majority"}
}else{
    module.exports = {mongoURI: "mongodb://localhost/Veterinaria"}
}
