const express = require('express');
const router = express.Router();
const Log = require('../entity/Log.entity');  

router.get('/', async (req, res) => {
  try {
    const logs = await Log.findAll();  

    res.render('logs_index', { logs });
  } catch (error) {
    console.error('Error al obtener logs:', error);
    res.status(500).send('Error al obtener los logs');
  }
});

module.exports = router;
