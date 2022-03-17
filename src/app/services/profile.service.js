const { Profile, Course } = require('../models');

const create = (data) => Profile.create(data);

const updateProfile = (id, data) => Profile.update(data, {
  where: {
    userId: id,
  },
});

const getMe = (id) => Profile.findByPk(id, {
  where: {
    userId: id,
  },
  attributes: {
    exclude: ['createdAt', 'updatedAt'],
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
});

const getById = (id) => Profile.findByPk(id, {
  where: {
    userId: id,
  },
  attributes: {
    exclude: ['createdAt', 'updatedAt'],
  },
});

const deleteProfile = (profile) => profile.destroy();

module.exports = {
  create,
  getById,
  getMe,
  updateProfile,
  deleteProfile,
};
