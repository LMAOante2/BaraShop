const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

let users = [
  { email: 'admin@example.com', password: 'admin123', role: 'admin' },
  { email: 'user@example.com', password: 'user123', role: 'regular' },
  { email: 'premium@example.com', password: 'premium123', role: 'premium' }
];

app.use(bodyParser.json());

// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  const user = users.find(user => user.email === email);
  if (!user) return res.status(400).json({ success: false, message: 'Invalid credentials!' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ success: false, message: 'Invalid credentials!' });

  // Generate JWT with role
  const token = jwt.sign(
    { email: user.email, role: user.role },  // Payload includes user role
    'your-jwt-secret',                       // Secret key
    { expiresIn: '1h' }                     // Token expiration time
  );
  
  res.json({ success: true, token });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
