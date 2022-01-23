// const { Op } = require('sequelize');
const { DisciplineDependency, Discipline } = require('../models');
// const log = require('./log.service');

const create = (data) => DisciplineDependency.create(data);

const getById = (id) => DisciplineDependency.findByPk(id, {
  attributes: {
    exclude: ['createdAt', 'updatedAt'],
  },
});

const getByDisciplineId = (id) => DisciplineDependency.findAll({
  where: {
    disciplineId: id,
  },
  attributes: {
    exclude: ['createdAt', 'updatedAt'],
  },
  include: [
    {
      model: Discipline,
      as: 'dependency',
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    },
  ],
});

const getByDisciplineIdAndDependencyId = (dependency) => DisciplineDependency.findOne({
  where: {
    disciplineId: dependency.disciplineId,
    dependencyId: dependency.dependencyId,
  },
});

const getAll = async (query) => {
  const page = parseInt(query.page, 10);
  const pageSize = parseInt(query.pageSize, 10);
  let offset = null;
  let dependencies = null;
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
      where,
    };
    dependencies = await DisciplineDependency.findAndCountAll(options);

    dependencies.pages = Math.ceil(dependencies.count / pageSize);
  } else {
    dependencies = await DisciplineDependency.findAll({ where });
  }

  return dependencies;
};

const updateDependency = (id, data) => DisciplineDependency.update(data, {
  where: {
    id,
  },
});

const deleteDependency = (dependecy) => dependecy.destroy();

module.exports = {
  create,
  getById,
  getByDisciplineId,
  getByDisciplineIdAndDependencyId,
  getAll,
  updateDependency,
  deleteDependency,
};
