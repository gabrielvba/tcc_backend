/* eslint-disable no-await-in-loop, no-console, no-restricted-syntax */

const courses = [
  {
    name: 'Ciência da Computação',
    userId: 1,
    minOptSpecific: 58,
    minOptGeneral: 16,
    description: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Engenharia Civil',
    userId: 1,
    minOptSpecific: 100,
    minOptGeneral: 10,
    description: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Engenharia de Minas',
    userId: 2,
    minOptSpecific: 20,
    minOptGeneral: 33,
    description: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

module.exports = {
  up: async (queryInterface) => {
    for (const course of courses) {
      const existedCourse = await queryInterface.rawSelect(
        'Courses',
        {
          where: {
            name: course.name,
          },
        },
        ['id'],
      );

      if (!existedCourse || existedCourse.length === 0) await queryInterface.bulkInsert('Courses', [course], {});
      else console.log(`usuario com o email '${course.name}' já existe`);
    }
  },

  down: (queryInterface) => queryInterface.bulkDelete('Courses', courses, {}),
};
