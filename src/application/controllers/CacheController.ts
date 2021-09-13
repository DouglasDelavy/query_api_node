import { Controller } from '@domain/Controller'
import { fail, HttpResponse, ok } from '@domain/HttpResponse'
import { CacheUseCase } from '@usecases/CacheUseCase/CacheUseCase'

type CacheControllerRequest = {
  key: string
  value: string
  type: number
}

export class CacheController implements Controller {
  constructor(private cacheUseCase: CacheUseCase) {}

  async handle(request: CacheControllerRequest): Promise<HttpResponse> {
    try {
      const { key, value, type } = request

      const result = await this.cacheUseCase.execute({
        key,
        value,
        type,
      })

      return ok({ data: result })
    } catch (err) {
      return fail(err)
    }
  }
}
