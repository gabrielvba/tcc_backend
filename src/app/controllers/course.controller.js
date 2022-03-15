const httpStatus = require('http-status-codes');
const log = require('../services/log.service');
const service = require('../services/course.service');
const profileService = require('../services/profile.service');

const { StatusCodes } = httpStatus;

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const { includeDiscipline } = req.query;
    log.info(`Iniciando busca por curso. courseId = ${id}`);

    const course = await service.getById(id, includeDiscipline);

    if (!course) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'curso não encontrado' });
    }

    log.info(`Finalizando busca por curso. courseId = ${id}`);
    return res.status(StatusCodes.OK).json(course);
  } catch (error) {
    const errorMsg = 'Erro buscar curso';

    log.error(errorMsg, 'app/controllers/course.controller.js', error.message);

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
};

const getAll = async (req, res) => {
  try {
    const { query } = req;

    log.info(`Iniciando listagem dos curso, page: ${query.page}`);

    const courses = await service.getAll(query);

    log.info('Busca finalizada com sucesso');
    return res.status(StatusCodes.OK).json(courses);
  } catch (error) {
    const errorMsg = 'Erro ao buscar curso';

    log.error(errorMsg, 'app/controllers/course.controller.js', error.message);

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
};

// const getMe = async (req, res) => {
//   try {
//     const { user } = req;
//     const { query } = req;

//     log.info(`Iniciando listagem dos cursos, page: ${query.page}`);

//     const courses = await service.getMe(user, query);

//     log.info('Busca finalizada com sucesso');
//     return res.status(StatusCodes.OK).json(courses);
//   } catch (error) {
//     const errorMsg = 'Erro ao buscar curso';

//     log.error(errorMsg, 'app/controllers/course.controller.js', error.message);

//     return res
//       .status(StatusCodes.INTERNAL_SERVER_ERROR)
//       .json({ error: `${errorMsg} ${error.message}` });
//   }
// };

const getMe = async (req, res) => {
  try {
    const { user } = req;

    log.info('Buscando curso atual:');
    const profile = await profileService.getById(user.id);

    if (!profile.currentCourseId) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'O usuario não tem um curso atual' });
    }

    const course = await service.getById(profile.currentCourseId);

    log.info('Busca finalizada com sucesso');
    return res.status(StatusCodes.OK).json(course);
  } catch (error) {
    const errorMsg = 'Erro ao buscar curso';

    log.error(errorMsg, 'app/controllers/course.controller.js', error.message);

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
};

const create = async (req, res) => {
  try {
    const { user } = req;
    const { newCourse } = req.body;

    if (!newCourse.name) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'O nome precisa ser preenchido' });
    }

    const course = { ...newCourse, userId: user.id };

    log.info(`Inicializando criação do course: ${course.name}`);
    const createdCourse = await service.create(course);

    log.info(`Buscando curso por id = ${createdCourse.id}`);
    const includeDiscipline = 'false';
    const newCourseInfo = await service.getById(
      createdCourse.id,
      includeDiscipline,
    );

    log.info('Finalizado a criação do course.');
    return res.status(StatusCodes.CREATED).json(newCourseInfo);
  } catch (error) {
    const errorMsg = 'Erro ao criar course';

    log.error(errorMsg, 'app/controllers/course.controller.js', error.message);

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
};

const edit = async (req, res) => {
  try {
    const { id } = req.params;
    const { course } = req.body;
    const { user } = req;

    log.info(`Iniciando atualização do curso. courseId = ${id}`);
    log.info('Verificando se curso existe');

    const existedCourse = await service.getJustCourseById(id);

    if (!existedCourse) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'curso não encontrado' });
    }

    if (existedCourse.userId !== user.id) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'Você não pode alterar esse curso' });
    }

    if (course?.name) {
      log.info(`Validando nome. nome = ${course.name}`);

      const courseWithSameName = await service.getByName(course.name);

      if (courseWithSameName && `${courseWithSameName.id}` !== `${id}`) {
        return res
          .status(StatusCodes.CONFLICT)
          .json({ error: 'Um curso de mesmo nome já existe.' });
      }
    }

    if (course) {
      log.info('Atualizando dados do curso');
      await service.updateCourse(id, course);
    }

    log.info('Buscando dados atualizados do curso');
    const includeDiscipline = 'false';
    const courseInfo = await service.getById(id, includeDiscipline);

    log.info('Finalizando atualização');
    return res.status(StatusCodes.OK).json(courseInfo);
  } catch (error) {
    const errorMsg = 'Erro atualizar curso';

    log.error(errorMsg, 'app/controllers/course.controller.js', error.message);

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;

    log.info(`Iniciando remoção de curso. courseId = ${id}`);

    const course = await service.getJustCourseById(id);

    if (!course) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'curso não encontrado' });
    }

    if (course.userId !== user.id) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Você nao pode deletar esse curso' });
    }

    await service.deleteCourse(course);

    log.info('Finalizando remoção do curso.');
    return res.status(StatusCodes.OK).json('curso deletado com sucesso.');
  } catch (error) {
    const errorMsg = 'Erro deletar course';

    log.error(errorMsg, 'app/controllers/course.controller.js', error.message);

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
};

module.exports = {
  getById,
  getAll,
  getMe,
  create,
  edit,
  deleteCourse,
};
