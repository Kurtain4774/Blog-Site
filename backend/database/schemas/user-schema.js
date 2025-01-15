const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: false, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

userSchema.pre('save', async function (next) {
    const user = this;

    // Only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    try {
        // Generate a salt with 10 rounds (default cost factor)
        const salt = await bcrypt.genSalt(10);

        // Hash the password with the salt
        user.password = await bcrypt.hash(user.password, salt);

        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model("users", userSchema);

module.exports = User;