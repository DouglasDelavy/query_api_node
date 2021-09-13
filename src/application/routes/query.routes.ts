import express from 'express'

import { adaptRoute } from '@application/adapters/ExpressRouteAdapter'
import { makeQueryController } from '@application/factories/makeQueryController'

const queryRouter = express.Router()

queryRouter.post('/', adaptRoute(makeQueryController()))

export { queryRouter }
