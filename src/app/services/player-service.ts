import Player, { PlayerInstance } from '@models/player'
import AbstractService from '@services/abstract-service'

import { CreatePlayerInterface, PlayerOrNullType, WherePlayerInterface } from '@typings/player'
import { logger } from '@logger'
import { ApiError } from '@src/app/exceptions/api-error'
import { getHttpContext } from '@utils/http-context'

class PlayerService extends AbstractService {
  async findAll (data?: WherePlayerInterface): Promise<PlayerInstance[]> {
    return await Player.findAll({
      where: data && data.where,
      ...(data && data.options)
    })
  }

  async findOneByEmail (email: string): Promise<PlayerOrNullType> {
    const listPLayer = await this.findAll({
      where: {
        email
      }
    })

    return listPLayer.length ? listPLayer[0] : null
  }

  async createPlayer (data: CreatePlayerInterface): Promise<PlayerInstance> {
    logger.info('Iniciando cadastro de jogador')
    logger.debug(`Data: ${JSON.stringify(data)}`)

    logger.info(`Buscando se já existe email cadastrado: ${data.email}`)
    const existPlayer = await this.findOneByEmail(data.email)

    if (existPlayer) {
      logger.error('Jogador já registrado')
      throw new ApiError('Bad Request', 'playerAlreadyExist')
    }

    logger.info('Verificando gênero informado...')
    const listGenderId = getHttpContext('gender')
    if (listGenderId && !listGenderId.some(genderId => data.gender_id === genderId)) {
      logger.error('Gênero não existe')
      throw new ApiError('Bad Request', 'genderNotFound')
    }

    try {
      logger.info('Cadastrando jogador...')
      const newPlayer = await Player.create({
        name: data.name,
        email: data.email,
        gender_id: data.gender_id,
        birth_date: data.birth_date,
        position_id: data.position_id,
        password: data.password,
        phone: data.phone
      })

      logger.info('Jogador cadastrado com sucesso')
      return <PlayerInstance> await this.findOneByEmail(newPlayer.email)
    } catch (e) {
      logger.error(`Error ao cadastrar jogador: ${e}`)
      throw new ApiError('Internal Server Error', 'playerCreatedError')
    }
  }
}

export default PlayerService
