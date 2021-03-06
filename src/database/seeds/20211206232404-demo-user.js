/* eslint-disable no-await-in-loop, no-console, no-restricted-syntax */

const bcrypt = require('bcryptjs');

const users = [
  {
    email: 'teste@email.com',
    passwordHash: '123fin',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    email: 'jake_the_dog@gmail.com',
    passwordHash: '123jake',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    email: 'Marceline_the_vampire_queen@gmail.com',
    passwordHash: '123marcy',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

module.exports = {
  up: async (queryInterface) => {
    for (const user of users) {
      user.passwordHash = await bcrypt.hash(user.passwordHash, 5);

      const existedUser = await queryInterface.rawSelect(
        'Users',
        {
          where: {
            email: user.email,
          },
        },
        ['id'],
      );

      if (!existedUser) await queryInterface.bulkInsert('Users', [user], {});
      else console.log(`usuario com o email '${user.email}' já existe`);
    }
  },

  down: (queryInterface) => queryInterface.bulkDelete('Users', users, {}),
};
