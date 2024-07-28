const express = require('express');
const router = express.Router();

// Define your routes here
router.get('/', (req, res) => {
    res.send('Welcome to my website!');
});

router.get('/about', (req, res) => {
    res.send('About page');
});

// Export the router
module.exports = router;
