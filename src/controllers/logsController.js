const express = require('express');
const router = express.Router();
const Log = require('../models/logsModel'); 

router.post('/log', async (req, res) => {
  try {
    const newLog = new Log({ message: 'Se ha realizado una acción' });
    await newLog.save();
    res.status(201).json(newLog);
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el log' });
  }
});

module.exports = router;
