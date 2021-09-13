import { IQueryRepository } from '@domain/repositories/IQueryRepository'

type QueryUseCaseRequest = {
  query: string
  params: object
  type: number
}

export class QueryUseCase {
  constructor(private queryRepository: IQueryRepository) {}

  async execute({
    query,
    params,
    type,
  }: QueryUseCaseRequest): Promise<object | number> {
    if (type === 0) {
      const result = await this.queryRepository.fetch(query, params)

      return result
    }

    if (type === 1) {
      const result = await this.queryRepository.execute(query, params)

      return result
    }
  }
}
