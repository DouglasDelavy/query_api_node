import { Controller } from '@domain/Controller'
import { fail, HttpResponse, ok } from '@domain/HttpResponse'
import { QueryUseCase } from '@usecases/QueryUseCase/QueryUseCase'

type QueryControllerRequest = {
  query: string
  params: object
  type: number
}

export class QueryController implements Controller {
  constructor(private queryUseCase: QueryUseCase) {}

  async handle(request: QueryControllerRequest): Promise<HttpResponse> {
    try {
      const { query, params, type } = request

      const result = await this.queryUseCase.execute({
        query,
        params,
        type,
      })

      return ok({ data: result })
    } catch (err) {
      return fail(err)
    }
  }
}
