const database = require('../database/user-db.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

function generateToken(userId) {
    const secretKey = process.env.JWT_SECRET || 'your_jwt_secret_key'; // Use environment variables for production
    const token = jwt.sign(
        { id: userId }, // Payload (user data)
        secretKey,      // Secret key to sign the token
        { expiresIn: '1h' } // Token expiration time
    );
    return token;
}
function verifyToken(token) {
    try {
        const secretKey = process.env.JWT_SECRET || 'your_jwt_secret_key';
        const decoded = jwt.verify(token, secretKey); // Verifies the token and decodes it
        return decoded; // Returns the decoded payload (e.g., { id: userId })
    } catch (error) {
        throw new Error('Invalid token');
    }
}

const getUser = async (req, res) => {
    const {username,password} = req.body;

    await database.connectToMongoDB();
    
    let user = await database.getUser(username);

    console.log(user);

    if(!user){
        return res.status(404).json({ status: 'error', message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Password does not match username' });
    }

    const token = generateToken(user._id);
    return res.status(200).json({ message: 'Login successful', token });
}

const createUser = async (req, res) => {
    const {username, password} = req.body;

    await database.connectToMongoDB();

    if (!username || !password) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const status = await database.createUser(username, password);

    if(status.status == 'success'){
        return res.status(201).json({ message: status.message});
    } else if(status.status == 'error1'){
        return res.status(400).json({message: status.message});
    } else {
        return res.status(400).json({message: status.message, error: status.error});
    }
}

module.exports = {
    getUser,
    createUser,
}