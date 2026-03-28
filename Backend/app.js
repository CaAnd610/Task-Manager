//importamos módulos necesarios
const express = require('express');
const cors = require('cors');

require('dotenv').config();

//importamos las rutas
const authRoutes = require('./Routes/auth.routes');
const subjectsRoutes = require('./Routes/subjects.routes');
const eventRoutes = require('./Routes/events.routes');
const userRoutes = require('./Routes/users.routes');

const app = express();

app.use(express.json());
app.use(cors());

//definimos las rutas
app.use('/auth', authRoutes);
app.use('/subjects', subjectsRoutes);
app.use('/events', eventRoutes);
app.use('/users', userRoutes);

//exportamos la app
module.exports = app;