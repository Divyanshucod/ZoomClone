import express from 'express'
import userRouter from './routes/userRouter'
import { connectionRouter } from './routes/connectionRoute'

export const mainRouter = express.Router()
mainRouter.use('/user',userRouter)
mainRouter.use('/connection',connectionRouter)
