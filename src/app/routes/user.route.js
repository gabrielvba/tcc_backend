const express = require('express');
const auth = require('../middlewares/auth');
const controller = require('../controllers/user.controller');
const controllerSchoolRecords = require('../controllers/schoolRecords.controller');

const router = express.Router();

router.get('/schoolRecords/:id', controllerSchoolRecords.getByUserId);
router.put('/schoolRecords/:id', controllerSchoolRecords.updateSchoolRecord);
router.post('/schoolRecords/', controllerSchoolRecords.create);
router.delete('/schoolRecords/:id', controllerSchoolRecords.deleteDependency);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
// router.get('/me',controller.getMe);
router.put('/', auth.verifyToken, controller.edit);
// router.put('/me', controller.editMe);
router.post('/', controller.create);
router.delete('/:id', controller.deleteUser);

module.exports = router;
