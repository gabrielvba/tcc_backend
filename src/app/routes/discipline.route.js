const express = require('express');
const controller = require('../controllers/discipline.controller');

const router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);

router.put('/:id', controller.edit);

router.post('/', controller.create);

router.delete('/:id', controller.deleteDiscipline);

module.exports = router;
