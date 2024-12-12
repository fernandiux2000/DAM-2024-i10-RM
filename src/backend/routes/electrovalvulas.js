const express = require('express');
const router = express.Router();
const connection = require('../models/db');

// Ruta para listar electrovalvulas
router.get('/', (req, res) => {
    connection.query('SELECT * FROM Electrovalvulas', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Ruta para insertar una nueva electrovalvula
router.post('/', (req, res) => {
    const { nombre, ubicacion } = req.body;
    connection.query('INSERT INTO Electrovalvulas (nombre, ubicacion) VALUES (?, ?)', [nombre, ubicacion], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: result.insertId });
    });
});

module.exports = router;