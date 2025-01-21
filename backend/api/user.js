const express = require('express');
const router = express.Router();
const { getUser,createUser, verifyToken } = require('../controllers/userController.js');
const { verify } = require('jsonwebtoken');


// Define routes
router.post('/login', getUser);
router.post('/register', createUser);
router.get('/verify', verifyToken);

module.exports = router;
