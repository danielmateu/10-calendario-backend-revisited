const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');

const crearUsuario = async (req, res = response) => {

    const { email, password } = req.body;
    try {
        /* Looking for a user with the email that is being passed in the request body. */
        let usuario = await Usuario.findOne({ email });
        // Validar si el usuario existe
        if (usuario) {
            return res.status(400).json({
                ok: false,
                message: 'El usuario ya existe con ese email'
            });
        }
        // Crear nueva instancia del usuario
        usuario = new Usuario(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        // Guardar en la BD
        await usuario.save();

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name
            // message: 'crearUsuario',
        });5

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Hable con el administrador'
        });
    }
}

const loginUsuario = (req, res = response) => {

    const { email, password } = req.body;

    res.status(201).json({
        ok: true,
        message: 'login',
        // user: req.body
        email,
        password
    });
}

const revalidarToken = (req, res = response) => {

    res.json({
        ok: true,
        message: 'renew'
    });
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}