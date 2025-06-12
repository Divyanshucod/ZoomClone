import express from 'express'
import { authMiddleware } from '../middlewares/authMiddleware';
import {v4 as uuidv4} from 'uuid';
import { Request,Response } from 'express';
import { CustomRequest } from '../interfaces';
import { prisma } from '../db';


export const connectionRouter = express.Router();



connectionRouter.get('/create-meeting',authMiddleware,async (req:Request,res:Response)=>{
     // creating unique id for meething and adding putting in database
     const userId = (req as CustomRequest).userId;
     let meetingId = uuidv4();
     try {
          await prisma.meeting.create({
               data:{
                    meethingId:meetingId,
                    hoster:userId
               }
          })
          res.status(200).json({
               message:'meething has been created, join using via given id!',
               meetingId
          })
     } catch (error) {
          res.status(500).json({message:'something happend at the backend!'})
          return;
     }
})

connectionRouter.get('/join-meeting',authMiddleware,async (req:Request,res:Response)=>{
     // creating unique id for meething and adding putting in database
    
})