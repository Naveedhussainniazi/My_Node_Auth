const express = require('express');
const { registration, login, refreshToken, logout, profile } = require('../controller/auth.controller');
const protected = require("../middleware/auth.middleware.js");
const router = express.Router();

// create a registration routes
router.post('/registration', registration);
router.post('/login', login);
router.post('/refresh', refreshToken);
router.post('/logout', logout);
router.get('/profile', protected, profile);


module.exports = router;