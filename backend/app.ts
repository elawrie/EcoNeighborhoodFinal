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
    password : '',
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
    let email=req.body.email;
    // mostrar los datos de un usuario segun un correo en particular 
    connection.query("SELECT * FROM Usuario WHERE email=?", [email], function (error:any,results:any,fields:any){
        if (error) throw error;
        res.send(JSON.stringify({"mensaje":true,"resultado":results}));
    });
  });

  // metodo DELETE
  app.delete("/registro",jsonParser,(req:any, res:any) => {
    let email=req.body.email;
    // borrar los datos de un usuario segun un correo en particular 
    connection.query("DELETE FROM Usuario WHERE email=?", [email], function (error:any,results:any,fields:any){
        if (error) throw error;
        res.send(JSON.stringify({"mensaje":true,"resultado":results}));
    });
  });

app.listen(configuracion, () => {
    console.log(`Conectando al servidor http://localhost:${configuracion.port}`)
})

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