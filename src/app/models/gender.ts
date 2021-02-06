import { DataTypes, Model, Optional, ModelCtor } from 'sequelize'
import DatabaseService from '@services/database-service'

const sequelize = DatabaseService.getConnection()

export interface GenderAttributes {
  gender_id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

type GenderCreation = Optional<GenderAttributes, 'gender_id' | 'created_at' | 'updated_at'>

export interface GenderInstance extends Model<GenderAttributes, GenderCreation>, GenderAttributes {}

export type GenderModel = ModelCtor<GenderInstance>

const gender = sequelize.define<GenderInstance>('gender', {
  gender_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: DataTypes.STRING,
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE
})

export default gender
