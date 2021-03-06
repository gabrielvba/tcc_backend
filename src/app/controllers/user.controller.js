const httpStatus = require('http-status-codes');
const log = require('../services/log.service');
const service = require('../services/user.service');
const profileService = require('../services/profile.service');

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

    const userData = {
      email: user.email,
      password: user.password,
    };

    log.info('Criando usuário');
    const newUser = await service.create(userData);

    const profileData = {
      name: user.name,
      lastName: user.lastName,
      userId: newUser.id,
    };

    log.info('Criando perfil do usuário');
    await profileService.create(profileData);

    log.info(`Buscando usuário por id = ${newUser.id}`);
    const userInfo = await service.getJustUserById(newUser.id);

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

const getMe = async (req, res) => {
  try {
    const { id } = req.user;

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
    log.info('Iniciando listagem dos usuarios');
    const users = await service.getAll();

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
    const { id } = req.user;
    const { newUser } = req.body;

    log.info(`Iniciando atualização do usuário. userId = ${id}`);

    if (newUser?.email) {
      log.info(`Validando email. email = ${newUser.email}`);

      const userWithSameEmail = await service.getByEmail(newUser.email);

      if (userWithSameEmail && `${userWithSameEmail.id}` !== `${id}`) {
        return res
          .status(StatusCodes.CONFLICT)
          .json({ error: 'Um usuário de mesmo email já existe.' });
      }
    }

    if (newUser) {
      log.info('Atualizando dados do usuário');
      await service.updateUser(id, newUser);
    }

    log.info('Buscando dados atualizados do usuário');
    const userInfo = await service.getJustUserById(id);

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
    const { id } = req.user;

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
  getMe,
  getAll,
  edit,
  deleteUser,
};
