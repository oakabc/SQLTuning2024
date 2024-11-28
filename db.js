const sql = require('mssql');

const config = {
  server: 'PIMETF111485', // SQL Server instance
  database: 'SevenElevenWarehouse', // Database name
  user: 'sqlauth', // SQL Authentication username
  password: '12345678', // Password for SQL Authentication
  options: {
    enableArithAbort: true,
    encrypt: false, // Disable encryption for local setup
    trustServerCertificate: true, // Bypass certificate validation
  },
};

async function connectToDatabase() {
  try {
    const pool = await sql.connect(config);
    console.log('Connected to the database!');
    return pool;
  } catch (err) {
    console.error('Database connection failed:', err.message);
  }
}

module.exports = connectToDatabase;
