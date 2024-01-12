import OpenAPIBackend from 'openapi-backend';
import { Request, Response} from "express";
import queries from "../services/prismaqueries";
import { Context } from "openapi-backend";
import type {
UserRegBody
} from "./types"

async function addBlogEntryHandler(
  c: Context<UserRegBody>,
  _req: Request,
  res: Response
) {