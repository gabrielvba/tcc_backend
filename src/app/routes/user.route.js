const express = require('express');
const controller = require('../controllers/user.controller');

const router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
// router.get('/me',controller.getMe);

router.put('/:id', controller.edit);
// router.put('/me', controller.editMe);

router.post('/', controller.create);

router.delete('/:id', controller.delet);

module.exports = router;
