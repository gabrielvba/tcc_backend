const httpStatus = require('http-status-codes');
const log = require('../services/log.service');
const service = require('../services/disciplineDependency.service');
const serviceDiscipline = require('../services/discipline.service');
const courseService = require('../services/course.service');

const { StatusCodes } = httpStatus;

const create = async (req, res) => {
  try {
    const { user } = req;
    const { dependency } = req.body;

    if (!dependency.disciplineId) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'O id da disciplina precisa ser preenchido' });
    }

    if (!dependency.dependencyId) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'O id da dependencia precisa ser preenchido' });
    }

    const discipline = await serviceDiscipline.getDiscipline(
      dependency.disciplineId,
    );

    if (!discipline) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'O disciplineId precisa ser preenchido/valido' });
    }

    const includeDiscipline = 'false';
    const course = await courseService.getById(
      discipline.courseId,
      includeDiscipline,
    );

    if (course.userId !== user.id) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'Você não pode alterar essa disciplina' });
    }

    const disciplineDependency = await serviceDiscipline.getDiscipline(
      dependency.dependencyId,
    );

    if (!disciplineDependency) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'O dependencyId precisa ser preenchido/valido' });
    }

    log.info(
      `Inicializando criação da Dependencia: ${discipline.name} depende de ${disciplineDependency.name} `,
    );
    const newDependency = await service.create(dependency);

    log.info(`Buscando dependecia por id = ${newDependency.id}`);
    const newDependencyInfo = await service.getById(newDependency.id);

    log.info('Finalizado a criação da dependencia.');
    return res.status(StatusCodes.CREATED).json(newDependencyInfo);
  } catch (error) {
    const errorMsg = 'Erro ao criar dependencia';

    log.error(
      errorMsg,
      'app/controllers/disciplineDependency.controller.js',
      error.message,
    );

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
};

const getByDisciplineId = async (req, res) => {
  try {
    const { id } = req.params;

    log.info(`Iniciando busca por dependencias. disciplineId = ${id}`);

    const dependencias = await service.getByDisciplineId(id);

    if (!dependencias) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Nenhuma dependencia não encontrada' });
    }

    log.info(`Finalizando busca por dependencias. disciplineId = ${id}`);
    return res.status(StatusCodes.OK).json(dependencias);
  } catch (error) {
    const errorMsg = 'Erro buscar dependencias';

    log.error(
      errorMsg,
      'app/controllers/disciplineDependency.controller.js',
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

    log.info(`Iniciando listagem das dependencias, page: ${query.page}`);

    const dependencias = await service.getAll(query);

    log.info('Busca finalizada com sucesso');
    return res.status(StatusCodes.OK).json(dependencias);
  } catch (error) {
    const errorMsg = 'Erro ao buscar dependencias';

    log.error(
      errorMsg,
      'app/controllers/disciplineDependency.controller.js',
      error.message,
    );

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
};

const updateDependency = async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;
    const { dependency } = req.body;

    if (!dependency.disciplineId) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'O id da disciplina precisa ser preenchido' });
    }

    if (!dependency.dependencyId) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'O id da dependencia precisa ser preenchido' });
    }

    const oldDependency = await service.getById(id);

    if (!oldDependency) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: 'A dependencia a ser atualizada precisa ter um id valido',
      });
    }

    const discipline = await serviceDiscipline.getDiscipline(
      dependency.disciplineId,
    );

    if (!discipline) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'O disciplineId precisa ser valido' });
    }

    const disciplineDependency = await serviceDiscipline.getDiscipline(
      dependency.dependencyId,
    );

    if (!disciplineDependency) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'O dependencyId precisa ser valido' });
    }

    const existedSameDependency = await service.getByDisciplineIdAndDependencyId(dependency);

    if (existedSameDependency) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'Já existe uma dependencia com os mesmos atributos' });
    }

    const includeDiscipline = 'false';
    const course = await courseService.getById(
      discipline.courseId,
      includeDiscipline,
    );

    if (course.userId !== user.id) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'Você não pode alterar essa disciplina' });
    }

    log.info(
      `Atualizando a Dependencia: De ${oldDependency.disciplineId} depende de ${oldDependency.dependencyId} para ${discipline.id} depende de ${disciplineDependency.id} `,
    );

    await service.updateDependency(id, dependency);

    log.info(`Buscando dependecia por id = ${id}`);
    const newDependencyInfo = await service.getById(id);

    log.info('Finalizado a criação da dependencia.');
    return res.status(StatusCodes.CREATED).json(newDependencyInfo);
  } catch (error) {
    const errorMsg = 'Erro ao criar dependencia';

    log.error(
      errorMsg,
      'app/controllers/disciplineDependency.controller.js',
      error.message,
    );

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
};

const deleteDependency = async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;

    log.info(`Iniciando remoção da dependencia. id = ${id}`);

    const dependency = await service.getById(id);

    if (!dependency) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'disciplina não encontrado' });
    }

    const discipline = await serviceDiscipline.getDiscipline(
      dependency.disciplineId,
    );

    const includeDiscipline = 'false';
    const course = await courseService.getById(
      discipline.courseId,
      includeDiscipline,
    );

    if (course.userId !== user.id) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'Você não pode alterar essa disciplina' });
    }

    await service.deleteDependency(dependency);

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
  getByDisciplineId,
  getAll,
  updateDependency,
  deleteDependency,
};
