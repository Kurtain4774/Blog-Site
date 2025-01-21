const database = require('../database/user-db.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

function generateToken(userId, username) {
    const secretKey = process.env.JWT_SECRET_KEY; // Use environment variables for production
    const token = jwt.sign(
        { id: userId, username: username }, // Payload (user data)
        secretKey,      // Secret key to sign the token
        { expiresIn: '24h' } // Token expiration time
    );
    return token;
}
const verifyToken = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({message: 'No token provided'});
    }

    const secretKey = process.env.JWT_SECRET_KEY;

    jwt.verify(token, secretKey, function (err, decoded) {
        if (err) {
            return res.status(400).json({message: "Token Error",error: err.message});
        } else {
            return res.status(200).json({message: "SUCCESS", user: decoded})
        }
    });
}

const getUser = async (req, res) => {
    const {username,password} = req.body;

    await database.connectToMongoDB();
    
    let user = await database.getUser(username);

    if(!user){
        return res.status(404).json({ status: 'error', message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Password does not match username' });
    }

    const token = generateToken(user._id, username);
    return res.status(200).json({ message: 'Login successful', token: token });
}

const createUser = async (req, res) => {
    const {username, password} = req.body;

    await database.connectToMongoDB();

    if (!username || !password) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const result = await database.createUser(username, password);

    if(result.status == 'success'){
        const token = generateToken(result._id, username);
        return res.status(201).json({ message: "Registration successful", token: token});
    } else {
        return res.status(400).json({message: result.message});
    }
}

module.exports = {
    getUser,
    createUser,
    verifyToken,
}