console.log("hello world");

// https://www.youtube.com/watch?v=Ad3fj9V7s6A
// START AT 6 MIN

// https://www.youtube.com/watch?v=NUHHbzau_9M
// video para conectar frontend y backend con angular, node y mysql

import * as express from 'express';

const app = require('express');

app.get('/', (req, res) => {
    res.send({hello:'world'});
})

app.listen(3000, '127.0.0.1', function() {
    console.log('server now listening on port 3000');
})