/* eslint no-param-reassign: "error" */
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define(
    'Profile',
    {
      name: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      lastName: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
    },
    {},
  );
  Profile.associate = (models) => {
    Profile.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
    Profile.belongsTo(models.Course, {
      foreignKey: 'currentCourseId',
      as: 'currentCourse',
    });
  };
  return Profile;
};
