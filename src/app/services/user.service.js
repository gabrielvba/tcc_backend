const {
  User, Discipline, Profile, Course,
} = require('../models');

const create = (data) => User.create(data);

const getByEmail = (email) => User.findOne({
  where: {
    email,
  },
});

const getById = (id) => User.findByPk(id, {
  attributes: {
    exclude: ['createdAt', 'updatedAt'],
  },
  include: [
    {
      model: Discipline,
      as: 'schoolRecords',
      attributes: ['id', 'name', 'period', 'type', 'value', 'courseId'],
      through: {
        attributes: ['status'],
      },
    },
    {
      model: Profile,
      as: 'profile',
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'userId'],
      },
      include: [
        {
          model: Course,
          as: 'currentCourse',
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
      ],
    },
    {
      model: Course,
      as: 'courses',
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'userId'],
      },
    },
  ],
});

const getJustUserById = (id) => User.findByPk(id, {
  attributes: {
    exclude: ['createdAt', 'updatedAt'],
  },
});

const getAll = () => User.findAll();

const updateUser = (id, data) => User.update(data, {
  where: {
    id,
  },
});

const deleteUser = (user) => user.destroy();

module.exports = {
  create,
  getByEmail,
  getById,
  getAll,
  getJustUserById,
  updateUser,
  deleteUser,
};
