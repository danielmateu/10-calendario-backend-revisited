const express = require('express');
require('dotenv').config();

//Create express app
const app = express();

// Directorio Publico
app.use(express.static('public'));

// Lectura y parseo del Body
app.use(express.json());

// Rutas
// crear / Login / renew
app.use('/api/auth', require('./routes/auth'));

// Todo: CRUD: Eventos
// app.use('/api/events', require('./routes/events'));

// Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});