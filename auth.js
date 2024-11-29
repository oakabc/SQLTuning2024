const express = require('express');
const app = express();
const port = 3000;

// Hardcoded credentials (for demo purposes) - Basic Authentication คือใช้ User และ Password
const USERNAME = 'admin';
const PASSWORD = 'password123';

// Middleware to check Basic Authentication
function authenticate(req, res, next) {
    // Get the Authorization header
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Basic ')) {
        return res.status(401).send('Authorization header missing or invalid');
    }

    // Decode Base64 credentials
    const base64Credentials = authHeader.split(' ')[1]; // Remove "Basic "
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    // Validate credentials
    if (username === USERNAME && password === PASSWORD) {
        next(); // Proceed to the next middleware/route
    } else {
        return res.status(401).send('Invalid credentials');
    }
}

// Protected route
app.get('/secure-data', authenticate, (req, res) => {
    res.send({
        message: 'This is secured data.',
        data: {
            info: 'Only accessible with valid Basic Auth credentials'
        }
    });
});

// Public route
app.get('/', (req, res) => {
    res.send('Welcome to the Basic Authentication API!');
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
