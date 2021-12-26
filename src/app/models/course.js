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

  Course.associate = () => {
    // associations can be defined here
  };
  return Course;
};
