/* eslint-disable no-await-in-loop, no-console, no-restricted-syntax */

const disciplines = [
  {
    name: 'Introdução a Ciência da Computação',
    code: 7890,
    description: '',
    courseId: 2,
    summary: '',
    period: 1,
    type: 'obrigatoria',
    value: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

module.exports = {
  up: async (queryInterface) => {
    for (const discipline of disciplines) {
      const existedDiscipline = await queryInterface.rawSelect(
        'Disciplines',
        {
          where: {
            name: discipline.name,
          },
        },
        ['id'],
      );
      const existedCourse = await queryInterface.rawSelect(
        'Courses',
        {
          where: {
            id: discipline.courseId,
          },
        },
        ['id'],
      );
      if (existedCourse || existedCourse.length > 0) {
        if (!existedDiscipline || existedDiscipline.length === 0) await queryInterface.bulkInsert('Disciplines', [discipline], {});
        else console.log(`Disciplina com o nome '${discipline.name}' já existe`);
      } else {
        console.log(`Curso com o id '${discipline.courseId}' não existe`);
      }
    }
  },

  down: (queryInterface) => queryInterface.bulkDelete('Disciplines', disciplines, {}),
};
