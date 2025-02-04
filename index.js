const fs = require('fs');
const csv = require('csv-parser');
const mysql = require('mysql2');

// Definir la ruta del archivo CSV
const csvFilePath = procces.argv[3]; // Cambia esto a la ruta de tu archivo CSV

// Crear conexión a la base de datos MySQL
const connection = mysql.createConnection({
    host: '127.0.0.1', // Cambia esto si tu servidor MySQL está en otro lugar
    user: 'root', // Cambia esto por tu usuario de MySQL
    password: 'D34THN0T3', // Cambia esto por tu contraseña de MySQL
    database: 'musica' // Cambia esto por el nombre de tu base de datos
});

// Conectar a la base de datos
connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err.stack);
        return;
    }
    console.log('Conectado a la base de datos MySQL.');
});

// Leer el archivo CSV y insertar los datos en la tabla
fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {
        console.log('Insertando datos:', row);
        
        connection.query(`INSERT INTO Canciones (titulo, autor, letra, genero, ano, album) VALUES (?, ?, ?, ?, ?, ?);`,
            [row.titulo, row.autor, row.letra, row.genero, row.ano, row.album], // Añadir row.ano y row.album
            (err, results) => { // Mover el callback dentro de connection.query
                if (err) {
                    console.error('Error al insertar los datos:', err.message);
                } else {
                    console.log('Datos insertados correctamente con id: ' + results.insertId);
                }
            });
    })
    .on('end', () => {
        console.log('Datos insertados correctamente.');
        connection.end(); // Cerrar la conexión a la base de datos
    });
