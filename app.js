const connectToDatabase = require('./db');

async function fetchProducts() {
  const pool = await connectToDatabase(); // Get the connection pool
  if (pool) {
    try {
      const result = await pool.request().query('SELECT * FROM dbo.Products'); // Explicit schema
      console.log('Products:', result.recordset); // Log the data
    } catch (err) {
      console.error('Error querying the database:', err.message);
    } finally {
      pool.close(); // Close the connection
    }
  }
}

fetchProducts();
