import BaseModel from './base_model'

class AccountModel extends BaseModel {
  modelName (): string {
    return ('accounts')
  }

  // TODO: properly type this
  async me (): Promise<any> {
    const response = await this.get('/me')
    if (response.status === 200) {
      return response.json()
    } else {
      return Promise.reject(response)
    }
  }

  async authenticate (email: string, password: string): Promise<any> {
    const body = {
      email: email,
      password: password
    }
    const account: any = await this.post(body, '/login')
    if (account.status === 200) {
      return account.json()
    } else {
      return Promise.reject(account)
    }
  }

  async signUp (email: string, password: string, name: string): Promise<any> {
    const body = {
      email: email,
      password: password,
      name: name
    }
    const account: any = await this.post(body, '/signup')

    return account.json()
  }
}

export { AccountModel }
