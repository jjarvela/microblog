import OpenAPIBackend from 'openapi-backend';
import { Request, Response } from "express";
import { users } from "@prisma/client"
import { insertUser } from "../services/userQueries";
import { Context } from "openapi-backend";
import { UUID, randomUUID } from 'crypto';
import type { UserRegData, ErrorObject } from "./types"
import * as argon from "argon2";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { insertProfile } from '../services/userProfileQueries';

export async function registerUser(c: Context<UserRegData>, req: Request, res: Response
) {
  console.log(randomUUID().toString());
  try {
    const userData: UserRegData = c.request.requestBody
    const newUuid = randomUUID(); // Create uuid to share with profile
    // Create user
    const result = await insertUser({
      uid: newUuid,
      username: userData.userName,
      screen_name: userData.screenName,
      email: userData.email,
      birthday: new Date(userData.birthday),
      passwordHash: await argon.hash(userData.password),
      joined: new Date(Date.now()) as Date,
      location: userData.location as string,
      disabled: false,
      verified: false
    })
    // Create profile
    await insertProfile({
      id: randomUUID(),
      user_id: newUuid,
      profile_text: "",
      screen_name: userData.screenName
    })
    req.session.user = { authenticated: true };
    res.status(200).send(result.uid);
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