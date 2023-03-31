const { response } = require('express');
const Usuario = require('../models/Usuario');

const crearUsuario = async (req, res = response) => {

    // const { name, email, password } = req.body;
    try {
        // Crear nueva instancia del usuario
        const usuario = new Usuario(req.body);

        // Guardar en la BD
        await usuario.save();

        res.status(201).json({
            ok: true,
            message: 'crearUsuario',
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