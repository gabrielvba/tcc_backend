const httpStatus = require('http-status-codes');
const log = require('../services/log.service');
const service = require('../services/user.service');

const { StatusCodes } = httpStatus;

const create = async (req, res) => {
  try {
    const { user } = req.body;

    if (!user.email) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'O email precisa ser preenchido' });
    }

    log.info(`Inicializando criação do usuário. user's email = ${user.email}`);
    log.info('Validando se há algum usuário com o mesmo email');

    const userWithSameEmail = await service.getByEmail(user.email);

    if (userWithSameEmail) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ error: 'Um usuário de mesmo email já existe.' });
    }

    log.info('Criando usuário');
    const newUser = await service.create(user);

    log.info(`Buscando usuário por id = ${newUser.id}`);
    const userInfo = await service.getById(newUser.id);

    log.info('Finalizado a criação de usuário.');
    return res.status(StatusCodes.CREATED).json(userInfo);
  } catch (error) {
    const errorMsg = 'Erro ao criar usuário';

    log.error(errorMsg, 'app/controllers/user.controller.js', error.message);

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;

    log.info(`Iniciando busca por usuário. userId = ${id}`);

    const user = await service.getById(id);

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Usuário não encontrado' });
    }

    log.info(`Finalizando busca por usuário. userId = ${id}`);
    return res.status(StatusCodes.OK).json(user);
  } catch (error) {
    const errorMsg = 'Erro buscar usuário';

    log.error(errorMsg, 'app/controllers/user.controller.js', error.message);

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
};

const getAll = async (req, res) => {
  try {
    const { query } = req;

    log.info(`Iniciando listagem dos usuarios, page: ${query.page}`);

    const users = await service.getAll(query);

    log.info('Busca finalizada com sucesso');
    return res.status(StatusCodes.OK).json(users);
  } catch (error) {
    const errorMsg = 'Erro buscar usuários';

    log.error(errorMsg, 'app/controllers/user.controller.js', error.message);

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
};

const edit = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req.body;

    log.info(`Iniciando atualização do usuário. userId = ${id}`);
    log.info('Verificando se usuário existe');

    const existedUser = await service.getJustUserById(id);

    if (!existedUser) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'Usuário não encontrado' });
    }

    if (user?.email) {
      log.info(`Validando email. email = ${user.email}`);

      const userWithSameEmail = await service.getByEmail(user.email);

      if (userWithSameEmail && `${userWithSameEmail.id}` !== `${id}`) {
        return res
          .status(StatusCodes.CONFLICT)
          .json({ error: 'Um usuário de mesmo email já existe.' });
      }
    }

    if (user) {
      log.info('Atualizando dados do usuário');
      await service.updateUser(id, user);
    }

    log.info('Buscando dados atualizados do usuário');
    const userInfo = await service.getById(id);

    log.info('Finalizando atualização');
    return res.status(StatusCodes.OK).json(userInfo);
  } catch (error) {
    const errorMsg = 'Erro atualizar usuário';

    log.error(errorMsg, 'app/controllers/user.controller.js', error.message);

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    log.info(`Iniciando remoção de usuário. userId = ${id}`);

    const user = await service.getJustUserById(id);

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Usuário não encontrado' });
    }

    await service.deleteUser(user);

    log.info('Finalizando remoção de usuário.');
    return res.status(StatusCodes.OK).json('Usuário deletado com sucesso.');
  } catch (error) {
    const errorMsg = 'Erro deletar usuário';

    log.error(errorMsg, 'app/controllers/user.controller.js', error.message);

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
  deleteUser,
};