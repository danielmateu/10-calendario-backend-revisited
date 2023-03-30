const { response } = require('express');

const crearUsuario = (req, res = response) => {

    const { name, email, password } = req.body;

    res.status(201).json({
        ok: true,
        message: 'crearUsuario',
        // user: req.body
        name,
        email,
        password
    });
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