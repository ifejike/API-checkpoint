const mongoose = require("mongoose");

// Defining the user schema

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    }
})

// Exporting the user model
module.exports = mongoose.model('User', userSchema);