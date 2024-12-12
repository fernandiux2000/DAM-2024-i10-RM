const express = require('express');
const router = express.Router();
const connection = require('../models/db');

// Ruta para listar dispositivos
router.get('/', (req, res) => {
    connection.query('SELECT * FROM Dispositivos', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

module.exports = router; // Asegúrate de exportar el router correctamente