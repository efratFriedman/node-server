const express = require('express');
const crypto = require('crypto');
const { log } = require('console');


const authRouter = express.Router();
let USER = [
    { username: "efrat", password: "123456" }
];

const activeTokens = [];

authRouter.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = USER.find(u => u.username === username);

    if (!user) {

        return res.status(404).json({ messege: 'Unauthorized' });
    }
    if (user.password !== password) {
        return res.status(401).json({ messege: 'Incorrect password' });
    }

    const token = crypto.randomBytes(32).toString('hex');

    activeTokens.push(token);
    console.log(activeTokens);
    

    res.json({ token });
});

authRouter.post("/logout", (req, res) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: " Authorization header missing" });
  }

  const parts = authHeader.split(" ");
  if (parts[0] !== "Bearer" || !parts[1]) {
    return res.status(401).json({ message: "wrong Authorization" });
  }

  const token = parts[1];

  const index = activeTokens.indexOf(token);
  if (index === -1) {
    return res.status(403).json({ message: "token not found" });
  }

  activeTokens.splice(index, 1);

  res.json({ message: "succses" });
});

module.exports = authRouter;