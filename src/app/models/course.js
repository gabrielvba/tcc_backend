/* eslint no-param-reassign: "error" */

module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define(
    'Course',
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      description: DataTypes.TEXT,
      minOptSpecific: DataTypes.INTEGER,
      minOptGeneral: DataTypes.INTEGER,
    },
    {},
  );

  Course.associate = (models) => {
    Course.hasMany(models.Discipline, {
      foreignKey: 'courseId',
      as: 'disciplines',
    });
    Course.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
    Course.hasMany(models.Profile, {
      foreignKey: 'currentCourseId',
      as: 'students',
    });
  };
  return Course;
};
