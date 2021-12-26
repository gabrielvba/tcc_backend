/* eslint no-param-reassign: "error" */

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      lastName: DataTypes.STRING,
      description: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
    },
    {},
  );

  User.associate = () => {
    // associations can be defined here
  };
  return User;
};
