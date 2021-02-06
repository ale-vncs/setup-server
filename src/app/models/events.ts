import { DataTypes, Model, Optional, ModelCtor } from 'sequelize'
import DatabaseService from '@services/database-service'

const sequelize = DatabaseService.getConnection()

export interface EventsAttributes {
  event_id: string;
  employee_id: string;
  employee_name: string;
  event: string;
  created_at?: Date;
}

type EventsCreation = Optional<EventsAttributes, 'event_id'>

export interface EventsInstance extends Model<EventsAttributes, EventsCreation>, EventsAttributes {}

export type EventsModel = ModelCtor<EventsInstance>

const events = sequelize.define<EventsInstance>('events', {
  event_id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  employee_id: DataTypes.STRING,
  employee_name: DataTypes.STRING,
  event: DataTypes.TEXT
}, {
  updatedAt: false
})

export default events
