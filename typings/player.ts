import { FindOptions, WhereOptions } from 'sequelize'
import { PlayerAttributes, PlayerInstance } from '@models/player'

export type PlayerOrNullType = PlayerInstance | null

export interface WherePlayerInterface {
  where?: WhereOptions<PlayerAttributes>;
  options?: FindOptions<PlayerAttributes>;
}

export interface CreatePlayerInterface {
  name: string;
  email: string;
  gender_id: number;
  password: string;
  birth_date: string;
  phone?: string;
  position_id: number;
}
