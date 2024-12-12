const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// Importar rutas
const devicesRoutes = require('./routes/devices');
const electrovalvulasRoutes = require('./routes/electrovalvulas');
const medicionesRoutes = require('./routes/mediciones');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Conexión a la base de datos MySQL
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Función de reconexión con reintentos
function connectWithRetry() {
  connection.connect((err) => {
    if (err) {
      console.error('Error conectando a MySQL, reintentando en 5 segundos...', err);
      setTimeout(connectWithRetry, 5000); // Esperar 5 segundos antes de intentar de nuevo
    } else {
      console.log('Conectado a la base de datos MySQL');
    }
  });
}

// Iniciar la conexión
connectWithRetry();

// Usar las rutas definidas en devices.js
app.use('/api/devices', devicesRoutes);
app.use('/api/electrovalvulas', electrovalvulasRoutes);
app.use('/api/mediciones', medicionesRoutes);

// Ruta inicial
app.get('/', (req, res) => {
  res.send('Backend funcionando correctamente.');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

// Ruta para obtener un dispositivo específico
app.get('/api/devices/:id', (req, res) => {
  const deviceId = req.params.id;

  // Consultamos los detalles del dispositivo
  const queryDevice = 'SELECT * FROM Dispositivos WHERE dispositivoId = ?';

  connection.query(queryDevice, [deviceId], (err, result) => {
    if (err) {
      console.error('Error al obtener el dispositivo:', err);
      return res.status(500).json({ error: err.message });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: 'Dispositivo no encontrado' });
    }

    // Devolvemos los detalles del dispositivo
    res.json(result[0]);
  });
});

// Ruta para encender el dispositivo
app.put('/api/devices/:id/encender', (req, res) => {
  const deviceId = req.params.id;
  
  // Consultamos el electrovalvulaId asociado al dispositivo
  const queryDevice = 'SELECT electrovalvulaId FROM Dispositivos WHERE dispositivoId = ?';
  
  connection.query(queryDevice, [deviceId], (err, result) => {
    if (err) {
      console.error('Error al obtener el electrovalvulaId:', err);
      return res.status(500).json({ error: err.message });
    }
    
    if (result.length === 0) {
      return res.status(404).json({ error: 'Dispositivo no encontrado' });
    }
    
    const electrovalvulaId = result[0].electrovalvulaId;
    
    // Insertamos el log de riego con apertura = 1 (encendido)
    const queryLogRiego = 'INSERT INTO Log_Riegos (apertura, fecha, electrovalvulaId) VALUES (1, NOW(), ?)';
    
    connection.query(queryLogRiego, [electrovalvulaId], (err, result) => {
      if (err) {
        console.error('Error al registrar el log de riego:', err);
        return res.status(500).json({ error: err.message });
      }
      
      res.json({ message: 'Dispositivo encendido y log registrado' });
    });
  });
});

// Ruta para apagar el dispositivo
app.put('/api/devices/:id/apagar', (req, res) => {
  const deviceId = req.params.id;
  
  // Consultamos el electrovalvulaId asociado al dispositivo
  const queryDevice = 'SELECT electrovalvulaId FROM Dispositivos WHERE dispositivoId = ?';
  
  connection.query(queryDevice, [deviceId], (err, result) => {
    if (err) {
      console.error('Error al obtener el electrovalvulaId:', err);
      return res.status(500).json({ error: err.message });
    }
    
    if (result.length === 0) {
      return res.status(404).json({ error: 'Dispositivo no encontrado' });
    }
    
    const electrovalvulaId = result[0].electrovalvulaId;
    
    // Insertamos el log de riego con apertura = 0 (apagado)
    const queryLogRiego = 'INSERT INTO Log_Riegos (apertura, fecha, electrovalvulaId) VALUES (0, NOW(), ?)';
    
    connection.query(queryLogRiego, [electrovalvulaId], (err, result) => {
      if (err) {
        console.error('Error al registrar el log de riego:', err);
        return res.status(500).json({ error: err.message });
      }
      
      res.json({ message: 'Dispositivo apagado y log registrado' });
    });
  });
});