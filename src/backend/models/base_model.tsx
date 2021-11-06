export default abstract class BaseModel {
  baseUrl: string;

  constructor() {
    this.baseUrl  = 'http://localhost:3001'
  }

  url(): string {
    return(`${this.baseUrl}/${this.modelName()}`)
  }

  modelName(): string {
    throw new Error('Model name not specified')
  }

  show (id: number) {
    return this.get(`${this.url()}/${id}`)
  }

  list(params?: any) {
    return this.get('', params)
  }

  post (path: string = '', body: object = {}) {
    return fetch(
      `${this.url()}${path}`,
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    )
  }

  // TODO: params type should be object
  get (path?: string, params?: any) {
    var url = new URL(`${this.url()}${path}`);
    if (params) {
      for (const key in params) {
        url.searchParams.append(key, params[key])
      }
    }
    
    return fetch(
      url.toString(),
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }
}
