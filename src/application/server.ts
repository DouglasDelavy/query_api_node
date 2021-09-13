import { MySqlConnection } from '@infra/mysql/Connection'

import { app } from './app'

MySqlConnection.getInstance()
  .connect()
  .then(async () => {
    app.listen(process.env.PORT, () =>
      console.log(`Server running at http://localhost:${process.env.PORT}`)
    )
  })
  .catch(console.error)
