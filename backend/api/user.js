const express = require('express');
const router = express.Router();
const { getUser,createUser } = require('../controllers/userController.js');


// Define routes
router.get('/', getUser);
router.post('/', createUser);

module.exports = router;
