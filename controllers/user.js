const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail, findUserById } = require('../models/user');
const dotenv = require('dotenv');

dotenv.config();

// Register user
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await findUserByEmail(email);
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = { name, email, password: hashedPassword };
        await createUser(user);

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Login user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await findUserByEmail(email);
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get logged in user
exports.getUser = async (req, res) => {
    try {
        const user = await findUserById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Get logged in user
exports.infoUser = async (req, res) => {
    try {
        info = {
            "routes": [
              {
                "method": "POST",
                "url": "api/users/register",
                "description": "Register user"
              },
              {
                "method": "POST",
                "url": "api/users/login",
                "description": "Login user"
              },
              {
                "method": "GET",
                "url": "api/users/me",
                "description": "Get logged in user"
              }
            ]
          }
        res.json(info)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
