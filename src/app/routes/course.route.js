const express = require('express');
const controller = require('../controllers/course.controller');

const router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);

router.put('/:id', controller.edit);

router.post('/', controller.create);

router.delete('/:id', controller.delet);

module.exports = router;
