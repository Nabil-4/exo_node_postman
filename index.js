const {query} = require('express')
const express = require('express')
const app = express()

const mysql = require('mysql')
const connect = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "API_DWWM_GARAGE"
})

app.use(express.static("public"))

app.set('view engine', 'ejs')
app.set('views', './views')

app.listen(8080)

app.use(express.json())

connect.connect(function(err){
    if (err) throw err
    console.log("Connecté")
    connect.query('SELECT * FROM voiture', function(err, result){
        if (err) throw err
        console.log(result)
    })
})

app.get('/voiture', function(request, response){
    connect.query("SELECT * FROM voiture", function(err, result){
        if (err) throw err
        console.log(result)
        response.status(200).json(result)
    })
})

app.post('/voiture', function(request, response){
    const querys = "INSERT INTO voiture (marque, model, kilometre, prix) VALUES('"+request.body.marque+"', '"+request.body.model+"', '"+request.body.kilometre+"', '"+request.body.prix+"')"
    console.log(querys)
    connect.query(querys, function(err, result){
        if (err) throw err
        console.log(result)
        response.status(200).json(result)
    })
})

app.get('/voiture/:id', function(request, response){
    connect.query("SELECT * FROM voiture WHERE id = "+request.params.id+";", function(err, result){
        if (err) throw err
        console.log(result)
        response.status(200).json(result)
    })
})

app.delete('/voiture/:id', function(request, response){
    const id = parseInt(request.params.id)
    const querys = "DELETE FROM voiture WHERE id = "+id+";"
    console.log(querys)
    connect.query(querys, function(err, result){
        if (err) throw err
        console.log(result)
        response.status(200).json(result)
    })
})

app.get('/voiture/modif/:id', function(request, response){
    const id = parseInt(request.params.id)
    const querys = "UPDATE voiture SET marque = '"+request.body.marque+"' WHERE id = "+id+";"
    console.log(querys)
    connect.query(querys, function(err, result){
        if (err) throw err
        console.log(result)
        response.status(200).json(result)
    })
})

