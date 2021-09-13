import { QueryController } from '@application/controllers/QueryController'
import { Controller } from '@domain/Controller'
import { MySqlQueryRepository } from '@infra/mysql/repositories/MySqlQueryRepository'
import { QueryUseCase } from '@usecases/QueryUseCase/QueryUseCase'

export function makeQueryController(): Controller {
  const mysqlQueryRepository = new MySqlQueryRepository()
  const queryUseCase = new QueryUseCase(mysqlQueryRepository)
  const queryController = new QueryController(queryUseCase)

  return queryController
}
