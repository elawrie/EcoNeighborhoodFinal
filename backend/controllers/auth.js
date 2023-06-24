const { validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.signup = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) return

    const email = req.body.email;
    const password = req.body.password;
    const puntos = req.body.puntos;

    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const userDetails = {
            email: email,
            password: hashedPassword,
            puntos: puntos
        }
        const result = await User.save(userDetails);

        res.status(201).json({ message: 'Usuario registrado' });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}