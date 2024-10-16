const express = require('express');
const router = express.Router();
const { register, login } = require('../controller/authController');
const cors = require('cors');

// Routes\

router.post('/register', register);
router.post('/login', login);

module.exports = router;
