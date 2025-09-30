const express = require('express');
const authRouter = express.Router();
const {genertateToken} = require('../utils/general');
const { addToken, removeToken, isTokenActive } = require('../services/tokens');
const { isAuthorized } = require('./middlewares');
const { registerUser, verifyUser } = require('../services/authService');





authRouter.post('/register', (req, res) => {
    const { username, password } = req.body;

    const result = registerUser(username, password);

    if (result.error) {
        return res.status(result.status).json({ msg: result.error });
    }
    const token=genertateToken();
    addToken(token);
    res.status(201).json({ msg: result.message ,token});
});

authRouter.post('/login', (req, res) => {
    const { username, password } = req.body;
    const result = verifyUser(username, password);

    if (result.error) {
        return res.status(result.status).json({ msg: result.error });
    }
    const token = genertateToken();
    addToken(token);
    res.json({ token });
});

authRouter.post('/logout',isAuthorized, (req, res) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        
        return res.status(401).json({ message: " Authorization header missing" });
    }

    const parts = authHeader.split(" ");
    if (parts[0] !== "Bearer" || !parts[1]) {
        return res.status(401).json({ message: "wrong Authorization" });
    }

    const token = parts[1];

    if (!isTokenActive(token)) {
        return res.status(403).json({ message: "Token not found or already expired" });
    }

    removeToken(token);
    res.json({ message: "Logout successful" });
});

module.exports = authRouter;