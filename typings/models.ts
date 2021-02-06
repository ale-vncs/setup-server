import { ModelCtor } from 'sequelize'
import { PlayerModel } from '@models/player'
import { GenderModel } from '@models/gender'
import { PositionModel } from '@models/position'

export interface listImportModel {
  default: ModelCtor<any>;
  associate?: any;
}

export interface clearModel {
  model: keyof ListModels;
  where?: { [key: string]: any;};
}

export interface ListModels {
  PLayer: PlayerModel;
  Gender: GenderModel;
  Position: PositionModel;
}
