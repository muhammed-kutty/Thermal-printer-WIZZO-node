import express from 'express'
import { thermalPrinter } from '../controllerss/prinController.js'
import { authMiddleware } from '../MiddleWare/authMidlleWare.js'

const route = express.Router()

route.post('/print',authMiddleware,thermalPrinter)

export default (route)