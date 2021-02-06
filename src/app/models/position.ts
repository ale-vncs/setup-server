import { DataTypes, Model, Optional, ModelCtor } from 'sequelize'
import DatabaseService from '@services/database-service'

const sequelize = DatabaseService.getConnection()

export interface PositionAttributes {
  position_id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

type PositionCreation = Optional<PositionAttributes, 'position_id' | 'created_at' | 'updated_at'>

export interface PositionInstance extends Model<PositionAttributes, PositionCreation>, PositionAttributes {}

export type PositionModel = ModelCtor<PositionInstance>

const position = sequelize.define<PositionInstance>('position', {
  position_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: DataTypes.STRING,
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE
})

export default position
