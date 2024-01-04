
import OpenAPIBackend from 'openapi-backend';
import { Request, Response} from "express";
import queries from "../services/prismaqueries";
import { Context } from "openapi-backend";
import type {
BlogAddReqBody,
BlogAddReqParams,
BlogAddResponse
} from "./types"

async function addBlogEntryHandler(
    c: Context<BlogAddReqBody,BlogAddReqParams>,
    _req: Request,
    res: Response
) {
    const userId = c.request.params.userId;
    const blogObj = c.request.requestBody;
    const post = {user_uuid: userId, text: blogObj.text, timestamp: Date.now()};
    const result = await queries.insertPost(post);
    res.json(result);    
}



