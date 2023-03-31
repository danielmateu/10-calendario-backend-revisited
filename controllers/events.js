// const Evento = require("../models/Evento");
const { response } = require('express');
const Evento = require('../models/Evento');


const getEventos = async (req, res = response) => {
    res.json({
        ok: true,
        msg: 'getEventos'
    })

}

const crearEvento = async (req, res = response) => {

    // Verificar que tenga un evento
    const evento = new Evento(req.body);

    try {

        evento.user = req.uid;
        const eventoGuardado = await evento.save();

        res.json({
            ok: true,
            evento: eventoGuardado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

    // res.json({
    //     ok: true,
    //     msg: 'crearEvento'
    // })
}

const actualizarEvento = async (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarEvento'
    })
}

const borrarEvento = async (req, res = response) => {
    res.json({
        ok: true,
        msg: 'borrarEvento'
    })
}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    borrarEvento
}
