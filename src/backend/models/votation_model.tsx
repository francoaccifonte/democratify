import BaseModel from './base_model';

class VotationModel extends BaseModel {
  modelName(): string {
    return 'votations';
  }

  show(id: number, token: string = '') {
    return this.appGet(`accounts/${id}/votation`, { token: token})
  }

  castVote(accountId: number, candidateId: number, token: string = '') {
    return this.appPut(`accounts/${accountId}/votation`, { candidate_id: candidateId, token: token })
  }
}

export { VotationModel }
