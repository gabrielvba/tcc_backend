const express = require('express');
const auth = require('../middlewares/auth');
const controller = require('../controllers/profile.controller');

const router = express.Router();

router.get('/me', auth.verifyToken, controller.getMe);
router.put('/', auth.verifyToken, controller.editMe);

module.exports = router;
