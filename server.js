const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require('./models/user');

// Loading environment variables
dotenv.config({ path: './config/.env' });

//Initializing express
const app = express();

// Middleware to parse JSON
app.use(express.json());

// connecting mongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.mongo_connection, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 15000,
        })
        console.log('MongoDb is connected')
    } catch (err) {
        console.log("Error connecting to Mongoose")
    }
}

connectDB();

// Defining the port
const PORT = process.env.PORT || 4000;

// Route: GET - Returns all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route: POST - Adds a new user to the database
app.post('/users', async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Route: PUT - Edits a user by ID
app.put('/users/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Route: DELETE - Removes a user by ID
app.delete('/users/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Starting` the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = connectDB;