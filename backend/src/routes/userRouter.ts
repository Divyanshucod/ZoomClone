import express from "express";
import { userSignInSchema, userSignUpSchema } from "../zodSchemas";
import { prisma } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userRouter = express.Router();

userRouter.post(
  "/signup",
  async (req: express.Request, res: express.Response): Promise<void> => {
    const userValidation = userSignUpSchema.safeParse(req.body);
    if (!userValidation.success) {
      res.status(411).json({ message: "Enter valid details!" });
      return
    }

    const { email, username, password } = req.body;

    try {
      const user = await prisma.user.findUnique({ where: { email } });

      if (user) {
        res.status(401).json({ message: "User already exists!" });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await prisma.user.create({
        data: { email, password: hashedPassword, username },
      });

     res.status(200).json({ message: "User created successfully!" });
     return;
    } catch (error) {
       res.status(500).json({
        message: "Something happened at the server!",
      });
      return;
    }
  }
);

userRouter.post('/signin',async (req:express.Request,res:express.Response):Promise<void>=>{
     const {success} = userSignInSchema.safeParse(req.body);
     if(!success){
         res.status(411).json({ message: "Enter a valid details!" });
         return;
     }

     const { email, password } = req.body;
    //check user registered
    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (!user) {
         res.status(401).json({ message: "Please do a registration first!" });
         return
      }
      //verify password
      const verifyPassword = await bcrypt.compare(password, user?.password || "");
      if(!verifyPassword){
         res.status(403).json({ message: "email/password incorrect!" });
         return
      }
      //create jwt token 
      const token = jwt.sign({id:user?.id},process.env.JWT_SECRET!);
       res.status(200).json({ message: "signin successfull" ,token,username:user.username});
       return
    } catch (error) {
         res.status(500).json({
        message: "Something happened at the server!",
      });
      return
    }
})
export default userRouter;
