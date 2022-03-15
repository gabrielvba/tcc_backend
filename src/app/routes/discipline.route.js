const express = require('express');
const auth = require('../middlewares/auth');
const controller = require('../controllers/discipline.controller');
const controllerDependencies = require('../controllers/disciplineDependency.controller');

const router = express.Router();

router.get('/dependencies/', controllerDependencies.getAll);
router.get('/dependencies/:id', controllerDependencies.getByDisciplineId);
router.put(
  '/dependency/:id',
  auth.verifyToken,
  controllerDependencies.updateDependency,
);
router.post('/dependency/', auth.verifyToken, controllerDependencies.create);
router.delete(
  '/dependency/:id',
  auth.verifyToken,
  controllerDependencies.deleteDependency,
);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.put('/:id', auth.verifyToken, controller.edit);
router.post('/', auth.verifyToken, controller.create);
router.delete('/:id', auth.verifyToken, controller.deleteDiscipline);

module.exports = router;
