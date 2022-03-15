// const { Op } = require('sequelize');
const { Discipline, DisciplineDependency } = require('../models');
const log = require('./log.service');

const create = (data) => Discipline.create(data);

const getByDisciplineIdAndDependencyId = (dependency) => DisciplineDependency.findOne({
  where: {
    disciplineId: dependency.disciplineId,
    dependencyId: dependency.dependencyId,
  },
});

const createDependency = (data) => DisciplineDependency.create(data);
const removeDependency = (dependecy) => dependecy.destroy();

const removeDependencies = async (disciplines, disciplineId) => {
  await Promise.all(
    disciplines.map(async (dependencyId) => {
      const dependency = {
        disciplineId,
        dependencyId,
      };
      const existDependency = await getByDisciplineIdAndDependencyId(
        dependency,
      );
      if (existDependency) {
        log.info(
          `Excluindo dependencia da disciplina: ${disciplineId} com ${dependencyId}`,
        );
        removeDependency(existDependency);
      } else {
        log.info(
          `Não foi encontrada dependencia entre aa disciplina: ${disciplineId} com ${dependencyId}`,
        );
      }
    }),
  );
};

const createDependencies = async (disciplines, disciplineId) => {
  await Promise.all(
    disciplines.map(async (dependencyId) => {
      const dependency = {
        disciplineId,
        dependencyId,
      };
      const existDependency = await getByDisciplineIdAndDependencyId(
        dependency,
      );
      if (existDependency) {
        log.info(
          `A dependencya de id ${disciplineId} com ${dependencyId} já existe`,
        );
      } else {
        const newDependency = await createDependency(dependency);
        if (newDependency) {
          log.info(
            `nova dependencia criada com sucesso disciplineId: ${disciplineId} dependencyId: ${dependencyId}`,
          );
        }
      }
    }),
  );
};

const getByName = (name) => Discipline.findOne({
  where: {
    name,
  },
});
const getDiscipline = (id) => Discipline.findByPk(id, {
  attributes: {
    exclude: ['createdAt', 'updatedAt'],
  },
});

const getById = (id) => Discipline.findByPk(id, {
  attributes: {
    exclude: ['createdAt', 'updatedAt'],
  },
  include: [
    {
      model: Discipline,
      as: 'dependency',
      attributes: ['id', 'name', 'period', 'type'],
      through: {
        attributes: [],
      },
    },
  ],
});

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
  getDiscipline,
  getAll,
  updateDiscipline,
  deleteDiscipline,
  createDependencies,
  removeDependencies,
};
