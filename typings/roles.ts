import { FindOptions, WhereOptions } from 'sequelize'
import { EmployeeRolesAttributes } from '@models/employee_roles'

export interface CreateEmployeeRole {
  name: string;
  description: string;
}

export interface UpdateEmployeeRole {
  name?: string;
  description?: string;
}

export interface WhereRole {
  where?: WhereOptions<EmployeeRolesAttributes>;
  options?: FindOptions<EmployeeRolesAttributes>;
}
