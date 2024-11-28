const sql = require('mssql');

// Configuration for SQL Server
const config = {
  server: 'PIMETF111485', // โปรดเปลี่ยนเป็นชื่อของตนเอง
  database: 'SevenElevenWarehouse', // The database you want to connect to
  options: {
    trustedConnection: true, // Enables Windows Authentication
    encrypt: false, // Disable encryption if not needed
  },
  authentication: {
    type: 'ntlm', // Use NTLM for Windows Authentication
    options: {
      domain: '', // Your Windows domain (leave blank if local)
      userName: '', // Not required for Windows Authentication
      password: '', // Not required for Windows Authentication
    },
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
