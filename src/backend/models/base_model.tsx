export default abstract class BaseModel {
  baseUrl: string;

  constructor() {
    this.baseUrl  = 'http://localhost:3001/'
  }

  url(): string {
    return(`${this.baseUrl}${this.modelName()}`)
  }

  modelName(): string {
    throw new Error('Model name not specified')
  }

  show(id: number) {////////////////
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
}
