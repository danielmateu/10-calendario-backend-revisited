// const Evento = require("../models/Evento");
const { response } = require('express');

const getEventos = async (req, res = response) => {
    res.json({
        ok: true,
        msg: 'getEventos'
    })

}

const crearEvento = async (req, res = response) => {

    // Verificar que tenga un evento
    
    res.json({
        ok: true,
        msg: 'crearEvento'
    })
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
