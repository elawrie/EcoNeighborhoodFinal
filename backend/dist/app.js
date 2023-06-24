"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//algoritmo de encriptacion
var encriptacion_1 = require("./encriptacion");
var express = require('express');
var mysql = require("mysql");
var app = express();
//cors
var cors = require('cors');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
app.use(cors());
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'EcoNeighborhood'
});
connection.connect(function (err) {
    if (err) {
        console.error('Error conectando a la DB ' + err.stack);
        return;
    }
    console.log('Conexión establecida' + connection.threadId);
});
//creamos servidor
var configuracion = {
    hostname: "127.0.0.1",
    port: 3000,
};
// metodo PUT 
app.put("/registro", jsonParser, function (req, res) {
    var email = req.body.email;
    // llamar a la funcion encriptar para encriptar la contrasena 
    var password = (0, encriptacion_1.encriptar)(req.body.password);
    var puntos = req.body.puntos;
    connection.query("INSERT INTO Usuario (email,password,puntos) VALUES (?,?,?)", [email, password, puntos], function (error, results, fields) {
        if (error)
            throw error;
        res.send(JSON.stringify({ "mensaje": true, "resultado": results }));
    });
});
// metodo POST 
app.post("/registro", jsonParser, function (req, res) {
    var email = req.body.email;
    var password = (0, encriptacion_1.encriptar)(req.body.password);
    var puntos = req.body.puntos;
    connection.query("INSERT INTO Usuario (email,password,puntos) VALUES (?,?,?)", [email, password, puntos], function (error, results, fields) {
        if (error)
            throw error;
        res.send(JSON.stringify({ "mensaje": true, "resultado": results }));
    });
});
// metodo GET 
app.get("/registro", jsonParser, function (req, res) {
    var email = req.body.email;
    // mostrar los datos de un usuario segun un correo en particular 
    connection.query("SELECT * FROM Usuario WHERE email=?", [email], function (error, results, fields) {
        if (error)
            throw error;
        res.send(JSON.stringify({ "mensaje": true, "resultado": results }));
    });
});
// metodo DELETE
app.delete("/registro", jsonParser, function (req, res) {
    var email = req.body.email;
    // borrar los datos de un usuario segun un correo en particular 
    connection.query("DELETE FROM Usuario WHERE email=?", [email], function (error, results, fields) {
        if (error)
            throw error;
        res.send(JSON.stringify({ "mensaje": true, "resultado": results }));
    });
});
app.listen(configuracion, function () {
    console.log("Conectando al servidor http://localhost:".concat(configuracion.port));
});
