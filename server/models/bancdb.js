const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const BancdbSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    refreshToken: { type: String } // Add refreshToken field to store refresh tokens
});

BancdbSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

const bancdbModel = mongoose.model("users", BancdbSchema);
module.exports = bancdbModel;
