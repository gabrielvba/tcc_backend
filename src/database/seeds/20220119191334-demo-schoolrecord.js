/* eslint-disable no-await-in-loop, no-console, no-restricted-syntax */

const { Op } = require('sequelize');

const schoolRecords = [
  {
    disciplineId: 1,
    userId: 1,
    status: 'concluida',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

module.exports = {
  up: async (queryInterface) => {
    for (const schoolRecord of schoolRecords) {
      const existed = await queryInterface.rawSelect(
        'SchoolRecords',
        {
          where: {
            disciplineId: schoolRecord.disciplineId,
            userId: schoolRecord.userId,
          },
        },
        ['id'],
      );

      if (!existed) {
        await queryInterface.bulkInsert('SchoolRecords', [schoolRecord], {});
      } else {
        console.log(
          `O usuario de id ${schoolRecord.userId} já tem em seu historico a disciplina ${schoolRecord.disciplineId}.`,
        );
      }
    }
  },

  down: (queryInterface) => queryInterface.bulkDelete(
    'SchoolRecords',
    {
      [Op.or]: [
        {
          userId: 1,
          disciplineId: {
            [Op.in]: [1],
          },
        },
      ],
    },
    {},
  ),
};
