const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const ports = 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.listen(ports, () => console.log('listening on port ', ports))

// VIDEO TO FOLLOW
// https://www.youtube.com/watch?v=NUHHbzau_9M
// START AT 14:41