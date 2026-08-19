const express = require('express');
const { createUser, loginUser } = require('../controller/auth');
const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const resp = await createUser(req.body);
        res.send(resp);
    } catch (err) {
        console.error("Signup error:", err);
        res.status(500).send("Error creating user: " + (err.message || "Unknown error"));
    }
});

router.post('/login', async (req, res) => {
    try {
        const resp = await loginUser(req.body.email, req.body.password);
        res.send(resp);
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).send("Login error: " + (err.message || "Unknown error"));
    }
});

module.exports = router;