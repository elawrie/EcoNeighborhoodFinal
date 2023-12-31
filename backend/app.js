"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//algoritmo de encriptacion
var encriptacion_1 = require("./encriptacion");
var express = require('express');
var mysql = require("mysql");
var app = express();
//cors
var cors = require('cors');
var axios = require('axios'); //Necesario para Recaptcha
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
app.use(cors());
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Hola1234',
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
    var email = req.query.email;
    console.log(email);
    // mostrar los datos de un usuario segun un correo en particular 
    connection.query("SELECT * FROM Usuario WHERE email LIKE ?", [email], function (error, results, fields) {
        if (error)
            throw error;
        if (results.length > 0) {
            // correo existe en la BD
            console.log("results:");
            console.log(results);
            console.log("points:");
            console.log(results[0].puntos);
            res.send(JSON.stringify({ "mensaje": true, "resultado": results[0].puntos }));
        }
        else {
            // correo no existe en la BD 
            res.send(JSON.stringify({ "mensaje": false }));
        }
        // res.send(JSON.stringify({"mensaje":true,"resultado":results}));
    });
});
app.get("/ranking", jsonParser, function (req, res) {
    connection.query("SELECT email,puntos FROM Usuario ORDER BY puntos DESC", function (error, results, fields) {
        if (error)
            throw error;
        if (results.length > 0) {
            // correo existe en la BD
            console.log("results:");
            console.log(results);
            // console.log("points:");
            // console.log(results);
            res.send(JSON.stringify({ "mensaje": true, "resultado": results }));
        }
        else {
            // correo no existe en la BD 
            res.send(JSON.stringify({ "mensaje": false }));
        }
        // res.send(JSON.stringify({"mensaje":true,"resultado":results}));
    });
});
// metodo DELETE
app.delete("/registro", jsonParser, function (req, res) {
    var email = req.body.email;
    // borrar los datos de un usuario segun un correo en particular 
    connection.query("DELETE FROM Usuario WHERE email LIKE ?", [email], function (error, results, fields) {
        if (error)
            throw error;
        res.send(JSON.stringify({ "mensaje": true, "resultado": results }));
    });
});
app.listen(configuracion, function () {
    console.log("Conectando al servidor http://localhost:".concat(configuracion.port));
});
//Metodo para mostrar información de calendario por usuario//
app.get("/calendario", jsonParser, function (req, res) {
    var email = req.query.email;
    console.log(email);
    // mostrar los datos de un usuario segun un correo en particular 
    connection.query("SELECT d.*, u.email FROM `EcoNeighborhood`.`Desafios` AS d INNER JOIN `EcoNeighborhood`.`Acepta` AS a ON d.`id` = a.`Desafios_id` INNER JOIN `EcoNeighborhood`.`Usuario` AS u ON a.`Usuario_email` = u.`email` WHERE u.`email` LIKE ?", [email], function (error, results, fields) {
        if (error)
            throw error;
        if (results.length > 0) {
            // correo existe en la BD con usuario con desafios
            res.send(JSON.stringify({ "mensaje": true, "resultado": results }));
        }
        else {
            // Correo existe en la BD  con usuario sin desafios
            res.send(JSON.stringify({ "mensaje": true, "resultado": [] }));
        }
    });
});
//Se define método post para api google recaptcha//
app.post('/login', function (req, res) {
    var token = req.body.token;
    //Se conecta api de google con llave//
    axios
        .post('https://www.google.com/recaptcha/api/siteverify', null, {
        params: {
            secret: '6LfBHskmAAAAAG8UXTKF3TAfqY5QyvjGsMp-jGU9',
            response: token,
        },
    })
        //Se comprueba si el captcha fue éxitoso//
        .then(function (response) {
        var success = response.data.success;
        if (success) {
            //Verificación exitiosa//
            res.json({ success: true, message: 'reCAPTCHA verification successful' });
        }
        else {
            //Verificación fallida//
            res.json({ success: false, message: 'reCAPTCHA verification failed' });
        }
    })
        //Mensajes de error por parte del servicio de google//
        .catch(function (error) {
        console.error('Error occurred during reCAPTCHA verification:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    });
});
// ...
// metodo POST para actualizar información del usuario cuando se acepta un desafio//
app.post('/actualizar-usuario', jsonParser, function (req, res) {
    var usuarioEmail = req.body.Usuario_email;
    var desafiosId = req.body.Desafios_id;
    var status = req.body.Status;
    var fechaInicio = req.body.Fecha_inicio;
    var query = 'UPDATE Acepta SET Status = ?, Fecha_inicio = ? WHERE Usuario_email = ? AND Desafios_id = ?';
    console.log('SQL query:', query);
    console.log('Parameters:', status, fechaInicio, usuarioEmail, desafiosId);
    console.log("Datos actualizar:" + usuarioEmail, desafiosId, status, fechaInicio);
    connection.query('UPDATE Acepta SET Status = ?, Fecha_inicio = ? WHERE Usuario_email = ? AND Desafios_id = ?', [status, fechaInicio, usuarioEmail, desafiosId], function (error, results, fields) {
        if (error) {
            console.error('Error updating user information:', error);
            res.send(JSON.stringify({ mensaje: false, error: error.message }));
        }
        else {
            console.log("exito en la aceptación de nuevo desafío");
            res.send(JSON.stringify({ mensaje: true, resultado: results }));
        }
    });
});
