module.exports = (sequelize, DataTypes) => {
  const Discipline = sequelize.define(
    'Discipline',
    {
      name: DataTypes.STRING,
      code: DataTypes.NUMBER,
      description: DataTypes.TEXT,
      summary: DataTypes.TEXT,
      period: DataTypes.NUMBER,
      type: DataTypes.STRING,
      value: DataTypes.NUMBER,
    },
    {},
  );
  Discipline.associate = (models) => {
    Discipline.belongsTo(models.Course, {
      foreignKey: 'courseId',
      as: 'course',
    });
    Discipline.belongsToMany(models.Discipline, {
      through: 'DisciplineDependencies',
      foreignKey: 'dependencyId',
      as: 'discipline',
    });
    Discipline.belongsToMany(models.Discipline, {
      through: 'DisciplineDependencies',
      foreignKey: 'disciplineId',
      as: 'dependency',
    });
    Discipline.belongsToMany(models.User, {
      through: 'SchoolRecords',
      foreignKey: 'disciplineId',
      as: 'schoolRecord',
    });
  };
  return Discipline;
};
