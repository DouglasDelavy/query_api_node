import { ICacheRepository } from '@domain/repositories/ICacheRepository'

import { redisConnection } from '../Connection'

export class RedisCacheRepository implements ICacheRepository {
  async get(key: string): Promise<string> {
    return await redisConnection.get(key)
  }

  async set(key: string, value: string): Promise<void> {
    await redisConnection.set(key, value)
  }

  async del(key: string): Promise<void> {
    await redisConnection.del(key)
  }
}
