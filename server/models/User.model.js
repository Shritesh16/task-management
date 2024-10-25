const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ['Manager', 'Team-Member'], default: 'Team-Member' },
    manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
});
 

const Usermodel = mongoose.model('users', userSchema);

module.exports = {Usermodel}