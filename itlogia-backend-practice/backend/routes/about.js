const AboutController = require('../controllers/about');
const express = require('express');

const router = express.Router();

router.get('/', AboutController.getAbout);

module.exports = router;