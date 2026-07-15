import config from "../../config";
import httpStatus from "http-status";
import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { Request, Response } from "express";
import { userService } from "./user.service";

const registerUSer = async (req : Request, res : Response) => {

   try {
     const payload = req.body;
    
    const user = await userService.registerUserIntoDB(payload);
    

    res.status(httpStatus.CREATED).json({
    success : true,
    statusCode : httpStatus.CREATED,
    message: "User registered successfully" ,
     data : {
        user
     }
    });

   }
   catch (error) {
        console.error(error);
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success : false,
            statusCode : httpStatus.INTERNAL_SERVER_ERROR,
            message : "failed to register user",
            error : (error as Error).message
        })
   }
}

export const userController = {
    registerUSer
}