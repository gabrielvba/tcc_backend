const express = require('express');
const auth = require('../middlewares/auth');
const controller = require('../controllers/course.controller');

const router = express.Router();

router.put('/:id', auth.verifyToken, controller.edit);
router.post('/', auth.verifyToken, controller.create);
router.delete('/:id', auth.verifyToken, controller.deleteCourse);
router.get('/me', auth.verifyToken, controller.getMe);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);

module.exports = router;
