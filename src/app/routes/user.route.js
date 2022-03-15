const express = require('express');
const auth = require('../middlewares/auth');
const controller = require('../controllers/user.controller');
const controllerSchoolRecords = require('../controllers/schoolRecords.controller');

const router = express.Router();

router.get(
  '/schoolRecords',
  auth.verifyToken,
  controllerSchoolRecords.getByUserId,
);
router.put(
  '/schoolRecords/:id',
  auth.verifyToken,
  controllerSchoolRecords.updateSchoolRecord,
);
router.post('/schoolRecords', auth.verifyToken, controllerSchoolRecords.create);
router.delete(
  '/schoolRecords/:id',
  auth.verifyToken,
  controllerSchoolRecords.deleteDependency,
);

router.get('/me', auth.verifyToken, controller.getMe);
router.put('/', auth.verifyToken, controller.edit);
router.post('/', controller.create);
router.delete('/', auth.verifyToken, controller.deleteUser);

router.get('/:id', auth.verifyToken, controller.getById); // provavelmente nao vai ser usada
router.get('/', auth.verifyToken, controller.getAll); // so utilizada para testar o sistema
module.exports = router;
