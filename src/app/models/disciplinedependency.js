module.exports = (sequelize) => {
  const DisciplineDependency = sequelize.define('DisciplineDependency', {}, {});

  DisciplineDependency.associate = (models) => {
    DisciplineDependency.belongsTo(models.Discipline, {
      foreignKey: 'disciplineId',
      as: 'discipline',
    });
    DisciplineDependency.belongsTo(models.Discipline, {
      foreignKey: 'dependencyId',
      as: 'dependency',
    });
  };
  return DisciplineDependency;
};
