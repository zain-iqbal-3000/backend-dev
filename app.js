const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

app.use(express.json());

const dbURL = 'mongodb+srv://zainiqbal35201:zu7MHuHD5vPlGkSC@cluster0.z5tiocc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log('Connected to MongoDB Atlas');
  }).catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }
});

const User = mongoose.model('User', userSchema);

// GET /users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /users
app.post('/users', async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET /users/:id
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'Cannot find user' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /users/:id
app.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'Cannot find user' });
    }

    if (req.body.name != null) {
      user.name = req.body.name;
    }
    if (req.body.email != null) {
      user.email = req.body.email;
    }

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /users/:id
app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'Cannot find user' });
    }

    await user.remove();
    res.json({ message: 'Deleted user' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
