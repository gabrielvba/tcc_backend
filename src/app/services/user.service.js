const { Op } = require('sequelize');
const { User, Discipline } = require('../models');
// const log = require('./log.service');

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
      attributes: ['id', 'name', 'period', 'type'],
      through: {
        attributes: [],
      },
    },
  ],
});

const getJustUserById = (id) => User.findByPk(id, {
  attributes: {
    exclude: ['createdAt', 'updatedAt'],
  },
});

const getAll = async (query) => {
  const page = parseInt(query.page, 10);
  const pageSize = parseInt(query.pageSize, 10);
  let offset = null;
  let users = null;
  const { search } = query;

  let where = {};

  if (search) {
    where = {
      [Op.or]: [
        {
          name: {
            [Op.iRegexp]: `${search}`,
          },
        },
        {
          lastName: {
            [Op.iRegexp]: `${search}`,
          },
        },
        {
          email: {
            [Op.iRegexp]: `${search}`,
          },
        },
      ],
    };
  }

  if (page && pageSize) offset = (page - 1) * pageSize;

  if (offset !== null) {
    const options = {
      limit: pageSize,
      offset,
      distinct: true,
      where,
    };
    users = await User.findAndCountAll(options);

    users.pages = Math.ceil(users.count / pageSize);
  } else {
    users = await User.findAll({ where });
  }

  return users;
};

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
