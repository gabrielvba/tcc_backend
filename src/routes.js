const express = require('express');

const user = require('./app/routes/user.route');
const course = require('./app/routes/course.route');

const router = express.Router();

router.get('/', (_, res) => {
  res.send('Meu curso :)');
});

router.use('/user', user);
router.use('/course', course);

module.exports = router;
