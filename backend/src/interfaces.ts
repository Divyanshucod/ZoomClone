// interface User {
//     email:string,
//     password:string,
//     username:string
// }
// Not using
import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
export interface jwtPayload{
    id:number
}
export interface CustomRequest extends Request {
    userId: number;
}