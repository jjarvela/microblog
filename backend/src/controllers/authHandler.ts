
import { NextFunction, Request, Response } from "express";
import * as queries from "../services/userQueries";
import { Prisma, users } from '@prisma/client'
import { Context } from "openapi-backend";
import * as argon from "argon2";
import { authObj } from "./types"
import { UUID } from "crypto";




export async function loginUser(c: Context, req: Request, res: Response) {

  const userObj: authObj = c.request.requestBody;

  try {

    const result = await queries.selectUser({ username: userObj.userId as string }) as users

    if (await argon.verify(result.password, userObj.password as string) === true) {

      // Set session & cookies. 
      req.session.user = { authenticated: true };
      return res.status(200).send(result.uid);

    } else {
      req.session.user = { authenticated: false };
      return res.status(401).json({ status: 401, err: [{ message: "Authentication failed." }] })

    }


  } catch (e) {
    console.log(e)
    return res.status(500).json(
      { status: 500, err: { message: e } }
    )

  }

}

export async function logoutUser(c: Context, req: Request, res: Response) {

  req.session.destroy(() => {
    return res.sendStatus(200)
  })
}

async function sessionDestroy() { }

export function securityHandler(c: Context, req: Request, res: Response, next: NextFunction) {
  // Handle every query session check and return 401 if no valid session is found.
  // Check if user has session cookie in db and if it's valid.
  // db_client
  //res.status(401).json({ status: 401, err: [{ message: "No authorization." }] })
  console.log("security handler called");
  console.log(req.path);

  if (req.session.user?.authenticated !== true && req.path !== "/login" && req.path !== "/logout") {
    console.log("session not valid.");
    //return res.status(401).json({ status: 401, err: [{ message: "Session not valid. Authentication failed." }] })
    return false
  } else {
    return true
  }


}