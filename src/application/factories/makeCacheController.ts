import { CacheController } from '@application/controllers/CacheController'
import { Controller } from '@domain/Controller'
import { RedisCacheRepository } from '@infra/redis/repositories/RedisCacheRepository'
import { CacheUseCase } from '@usecases/CacheUseCase/CacheUseCase'

export function makeCacheController(): Controller {
  const cacheRepository = new RedisCacheRepository()
  const cacheUseCase = new CacheUseCase(cacheRepository)
  const cacheController = new CacheController(cacheUseCase)

  return cacheController
}
