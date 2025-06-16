import express from 'express'
import { authMiddleware } from '../middlewares/authMiddleware';
import {v4 as uuidv4} from 'uuid';
import { Request,Response } from 'express';
import { CustomRequest } from '../interfaces';
import { prisma } from '../db';
import { meetingCreation, meetingCreationSchema } from '../zodSchemas';


export const connectionRouter = express.Router();



connectionRouter.get('/create-meeting',authMiddleware,async (req:Request,res:Response)=>{
     // creating unique id for meething and adding putting in database
     const userId = (req as CustomRequest).userId;
     let meetingId = uuidv4();
     try {
          await prisma.meeting.create({
               data:{
                    meetingId:meetingId,
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
connectionRouter.get('/validateMeeting/:meetingId',authMiddleware,async (req:Request,res:Response)=>{
     const meetingId = req.params.meetingId;
     const meeting = await prisma.meeting.findUnique({
          where:{
               meetingId:meetingId
          }
     })
     if(!meeting){
          res.status(401).json({message:'this meeting is not exists!'})
          return;
     }

     res.status(200).json({message:"Join the meet!"})
})
connectionRouter.post('/join-meeting',authMiddleware,async (req:Request,res:Response)=>{
     // creating unique id for meething and adding putting in database
     const {success} = meetingCreationSchema.safeParse(req.body);
     
     if(!success){
          res.status(403).json({message:'fields are required'});
          return;
     }
     const joinMeetingInfo = req.body as meetingCreation
     
     try {
          // check user is already there
          const member = await prisma.member.findUnique({
               where:{
                    memberId:joinMeetingInfo.memberId
               }
          })
          if(!member){
               res.status(401).json({message:'You have already joined the meeting!'})
               return;
          }
          await prisma.member.create({
               data:{
                    memberId:joinMeetingInfo.meetingId,
                    meetingId:joinMeetingInfo.meetingId,
                    memberName:joinMeetingInfo.username
               }
          });
          res.status(200).json({message:'You have joined the meeting!'})
     } catch (error) {
          res.status(500).json({message:'internal server error'});
          return;
     }
})