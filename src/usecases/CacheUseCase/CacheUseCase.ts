import { ICacheRepository } from '@domain/repositories/ICacheRepository'

type CacheUseCaseRequest = {
  key: string
  value: string
  type: number
}

export class CacheUseCase {
  constructor(private cacheRepository: ICacheRepository) {}

  async execute({ key, value, type }: CacheUseCaseRequest): Promise<string> {
    if (type === 0) {
      const result = await this.cacheRepository.get(key)

      return result
    }

    if (type === 1) {
      await this.cacheRepository.set(key, value)
    }

    if (type === 2) {
      await this.cacheRepository.del(key)
    }
  }
}
