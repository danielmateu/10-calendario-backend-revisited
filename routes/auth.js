const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const router = Router();

router.post(
    '/new',
    [
        // Middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty().isLength({ min: 3 }),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 })

    ],
    crearUsuario)


router.post('/', loginUsuario)

router.get('/renew', revalidarToken)

module.exports = router;




