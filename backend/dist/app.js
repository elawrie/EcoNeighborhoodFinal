"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
app.use(jsonParser);
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
// post desafio aceptado
app.post("/desafioaceptado", jsonParser, function (req, res) {
    var email = req.query.email;
    console.log(email);
    // mostrar los datos de un usuario segun un correo en particular 
    connection.query("UPDATE Usuario SET puntos = puntos + 1 WHERE email = ?;", [email], function (error, results, fields) {
        if (error)
            throw error;
        console.log("puntos incrementado");
        res.send(JSON.stringify({ "mensaje": true, "resultado": results }));
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
// formulario post
app.post('/formulario', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        connection.query("INSERT INTO Formulario (Usuario_email,gusto1,gusto2,gusto3,gusto4,gusto5) VALUES (?,?,?,?,?,?)", [req.body.Usuario_email, req.body.gusto1, req.body.gusto2, req.body.gusto3, req.body.gusto4, req.body.gusto5,], function (error, results, fields) {
            if (error)
                throw error;
            res.send(JSON.stringify({ "mensaje": true, "resultado": results }));
        });
        return [2 /*return*/];
    });
}); });
// formulario get 
app.get("/formulario", jsonParser, function (req, res) {
    var email = req.query.Usuario_email;
    console.log("USUARIO EMAIL:");
    console.log(email);
    connection.query("SELECT gusto1, gusto2, gusto3, gusto4, gusto5 FROM Formulario WHERE Usuario_email LIKE ?", [email], function (error, results, fields) {
        if (error)
            throw error;
        console.log("RESULTS OF FORM GET:");
        console.log(results);
        if (results.length > 0) {
            console.log("results of form:");
            console.log(results);
            res.send(JSON.stringify({ "mensaje": true, "resultado": results }));
        }
        else {
            // correo no existe en la BD 
            res.send(JSON.stringify({ "mensaje": false }));
        }
        // res.send(JSON.stringify({"mensaje":true,"resultado":results}));
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
