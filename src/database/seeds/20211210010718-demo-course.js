/* eslint-disable no-await-in-loop, no-console, no-restricted-syntax */

const courses = [
  {
    name: 'Ciência da Computação',
    minOptSpecific: 58,
    minOptGeneral: 16,
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
