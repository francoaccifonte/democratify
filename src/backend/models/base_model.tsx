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

  show(id: number) {
    fetch(
      `${this.url()}/${id}`,
      {
        method: 'GET',
      }
    ).then(
      (response) => {
        return response.json();
      }
    ).catch(
    )
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
}
