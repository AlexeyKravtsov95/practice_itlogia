const ContactController = require('../controllers/contact');
const express = require('express');

const router = express.Router();

router.get('/', ContactController.getContact);

module.exports = router;