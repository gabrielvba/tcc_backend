/* eslint no-param-reassign: "error" */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/environment');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      lastName: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      description: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: DataTypes.VIRTUAL,
      passwordHash: {
        type: DataTypes.STRING,
        defaultValue: null,
        allowNull: true,
      },
    },
    {
      defaultScope: {
        attributes: {
          exclude: ['password', 'passwordHash'],
        },
      },
    },
  );

  User.associate = (models) => {
    User.belongsToMany(models.Discipline, {
      through: 'SchoolRecords',
      foreignKey: 'userId',
      as: 'schoolRecords',
    });
    User.hasMany(models.Course, {
      foreignKey: 'userId',
      as: 'courses',
    });
  };

  User.addHook('beforeSave', async (user) => {
    if (user.password) user.passwordHash = await bcrypt.hash(user.password, 5);

    return user;
  });

  User.prototype.checkPassword = function checkPassword(password) {
    return bcrypt.compare(password, this.passwordHash);
  };

  User.prototype.generateAuthToken = function generateAuthToken(
    forgetPassword = false,
  ) {
    const { secret, expirationMinutes } = config.JWT;

    if (forgetPassword) {
      return jwt.sign({ id: this.id }, secret, {
        expiresIn: `${expirationMinutes}m`,
      });
    }

    return jwt.sign({ id: this.id }, secret);
  };

  return User;
};
