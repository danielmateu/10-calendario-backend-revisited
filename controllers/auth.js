const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


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

        // Generar el JWT
        const token = await generarJWT(usuario.id, usuario.name);

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
            // message: 'crearUsuario',
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Hable con el administrador'
        });
    }
}

const loginUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        let usuario = await Usuario.findOne({ email });
        // Validar si el usuario existe
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                message: 'El usuario no existe con ese email'
            });
        }

        // Confirmar los passwords
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                message: 'Password incorrecto'
            });
        }

        // Generar el JWT
        const token = await generarJWT(usuario.id, usuario.name);

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Hable con el administrador'
        });
    }
}

const revalidarToken = async (req, res = response) => {

    // const uid = req.uid;
    // const name = req.name;
    const { uid, name } = req;

    // Generar el JWT
    const token = await generarJWT(uid, name);
    
    res.json({
        ok: true,
        token
    });
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}