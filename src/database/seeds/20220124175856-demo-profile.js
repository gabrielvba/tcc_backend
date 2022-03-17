/* eslint-disable no-await-in-loop, no-console, no-restricted-syntax */

const profiles = [
  {
    name: 'Teste',
    lastName: '',
    userId: 1,
    currentCourseId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Jake',
    lastName: 'the dog',
    userId: 2,
    currentCourseId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Marceline',
    lastName: 'the vampire',
    userId: 3,
    currentCourseId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

module.exports = {
  up: async (queryInterface) => {
    for (const profile of profiles) {
      const existedProfile = await queryInterface.rawSelect(
        'Profiles',
        {
          where: {
            name: profile.name,
          },
        },
        ['id'],
      );

      if (!existedProfile) await queryInterface.bulkInsert('Profiles', [profile], {});
      else console.log(`usuario com o nome '${profile.name}' j� existe`);
    }
  },

  down: async (queryInterface) => {
    for (const profile of profiles) {
      const existedProfile = await queryInterface.rawSelect(
        'Profiles',
        {
          where: {
            name: profile.name,
          },
        },
        ['id'],
      );

      if (existedProfile) await queryInterface.bulkDelete('Profiles', existedProfile, {});
    }
  },
};
