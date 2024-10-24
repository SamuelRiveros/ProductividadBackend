//dependences
const express = require('express');
const cors = require('cors');
//my files
const {connection} = require('./infrastructure/db');
const logger = require('./utils/logger');
//load envs
process.loadEnvFile();

//*Importamos las rutas respectivas para el uso de todos los endpoints
const userRoutes = require('./routes/userRoutes');

const reminderRoutes = require("./routes/reminderRoutes")

const milestoneRoutes = require("./routes/milestoneRoutes")

// const activityRoutes = require("./routes/activityRoutes")

//dbConnection
connection();
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(logger.expressMiddleware);

// Routes
app.use('/api/usuarios', userRoutes);
app.use('/api/recordatorios', reminderRoutes)
app.use('/api/hitos', milestoneRoutes)
// app.use('/api/actividades', activityRoutes);

//start server

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

app.listen({port: PORT, host: HOST}, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});

module.exports = app;