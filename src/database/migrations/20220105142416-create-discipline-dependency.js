module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('DisciplineDependencies', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    disciplineId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Disciplines',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    dependencyId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Disciplines',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
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
  down: (queryInterface) => queryInterface.dropTable('DisciplineDependencies'),
};
