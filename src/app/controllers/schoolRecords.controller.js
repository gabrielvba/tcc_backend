const httpStatus = require('http-status-codes');
const log = require('../services/log.service');
const service = require('../services/schoolRecords.service');
const serviceDiscipline = require('../services/discipline.service');

const { StatusCodes } = httpStatus;

const getByUserId = async (req, res) => {
  try {
    const { id } = req.params;

    log.info(`Iniciando busca por historico. userId = ${id}`);

    const schoolRecords = await service.getByUserId(id);

    if (!schoolRecords) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Nenhuma registro encontrada no historico' });
    }

    log.info(`Finalizando busca por historico. userId = ${id}`);
    return res.status(StatusCodes.OK).json(schoolRecords);
  } catch (error) {
    const errorMsg = 'Erro buscar historico';

    log.error(
      errorMsg,
      'app/controllers/schoolRecords.controller.js',
      error.message,
    );

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
};

const create = async (req, res) => {
  try {
    const { schoolRecord } = req.body;

    if (!schoolRecord.disciplineId) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'O id da disciplina precisa ser preenchido' });
    }

    if (!schoolRecord.userId) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'O id da dependencia precisa ser preenchido' });
    }

    const discipline = serviceDiscipline.getById(schoolRecord.disciplineId);

    if (!discipline) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'O disciplineId precisa ser valido' });
    }

    log.info(
      `Salvando disciplina no historico do user ${schoolRecord.userId}. Disciplina: ${discipline.name} Status: ${schoolRecord.status} `,
    );

    const newSchoolRecord = await service.create(schoolRecord);

    log.info(
      `Buscando registro da disciplina no historico: ${newSchoolRecord.id}`,
    );
    const newSchoolRecordInfo = await service.getById(newSchoolRecord.id);

    log.info('Finalizado registro da disciplina no historico.');
    return res.status(StatusCodes.CREATED).json(newSchoolRecordInfo);
  } catch (error) {
    const errorMsg = 'Erro ao salvar disciplina no historico';

    log.error(
      errorMsg,
      'app/controllers/schoolRecords.controller.js',
      error.message,
    );

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
};

const updateSchoolRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const { schoolRecord } = req.body;

    if (!schoolRecord.disciplineId) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'O id da disciplina precisa ser preenchido' });
    }

    if (!schoolRecord.userId) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'O id da dependencia precisa ser preenchido' });
    }

    const oldSchoolRecord = service.getById(id);

    if (!oldSchoolRecord) {
      res.status(StatusCodes.BAD_REQUEST).json({
        error: 'O registro a ser atualizada precisa ter um id valido',
      });
    }

    const discipline = serviceDiscipline.getById(schoolRecord.disciplineId);

    if (!discipline) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'O disciplineId precisa ser valido' });
    }

    log.info(
      `Atualizando registro, user ${schoolRecord.userId}. Disciplina: ${discipline.name} Status: ${schoolRecord.status}`,
    );

    await service.updateSchoolRecord(id, schoolRecord);

    log.info(`Buscando historico da disciplina por id = ${id}`);
    const newSchoolRecordInfo = await service.getById(id);

    log.info('Finalizado atuaçização do registro.');
    return res.status(StatusCodes.CREATED).json(newSchoolRecordInfo);
  } catch (error) {
    const errorMsg = 'Erro ao atualizar historico';

    log.error(
      errorMsg,
      'app/controllers/schoolRecords.controller.js',
      error.message,
    );

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
};

const deleteDependency = async (req, res) => {
  try {
    const { id } = req.params;

    log.info(`Iniciando remoção do registro. id = ${id}`);

    const schoolRecord = await service.getById(id);

    if (!schoolRecord) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Registro não encontrado' });
    }

    await service.deleteSchoolRecord(schoolRecord);

    log.info('Finalizando remoção da disciplina do historico.');
    return res
      .status(StatusCodes.OK)
      .json('disciplina deletada com sucesso do hisotrico.');
  } catch (error) {
    const errorMsg = 'Erro deletar disciplina do historico';

    log.error(
      errorMsg,
      'app/controllers/schoolRecords.controller.js',
      error.message,
    );

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
};

module.exports = {
  getByUserId,
  create,
  updateSchoolRecord,
  deleteDependency,
};
