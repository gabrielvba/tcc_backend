module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Profiles', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: false,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    currentCourseId: {
      type: Sequelize.INTEGER,
      unique: false,
      references: {
        model: 'Courses',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    name: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('Profiles'),
};
