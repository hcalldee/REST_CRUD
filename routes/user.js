const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUser, infoUser } = require('../controllers/user');
const auth = require('../middleware/auth');

// @route  POST api/users/register
// @desc   Register user
router.post('/register', registerUser);


// @route  POST api/users/login
// @desc   Login user
router.post('/login', loginUser);

// @route  GET api/users/me
// @desc   Get logged in user
router.get('/me', auth, getUser);

router.get('/', infoUser);

module.exports = router;