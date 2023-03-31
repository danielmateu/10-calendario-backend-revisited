// Event routes
// /api/events

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, borrarEvento } = require('../controllers/events');

// Realizar el CRUD de los eventos
const router = Router();

// Obtener eventos
router.get('/', getEventos);

router.use(validarJWT); // Todas las rutas que esten debajo de esta linea van a pasar por la validacion del JWT

// Crear un nuevo evento
router.post('/', crearEvento)

// Actualizar evento
router.put('/:id', actualizarEvento)

// Borrar evento
router.delete('/:id', borrarEvento)


module.exports = router;