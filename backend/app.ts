//algoritmo de encriptacion
import {encriptar} from "./encriptacion";

const express = require('express');
const mysql=require("mysql");
const app=express();
//cors
const cors=require('cors');
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

