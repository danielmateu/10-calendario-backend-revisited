
// JWT
const jwt = require('jsonwebtoken');
require('dotenv').config();

const generarJWT = (uid = '', name) => {
    return new Promise((resolve, reject) => {
        const payload = { uid, name };
        jwt.sign(payload, '3st0EsL4Cl4v3S3cr3t4', {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            } else {
                resolve(token);
            }
        });
    });
}

module.exports = {
    generarJWT
}
