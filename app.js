// Proposed fix for MongoDB connection options deprecation warnings

const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const swaggerUi = require('swagger-ui-express');
const specs = require('./swaggerConfig');

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Updated MongoDB connection string without deprecated options
const dbURL = 'mongodb+srv://zainiqbal35201:zu7MHuHD5vPlGkSC@cluster0.z5tiocc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(dbURL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB', err));

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
});

const User = mongoose.model('User', userSchema);

// Register endpoint
app.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(400).send('Error registering user');
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).send('Invalid credentials');
    }
    const token = jwt.sign({ userId: user._id, role: user.role }, 'your_jwt_secret');
    res.send({ token });
  } catch (error) {
    res.status(400).send('Error logging in');
  }
});

// Middleware for protected routes
const authMiddleware = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Access Denied');
  try {
    const verified = jwt.verify(token, 'your_jwt_secret');
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send('Invalid token');
  }
};

// Middleware for role-based access
const roleMiddleware = (role) => (req, res, next) => {
  if (req.user.role !== role) return res.status(403).send('Access Denied');
  next();
};

// Protected route - Get all users (Admin only)
app.get('/admin/users', authMiddleware, roleMiddleware('admin'), async (req, res) => {
  const users = await User.find();
  res.send(users);
});

// Get user by ID
app.get('/users/:id', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.send(user);
  } catch (error) {
    res.status(400).send('User not found');
  }
});

// Update user
app.put('/users/:id', authMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(user);
  } catch (error) {
    res.status(400).send('Error updating user');
  }
});

// Delete user
app.delete('/users/:id', authMiddleware, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.send('User deleted');
  } catch (error) {
    res.status(400).send('Error deleting user');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});