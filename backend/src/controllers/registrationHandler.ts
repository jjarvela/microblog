import OpenAPIBackend from 'openapi-backend';
import { Request, Response } from "express";
import { users } from "@prisma/client"
import { insertUser } from "../services/userQueries";
import { Context } from "openapi-backend";
import { UUID, randomUUID } from 'crypto';
import type { UserRegData, ErrorObject } from "./types"
import * as argon from "argon2";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export async function registerUser(c: Context<UserRegData>, req: Request, res: Response
) {
  console.log(randomUUID().toString());
  try {
    const userData: UserRegData = c.request.requestBody
    await insertUser({
      uid: randomUUID(),
      username: userData.userName,
      screen_name: userData.screenName,
      email: userData.email,
      passwordHash: await argon.hash(userData.password),
      joined: new Date(Date.now()) as Date,
      location: userData.location as string,
      disabled: false,
      verified: false
    })
    res.sendStatus(200);
  } catch (e: unknown) {
    console.log(e);
    if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') {

      const error: ErrorObject = { status: 409, err: [{ message: "Username or email already registered." }] }
      return res.status(409).json(error)

    } else {
      const error: ErrorObject = { status: 500, err: [{ message: "Internal Server Error." }] }
      res.status(500).json(error);

    }

  }
}