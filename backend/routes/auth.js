const express = require('express');

// validacion 
const { body } = require('express-validator');
const { authPlugins } = require('mysql2');

const router = express.Router();

const User = require('../models/user');

const authController = require('../controllers/auth');

router.post(
    '/signup', 
    [
        body('email').isEmail().withMessage('El correo tiene que ser valido.').custom(async (email) => {
            const user = await User.find(email);
            if (user[0].length > 0) {
                // si el usuario ya existe, para la creacion del usuario 
                return Promise.reject('Correo ya existe en el sistema');
            }
        })
        .normalizeEmail(),
        body('password').trim().isLength({ min: 7 }),
        body('puntos').trim()
    ], authController.signup
);

module.exports = router;