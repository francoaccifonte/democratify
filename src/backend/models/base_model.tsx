export default abstract class BaseModel {
  baseUrl: string;
  token: string | undefined;

  constructor(token?: string) {
    this.baseUrl  = 'http://localhost:3001';
    this.token = token;
  }

  url(): string {
    return(`${this.baseUrl}/${this.modelName()}`)
  }

  modelName(): string {
    throw new Error('Model name not specified')
  }

  baseHeaders(): object {
    var headers: object = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
    if (this.token) {
      headers = {...headers, Authorization: `Bearer ${this.token}`}
    }
    return headers;
    }

  show (id: number) {
    return this.get(`/${id}`)
  }

  list(params?: any) {
    return this.get('', params)
  }

  post (path: string = '', body: object = {}) {
    var options: object = {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(body),
    }
    options = {...options, headers: this.baseHeaders()}
    return fetch(
      `${this.url()}${path}`,
      options
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

    var options: object = {
      method: 'GET',
      mode: 'cors',
    }
    options = {...options, headers: this.baseHeaders()}
    return fetch(
      url.toString(),
      options
    )
  }
}
