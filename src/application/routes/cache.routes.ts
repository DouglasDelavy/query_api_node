import express from 'express'

import { adaptRoute } from '@application/adapters/ExpressRouteAdapter'
import { makeCacheController } from '@application/factories/makeCacheController'

const cacheRouter = express.Router()

cacheRouter.post('/', adaptRoute(makeCacheController()))

export { cacheRouter }
