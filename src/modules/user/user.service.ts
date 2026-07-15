import config from "../../config";
import httpStatus from "http-status";
import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { Request, Response } from "express";
import { RegisterUserPayload } from "./user.interface";


const registerUserIntoDB = async (payload : RegisterUserPayload) => {
    const {name, email, password, profilePhoto} = payload;

    const isUserExist = await prisma.user.findUnique({
        where : {email}
    })

    if(isUserExist) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));

    const createduser = await prisma.user.create({
        data : {
            name,
            email,
            password : hashedPassword,
        }
    });

    await prisma.profile.create({
        data : {
            userId : createduser.id,
            profilePhoto
        }
    });


    const user = await prisma.user.findUnique({
        where : {
            id : createduser.id,
            email : createduser.email || email
        },

        omit : {
            password : true
        },

        include : {
        profile : true
    }
    })

    return user;
}


export const userService= {
    registerUserIntoDB
}


