import { DataTypes, Model, Optional, ModelCtor } from 'sequelize'
import { ListModels } from '@typings/models'
import DatabaseService from '@services/database-service'

const sequelize = DatabaseService.getConnection()

export interface PlayerAttributes {
  player_id: string;
  name: string;
  email: string;
  gender_id: number;
  birth_date: string;
  position_id: number;
  password: string;
  phone?: string;
  url_img?: string;
  created_at: Date;
  updated_at: Date;
}

type PlayerCreation = Optional<PlayerAttributes, 'player_id' | 'phone' | 'position_id' | 'created_at' | 'updated_at'>

export interface PlayerInstance extends Model<PlayerAttributes, PlayerCreation>, PlayerAttributes {}

export type PlayerModel = ModelCtor<PlayerInstance>

const player = sequelize.define<PlayerInstance>('player', {
  player_id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  gender_id: DataTypes.INTEGER,
  birth_date: DataTypes.STRING,
  password: DataTypes.STRING,
  phone: DataTypes.STRING,
  url_img: DataTypes.STRING,
  position_id: DataTypes.INTEGER,
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE
})

export const associate = (models: ListModels): void => {
  player.hasOne(models.Gender, {
    sourceKey: 'gender_id',
    foreignKey: 'gender_id',
    as: 'gender'
  })

  player.hasOne(models.Position, {
    sourceKey: 'position_id',
    foreignKey: 'position_id',
    as: 'position'
  })
}

export default player
