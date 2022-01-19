// const { Op } = require('sequelize');
const { Course, Discipline } = require('../models');
// const log = require('./log.service');

const create = (data) => Course.create(data);

const getById = async (id, includeDiscipline = true) => {
  let result = null;

  if (includeDiscipline !== 'false') {
    result = await Course.findByPk(id, {
      include: {
        model: Discipline,
        as: 'disciplines',
      },
    });
  } else {
    result = await Course.findByPk(id);
  }

  return result;
};

const getJustCourseById = (id) => Course.findByPk(id);

const getAll = async (query) => {
  const page = parseInt(query.page, 10);
  const pageSize = parseInt(query.pageSize, 10);
  let offset = null;
  let courses = null;
  //   const { search } = query;

  const where = {};

  //   if (search) {
  //     where = {
  //       [Op.or]: [
  //         {
  //           name: {
  //             [Op.iRegexp]: `${search}`,
  //           },
  //         },
  //         {
  //           lastName: {
  //             [Op.iRegexp]: `${search}`,
  //           },
  //         },
  //         {
  //           name: {
  //             [Op.iRegexp]: `${search}`,
  //           },
  //         },
  //       ],
  //     };
  //   }

  if (page && pageSize) offset = (page - 1) * pageSize;

  if (offset !== null) {
    const options = {
      limit: pageSize,
      offset,
      distinct: true,
      where,
    };
    courses = await Course.findAndCountAll(options);

    courses.pages = Math.ceil(courses.count / pageSize);
  } else {
    courses = await Course.findAll({ where });
  }

  return courses;
};

const updateCourse = (id, data) => Course.update(data, {
  where: {
    id,
  },
});

const deleteCourse = (course) => course.destroy();

module.exports = {
  create,
  getById,
  getAll,
  getJustCourseById,
  updateCourse,
  deleteCourse,
};