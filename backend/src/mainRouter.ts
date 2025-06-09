import express from 'express'
import userRouter from './routes/userRouter'

export const mainRouter = express.Router()

mainRouter.use('/user',userRouter)
