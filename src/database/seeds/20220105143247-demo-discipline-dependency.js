/* eslint-disable no-await-in-loop, no-console, no-restricted-syntax */

const { Op } = require('sequelize');

const dependencies = [
  {
    disciplineId: 1,
    dependencyId: 2,
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
