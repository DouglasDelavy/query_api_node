import { Router } from 'express'

import { cacheRouter } from './cache.routes'
import { queryRouter } from './query.routes'

const router = Router()

router.use('/query', queryRouter)
router.use('/cache', cacheRouter)

export { router }
