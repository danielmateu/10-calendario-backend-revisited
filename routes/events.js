// Event routes
// /api/events

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, borrarEvento } = require('../controllers/events');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const isDate = require('../helpers/isDate');


// Realizar el CRUD de los eventos
const router = Router();

// Obtener eventos
router.get('/', getEventos);

router.use(validarJWT); // Todas las rutas que esten debajo de esta linea van a pasar por la validacion del JWT

// Crear un nuevo evento
router.post('/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom(isDate),
        check('end', 'La fecha de finalizacion es obligatoria').custom(isDate),
        validarCampos
    ],
    crearEvento)

// Actualizar evento
router.put('/:id', actualizarEvento)

// Borrar evento
router.delete('/:id', borrarEvento)


module.exports = router;