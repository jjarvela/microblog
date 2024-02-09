import OpenAPIBackend from 'openapi-backend';
import { Request, Response } from "express";
import { users } from "@prisma/client"
import { insertUser } from "../services/userQueries";
import { Context } from "openapi-backend";
import type { UserRegData } from "./types"

export async function registerUser(c: Context<UserRegData>, req: Request, res: Response
) {
  //c.request.requestBody.
}