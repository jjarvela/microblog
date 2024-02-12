import OpenAPIBackend from 'openapi-backend';
import { Request, Response } from "express";
import { users } from "@prisma/client"
import { insertUser } from "../services/userQueries";
import { Context } from "openapi-backend";
import { UUID, randomUUID } from 'crypto';
import type { UserRegData, ErrorObject } from "./types"
import * as argon from "argon2";

export async function registerUser(c: Context<UserRegData>, req: Request, res: Response
) {

  try {
    const userData = c.request.requestBody
    await insertUser({
      uid: randomUUID.toString(),
      username: userData.userName,
      email: userData.email,
      passwordHash: await argon.hash(userData.password),
      joined: new Date(Date.now()) as Date
    })
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    const error: ErrorObject = { status: 500, err: [{ message: "Internal Server Error" }] }
    res.status(500).json;

  }
}