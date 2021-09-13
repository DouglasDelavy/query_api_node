import { IQueryRepository } from '@domain/repositories/IQueryRepository'

import { MySqlConnection } from '../Connection'

export class MySqlQueryRepository implements IQueryRepository {
  async execute(query: string, params: object): Promise<object> {
    const connection = MySqlConnection.getInstance().getPool()

    const [result] = await connection.execute(query, params)

    return result
  }

  async fetch(query: string, params: object): Promise<object> {
    const connection = MySqlConnection.getInstance().getPool()

    const [result] = await connection.query(query, params)

    return result
  }
}
