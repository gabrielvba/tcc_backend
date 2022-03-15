/* eslint-disable no-await-in-loop, no-console, no-restricted-syntax */

const { Op } = require('sequelize');

const dependencies = [
  {
    disciplineId: 5,
    dependencyId: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    disciplineId: 6,
    dependencyId: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    disciplineId: 8,
    dependencyId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    disciplineId: 8,
    dependencyId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    disciplineId: 7,
    dependencyId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    disciplineId: 7,
    dependencyId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    disciplineId: 9,
    dependencyId: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    disciplineId: 10,
    dependencyId: 6,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    disciplineId: 11,
    dependencyId: 6,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    disciplineId: 12,
    dependencyId: 8,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    disciplineId: 13,
    dependencyId: 8,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    disciplineId: 12,
    dependencyId: 7,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    disciplineId: 13,
    dependencyId: 7,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    disciplineId: 19,
    dependencyId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    disciplineId: 20,
    dependencyId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    disciplineId: 17,
    dependencyId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    disciplineId: 17,
    dependencyId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    disciplineId: 16,
    dependencyId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    disciplineId: 16,
    dependencyId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    disciplineId: 15,
    dependencyId: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    disciplineId: 15,
    dependencyId: 6,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    disciplineId: 18,
    dependencyId: 13,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    disciplineId: 21,
    dependencyId: 15,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    disciplineId: 22,
    dependencyId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    disciplineId: 22,
    dependencyId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    disciplineId: 23,
    dependencyId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    disciplineId: 23,
    dependencyId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    disciplineId: 24,
    dependencyId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    disciplineId: 25,
    dependencyId: 20,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    disciplineId: 26,
    dependencyId: 17,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    disciplineId: 28,
    dependencyId: 25,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    disciplineId: 29,
    dependencyId: 26,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    disciplineId: 30,
    dependencyId: 12,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    disciplineId: 30,
    dependencyId: 13,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    disciplineId: 31,
    dependencyId: 17,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    disciplineId: 32,
    dependencyId: 23,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    disciplineId: 34,
    dependencyId: 32,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    disciplineId: 35,
    dependencyId: 33,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

module.exports = {
  up: async (queryInterface) => {
    for (const dependency of dependencies) {
      const existedDependency = await queryInterface.rawSelect(
        'DisciplineDependencies',
        {
          where: {
            disciplineId: dependency.disciplineId,
            dependencyId: dependency.dependencyId,
          },
        },
        ['id'],
      );

      if (!existedDependency) {
        await queryInterface.bulkInsert(
          'DisciplineDependencies',
          [dependency],
          {},
        );
      } else {
        console.log(
          `A disciplina de id ${dependency.userId} já tem dependecia de id ${dependency.dependencyId}.`,
        );
      }
    }
  },

  down: (queryInterface) => queryInterface.bulkDelete(
    'DisciplineDependencies',
    {
      [Op.or]: [
        {
          disciplineId: 1,
          dependencyId: {
            [Op.in]: [2],
          },
        },
      ],
    },
    {},
  ),
};
