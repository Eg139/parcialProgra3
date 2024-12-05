const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require("path");
const sequelize = require("./db/sequelize");

// Configuración de EJS y archivos estáticos
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Middleware
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

const LogMiddleware = require('./middleware/LogMiddleware');

app.use(LogMiddleware);




// Rutas
const obrasRoutes = require('./routes/obras.routes');
app.use('/obras', obrasRoutes);
const logsRoutes = require('./routes/logs.routes');
app.use('/logs', logsRoutes);


// Ruta principal
app.get("/", async (req, res) => {
  try {
    await sequelize.authenticate();
    res.render("index");
  } catch (error) {
    res.status(500).send("Error en la conexión a la base de datos.");
  }
});


// Probar conexión a la base de datos (ruta separada)
app.get("/db-test", async (req, res) => {
  try {
    await sequelize.authenticate();
    res.send("Conexión exitosa a la base de datos.");
  } catch (error) {
    res.status(500).send("Error en la conexión a la base de datos.");
  }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});