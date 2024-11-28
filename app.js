const connectToDatabase = require('./db');

async function fetchProducts() {
  const pool = await connectToDatabase();
  if (pool) {
    try {
      const result = await pool.request().query('SELECT * FROM Products');
      console.log('Products:', result.recordset); // Output the data
    } catch (err) {
      console.error('Error querying the database:', err.message);
    } finally {
      pool.close(); // Close the connection
    }
  }
}

fetchProducts();
