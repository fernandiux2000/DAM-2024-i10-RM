const mysql = require('mysql2');

// Crear conexión a MySQL
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect((err) => {
    if (err) {
        console.error('Error conectando a MySQL:', err);
        process.exit(1); // Finalizar si no conecta
    }
    console.log('Conectado a la base de datos MySQL');
});

module.exports = connection;