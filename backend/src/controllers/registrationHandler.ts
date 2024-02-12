import OpenAPIBackend from 'openapi-backend';
import { Request, Response } from "express";
import { users } from "@prisma/client"
import { insertUser } from "../services/userQueries";
import { Context } from "openapi-backend";
import type { UserRegData } from "./types"
import * as argon from "argon2";

export async function registerUser(c: Context<UserRegData>, req: Request, res: Response
) {

  const userData = c.request.requestBody
  await insertUser({
    username: userData.userName,
    email: userData.email,
    passwordHash: userData.password
  })
}