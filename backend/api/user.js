const express = require('express');
const router = express.Router();
const { getUser,createUser } = require('../controllers/userController.js');


// Define routes
router.post('/login', getUser);
router.post('/register', createUser);

module.exports = router;
