// const { Op } = require('sequelize');
const { SchoolRecord } = require('../models');
// const log = require('./log.service');

const create = (data) => SchoolRecord.create(data);

const getById = (id) => SchoolRecord.findByPk(id);

const updateSchoolRecord = (id, data) => SchoolRecord.update(data, {
  where: {
    id,
  },
});

const deleteSchoolRecord = (schoolRecord) => schoolRecord.destroy();

const getByUserId = (id) => SchoolRecord.findAll({
  where: {
    userId: id,
  },
  attributes: {
    exclude: ['createdAt', 'updatedAt'],
  },
});

module.exports = {
  getByUserId,
  create,
  getById,
  updateSchoolRecord,
  deleteSchoolRecord,
};
