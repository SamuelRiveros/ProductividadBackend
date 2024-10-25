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

const reportRoutes = require("./routes/reportRoutes")

const activityRoutes = require("./routes/activityRoutes")

const objetivoRoutes = require("./routes/objetivosRoutes")

const etiquetaRoutes = require("./routes/tagRoutes")

const categoryRoutes = require("./routes/categoryRoutes")

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
app.use("/api/reportes", reportRoutes)
app.use('/api/actividades', activityRoutes);
app.use("/api/objetivos", objetivoRoutes)
app.use("/api/etiquetas", etiquetaRoutes)
app.use("api/categorias", categoryRoutes)

//start server

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

app.listen({port: PORT, host: HOST}, () => {
  console.log(`El server está corriendo en http://${HOST}:${PORT}`);
});

module.exports = app;