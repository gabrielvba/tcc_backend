const httpStatus = require('http-status-codes');
const log = require('../services/log.service');
const service = require('../services/discipline.service');
const courseService = require('../services/course.service');

const { StatusCodes } = httpStatus;

const create = async (req, res) => {
  try {
    const { user } = req;
    const { discipline } = req.body;

    if (!discipline.name) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'O nome precisa ser preenchido' });
    }

    const includeDiscipline = 'false';
    const course = await courseService.getById(
      discipline.courseId,
      includeDiscipline,
    );

    if (!course) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'O cursoId precisa ser preenchido/valido' });
    }

    if (course.userId !== user.id) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'Você não pode criar disciplinas nesse curso' });
    }

    log.info(`Inicializando criação da Disciplina: ${discipline.name}`);
    const newDiscipline = await service.create(discipline);

    if (discipline.dependencias) {
      log.info(
        `Salvando dependencias na disciplina de id = ${newDiscipline.id}`,
      );
      await service.createDependencies(
        discipline.dependencias,
        newDiscipline.id,
      );
    }

    log.info(`Buscando disciplina por id = ${newDiscipline.id}`);
    const newDisciplineInfo = await service.getDiscipline(newDiscipline.id);

    log.info('Finalizado a criação do discipline.');
    return res.status(StatusCodes.CREATED).json(newDisciplineInfo);
  } catch (error) {
    const errorMsg = 'Erro ao criar discipline';

    log.error(
      errorMsg,
      'app/controllers/discipline.controller.js',
      error.message,
    );

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;

    log.info(`Iniciando busca por disciplina. disciplineId = ${id}`);

    const discipline = await service.getById(id);

    if (!discipline) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Disciplina não encontrada' });
    }

    log.info(`Finalizando busca por disciplina. disciplineId = ${id}`);
    return res.status(StatusCodes.OK).json(discipline);
  } catch (error) {
    const errorMsg = 'Erro buscar disciplina';

    log.error(
      errorMsg,
      'app/controllers/discipline.controller.js',
      error.message,
    );

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
};

const getAll = async (req, res) => {
  try {
    const { query } = req;

    log.info(`Iniciando listagem das disciplinas, page: ${query.page}`);

    const disciplines = await service.getAll(query);

    log.info('Busca finalizada com sucesso');
    return res.status(StatusCodes.OK).json(disciplines);
  } catch (error) {
    const errorMsg = 'Erro ao buscar disciplinas';

    log.error(
      errorMsg,
      'app/controllers/discipline.controller.js',
      error.message,
    );

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
};

const edit = async (req, res) => {
  try {
    const { id } = req.params;
    const { discipline } = req.body;
    const { user } = req;

    log.info(`Iniciando atualização da disciplina. disciplineId = ${id}`);
    log.info('Verificando se a disciplina existe');

    const existedDiscipline = await service.getDiscipline(id);

    if (!existedDiscipline) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'Disciplina não encontrada' });
    }

    if (discipline?.name) {
      log.info(`Validando nome. nome = ${discipline.name}`);

      const disciplineWithSameName = await service.getByName(discipline.name);

      if (
        disciplineWithSameName
        && `${disciplineWithSameName.id}` !== `${id}`
      ) {
        return res
          .status(StatusCodes.CONFLICT)
          .json({ error: 'Uma disciplina de mesmo nome já existe.' });
      }
    }

    const includeDiscipline = 'false';
    const course = await courseService.getById(
      existedDiscipline.courseId,
      includeDiscipline,
    );

    if (course.userId !== user.id) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'Você não pode alterar essa disciplina' });
    }

    if (discipline) {
      log.info('Atualizando dados da disciplina');
      await service.updateDiscipline(id, discipline);
    }

    if (discipline.dependencias) {
      log.info(`Atualizando dependencias na disciplina de id = ${id}`);
      await service.createDependencies(discipline.dependencias, id);
    }
    if (discipline.removeDependencies) {
      log.info(`Excluindo dependencias na disciplina de id = ${id}`);
      await service.removeDependencies(discipline.removeDependencies, id);
    }

    log.info('Buscando dados atualizados da disciplina');
    const disciplineInfo = await service.getDiscipline(id);

    log.info('Finalizando atualização');
    return res.status(StatusCodes.OK).json(disciplineInfo);
  } catch (error) {
    const errorMsg = 'Erro atualizar disciplina';

    log.error(
      errorMsg,
      'app/controllers/discipline.controller.js',
      error.message,
    );

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
};

const deleteDiscipline = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;

    log.info(`Iniciando remoção da disciplina. disciplineId = ${id}`);

    const discipline = await service.getDiscipline(id);

    if (!discipline) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'disciplina não encontrado' });
    }
    const includeDiscipline = 'false';
    const course = await courseService.getById(
      discipline.courseId,
      includeDiscipline,
    );

    if (course.userId !== user.id) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'Você não deletar essa disciplina' });
    }

    await service.deleteDiscipline(discipline);

    log.info('Finalizando remoção da disciplina.');
    return res.status(StatusCodes.OK).json('disciplina deletada com sucesso.');
  } catch (error) {
    const errorMsg = 'Erro deletar disciplina';

    log.error(
      errorMsg,
      'app/controllers/discipline.controller.js',
      error.message,
    );

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
};

module.exports = {
  create,
  getById,
  getAll,
  edit,
  deleteDiscipline,
};
