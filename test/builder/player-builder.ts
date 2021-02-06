import { CreatePlayerInterface } from '@typings/player'
import { GenderEnum } from '@enums/gender-enum'
import { PositionEnum } from '@enums/position-enum'
import * as faker from 'faker'
import { randomNumber } from '@utils/random-number'

class PlayerBuilder {
  private readonly player: CreatePlayerInterface;

  constructor () {
    this.player = {
      name: faker.name.findName(),
      gender_id: GenderEnum.MASCULINO,
      phone: randomNumber(13),
      password: faker.internet.password(6),
      birth_date: faker.date.past(1997).toISOString(),
      position_id: PositionEnum.GOLEIRO,
      email: faker.internet.email()
    }
  }

  removePhone (): PlayerBuilder {
    this.player.phone = undefined
    return this
  }

  invalidEmail (): PlayerBuilder {
    this.player.email = faker.lorem.words(2)
    return this
  }

  invalidPhone (): PlayerBuilder {
    this.player.phone = faker.lorem.words(3)
    return this
  }

  invalidBirthDate (): PlayerBuilder {
    this.player.birth_date = faker.lorem.words(3)
    return this
  }

  invalidPosition (): PlayerBuilder {
    this.player.position_id = parseInt(randomNumber(5))
    return this
  }

  build (): CreatePlayerInterface {
    return this.player
  }
}

export default PlayerBuilder
