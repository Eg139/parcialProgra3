const validarObra = (req, res, next) => {
    const { nombre, anioDeCreacion, tipo } = req.body;
  
    if (typeof nombre !== 'string' || nombre.trim() === '') {
      return res.status(400).send('El nombre debe ser una cadena de texto no vacía.');
    }
  
    if (!Number.isInteger(Number(anioDeCreacion)) || anioDeCreacion < 0) {
      return res.status(400).send('El año de creación debe ser un número entero mayor o igual a 0.');
    }
  
    const tiposPermitidos = ['pintura', 'escultura'];
    if (!tiposPermitidos.includes(tipo)) {
      return res.status(400).send('El tipo debe ser "pintura" o "escultura".');
    }
  
    next();
  };
  
  const validarObraParaActualizar = (req, res, next) => {
    const { id } = req.params;
    const { nombre, anioDeCreacion, tipo } = req.body;
  
    if (!Number.isInteger(Number(id)) || id <= 0) {
      return res.status(400).send('El ID debe ser un número entero mayor que 0.');
    }
  
    if (nombre && (typeof nombre !== 'string' || nombre.trim() === '')) {
      return res.status(400).send('El nombre debe ser una cadena de texto no vacía.');
    }
  
    if (anioDeCreacion && (!Number.isInteger(Number(anioDeCreacion)) || anioDeCreacion < 0)) {
      return res.status(400).send('El año de creación debe ser un número entero mayor o igual a 0.');
    }
  
    const tiposPermitidos = ['pintura', 'escultura'];
    if (tipo && !tiposPermitidos.includes(tipo)) {
      return res.status(400).send('El tipo debe ser "pintura" o "escultura".');
    }
  
    next();
  };
  
  
  const validarIdEntero = (req, res, next) => {
    const { id } = req.params;
  
    
    if (!Number.isInteger(Number(id)) || id <= 0) {
      return res.status(400).send('El ID debe ser un número entero mayor que 0.');
    }
  
    
    next();
  };
  
  module.exports = {
    validarObra,
    validarObraParaActualizar,
    validarIdEntero
  };
  