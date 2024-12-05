const Log = require('../entity/Log.entity');  // Asegúrate de importar el modelo Log

const LogMiddleware = async (req, res, next) => {
  const { method, originalUrl } = req;  // Obtener el método HTTP y la ruta de la solicitud

  try {
    // Crear un nuevo registro de log con la ruta y método actuales
    await Log.create({
      ruta: originalUrl,
      metodo: method,
    });

    // Llamamos al siguiente middleware o controlador
    next();
  } catch (error) {
    console.error('Error al registrar el log:', error);
    res.status(500).send('Error al registrar la acción');
  }
};

module.exports = LogMiddleware;
