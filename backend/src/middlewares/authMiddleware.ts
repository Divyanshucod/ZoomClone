import { Request, Response,NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { CustomRequest, jwtPayload } from "../interfaces";

 export const authMiddleware = (req:Request,res:Response,next:NextFunction )=>{
    // verify the jwt token
    const authHeader = req.headers.authorization;
    if(!authHeader){
        res.status(403).json({message:"Un-authorized Access!"});
        return;
    }
    const token = authHeader?.split(' ')[1];
    try {
        var decoded = jwt.verify(token!, process.env.JWT_SECRET!) as jwtPayload;
        (req as CustomRequest).userId = decoded.id;
        next();
      } catch(err) {
        res.status(403).json({message:'invalid jwt token!'})
      }
}

