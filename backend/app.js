const express = require('express');
const cors = require('cors');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();
const port = 3001; // Ensure this port is free, or use another free port
require('dotenv').config();

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors({
    origin: '*',  // This allows all domains
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));


// User Registration
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = new User({ username, password });
        await user.save();
        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// User Login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(404).send('User not found');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send('Invalid credentials');

        const jwtSecret = process.env.JWT_SECRET;
        const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Import the AI setup
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI('AIzaSyDsWHFZXjDzFNQXo2W_HpsJNI69MkDTSR8');

// Define an endpoint for the chat
app.post('/chat', async (req, res) => {
  const { prompt } = req.body;
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  try {
    const result = await model.generateContent("You are a chatbot penguin named Puffy intended to talk to the user about their day and make them feel happier. Respond to their message in a short 30 words or less (and especially do not respond with a list of information) with that context in mind: " + prompt);
    const text = result.response.text();
    res.json({ message: text });
  } catch (error) {
    console.error('Error generating text:', error);
    res.status(500).send("Hold up, I didn't quite process what you said, can you rephrase?");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
