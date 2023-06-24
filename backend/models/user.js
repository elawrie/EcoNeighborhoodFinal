const db = require('../util/database');

module.exports = class User {
    constructor(email, password, puntos) {
        this.email = email;
        this.password = password;
        this.puntos = puntos;
    }

    // retornar el usuario segun su email 
    static find(email) {
        return db.execute(
            'SELECT * FROM Usuario WHERE email = ?', [email]
        );
    }

    // insertar usuarios en la bd 
    static save(user) {
        return db.execute(
            'INSERT INTO Usuario (email, password, puntos) VALUES (?, ?, ?)', [user.email, user.password, user.puntos]
        );
    }
};

