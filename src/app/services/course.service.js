const { Course, Discipline } = require('../models');

const create = (data) => Course.create(data);

const getById = async (id, includeDiscipline = true) => {
  let result = null;

  if (includeDiscipline !== 'false') {
    result = await Course.findByPk(id, {
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: {
        model: Discipline,
        as: 'disciplines',
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'courseId'],
        },
      },
    });
  } else {
    result = await Course.findByPk(id, {
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
  }

  return result;
};

const getJustCourseById = (id) => Course.findByPk(id);

const getByName = (name) => Course.findOne({
  where: {
    name,
  },
});

const getMe = async (user, query) => {
  const page = parseInt(query.page, 10);
  const pageSize = parseInt(query.pageSize, 10);
  let offset = null;
  let courses = null;

  const where = {
    userId: user.id,
  };

  if (page && pageSize) offset = (page - 1) * pageSize;

  if (offset !== null) {
    const options = {
      limit: pageSize,
      offset,
      distinct: true,
      where,
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    };
    courses = await Course.findAndCountAll(options);

    courses.pages = Math.ceil(courses.count / pageSize);
  } else {
    courses = await Course.findAll({
      where,
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
  }

  return courses;
};

const getAll = async (query) => {
  const page = parseInt(query.page, 10);
  const pageSize = parseInt(query.pageSize, 10);
  let offset = null;
  let courses = null;

  if (page && pageSize) offset = (page - 1) * pageSize;

  if (offset !== null) {
    const options = {
      limit: pageSize,
      offset,
      distinct: true,
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    };
    courses = await Course.findAndCountAll(options);

    courses.pages = Math.ceil(courses.count / pageSize);
  } else {
    courses = await Course.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
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
  getByName,
  getAll,
  getMe,
  getJustCourseById,
  updateCourse,
  deleteCourse,
};
