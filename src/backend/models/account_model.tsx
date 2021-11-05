import BaseModel from './base_model'

class AccountModel extends BaseModel {
  modelName(): string {
    return('accounts')
  }

  // TODO: properly type this
  async show(id: number) {
    const account: any = await this.show(id)

    return account
  }

  async authenticate(email: string, password: string): Promise<any> {
    const body = {
      email: email,
      password: password
    }
    const account: any = await this.post("/login", body)

    return account.json()
  }
}

export default AccountModel