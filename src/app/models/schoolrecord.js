module.exports = (sequelize, DataTypes) => {
  const SchoolRecord = sequelize.define(
    'SchoolRecord',
    {
      status: DataTypes.STRING,
    },
    {},
  );
  SchoolRecord.associate = (models) => {
    SchoolRecord.belongsTo(models.Discipline, {
      foreignKey: 'disciplineId',
      as: 'discipline',
    });
    SchoolRecord.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };
  return SchoolRecord;
};
