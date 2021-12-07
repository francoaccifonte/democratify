import BaseModel from './base_model'

class AccountModel extends BaseModel {
  modelName(): string {
    return('accounts')
  }

  // TODO: properly type this
  async me(): Promise<any> {
    const response = await this.get("/me")

    return response.json()
  }

  async authenticate(email: string, password: string): Promise<any> {
    const body = {
      email: email,
      password: password
    }
    const account: any = await this.post(body, "/login")

    return account.json()
  }
}

export { AccountModel }
