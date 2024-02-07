
import { Request, Response } from "express";
import * as queries from "../services/userQueries";
import { Prisma, users } from '@prisma/client'
import { Context } from "openapi-backend";
import { argon2i } from "argon2";
import type { authObj } from "./types"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function loginUser(c: Context, _req: Request, res: Response) {

  const userObj: authObj = c.request.requestBody;

  // Try login user
  try {

    const result = await queries.selectUser({ username: userObj.userId as string }) as users;

    console.log(result.password);

  } catch {



  }

}

export async function logoutUser(c: Context, _req: Request, res: Response) {

}

function sessionInit(c: Context, _req: Request, res: Response) {

}