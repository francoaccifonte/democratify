import BaseModel from './base_model';

class VotationModel extends BaseModel {
  modelName(): string {
    return 'votations';
  }
}

export { VotationModel }
