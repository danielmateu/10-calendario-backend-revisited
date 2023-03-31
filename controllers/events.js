// const Evento = require("../models/Evento");
const { response } = require('express');
const Evento = require('../models/Evento');


const getEventos = async (req, res = response) => {

    const eventos = await Evento.find()
        .populate('user', 'name');

    res.json({
        ok: true,
        eventos
    })
}

const crearEvento = async (req, res = response) => {

    // Verificar que tenga un evento
    const evento = new Evento(req.body)

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
}

const actualizarEvento = async (req, res = response) => {

    // Obtener id del evento
    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            })
        }

        // Verificar que el usuario que quiere editar el evento sea el mismo que creo el evento
        if(evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            })
        }

        // Si todo esta ok, actualizar el evento
        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        // Guardar el evento en base de datos
        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true });

        res.json({
            ok: true,
            evento: eventoActualizado
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
    //     eventoId
    // })

    // try {
    //     const evento = Evento.findById(eventoId);

    //     if (!evento) {
    //         return res.status(404).json({
    //             ok: false,
    //             msg: 'Evento no existe por ese id'
    //         })
    //     }

    //     // Verificar que el usuario que quiere editar el evento sea el mismo que creo el evento
    //     console.log(evento);

    //     if (evento.user.toString() !== uid) {
    //         return res.status(401).json({
    //             ok: false,
    //             msg: 'No tiene privilegio de editar este evento'
    //         })
    //     }

    //     // Si todo esta ok, actualizar el evento
    //     const nuevoEvento = {
    //         ...req.body,
    //         user: uid
    //     }

    //     // Guardar el evento
    //     const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true });

    //     res.json({
    //         ok: true,
    //         evento: eventoActualizado
    //     })



    // } catch (error) {
    //     console.log(error);
    //     res.status(500).json({
    //         ok: false,
    //         msg: 'Hable con el administrador'
    //     })
    // }
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
