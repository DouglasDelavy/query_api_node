import { createPool, Pool } from 'mysql2/promise'

export class MySqlConnection {
  private static instance?: MySqlConnection
  private pool?: Pool

  private constructor() {}

  static getInstance(): MySqlConnection {
    if (MySqlConnection.instance === undefined)
      MySqlConnection.instance = new MySqlConnection()
    return MySqlConnection.instance
  }

  public getPool(): Pool {
    if (this.pool === undefined) throw new Error('No connection was found')

    return this.pool
  }

  async connect(): Promise<void> {
    this.pool = createPool({
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASS,
      database: process.env.MYSQL_DB,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    })

    this.pool
      .getConnection()
      .then(() => {
        console.info('Database server connection established.')
      })
      .catch(error => {
        console.error(error.message)
      })
  }

  async disconnect(): Promise<void> {
    if (this.pool === undefined) throw new Error('No connection was found')

    await this.pool.end()
  }
}
