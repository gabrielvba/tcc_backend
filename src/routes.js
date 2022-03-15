const express = require('express');

const user = require('./app/routes/user.route');
const course = require('./app/routes/course.route');
const discipline = require('./app/routes/discipline.route');
const profile = require('./app/routes/profile.route');
const auth = require('./app/routes/auth.route');

const router = express.Router();

router.get('/', (_, res) => {
  res.send('Meu curso :)');
});

router.use('/user', user);
router.use('/course', course);
router.use('/discipline', discipline);
router.use('/profile', profile);
router.use('/auth', auth);

module.exports = router;
