
import { Request, Response } from "express";
import * as queries from "../services/userQueries";
import { Prisma, users } from '@prisma/client'
import { Context } from "openapi-backend";
import * as argon from "argon2";
import { authObj } from "./types"
import { UUID } from "crypto";




export async function unAuthHandler(c: Context, _req: Request, res: Response) {

  res.status(401).json({ status: 401, err: [{ message: "Authentication failed." }] })

}

export async function loginUser(c: Context, _req: Request, res: Response) {

  const userObj: authObj = c.request.requestBody;

  try {

    const result = await queries.selectUser({ username: userObj.userId as string }) as users

    if (await argon.verify(result.password, userObj.password as string) === true) {

      // Set session & cookies. 
      _req.session.user = { authenticated: true };
      res.sendStatus(200)

    } else {
      res.status(401).json({ status: 401, err: [{ message: "Authentication failed." }] })
      _req.session.user = { authenticated: false };

    }


  } catch (e) {
    console.log(e)
    res.status(500).json(
      { status: 500, err: { message: e } }
    )

  }

}

export async function logoutUser(c: Context, _req: Request, res: Response) {

  _req.session.destroy(() => {
    res.sendStatus(200)
  })
}

async function sessionInit(uuid: UUID) {



}

async function sessionDestroy() { }

export function securityHandler(c: Context, req: Request, res: Response) {
  // Handle every query session check and return 401 if no valid session is found.
  // Check if user has session cookie in db and if it's valid.
  // db_client
  //res.status(401).json({ status: 401, err: [{ message: "No authorization." }] })
  console.log("security handler called");

  if (req.session.user?.authenticated !== true && req.path !== "/login" && req.path !== "/logout") {

    res.status(401).json({ status: 401, err: [{ message: "Authentication failed." }] })

  }

}