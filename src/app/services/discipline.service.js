// const { Op } = require('sequelize');
const { Discipline } = require('../models');
// const log = require('./log.service');

const create = (data) => Discipline.create(data);

const getByName = (name) => Discipline.findOne({
  where: {
    name,
  },
});

const getById = (id) => Discipline.findByPk(id);

const getAll = async (query) => {
  const page = parseInt(query.page, 10);
  const pageSize = parseInt(query.pageSize, 10);
  let offset = null;
  let disciplines = null;
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
    disciplines = await Discipline.findAndCountAll(options);

    disciplines.pages = Math.ceil(disciplines.count / pageSize);
  } else {
    disciplines = await Discipline.findAll({ where });
  }

  return disciplines;
};

const updateDiscipline = (id, data) => Discipline.update(data, {
  where: {
    id,
  },
});

const deleteDiscipline = (discipline) => discipline.destroy();

module.exports = {
  create,
  getByName,
  getById,
  getAll,
  updateDiscipline,
  deleteDiscipline,
};
