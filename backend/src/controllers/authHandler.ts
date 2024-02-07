
import { Request, Response } from "express";
import * as queries from "../services/userQueries";
import { Prisma, users } from '@prisma/client'
import { Context } from "openapi-backend";
import * as argon from "argon2";
import type { authObj } from "./types"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function loginUser(c: Context, _req: Request, res: Response) {

  const userObj: authObj = c.request.requestBody;

  try {
    console.log(userObj)
    const result = await queries.selectUser({ username: userObj.userId as string }) as users
    if (await argon.verify(result.password, userObj.password as string)) {
      res.status(200)

    } else {
      res.status(401).json({ status: 401, err: [{ message: "Authentication failed." }] })
    }

  } catch (e) {
    console.log(e)
    res.status(500).json(
      { status: 500, err: { message: e } }
    )

  }

}

export async function logoutUser(c: Context, _req: Request, res: Response) {

}

function sessionInit(c: Context, _req: Request, res: Response) {

}