const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let users = [];

// GET /users
app.get('/users', (req, res) => {
    res.json(users);
});

// POST /users
app.post('/users', (req, res) => {
    const user = req.body;
    user.id = users.length ? users[users.length - 1].id + 1 : 1;
    users.push(user);
    res.status(201).json(user);
});

// GET /users/:id
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
});

// PUT /users/:id
app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    Object.assign(user, req.body);
    res.json(user);
});

// DELETE /users/:id
app.delete('/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }
    users.splice(userIndex, 1);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
