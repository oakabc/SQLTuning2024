const express = require('express');
const bodyParser = require('body-parser');
const connectToDatabase = require('./db'); // Database connection from db.js

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// GET: Fetch all products
app.get('/products', async (req, res) => {
  const pool = await connectToDatabase();
  if (pool) {
    try {
      const result = await pool.request().query('SELECT * FROM dbo.Products');
      res.json(result.recordset);
    } catch (err) {
      res.status(500).send('Error fetching products: ' + err.message);
    } finally {
      pool.close();
    }
  }
});

// POST: Create a new product
app.post('/products', async (req, res) => {
  const { name, category, price } = req.body;
  const pool = await connectToDatabase();
  if (pool) {
    try {
      const query = `INSERT INTO dbo.Products (ProductName, Category, UnitPrice) VALUES (@name, @category, @price)`;
      const request = pool.request();
      request.input('name', sql.NVarChar, name);
      request.input('category', sql.NVarChar, category);
      request.input('price', sql.Decimal, price);

      await request.query(query);
      res.status(201).send('Product created successfully.');
    } catch (err) {
      res.status(500).send('Error creating product: ' + err.message);
    } finally {
      pool.close();
    }
  }
});

// PUT: Update an existing product
app.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, category, price } = req.body;
  const pool = await connectToDatabase();
  if (pool) {
    try {
      const query = `
        UPDATE dbo.Products 
        SET ProductName = @name, Category = @category, UnitPrice = @price 
        WHERE ProductID = @id
      `;
      const request = pool.request();
      request.input('id', sql.Int, id);
      request.input('name', sql.NVarChar, name);
      request.input('category', sql.NVarChar, category);
      request.input('price', sql.Decimal, price);

      await request.query(query);
      res.send('Product updated successfully.');
    } catch (err) {
      res.status(500).send('Error updating product: ' + err.message);
    } finally {
      pool.close();
    }
  }
});

// DELETE: Delete a product
app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  const pool = await connectToDatabase();
  if (pool) {
    try {
      const query = `DELETE FROM dbo.Products WHERE ProductID = @id`;
      const request = pool.request();
      request.input('id', sql.Int, id);

      await request.query(query);
      res.send('Product deleted successfully.');
    } catch (err) {
      res.status(500).send('Error deleting product: ' + err.message);
    } finally {
      pool.close();
    }
  }
});

// Start the server
app.listen(port, () => {
  console.log(`CRUD API is running at http://localhost:${port}`);
});
