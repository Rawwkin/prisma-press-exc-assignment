import { Router } from "express";
import { Request, Response } from "express";
import config from "../../config";
import httpStatus from "http-status";
import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { userController } from "./user.controller";

const router = Router();

router.post("/register", userController.registerUSer) 

export const userRouter = router;