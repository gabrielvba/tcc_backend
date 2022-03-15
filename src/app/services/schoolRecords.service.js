// const { Op } = require('sequelize');
const { SchoolRecord, Discipline } = require('../models');
const log = require('./log.service');

const create = (data) => SchoolRecord.create(data);

const createSchoolRecords = async (disciplines, userId) => {
  await Promise.all(
    disciplines.map(async (disciplineId) => {
      const discipline = await Discipline.findByPk(disciplineId, {
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      });
      const newSchoolRecord = {
        userId,
        disciplineId,
        status: 'concluida',
      };
      if (!discipline) log.info(`A disciplina de id ${disciplineId} não existe`);
      else await create(newSchoolRecord);
    }),
  );
};

const updateSchoolRecord = (id, data) => SchoolRecord.update(data, {
  where: {
    id,
  },
});

const updateSchoolRecords = async (disciplines, userId) => {
  await Promise.all(
    disciplines.map(async (discipline) => {
      const existSchoolRecord = await SchoolRecord.findOne({
        where: {
          disciplineId: discipline.schoolRecord.disciplineId,
          userId,
        },
      });
      if (!existSchoolRecord) {
        log.info(
          `A disciplina de id ${discipline.schoolRecord.disciplineId} não existe`,
        );
      } else await updateSchoolRecord(existSchoolRecord.id, discipline.schoolRecord);
    }),
  );
};

const getById = (id) => SchoolRecord.findByPk(id, {
  attributes: {
    exclude: ['createdAt', 'updatedAt'],
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
  createSchoolRecords,
  updateSchoolRecords,
};
