
import { Request, Response} from "express";
import queries from "../services/prismaqueries";
import { Context } from "openapi-backend";
import type {
BlogEntry,
BlogAddReqParams
} from "./types"

export async function addBlogEntryHandler(
    c: Context,
    _req: Request,
    res: Response
) {
    const userId = c.request.params.userId;
    const blogObj = c.request.requestBody;
    const post = {user_uuid: userId, text: blogObj.text, timestamp: Date.now()};
    const result = await queries.insertPost(post);
    res.json(result);    
}




