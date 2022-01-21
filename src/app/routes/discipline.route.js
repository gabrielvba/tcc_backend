const express = require('express');
const controller = require('../controllers/discipline.controller');
const controllerDependencies = require('../controllers/disciplineDependency.controller');

const router = express.Router();

router.get('/dependencies/', controllerDependencies.getAll);
router.get('/dependencies/:id', controllerDependencies.getByDisciplineId);
router.put('/dependency/:id', controllerDependencies.updateDependency);
router.post('/dependency/', controllerDependencies.create);
router.delete('/dependency/:id', controllerDependencies.deleteDependency);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.put('/:id', controller.edit);
router.post('/', controller.create);
router.delete('/:id', controller.deleteDiscipline);

module.exports = router;
