const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
require('dotenv').config();

//Create express app
const app = express();

// Base de datos
dbConnection();

// Cors

const corsOptions = {
    origin: '*',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 200,
}

app.use(cors(corsOptions));

// Directorio Publico
app.use(express.static('public'));

// Lectura y parseo del Body
app.use(express.json());

// Rutas
// crear / Login / renew
app.use('/api/auth', require('./routes/auth'));

// Todo: CRUD: Eventos
app.use('/api/events', require('./routes/events'));

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});

