const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res
        .status(200)
        .json({ status: "ok", message: "Hello, the server is up and running!" });
});


module.exports = router;