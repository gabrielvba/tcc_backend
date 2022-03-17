const httpStatus = require('http-status-codes');
const log = require('../services/log.service');
const service = require('../services/profile.service');

const { StatusCodes } = httpStatus;

const getMe = async (req, res) => {
  try {
    const { id } = req.user;

    log.info(`Iniciando busca por perfil. userId = ${id}`);

    const profile = await service.getMe(id);

    if (!profile) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Perfil não encontrado' });
    }

    log.info(`Finalizando busca por perfil. userId = ${id}`);
    return res.status(StatusCodes.OK).json(profile);
  } catch (error) {
    const errorMsg = 'Erro buscar perfil';

    log.error(errorMsg, 'app/controllers/profile.controller.js', error.message);

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
};

const editMe = async (req, res) => {
  try {
    const { id } = req.user;
    const { newProfile } = req.body;

    log.info(`Iniciando atualização do perfil. userId = ${id}`);

    if (newProfile) {
      log.info('Atualizando dados do usuário');
      await service.updateProfile(id, newProfile);
    }

    log.info('Buscando dados atualizados do perfil');
    const profileInfo = await service.getMe(id);

    log.info('Finalizando atualização');
    return res.status(StatusCodes.OK).json(profileInfo);
  } catch (error) {
    const errorMsg = 'Erro atualizar usuário';

    log.error(errorMsg, 'app/controllers/profile.controller.js', error.message);

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: `${errorMsg} ${error.message}` });
  }
};

module.exports = {
  getMe,
  editMe,
};
