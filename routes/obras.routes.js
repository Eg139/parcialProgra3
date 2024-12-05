const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer'); 
const ObraDeArteSequelize = require('../entity/ObraDeArte.entity'); 
const { validarObra, validarObraParaActualizar, validarIdEntero } = require('../middleware/obras.middleware'); 

router.post('/crear', upload.single('imagen'), validarObra, async (req, res) => {
  const { nombre, anioDeCreacion, tipo } = req.body;

  try {
    // Guardar el nombre del archivo cargado (si existe)
    const imagen = req.file ? req.file.filename : null;

    // Crear la obra en la base de datos
    const nuevaObra = await ObraDeArteSequelize.create({
      nombre,
      anioDeCreacion: parseInt(anioDeCreacion, 10),
      tipo,
      imagen,
      activo: true // Por defecto, activa
    });

    // Redirigir a la vista mensaje de éxito
    res.render('mensaje', { tipo: 'exito', mensaje: 'Obra de arte creada correctamente.' });
  } catch (error) {
    console.error(error);
    // Redirigir a la vista mensaje de error
    res.render('mensaje', { tipo: 'error', mensaje: 'Error al crear la obra de arte.' });
  }
});


router.get('/crear', (req, res) => {
  res.render('crear'); 
});
router.get('/', async (req, res) => {
  try {
    const obras = await ObraDeArteSequelize.findAll();

    res.render('listar', { obras, rutaImagenes: '/public/obras/' });
  } catch (error) {
    console.error('Error al listar las obras de arte:', error);
    res.render('mensaje', { tipo: 'error', mensaje: 'Error al obtener las obras de arte.' });
  }
});

router.put('/:id', validarObraParaActualizar, async (req, res) => {
  const { id } = req.params;
  const { nombre, anioDeCreacion, tipo } = req.body;

  try {
    
    const obra = await ObraDeArteSequelize.findByPk(id);
    if (!obra) {
      return res.render('mensaje', { tipo: 'error', mensaje: 'Obra de arte no encontrada.' });
    }

    
    await obra.update({
      ...(nombre && { nombre }),
      ...(anioDeCreacion && { anioDeCreacion: parseInt(anioDeCreacion, 10) }),
      ...(tipo && { tipo }),
    });

    res.render('mensaje', { tipo: 'exito', mensaje: 'Obra de arte actualizada correctamente.' });
  } catch (error) {
    console.error('Error al actualizar la obra de arte:', error);
    res.render('mensaje', { tipo: 'error', mensaje: 'Error al actualizar la obra de arte.' });
  }
});

router.delete('/:id', validarIdEntero, async (req, res) => {
  const { id } = req.params;

  try {
    
    const obra = await ObraDeArteSequelize.findByPk(id);

    if (!obra) {
      return res.render('mensaje', { tipo: 'error', mensaje: 'Obra de arte no encontrada.' });
    }

    
    if (!obra.activo) {
      return res.render('mensaje', { tipo: 'error', mensaje: 'La obra de arte ya está desactivada.' });
    }

    
    await obra.update({ activo: false });

    res.render('mensaje', { tipo: 'exito', mensaje: 'Obra de arte desactivada correctamente.' });
  } catch (error) {
    console.error('Error al desactivar la obra de arte:', error);
    res.render('mensaje', { tipo: 'error', mensaje: 'Error al desactivar la obra de arte.' });
  }
});


router.patch('/:id', validarIdEntero, async (req, res) => {
  const { id } = req.params;

  try {
    
    const obra = await ObraDeArteSequelize.findByPk(id);

    if (!obra) {
      return res.render('mensaje', { tipo: 'error', mensaje: 'Obra de arte no encontrada.' });
    }

    
    if (obra.activo) {
      return res.render('mensaje', { tipo: 'error', mensaje: 'La obra de arte ya está activa.' });
    }

    
    await obra.update({ activo: true });

    res.render('mensaje', { tipo: 'exito', mensaje: 'Obra de arte reactivada correctamente.' });
  } catch (error) {
    console.error('Error al reactivar la obra de arte:', error);
    res.render('mensaje', { tipo: 'error', mensaje: 'Error al reactivar la obra de arte.' });
  }
});


module.exports = router;
