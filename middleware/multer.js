const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento con Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/obras')); // Carpeta donde se guardan las imágenes
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Nombre único para cada archivo
  }
});

// Filtrar archivos permitidos (solo imágenes)
const fileFilter = function (req, file, cb) {
  const allowedExtensions = ['.png', '.jpg', '.jpeg', '.gif'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (!allowedExtensions.includes(ext)) {
    return cb(new Error('Solo se permiten imágenes (png, jpg, jpeg, gif)'));
  }
  cb(null, true);
};

// Inicialización de Multer
const upload = multer({ storage, fileFilter });

module.exports = upload;
