export interface IQueryRepository {
  execute(query: string, params: object): Promise<object>
  fetch(query: string, params: object): Promise<object>
}
