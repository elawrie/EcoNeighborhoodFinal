//algoritmo de encriptacion
import {encriptar} from "./encriptacion";

const express = require('express');
const mysql=require("mysql");
const app=express();
//cors
const cors=require('cors');
const axios=require('axios'); //Necesario para Recaptcha
const bodyParser = require('body-parser');
var jsonParser = bodyParser.json()

app.use(cors());

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Hola1234',
    port:  3306,
    database : 'EcoNeighborhood'
  });

  connection.connect(function(err:any) {
    if (err) {
      console.error('Error conectando a la DB ' + err.stack);
      return;
    }
    console.log('Conexión establecida' + connection.threadId);
  });

//creamos servidor
const configuracion={
    hostname: "127.0.0.1",
    port: 3000,
}

// metodo PUT 
app.put("/registro",jsonParser,(req:any, res:any) => {
    let email=req.body.email;
    // llamar a la funcion encriptar para encriptar la contrasena 
    let password=encriptar(req.body.password);
    let puntos=req.body.puntos;

    connection.query("INSERT INTO Usuario (email,password,puntos) VALUES (?,?,?)",[email,password,puntos],function(error:any,results:any,fields:any){
        if (error) throw error;
        res.send(JSON.stringify({"mensaje":true,"resultado":results}));
    });
  });

  // metodo POST 
  app.post("/registro",jsonParser,(req:any, res:any) => {
    let email=req.body.email;
    let password=encriptar(req.body.password);
    let puntos=req.body.puntos;

    connection.query("INSERT INTO Usuario (email,password,puntos) VALUES (?,?,?)",[email,password,puntos],function(error:any,results:any,fields:any){
        if (error) throw error;
        res.send(JSON.stringify({"mensaje":true,"resultado":results}));
    });
  });

  // metodo GET 
  app.get("/registro",jsonParser,(req:any, res:any) => {
    let email=req.query.email;
    console.log(email);
    // mostrar los datos de un usuario segun un correo en particular 
    connection.query("SELECT * FROM Usuario WHERE email LIKE ?", [email], function (error:any,results:any,fields:any){
        if (error) throw error;
        if (results.length > 0) {
          // correo existe en la BD
          console.log("results:");
          console.log(results);
          console.log("points:");
          console.log(results[0].puntos);
          res.send(JSON.stringify({ "mensaje": true, "resultado": results[0].puntos }));
        } else {
          // correo no existe en la BD 
          res.send(JSON.stringify({ "mensaje": false }));
        }
        // res.send(JSON.stringify({"mensaje":true,"resultado":results}));
    });
  });

  app.get("/ranking",jsonParser,(req:any, res:any) => {
    connection.query("SELECT email,puntos FROM Usuario ORDER BY puntos DESC", function (error:any,results:any,fields:any){
      if (error) throw error;
      if (results.length > 0) {
        // correo existe en la BD
        console.log("results:");
        console.log(results);
        // console.log("points:");
        // console.log(results);
        res.send(JSON.stringify({ "mensaje": true, "resultado": results}));
      } else {
        // correo no existe en la BD 
        res.send(JSON.stringify({ "mensaje": false }));
      }
      // res.send(JSON.stringify({"mensaje":true,"resultado":results}));
  });
  })


  // metodo DELETE
  app.delete("/registro",jsonParser,(req:any, res:any) => {
    let email=req.body.email;
    // borrar los datos de un usuario segun un correo en particular 
    connection.query("DELETE FROM Usuario WHERE email LIKE ?", [email], function (error:any,results:any,fields:any){
        if (error) throw error;
        res.send(JSON.stringify({"mensaje":true,"resultado":results}));
    });
  });

app.listen(configuracion, () => {
    console.log(`Conectando al servidor http://localhost:${configuracion.port}`)
})

//Metodo para mostrar información de calendario por usuario//
app.get("/calendario",jsonParser,(req:any, res:any) => {
  let email=req.query.email;
  console.log(email);
  // mostrar los datos de un usuario segun un correo en particular 
  connection.query("SELECT d.*, u.email FROM `EcoNeighborhood`.`Desafios` AS d INNER JOIN `EcoNeighborhood`.`Acepta` AS a ON d.`id` = a.`Desafios_id` INNER JOIN `EcoNeighborhood`.`Usuario` AS u ON a.`Usuario_email` = u.`email` WHERE u.`email` LIKE ?",
  [email], function (error:any,results:any,fields:any){
      if (error) throw error;
      if (results.length > 0) {
        // correo existe en la BD con usuario con desafios
        res.send(JSON.stringify({ "mensaje": true, "resultado": results }));
      } else {
        // Correo existe en la BD  con usuario sin desafios
        res.send(JSON.stringify({ "mensaje": true, "resultado": [] }));
      }
  });
});


//Se define método post para api google recaptcha//
app.post('/login', (req:any, res:any) => {
  const { token } = req.body;

  //Se conecta api de google con llave//
  axios
    .post('https://www.google.com/recaptcha/api/siteverify', null, {
      params: {
        secret: '6LfBHskmAAAAAG8UXTKF3TAfqY5QyvjGsMp-jGU9',
        response: token,
      },
    })
    //Se comprueba si el captcha fue éxitoso//
    .then((response:any) => {
      const { success } = response.data;
      if (success) {
        //Verificación exitiosa//
        res.json({ success: true, message: 'reCAPTCHA verification successful' });
      } else {
        //Verificación fallida//
        res.json({ success: false, message: 'reCAPTCHA verification failed' });
      }
    })
    //Mensajes de error por parte del servicio de google//
    .catch((error:any) => {
      console.error('Error occurred during reCAPTCHA verification:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    });
});

// ...

// metodo POST para actualizar información del usuario cuando se acepta un desafio//
app.post('/actualizar-usuario', jsonParser, (req:any, res:any) => {
  const usuarioEmail = req.body.Usuario_email;
  const desafiosId = req.body.Desafios_id;
  const status = req.body.Status;
  const fechaInicio = req.body.Fecha_inicio;

  connection.query(
    'UPDATE Acepta SET Status = ?, Fecha_inicio = ? WHERE Usuario_email = ? AND Desafios_id = ?',
    [status, fechaInicio, usuarioEmail, desafiosId],
    function (error:any, results:any, fields:any) {
      if (error) {
        console.error('Error updating user information:', error);
        res.send(JSON.stringify({ mensaje: false, error: error.message }));
      } else {
        res.send(JSON.stringify({ mensaje: true, resultado: results }));
      }
    }
  );
});


