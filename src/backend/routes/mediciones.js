const express = require('express');
const router = express.Router();
const connection = require('../models/db');

// Ruta para listar mediciones
router.get('/', (req, res) => {
    connection.query('SELECT * FROM Mediciones', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Ruta para insertar una nueva medición
router.post('/', (req, res) => {
    const { dispositivoId, valor, fecha } = req.body;
    connection.query('INSERT INTO Mediciones (dispositivoId, valor, fecha) VALUES (?, ?, ?)', [dispositivoId, valor, fecha], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: result.insertId });
    });
});

module.exports = router;